import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AdminPageHeader, Badge, Panel, StatCard, btn, formatDateTime, timeAgo } from "@/components/admin/ui";
import { PlusIcon } from "@/components/admin/icons";
import { rowToEvent } from "@/lib/cms/content";
import { formatEventDate } from "@/lib/events";
import { SUBMISSION_TYPES } from "@/lib/admin/types";
import { requireUser } from "@/lib/server/auth";
import { databaseMode, sql } from "@/lib/server/db";
import { isEmailConfigured } from "@/lib/server/email";
import { storageMode } from "@/lib/server/storage";

export const metadata: Metadata = { title: "Dashboard" };

type SubmissionRow = { id: number; form_type: string; name: string | null; email: string | null; status: string; created_at: string };
type AuditRow = { id: number; username: string | null; action: string; resource: string; details: string | null; created_at: string };

const typeLabel = (t: string) => SUBMISSION_TYPES.find((s) => s.value === t)?.label ?? t;

function greeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", hour12: false }).format(new Date())
  );
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}

function describeAudit(row: AuditRow) {
  const verb: Record<string, string> = {
    create: "added",
    update: "updated",
    delete: "deleted",
    publish: "published",
    unpublish: "unpublished",
    upload: "uploaded",
    login: "signed in",
    logout: "signed out",
    reset: "reset",
  };
  const what = row.resource === "session" ? "" : ` ${row.resource.replace(/-/g, " ")}`;
  return `${verb[row.action] ?? row.action}${what}${row.details ? ` — ${row.details}` : ""}`;
}

