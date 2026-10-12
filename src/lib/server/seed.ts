import "server-only";
import { defaultEvents } from "@/lib/events";
import { defaultBoard, defaultCareerRoles, defaultPartners, defaultStories } from "@/lib/cms/defaults";
import { defaultSocialLinks } from "@/lib/cms/social";

type Exec = (text: string, params: unknown[]) => Promise<Record<string, unknown>[]>;

const SEED_FLAG = "seeded_v1";

// Copies the site's built-in content into the database exactly once, so the
// admin starts with everything that's live today instead of empty lists. The
// flag in `meta` means emptying a list in the admin later is respected.
//
// The first Owner account comes from ADMIN_USERNAME + ADMIN_PASSWORD_HASH
// (same approach as the e-cleanpro admin) — see bootstrapOwner below.
export async function seedDatabase(exec: Exec): Promise<void> {
  // Claiming the flag first (atomic insert) means two cold starts racing each
  // other can't both seed and duplicate every row.
  const claimed = await exec(
    `INSERT INTO meta (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING RETURNING key`,
    [SEED_FLAG, new Date().toISOString()]
  );
  if (claimed.length > 0) {
    for (const e of defaultEvents) {
      await exec(
        `INSERT INTO events (title, event_date, location, description, link_href, link_label, image_url, image_alt, pillar)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [e.title, e.date, e.location ?? null, e.description, e.href, e.cta, e.image, e.imageAlt, e.pillar]
      );
    }
    for (const [i, s] of defaultStories.entries()) {
      await exec(
        `INSERT INTO stories (title, date_location, body, image_url, image_alt, link_href, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [s.title, s.dateLocation, s.body, s.image, s.imageAlt, s.href, (i + 1) * 10]
      );
    }
    for (const [i, m] of defaultBoard.entries()) {
      await exec(
        `INSERT INTO board_members (name, title, member_group, photo_url, bio, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [m.name, m.title, m.group, m.photo, m.bio, (i + 1) * 10]
      );
    }
    for (const [i, p] of defaultPartners.entries()) {
      await exec(`INSERT INTO partners (name, url, sort_order) VALUES ($1, $2, $3)`, [p.name, p.url, (i + 1) * 10]);
    }
    for (const [i, r] of defaultCareerRoles.entries()) {
      await exec(`INSERT INTO career_roles (title, description, sort_order) VALUES ($1, $2, $3)`, [
        r.title,
        r.description,
        (i + 1) * 10,
      ]);
    }
  }

  await seedSocialLinks(exec);
  await bootstrapOwner(exec);
}

// Social links moved from two fixed settings (social_facebook/social_linkedin)
// to their own editable list. Runs once (own flag, since existing databases
// already claimed seeded_v1), carrying over any edits made to the old settings.
async function seedSocialLinks(exec: Exec): Promise<void> {
  const claimed = await exec(
    `INSERT INTO meta (key, value) VALUES ('seeded_social_v1', $1) ON CONFLICT (key) DO NOTHING RETURNING key`,
    [new Date().toISOString()]
  );
  if (claimed.length === 0) return;

  const legacy = await exec(
    `SELECT key, value FROM settings WHERE key IN ('social_facebook', 'social_linkedin')`,
    []
  );
  const legacyValue = (key: string) => legacy.find((r) => r.key === key)?.value as string | undefined;
  const overrides: Record<string, string | undefined> = {
    Facebook: legacyValue("social_facebook"),
    LinkedIn: legacyValue("social_linkedin"),
  };

  for (const [i, link] of defaultSocialLinks.entries()) {
    const override = overrides[link.platform];
    const url = override === undefined ? link.url : override.trim();
    if (!url) continue; // was deliberately blanked out in the old settings
    await exec(`INSERT INTO social_links (platform, label, url, sort_order) VALUES ($1, $2, $3, $4)`, [
      link.platform,
      link.label,
      url,
      (i + 1) * 10,
    ]);
  }
}

const BCRYPT_HASH = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

/** Tolerates common paste mistakes: the "ADMIN_PASSWORD_HASH=" prefix, quotes, or .env-style \$ escapes. */
function normalizeHash(raw: string): string {
  return raw
    .trim()
    .replace(/^ADMIN_PASSWORD_HASH\s*=\s*/, "")
    .replace(/^["']|["']$/g, "")
    .replace(/\\\$/g, "$");
}

// Creates the first Owner from ADMIN_USERNAME + ADMIN_PASSWORD_HASH when no
// accounts exist. Until that Owner signs in for the first time, their password
// keeps following the env var, so a mistake in the initial setup can be fixed
// by correcting the variable and redeploying. After the first sign-in the env
// var is ignored and the password is managed in the admin (My account).
async function bootstrapOwner(exec: Exec): Promise<void> {
  const username = process.env.ADMIN_USERNAME?.trim();
  const rawHash = process.env.ADMIN_PASSWORD_HASH;
  if (!username || !rawHash) return;

  const passwordHash = normalizeHash(rawHash);
  if (!BCRYPT_HASH.test(passwordHash)) {
    console.error(
      "ADMIN_PASSWORD_HASH is not a bcrypt hash, so the first admin account was not set up. " +
        "Generate it with `npm run admin:hash` and paste only the value that starts with $2b$."
    );
    return;
  }
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase() || null;

  const users = await exec(`SELECT COUNT(*)::int AS n FROM admin_users`, []);
  if (Number(users[0]?.n ?? 0) === 0) {
    await exec(
      `INSERT INTO admin_users (username, email, password_hash, role, status)
       VALUES ($1, $2, $3, 'Owner', 'Active') ON CONFLICT (username) DO NOTHING`,
      [username, email, passwordHash]
    );
    return;
  }
  await exec(
    `UPDATE admin_users SET password_hash = $2, email = COALESCE(email, $3)
     WHERE lower(username) = lower($1) AND last_login_at IS NULL AND password_hash <> $2`,
    [username, passwordHash, email]
  );
}
