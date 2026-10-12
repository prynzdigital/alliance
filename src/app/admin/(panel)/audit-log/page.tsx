import type { Metadata } from "next";
import { AdminPageHeader, Badge, EmptyState, formatDateTime } from "@/components/admin/ui";
import { requireOwner } from "@/lib/server/auth";
import { sql } from "@/lib/server/db";

export const metadata: Metadata = { title: "Activity Log" };

type AuditRow = {
  id: number;
  username: string | null;
  role: string | null;
  action: string;
  resource: string;
  resource_id: string | null;
  details: string | null;
  created_at: string;
};

const actionTone = (action: string) =>
  action === "delete" ? "red" : action === "create" || action === "upload" ? "green" : action === "login" || action === "logout" ? "gray" : "blue";

export default async function AuditLogPage() {
  await requireOwner();
  const rows = await sql<AuditRow>`
    SELECT id, username, role, action, resource, resource_id, details, created_at
    FROM audit_log ORDER BY created_at DESC LIMIT 300
  `;

  return (
    <>
      <AdminPageHeader title="Activity Log" description="Who changed what, and when. Shows the 300 most recent actions." />
      {rows.length === 0 ? (
        <EmptyState title="No activity yet" />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-black/5 bg-[#f8f8fd] text-xs uppercase tracking-widest text-text-muted">
              <tr>
                <th scope="col" className="px-5 py-3 font-bold">When</th>
                <th scope="col" className="px-5 py-3 font-bold">Who</th>
                <th scope="col" className="px-5 py-3 font-bold">Action</th>
                <th scope="col" className="px-5 py-3 font-bold">What</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="whitespace-nowrap px-5 py-3 text-text-muted">{formatDateTime(r.created_at)}</td>
                  <td className="px-5 py-3 font-semibold text-text">
                    {r.username ?? "—"}
                    {r.role && <span className="ml-1 text-xs font-normal text-text-muted">({r.role})</span>}
                  </td>
                  <td className="px-5 py-3">
                    <Badge tone={actionTone(r.action)}>{r.action}</Badge>
                  </td>
                  <td className="px-5 py-3 text-text">
                    <span className="capitalize">{r.resource.replace(/-/g, " ")}</span>
                    {r.resource_id && <span className="text-text-muted"> #{r.resource_id}</span>}
                    {r.details && <span className="block text-xs text-text-muted">{r.details}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
