"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { CMS_TAG } from "@/lib/cms/content";
import { getCollection, type CollectionField } from "@/lib/cms/collections";
import { SETTING_GROUPS } from "@/lib/cms/settings";
import type { ActionState } from "@/lib/admin/types";
import { logAudit } from "@/lib/server/audit";
import { assertUser, AuthError, type SessionUser } from "@/lib/server/auth";
import { query, sql } from "@/lib/server/db";
import { recordMedia } from "@/lib/server/media";
import { storeImage } from "@/lib/server/storage";

/** Push an admin edit to the live site: drop cached CMS reads and re-render pages. */
async function refreshPublicSite() {
  revalidateTag(CMS_TAG, { expire: 0 });
  revalidatePath("/", "layout");
}

const SAFE_LINK = /^(\/(?!\/)|https?:\/\/|mailto:|tel:)/i;
const SAFE_IMAGE = /^(\/(?!\/)|https:\/\/)/i;

function echoValues(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && !key.startsWith("$")) out[key] = value;
  }
  return out;
}

async function readField(
  field: CollectionField,
  formData: FormData,
  user: SessionUser,
  folder: string
): Promise<{ value: unknown; error?: string }> {
  const raw = formData.get(field.name);
  const text = typeof raw === "string" ? raw.trim() : "";

  switch (field.type) {
    case "checkbox":
      return { value: formData.get(field.name) === "on" };
    case "number": {
      const n = Number.parseInt(text || String(field.default ?? 0), 10);
      return Number.isFinite(n) ? { value: n } : { value: 0, error: "Enter a whole number." };
    }
    case "date":
      if (!text) return { value: null, error: field.required ? "Choose a date." : undefined };
      return /^\d{4}-\d{2}-\d{2}$/.test(text) ? { value: text } : { value: null, error: "Use the date picker." };
    case "select": {
      const allowed = field.options?.map((o) => o.value) ?? [];
      return { value: allowed.includes(text) ? text : (field.default ?? allowed[0] ?? null) };
    }
    case "image": {
      const file = formData.get(`${field.name}__file`);
      if (file instanceof File && file.size > 0) {
        try {
          const stored = await storeImage(file, folder);
          await recordMedia(user, stored);
          return { value: stored.url };
        } catch (err) {
          return { value: null, error: (err as Error).message };
        }
      }
      if (formData.get(`${field.name}__remove`) === "on") return { value: null };
      if (!text) return { value: null, error: field.required ? "Upload an image." : undefined };
      return SAFE_IMAGE.test(text)
        ? { value: text.slice(0, 2000) }
        : { value: null, error: "Image must be an uploaded file, a /path, or an https:// link." };
    }
    case "url":
      if (!text) return { value: null, error: field.required ? "This field is required." : undefined };
      return /^https?:\/\//i.test(text)
        ? { value: text.slice(0, 2000) }
        : { value: null, error: "Enter a full link starting with https://" };
    default: {
      if (!text) {
        if (field.required) return { value: null, error: "This field is required." };
        return { value: field.default !== undefined ? String(field.default) || null : null };
      }
      if (field.name.endsWith("href") && !SAFE_LINK.test(text)) {
        return { value: null, error: "Links must start with /, https://, mailto:, or tel:" };
      }
      return { value: text.slice(0, field.type === "textarea" ? 10000 : 500) };
    }
  }
}

