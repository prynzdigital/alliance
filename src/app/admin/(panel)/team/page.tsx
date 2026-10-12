import type { Metadata } from "next";
import { deleteTeamMember, updateTeamMember } from "@/app/admin/actions/manage";
import { ConfirmForm } from "@/components/admin/ConfirmForm";
import { AddTeamMemberForm, EditTeamMemberForm } from "@/components/admin/TeamForms";
import { AdminPageHeader, Badge, Panel, formatDateTime } from "@/components/admin/ui";
import { requireOwner } from "@/lib/server/auth";
import { sql } from "@/lib/server/db";

export const metadata: Metadata = { title: "Team & Access" };

type UserRow = {
  id: number;
  username: string;
  email: string | null;
  role: string;
  status: string;
  last_login_at: string | null;
  created_at: string;
};

export default async function TeamPage() {
  const me = await requireOwner();
  const users = await sql<UserRow>`
    SELECT id, username, email, role, status, last_login_at, created_at FROM admin_users ORDER BY created_at ASC
  `;

  return (
    <>
      <AdminPageHeader
        title="Team & Access"
        description="Who can sign in to this dashboard. Admins can edit all website content and the inbox; Owners can also manage the team and see the activity log."
      />

      <Panel title="Team members" padded={false}>
        <ul className="divide-y divide-black/5">
          {users.map((u) => (
            <li key={u.id} className="flex flex-col gap-4 px-5 py-4 xl:flex-row xl:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-text text-sm font-extrabold text-secondary">
                  {u.username.slice(0, 1).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-text">
                    {u.username}
                    {u.id === me.id && <span className="text-xs font-medium text-text-muted">(you)</span>}
                    <Badge tone={u.role === "Owner" ? "gold" : "blue"}>{u.role}</Badge>
                    {u.status !== "Active" && <Badge tone="red">Inactive</Badge>}
                  </p>
                  <p className="truncate text-xs text-text-muted">
                    {u.email ?? "No email on file"} · Last sign-in {u.last_login_at ? formatDateTime(u.last_login_at) : "never"}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-end gap-3">
                <EditTeamMemberForm
                  role={u.role}
                  status={u.status}
                  isSelf={u.id === me.id}
                  action={updateTeamMember.bind(null, u.id)}
                />
                {u.id !== me.id && (
                  <ConfirmForm
                    action={deleteTeamMember.bind(null, u.id)}
                    confirm={`Remove ${u.username}'s access permanently?`}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </ConfirmForm>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Add a team member" className="mt-6">
        <AddTeamMemberForm />
      </Panel>
    </>
  );
}
