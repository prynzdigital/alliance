import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { saveSettingsGroup } from "@/app/admin/actions/content";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { AdminPageHeader } from "@/components/admin/ui";
import { DEFAULT_SETTINGS, SETTING_GROUPS } from "@/lib/cms/settings";
import { requireUser } from "@/lib/server/auth";
import { sql } from "@/lib/server/db";

type Params = { group: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { group: slug } = await params;
  const group = SETTING_GROUPS.find((g) => g.slug === slug);
  return { title: group?.title ?? "Not found" };
}

export default async function SiteContentPage({ params }: { params: Promise<Params> }) {
  await requireUser();
  const { group: slug } = await params;
  const group = SETTING_GROUPS.find((g) => g.slug === slug);
  if (!group) notFound();

  const keys = group.fields.map((f) => f.key);
  const rows = await sql<{ key: string; value: string }>`SELECT key, value FROM settings WHERE key = ANY(${keys})`;
  const values: Record<string, string> = Object.fromEntries(keys.map((k) => [k, DEFAULT_SETTINGS[k]]));
  for (const row of rows) values[row.key] = row.value;

  return (
    <>
      <AdminPageHeader eyebrow="Site Settings" title={group.title} description={group.description} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_240px]">
        <SettingsForm groupSlug={group.slug} values={values} action={saveSettingsGroup.bind(null, group.slug)} />
        <nav aria-label="Settings sections" className="flex flex-col gap-1 self-start rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
          {SETTING_GROUPS.map((g) => (
            <Link
              key={g.slug}
              href={`/admin/site-content/${g.slug}`}
              aria-current={g.slug === group.slug ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                g.slug === group.slug ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-[#f4f5fb] hover:text-text"
              }`}
            >
              {g.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
