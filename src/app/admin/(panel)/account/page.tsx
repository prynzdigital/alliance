import type { Metadata } from "next";
import { EmailForm, PasswordForm } from "@/components/admin/AccountForms";
import { AdminPageHeader, Badge, Panel } from "@/components/admin/ui";
import { requireUser } from "@/lib/server/auth";

export const metadata: Metadata = { title: "My Account" };

export default async function AccountPage() {
  const user = await requireUser();
  return (
    <>
      <AdminPageHeader
        title="My account"
        description={
          <>
            Signed in as <strong className="text-text">{user.username}</strong> <Badge tone={user.role === "Owner" ? "gold" : "blue"}>{user.role}</Badge>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Email address">
          <EmailForm email={user.email ?? ""} />
        </Panel>
        <Panel title="Change password">
          <PasswordForm />
        </Panel>
      </div>
    </>
  );
}
