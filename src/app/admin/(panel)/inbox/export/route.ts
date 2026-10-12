import { SUBMISSION_TYPES } from "@/lib/admin/types";
import { getCurrentUser } from "@/lib/server/auth";
import { query } from "@/lib/server/db";

export const dynamic = "force-dynamic";

function csvCell(value: unknown): string {
  let text = value == null ? "" : value instanceof Date ? value.toISOString() : String(value);
  // Neutralize spreadsheet formula injection from visitor-supplied text.
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

// CSV download of inbox submissions (e.g. newsletter signups to import into a
// mailing tool). Admin-only; checked here since route handlers don't run the
// panel layout's sign-in check.
export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return new Response("Not signed in", { status: 401 });

  const type = new URL(request.url).searchParams.get("type") ?? "";
  const valid = SUBMISSION_TYPES.some((t) => t.value === type);
  const rows = await query<Record<string, unknown>>(
    `SELECT id, form_type, created_at, status, name, email, phone, topic, message, admin_notes
     FROM submissions ${valid ? "WHERE form_type = $1" : ""} ORDER BY created_at DESC`,
    valid ? [type] : []
  );

  const header = ["id", "form_type", "created_at", "status", "name", "email", "phone", "topic", "message", "admin_notes"];
  const csv = [header.join(","), ...rows.map((r) => header.map((h) => csvCell(r[h])).join(","))].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="soc-${valid ? type : "inbox"}-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