export default async function DashboardPage() {
  const user = await requireUser();

  const [
    [newCount],
    [monthCount],
    byType,
    [upcomingCount],
    [eventCount],
    [boardCount],
    recentSubmissions,
    upcomingRows,
    activity,
  ] = await Promise.all([
    sql<{ n: number }>`SELECT COUNT(*)::int AS n FROM submissions WHERE status = 'New'`,
    sql<{ n: number }>`SELECT COUNT(*)::int AS n FROM submissions WHERE created_at >= date_trunc('month', now())`,
    sql<{ form_type: string; n: number }>`SELECT form_type, COUNT(*)::int AS n FROM submissions GROUP BY form_type`,
    sql<{ n: number }>`
      SELECT COUNT(*)::int AS n FROM events
      WHERE published = true AND event_date >= (now() AT TIME ZONE 'America/Chicago')::date
    `,
    sql<{ n: number }>`SELECT COUNT(*)::int AS n FROM events WHERE published = true`,
    sql<{ n: number }>`SELECT COUNT(*)::int AS n FROM board_members WHERE published = true`,
    sql<SubmissionRow>`
      SELECT id, form_type, name, email, status, created_at FROM submissions ORDER BY created_at DESC LIMIT 6
    `,
    sql<Parameters<typeof rowToEvent>[0]>`
      SELECT id, title, event_date::text AS date, location, description, link_href, link_label, image_url, image_alt, pillar
      FROM events WHERE published = true AND event_date >= (now() AT TIME ZONE 'America/Chicago')::date
      ORDER BY event_date ASC LIMIT 3
    `,
    sql<AuditRow>`SELECT id, username, action, resource, details, created_at FROM audit_log ORDER BY created_at DESC LIMIT 7`,
  ]);
  const upcoming = upcomingRows.map(rowToEvent);
  const typeCounts = Object.fromEntries(byType.map((r) => [r.form_type, Number(r.n)]));

  const db = databaseMode();
  const storage = storageMode();
  const email = isEmailConfigured();
  const setupItems = [
    {
      ok: db === "neon",
      label: "Database",
      detail: db === "neon" ? "Connected to Neon Postgres." : "Using a local development database. Connect Neon before launch.",
    },
    {
      ok: storage === "blob",
      label: "Image storage",
      detail: storage === "blob" ? "Uploads go to Vercel Blob." : "Uploads are saved locally. Connect a Vercel Blob store before launch.",
    },
    {
      ok: email,
      label: "Email notifications",
      detail: email
        ? "New form submissions and password resets are emailed."
        : "Not set up. Submissions still arrive in the Inbox; add a Resend key to also get emails.",
    },
  ];

  return (
    <>
      <AdminPageHeader
        eyebrow={new Date().toLocaleDateString("en-US", { timeZone: "America/Chicago", weekday: "long", month: "long", day: "numeric" })}
        title={`${greeting()}, ${user.username}`}
        description="Here's what's happening on the SOC Alliance website."
        actions={
          <>
            <Link href="/admin/events/new" className={btn.primary}>
              <PlusIcon className="h-4 w-4" /> New event or post
            </Link>
            <a href="/" target="_blank" rel="noopener noreferrer" className={btn.ghost}>
              View website
            </a>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="New messages" value={Number(newCount.n)} hint="Waiting in your inbox" href="/admin/inbox?status=New" accent="gold" />
        <StatCard label="This month" value={Number(monthCount.n)} hint="Form submissions received" href="/admin/inbox" />
        <StatCard label="Upcoming events" value={Number(upcomingCount.n)} hint={`${Number(eventCount.n)} events & posts published`} href="/admin/events" accent="teal" />
        <StatCard label="Board members" value={Number(boardCount.n)} hint="Shown on Our Story" href="/admin/board" accent="navy" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Latest submissions"
          action={
            <Link href="/admin/inbox" className="text-sm font-bold text-primary hover:underline">
              Open inbox →
            </Link>
          }
          padded={false}
        >
          {recentSubmissions.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-text-muted">
              No submissions yet. Messages from the Contact, Volunteer, Mentoring, and Newsletter forms will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-black/5">
              {recentSubmissions.map((s) => (
                <li key={s.id}>
                  <Link href={`/admin/inbox/${s.id}`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#f8f8fd]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {(s.name || s.email || "?").slice(0, 1).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-text">{s.name || s.email || "Anonymous"}</span>
                      <span className="block text-xs text-text-muted">
                        {typeLabel(s.form_type)} · {timeAgo(s.created_at)}
                      </span>
                    </span>
                    {s.status === "New" ? <Badge tone="gold">New</Badge> : <Badge>{s.status}</Badge>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2 border-t border-black/5 px-5 py-3">
            {SUBMISSION_TYPES.map((t) => (
              <Link key={t.value} href={`/admin/inbox?type=${t.value}`} className={btn.small}>
                {t.label} <span className="text-text-muted">{typeCounts[t.value] ?? 0}</span>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel
          title="Coming up"
          action={
            <Link href="/admin/events" className="text-sm font-bold text-primary hover:underline">
              All events →
            </Link>
          }
        >
          {upcoming.length === 0 ? (
            <p className="py-6 text-center text-sm text-text-muted">
              Nothing upcoming. The homepage shows a friendly &ldquo;no upcoming events&rdquo; message until you add one.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {upcoming.map((e) => (
                <li key={e.id}>
                  <Link href={`/admin/events/${e.id}`} className="flex items-center gap-4 rounded-xl p-1 hover:bg-[#f8f8fd]">
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface">
                      <Image src={e.image} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-text">{e.title}</span>
                      <span className="block text-xs text-text-muted">
                        {formatEventDate(e.date)}
                        {e.location ? ` · ${e.location}` : ""}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Recent activity">
          {activity.length === 0 ? (
            <p className="text-sm text-text-muted">No activity yet.</p>
          ) : (
            <ol className="relative flex flex-col gap-4 border-l border-black/10 pl-5">
              {activity.map((a) => (
                <li key={a.id} className="relative">
                  <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-secondary ring-4 ring-white" aria-hidden />
                  <p className="text-sm text-text">
                    <span className="font-semibold">{a.username ?? "Someone"}</span> {describeAudit(a)}
                  </p>
                  <p className="text-xs text-text-muted" title={formatDateTime(a.created_at)}>
                    {timeAgo(a.created_at)}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </Panel>

        <Panel title="Launch checklist">
          <ul className="flex flex-col gap-3">
            {setupItems.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    item.ok ? "bg-emerald-100 text-emerald-700" : "bg-secondary/25 text-[#7a5a12]"
                  }`}
                  aria-hidden
                >
                  {item.ok ? "✓" : "!"}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text">
                    {item.label} <span className="sr-only">{item.ok ? "(ready)" : "(needs setup)"}</span>
                  </span>
                  <span className="block text-xs text-text-muted">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-2 gap-2 border-t border-black/5 pt-4">
            <Link href="/admin/site-content/organization" className={btn.small}>
              Contact details
            </Link>
            <Link href="/admin/board" className={btn.small}>
              Board roster
            </Link>
            <Link href="/admin/site-content/homepage" className={btn.small}>
              Homepage text
            </Link>
            <Link href="/admin/media" className={btn.small}>
              Media library
            </Link>
          </div>
        </Panel>
      </div>
    </>
  );
}
