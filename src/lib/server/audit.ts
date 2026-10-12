import "server-only";
import { sql } from "./db";
import type { SessionUser } from "./auth";

// Records an admin action for accountability. Must be awaited before the
// action returns: on serverless, an un-awaited query issued after the response
// can be silently dropped when the function freezes (lesson from e-cleanpro).
export async function logAudit(
  user: SessionUser | null,
  entry: { action: string; resource: string; resourceId?: string | number | null; details?: string | null }
): Promise<void> {
  try {
    await sql`
      INSERT INTO audit_log (user_id, username, role, action, resource, resource_id, details)
      VALUES (
        ${user?.id ?? null}, ${user?.username ?? null}, ${user?.role ?? null},
        ${entry.action}, ${entry.resource},
        ${entry.resourceId != null ? String(entry.resourceId) : null}, ${entry.details ?? null}
      )
    `;
  } catch (err) {
    console.error("Failed to write audit log:", err);
  }
}
