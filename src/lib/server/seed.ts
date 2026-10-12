import "server-only";
import { defaultEvents } from "@/lib/events";
import { defaultBoard, defaultCareerRoles, defaultPartners, defaultStories } from "@/lib/cms/defaults";

type Exec = (text: string, params: unknown[]) => Promise<Record<string, unknown>[]>;

const SEED_FLAG = "seeded_v1";

// Copies the site's built-in content into the database exactly once, so the
// admin starts with everything that's live today instead of empty lists. The
// flag in `meta` means emptying a list in the admin later is respected.
//
// The first Owner account is created from ADMIN_USERNAME + ADMIN_PASSWORD_HASH
// (same approach as the e-cleanpro admin) whenever no accounts exist yet.
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

  const username = process.env.ADMIN_USERNAME?.trim();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (username && passwordHash) {
    const users = await exec(`SELECT COUNT(*)::int AS n FROM admin_users`, []);
    if (Number(users[0]?.n ?? 0) === 0) {
      await exec(
        `INSERT INTO admin_users (username, email, password_hash, role, status)
         VALUES ($1, $2, $3, 'Owner', 'Active') ON CONFLICT (username) DO NOTHING`,
        [username, process.env.ADMIN_EMAIL?.trim().toLowerCase() || null, passwordHash]
      );
    }
  }
}