export async function saveCollectionItem(
  slug: string,
  id: number | null,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const def = getCollection(slug);
  if (!def) return { status: "error", message: "Unknown content type." };

  let user: SessionUser;
  try {
    user = await assertUser();
  } catch (err) {
    return { status: "error", message: (err as AuthError).message };
  }

  const values: Record<string, unknown> = {};
  const fieldErrors: Record<string, string> = {};
  for (const field of def.fields) {
    const { value, error } = await readField(field, formData, user, def.slug);
    if (error) fieldErrors[field.name] = error;
    values[field.name] = value;
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values: echoValues(formData) };
  }

  // Column names come only from the static collection config, never from input.
  const columns = def.fields.map((f) => f.name);
  const params = columns.map((c) => values[c]);
  let savedId = id;
  try {
    if (id) {
      const assignments = columns.map((c, i) => `${c} = $${i + 1}`).join(", ");
      const rows = await query<{ id: number }>(
        `UPDATE ${def.table} SET ${assignments}, updated_at = now() WHERE id = $${columns.length + 1} RETURNING id`,
        [...params, id]
      );
      if (rows.length === 0) return { status: "error", message: "That item no longer exists." };
    } else {
      const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");
      const rows = await query<{ id: number }>(
        `INSERT INTO ${def.table} (${columns.join(", ")}) VALUES (${placeholders}) RETURNING id`,
        params
      );
      savedId = rows[0].id;
    }
  } catch (err) {
    console.error(`Failed to save ${slug}:`, err);
    return { status: "error", message: "Couldn't save. Please try again." };
  }

  await logAudit(user, {
    action: id ? "update" : "create",
    resource: slug,
    resourceId: savedId,
    details: String(values[def.titleColumn] ?? ""),
  });
  await refreshPublicSite();
  redirect(`/admin/${slug}?saved=${savedId}`);
}

export async function deleteCollectionItem(slug: string, id: number): Promise<void> {
  const def = getCollection(slug);
  if (!def) return;
  const user = await assertUser();
  const rows = await query<Record<string, unknown>>(
    `DELETE FROM ${def.table} WHERE id = $1 RETURNING ${def.titleColumn} AS label`,
    [id]
  );
  if (rows.length > 0) {
    await logAudit(user, { action: "delete", resource: slug, resourceId: id, details: String(rows[0].label ?? "") });
    await refreshPublicSite();
  }
  redirect(`/admin/${slug}?deleted=1`);
}

export async function togglePublished(slug: string, id: number, published: boolean): Promise<void> {
  const def = getCollection(slug);
  if (!def || !def.fields.some((f) => f.name === "published")) return;
  const user = await assertUser();
  await query(`UPDATE ${def.table} SET published = $1, updated_at = now() WHERE id = $2`, [published, id]);
  await logAudit(user, { action: published ? "publish" : "unpublish", resource: slug, resourceId: id });
  await refreshPublicSite();
}

export async function saveSettingsGroup(groupSlug: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const group = SETTING_GROUPS.find((g) => g.slug === groupSlug);
  if (!group) return { status: "error", message: "Unknown settings group." };

  let user: SessionUser;
  try {
    user = await assertUser();
  } catch (err) {
    return { status: "error", message: (err as AuthError).message };
  }

  const fieldErrors: Record<string, string> = {};
  const updates: [string, string][] = [];
  for (const field of group.fields) {
    const value = String(formData.get(field.key) ?? "").trim().slice(0, 5000);
    if (field.type === "url" && value && !/^https:\/\//i.test(value)) fieldErrors[field.key] = "Must start with https://";
    if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) fieldErrors[field.key] = "Enter a valid email.";
    if (field.key === "donorbox_embed_url" && value && !/^https:\/\/donorbox\.org\/embed\//.test(value)) {
      fieldErrors[field.key] = "Must be a https://donorbox.org/embed/… link.";
    }
    updates.push([field.key, value]);
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values: echoValues(formData) };
  }

  try {
    for (const [key, value] of updates) {
      await sql`
        INSERT INTO settings (key, value, updated_at) VALUES (${key}, ${value}, now())
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
      `;
    }
  } catch (err) {
    console.error("Failed to save settings:", err);
    return { status: "error", message: "Couldn't save. Please try again." };
  }
  await logAudit(user, { action: "update", resource: "site-content", details: group.title });
  await refreshPublicSite();
  return { status: "success", message: "Saved. The live site has been updated." };
}
