"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SUBMISSION_STATUSES, type ActionState } from "@/lib/admin/types";
import { logAudit } from "@/lib/server/audit";
import { assertUser, AuthError, hashPassword, ROLES, type Role, type SessionUser } from "@/lib/server/auth";
import { sql } from "@/lib/server/db";
import { recordMedia } from "@/lib/server/media";
import { deleteStoredFile, storeImage } from "@/lib/server/storage";

function authFailure(err: unknown): ActionState {
  if (err instanceof AuthError) return { status: "error", message: err.message };
  console.error(err);
  return { status: "error", message: "Something went wrong. Please try again." };
}

// ---------- Inbox ----------

export async function updateSubmission(id: number, _prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const user = await assertUser();
    const status = String(formData.get("status") ?? "");
    const notes = String(formData.get("admin_notes") ?? "").trim().slice(0, 5000);
    if (!(SUBMISSION_STATUSES as readonly string[]).includes(status)) {
      return { status: "error", message: "Choose a valid status." };
    }
    await sql`
      UPDATE submissions SET status = ${status}, admin_notes = ${notes || null}, updated_at = now() WHERE id = ${id}
    `;
    await logAudit(user, { action: "update", resource: "inbox", resourceId: id, details: `status: ${status}` });
    revalidatePath("/admin", "layout");
    return { status: "success", message: "Saved." };
  } catch (err) {
    return authFailure(err);
  }
}

export async function deleteSubmission(id: number): Promise<void> {
  const user = await assertUser();
  const rows = await sql<{ form_type: string }>`DELETE FROM submissions WHERE id = ${id} RETURNING form_type`;
  if (rows.length > 0) {
    await logAudit(user, { action: "delete", resource: "inbox", resourceId: id, details: rows[0].form_type });
  }
  revalidatePath("/admin", "layout");
  redirect("/admin/inbox?deleted=1");
}

// ---------- Media library ----------

export async function uploadMediaAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  let user: SessionUser;
  try {
    user = await assertUser();
  } catch (err) {
    return authFailure(err);
  }
  const files = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) return { status: "error", message: "Choose at least one image." };
  let uploaded = 0;
  const problems: string[] = [];
  for (const file of files) {
    try {
      const stored = await storeImage(file, "library");
      await recordMedia(user, stored);
      uploaded += 1;
    } catch (err) {
      problems.push(`${file.name}: ${(err as Error).message}`);
    }
  }
  if (uploaded > 0) {
    await logAudit(user, { action: "upload", resource: "media", details: `${uploaded} file(s)` });
    revalidatePath("/admin/media");
  }
  if (problems.length > 0) {
    return {
      status: uploaded > 0 ? "success" : "error",
      message: `${uploaded} uploaded. ${problems.join(" ")}`,
    };
  }
  return { status: "success", message: `${uploaded} image${uploaded === 1 ? "" : "s"} uploaded.` };
}

export async function deleteMediaAction(id: number): Promise<void> {
  const user = await assertUser();
  // Refuse while any page still shows this image, so a delete can't leave a
  // broken image on the live site.
  const rows = await sql<{ url: string; filename: string | null }>`
    DELETE FROM media m WHERE m.id = ${id}
      AND NOT EXISTS (SELECT 1 FROM events e WHERE e.image_url = m.url)
      AND NOT EXISTS (SELECT 1 FROM stories s WHERE s.image_url = m.url)
      AND NOT EXISTS (SELECT 1 FROM board_members b WHERE b.photo_url = m.url)
    RETURNING url, filename
  `;
  if (rows.length > 0) {
    await deleteStoredFile(rows[0].url);
    await logAudit(user, { action: "delete", resource: "media", resourceId: id, details: rows[0].filename });
  }
  revalidatePath("/admin/media");
}

// ---------- Team (Owners only) ----------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function isLastActiveOwner(id: number): Promise<boolean> {
  const [target] = await sql<{ role: string; status: string }>`SELECT role, status FROM admin_users WHERE id = ${id}`;
  if (!target || target.role !== "Owner" || target.status !== "Active") return false;
  const [count] = await sql<{ n: number }>`
    SELECT COUNT(*)::int AS n FROM admin_users WHERE role = 'Owner' AND status = 'Active'
  `;
  return Number(count.n) <= 1;
}

function isDuplicate(err: unknown) {
  const msg = String((err as Error)?.message ?? "").toLowerCase();
  return msg.includes("duplicate") || msg.includes("unique");
}

export async function createTeamMember(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const owner = await assertUser("Owner");
    const username = String(formData.get("username") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const role = String(formData.get("role") ?? "Admin") as Role;
    const fieldErrors: Record<string, string> = {};
    if (!/^[a-zA-Z0-9._-]{3,40}$/.test(username)) fieldErrors.username = "3–40 letters, numbers, dots, dashes or underscores.";
    if (!EMAIL_RE.test(email)) fieldErrors.email = "A valid email is needed for password resets.";
    if (password.length < 10) fieldErrors.password = "At least 10 characters.";
    if (Object.keys(fieldErrors).length > 0) return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };

    const [created] = await sql<{ id: number }>`
      INSERT INTO admin_users (username, email, password_hash, role, status)
      VALUES (${username}, ${email}, ${await hashPassword(password)}, ${ROLES.includes(role) ? role : "Admin"}, 'Active')
      RETURNING id
    `;
    await logAudit(owner, { action: "create", resource: "users", resourceId: created.id, details: `${username} (${role})` });
    revalidatePath("/admin/team");
    return { status: "success", message: `${username} can now sign in. Share their temporary password with them securely.` };
  } catch (err) {
    if (isDuplicate(err)) return { status: "error", message: "That username or email is already in use." };
    return authFailure(err);
  }
}

export async function updateTeamMember(id: number, _prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const owner = await assertUser("Owner");
    const role = String(formData.get("role") ?? "") as Role;
    const status = String(formData.get("status") ?? "");
    const password = String(formData.get("password") ?? "");
    if (!ROLES.includes(role) || !["Active", "Inactive"].includes(status)) {
      return { status: "error", message: "Choose a valid role and status." };
    }
    if ((role !== "Owner" || status !== "Active") && (await isLastActiveOwner(id))) {
      return { status: "error", message: "There must always be at least one active Owner." };
    }
    if (password && password.length < 10) return { status: "error", message: "New password must be at least 10 characters." };

    if (password) {
      await sql`
        UPDATE admin_users SET role = ${role}, status = ${status}, password_hash = ${await hashPassword(password)} WHERE id = ${id}
      `;
    } else {
      await sql`UPDATE admin_users SET role = ${role}, status = ${status} WHERE id = ${id}`;
    }
    await logAudit(owner, {
      action: "update",
      resource: "users",
      resourceId: id,
      details: [`role: ${role}`, `status: ${status}`, password ? "password reset" : null].filter(Boolean).join(", "),
    });
    revalidatePath("/admin/team");
    return { status: "success", message: "Saved." };
  } catch (err) {
    return authFailure(err);
  }
}

export async function deleteTeamMember(id: number): Promise<void> {
  const owner = await assertUser("Owner");
  if (id === owner.id) return;
  if (await isLastActiveOwner(id)) return;
  const rows = await sql<{ username: string }>`DELETE FROM admin_users WHERE id = ${id} RETURNING username`;
  if (rows.length > 0) {
    await logAudit(owner, { action: "delete", resource: "users", resourceId: id, details: rows[0].username });
  }
  revalidatePath("/admin/team");
}
