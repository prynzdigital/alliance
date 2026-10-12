import { AdminShell } from "@/components/admin/AdminShell";
import { SETTING_GROUPS } from "@/lib/cms/settings";
import { requireUser } from "@/lib/server/auth";
import { sql } from "@/lib/server/db";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  let newSubmissions = 0;
  try {
    const [row] = await sql<{ n: number }>`SELECT COUNT(*)::int AS n FROM submissions WHERE status = 'New'`;
    newSubmissions = Number(row?.n ?? 0);
  } catch (err) {
    console.error("Failed to count new submissions:", err);
  }

  return (
    <AdminShell
      user={{ username: user.username, role: user.role }}
      newSubmissions={newSubmissions}
      settingGroups={SETTING_GROUPS.map((g) => ({ slug: g.slug, title: g.title }))}
    >
      {children}
    </AdminShell>
  );
}
