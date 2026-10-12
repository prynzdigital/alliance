import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { SUBMISSION_COLORS, SubmissionsChart } from "@/components/admin/SubmissionsChart";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChartIcon,
  ExternalIcon,
  HandshakeIcon,
  ImageIcon,
  InboxIcon,
  LayersIcon,
  MailIcon,
  PencilIcon,
  PlusIcon,
  ShareIcon,
  StoryIcon,
  UploadIcon,
  UsersIcon,
} from "@/components/admin/icons";
import { Badge, formatDateTime, timeAgo } from "@/components/admin/ui";
import { SUBMISSION_TYPES } from "@/lib/admin/types";
import { COLLECTIONS } from "@/lib/cms/collections";
import { rowToEvent } from "@/lib/cms/content";
import { formatEventDate } from "@/lib/events";
import { requireUser } from "@/lib/server/auth";
import { databaseMode, query, sql } from "@/lib/server/db";
import { isEmailConfigured } from "@/lib/server/email";
import { blobEnvNames, storageMode } from "@/lib/server/storage";

export const metadata: Metadata = { title: "Dashboard" };

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type SubmissionRow = { id: number; form_type: string; name: string | null; email: string | null; status: string; created_at: string };
type AuditRow = { id: number; username: string | null; action: string; resource: string; details: string | null; created_at: string };

const CHART_DAYS = 30;
const typeLabel = (t: string) => SUBMISSION_TYPES.find((s) => s.value === t)?.label ?? t;

const COLLECTION_ICONS: Record<string, Icon> = {
  events: CalendarIcon,
  stories: StoryIcon,
  board: UsersIcon,
  partners: HandshakeIcon,
  careers: BriefcaseIcon,
  social: ShareIcon,
};

/** YYYY-MM-DD for "today" in Chicago, plus the N-1 days before it. */
function chicagoDays(count: number): string[] {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());
  const base = Date.parse(`${today}T00:00:00Z`);
  return Array.from({ length: count }, (_, i) => new Date(base - (count - 1 - i) * 86_400_000).toISOString().slice(0, 10));
}

function daysUntil(iso: string, today: string): number {
  return Math.round((Date.parse(`${iso}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000);
}

function greeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", hour12: false }).format(new Date())
  );
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}

const AUDIT_STYLE: Record<string, { verb: string; color: string }> = {
  create: { verb: "added", color: "#0d6e78" },
  update: { verb: "updated", color: "#5657c1" },
  delete: { verb: "deleted", color: "#c2410c" },
  publish: { verb: "published", color: "#0d6e78" },
  unpublish: { verb: "hid", color: "#5a6470" },
  upload: { verb: "uploaded", color: "#d1a542" },
  login: { verb: "signed in", color: "#9aa3ad" },
  logout: { verb: "signed out", color: "#9aa3ad" },
};

function describeAudit(row: AuditRow) {
  const style = AUDIT_STYLE[row.action] ?? { verb: row.action, color: "#5657c1" };
  const what = row.resource === "session" ? "" : ` ${row.resource.replace(/-/g, " ")}`;
  return { ...style, text: `${style.verb}${what}${row.details ? ` — ${row.details}` : ""}` };
}

function Card({ title, action, children, className = "" }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-3xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(8,28,46,0.04),0_8px_24px_-12px_rgba(8,28,46,0.12)] ${className}`}>
      {title && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <h2 className="text-lg font-extrabold text-text">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

function CardLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-1 text-sm font-bold text-primary">
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

function Stat({
  label,
  value,
  hint,
  href,
  icon: IconCmp,
  tone,
  trend,
}: {
  label: string;
  value: number;
  hint: ReactNode;
  href: string;
  icon: Icon;
  tone: "gold" | "primary" | "teal" | "navy";
  trend?: number | null;
}) {
  const tones = {
    gold: { chip: "bg-secondary/20 text-[#8a6416]", glow: "from-secondary/25" },
    primary: { chip: "bg-primary/12 text-primary", glow: "from-primary/20" },
    teal: { chip: "bg-accent/12 text-accent", glow: "from-accent/20" },
    navy: { chip: "bg-text/8 text-text", glow: "from-text/12" },
  }[tone];
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(8,28,46,0.04),0_8px_24px_-12px_rgba(8,28,46,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(8,28,46,0.25)]"
    >
      <span aria-hidden className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${tones.glow} to-transparent blur-2xl`} />
      <div className="relative flex items-start justify-between gap-3">
        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tones.chip}`}>
          <IconCmp className="h-5 w-5" />
        </span>
        {trend != null && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
              trend >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            }`}
            title="Compared with the same point last month"
          >
            {trend >= 0 ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="relative mt-4 text-4xl font-extrabold leading-none text-text" style={{ fontFamily: "var(--font-heading)" }}>
        {value}
      </p>
      <p className="relative mt-2 text-sm font-bold text-text">{label}</p>
      <p className="relative mt-0.5 text-xs text-text-muted">{hint}</p>
    </Link>
  );
}

function ProgressRing({ done, total }: { done: number; total: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90" aria-hidden>
      <circle cx="28" cy="28" r={r} fill="none" stroke="#081c2e" strokeOpacity="0.08" strokeWidth="6" />
      <circle
        cx="28"
        cy="28"
        r={r}
        fill="none"
        stroke={done === total ? "#0d6e78" : "#d1a542"}
        strokeOpacity={done === 0 ? 0 : 1}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${(done / total) * c} ${c}`}
      />
    </svg>
  );
}

export default async function DashboardPage() {
  const user = await requireUser();
  const days = chicagoDays(CHART_DAYS);
  const today = days[days.length - 1];

  const contentCountsSql = COLLECTIONS.map(
    (c) => `SELECT '${c.slug}' AS slug, COUNT(*) FILTER (WHERE published)::int AS live, COUNT(*)::int AS total FROM ${c.table}`
  ).join(" UNION ALL ");

  const [
    [newCount],
    [monthCount],
    [lastMonthToDate],
    daily,
    recentSubmissions,
    upcomingRows,
    activity,
    contentCounts,
    [mediaCount],
  ] = await Promise.all([
    sql<{ n: number }>`SELECT COUNT(*)::int AS n FROM submissions WHERE status = 'New'`,
    sql<{ n: number }>`SELECT COUNT(*)::int AS n FROM submissions WHERE created_at >= date_trunc('month', now())`,
    sql<{ n: number }>`
      SELECT COUNT(*)::int AS n FROM submissions
      WHERE created_at >= date_trunc('month', now()) - interval '1 month'
        AND created_at < now() - interval '1 month'
    `,
    sql<{ day: string; form_type: string; n: number }>`
      SELECT ((created_at AT TIME ZONE 'America/Chicago')::date)::text AS day, form_type, COUNT(*)::int AS n
      FROM submissions WHERE created_at >= now() - interval '31 days'
      GROUP BY 1, 2
    `,
    sql<SubmissionRow>`SELECT id, form_type, name, email, status, created_at FROM submissions ORDER BY created_at DESC LIMIT 5`,
    sql<Parameters<typeof rowToEvent>[0]>`
      SELECT id, title, event_date::text AS date, location, description, link_href, link_label, image_url, image_alt, pillar
      FROM events WHERE published = true AND event_date >= (now() AT TIME ZONE 'America/Chicago')::date
      ORDER BY event_date ASC LIMIT 3
    `,
    sql<AuditRow>`SELECT id, username, action, resource, details, created_at FROM audit_log ORDER BY created_at DESC LIMIT 6`,
    query<{ slug: string; live: number; total: number }>(contentCountsSql),
    sql<{ n: number }>`SELECT COUNT(*)::int AS n FROM media`,
  ]);

  const upcoming = upcomingRows.map(rowToEvent);
  const series = days.map((day) => ({
    day,
    counts: Object.fromEntries(daily.filter((r) => r.day === day).map((r) => [r.form_type, Number(r.n)])),
  }));
  const thisMonth = Number(monthCount.n);
  const prevMonth = Number(lastMonthToDate.n);
  const trend = prevMonth > 0 ? Math.round(((thisMonth - prevMonth) / prevMonth) * 100) : null;
  const counts = Object.fromEntries(contentCounts.map((r) => [r.slug, r]));
  const liveItems = contentCounts.reduce((sum, r) => sum + Number(r.live), 0);
  const fresh = Number(newCount.n);
  const nextEvent = upcoming[0];

  const db = databaseMode();
  const storage = storageMode();
  const email = isEmailConfigured();
  const setupItems = [
    { ok: db === "neon", label: "Database", detail: db === "neon" ? "Connected to Neon Postgres." : "Using a local development database." },
    {
      ok: storage === "blob",
      label: "Image storage",
      detail:
        storage === "blob"
          ? "Uploads go to Vercel Blob."
          : storage === "local"
            ? "Development mode: uploads are saved to this computer."
            : `Not connected. Connect a Blob store to this project (Production) and redeploy. Variables visible: ${
                blobEnvNames().join(", ") || "none"
              }.`,
    },
    {
      ok: email,
      label: "Email notifications",
      detail: email ? "Submissions and password resets are emailed." : "Optional. Add a Resend key to get emailed about new submissions.",
    },
  ];
  const setupDone = setupItems.filter((i) => i.ok).length;
  const requiredDone = setupItems[0].ok && setupItems[1].ok;
  const setupHeadline =
    setupDone === setupItems.length ? "Everything's connected" : requiredDone ? "Ready to go" : "A few things to connect";
  const setupNote =
    setupDone === setupItems.length
      ? "The site is fully set up."
      : requiredDone
        ? "The essentials are connected. Email notifications are optional."
        : "Connect the items marked below so the site can save content and images.";

  const summary = [
    fresh > 0 ? `You have ${fresh} new message${fresh === 1 ? "" : "s"} waiting.` : "Your inbox is all caught up.",
    nextEvent
      ? (() => {
          const d = daysUntil(nextEvent.date, today);
          return `Next up: ${nextEvent.title} ${d === 0 ? "today" : d === 1 ? "tomorrow" : `in ${d} days`}.`;
        })()
      : "There are no upcoming events on the calendar.",
  ].join(" ");

  const quickActions: { href: string; label: string; icon: Icon }[] = [
    { href: "/admin/events/new", label: "New event or post", icon: PlusIcon },
    { href: "/admin/media", label: "Upload photos", icon: UploadIcon },
    { href: "/admin/site-content/homepage", label: "Edit homepage text", icon: PencilIcon },
    { href: "/admin/board", label: "Update the board", icon: UsersIcon },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-3xl bg-text text-white shadow-[0_20px_50px_-20px_rgba(8,28,46,0.6)]">
        <Image src="/community-work.png" alt="" fill priority sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover opacity-25" aria-hidden />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-text via-text/90 to-primary/70" />
        <div aria-hidden className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-secondary/25 blur-3xl" />
        <Image
          src="/soc-logo-mark.png"
          alt=""
          width={764}
          height={446}
          aria-hidden
          className="pointer-events-none absolute -bottom-6 right-6 hidden h-40 w-auto opacity-15 md:block"
        />
        <div className="relative px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {new Date().toLocaleDateString("en-US", { timeZone: "America/Chicago", weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            {greeting()}, {user.username}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">{summary}</p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
            {quickActions.map((a, i) => {
              const ActionIcon = a.icon;
              return (
                <Link
                  key={a.href}
                  href={a.href}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-xs font-bold transition sm:px-4 sm:text-sm ${
                    i === 0 ? "bg-secondary text-text hover:bg-secondary-dark" : "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
                  }`}
                >
                  <ActionIcon className="h-4 w-4" />
                  {a.label}
                </Link>
              );
            })}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold text-white/80 hover:text-white sm:text-sm"
            >
              View website <ExternalIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Headline numbers */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Stat label="New messages" value={fresh} hint="Waiting in your inbox" href="/admin/inbox?status=New" icon={MailIcon} tone="gold" />
        <Stat label="Submissions this month" value={thisMonth} hint="Across all website forms" href="/admin/inbox" icon={InboxIcon} tone="primary" trend={trend} />
        <Stat
          label="Upcoming events"
          value={upcoming.length}
          hint={nextEvent ? `Next: ${formatEventDate(nextEvent.date)}` : "Nothing scheduled yet"}
          href="/admin/events?when=upcoming"
          icon={CalendarIcon}
          tone="teal"
        />
        <Stat label="Live content items" value={liveItems} hint={`${Number(mediaCount.n)} images in the library`} href="/admin/events" icon={LayersIcon} tone="navy" />
      </div>

      {/* Activity chart + latest submissions */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.55fr_1fr]">
        <Card
          title={
            <span className="inline-flex items-center gap-2">
              <ChartIcon className="h-5 w-5 text-primary" /> Website activity
            </span>
          }
          action={<span className="text-xs font-semibold text-text-muted">Form submissions · last {CHART_DAYS} days</span>}
        >
          <SubmissionsChart days={series} />
        </Card>

        <Card title="Latest messages" action={<CardLink href="/admin/inbox">Inbox</CardLink>}>
          {recentSubmissions.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-[#f6f7fc] px-6 py-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                <InboxIcon className="h-6 w-6" />
              </span>
              <p className="mt-3 text-sm font-bold text-text">No messages yet</p>
              <p className="mt-1 text-xs text-text-muted">Contact, volunteer, mentoring and newsletter forms land here.</p>
            </div>
          ) : (
            <ul className="-mx-2 flex flex-col">
              {recentSubmissions.map((s) => (
                <li key={s.id}>
                  <Link href={`/admin/inbox/${s.id}`} className="flex items-center gap-3 rounded-2xl px-2 py-2.5 transition hover:bg-[#f6f7fc]">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white"
                      style={{ backgroundColor: SUBMISSION_COLORS[s.form_type] ?? "#5657c1" }}
                    >
                      {(s.name || s.email || "?").slice(0, 1).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-text">{s.name || s.email || "Anonymous"}</span>
                      <span className="block text-xs text-text-muted">
                        {typeLabel(s.form_type)} · {timeAgo(s.created_at)}
                      </span>
                    </span>
                    {s.status === "New" && <Badge tone="gold">New</Badge>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Upcoming events */}
      <Card title="Coming up" action={<CardLink href="/admin/events">All events</CardLink>}>
        {upcoming.length === 0 ? (
          <div className="flex flex-col items-start gap-3 rounded-2xl bg-[#f6f7fc] p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-text-muted">No upcoming events. The homepage shows a friendly &ldquo;check back soon&rdquo; message until you add one.</p>
            <Link href="/admin/events/new" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark">
              <PlusIcon className="h-4 w-4" /> Add an event
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {upcoming.map((e) => {
              const d = daysUntil(e.date, today);
              return (
                <li key={e.id}>
                  <Link href={`/admin/events/${e.id}`} className="group block overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f5fb]">
                      <Image src={e.image} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-text/70 to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-text shadow">
                        {d === 0 ? "Today" : d === 1 ? "Tomorrow" : `In ${d} days`}
                      </span>
                      <span className="absolute bottom-3 left-3 text-xs font-bold text-white">{formatEventDate(e.date)}</span>
                    </div>
                    <div className="p-4">
                      <p className="line-clamp-1 font-bold text-text group-hover:text-primary">{e.title}</p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-text-muted">{e.location || "Venue to be announced"}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {/* Content at a glance */}
      <Card title="Your website at a glance" action={<CardLink href="/admin/media">Media library</CardLink>}>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          {COLLECTIONS.map((c) => {
            const TileIcon = COLLECTION_ICONS[c.slug] ?? LayersIcon;
            const n = counts[c.slug];
            const hidden = n ? Number(n.total) - Number(n.live) : 0;
            return (
              <li key={c.slug}>
                <Link
                  href={`/admin/${c.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-black/5 bg-[#f8f8fd] p-4 transition hover:border-primary/30 hover:bg-white hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm transition group-hover:bg-primary group-hover:text-white">
                    <TileIcon className="h-5 w-5" />
                  </span>
                  <span className="mt-3 text-2xl font-extrabold text-text" style={{ fontFamily: "var(--font-heading)" }}>
                    {n ? Number(n.live) : 0}
                  </span>
                  <span className="text-sm font-bold text-text">{c.title}</span>
                  <span className="mt-0.5 text-xs text-text-muted">{hidden > 0 ? `${hidden} hidden` : "All published"}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* Activity + setup */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.55fr_1fr]">
        <Card title="Recent activity" action={user.role === "Owner" ? <CardLink href="/admin/audit-log">Full log</CardLink> : undefined}>
          {activity.length === 0 ? (
            <p className="text-sm text-text-muted">No activity yet.</p>
          ) : (
            <ol className="flex flex-col">
              {activity.map((a, i) => {
                const d = describeAudit(a);
                return (
                  <li key={a.id} className="relative flex gap-4 pb-5 last:pb-0">
                    {i < activity.length - 1 && <span aria-hidden className="absolute left-[17px] top-9 bottom-0 w-px bg-black/10" />}
                    <span
                      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white"
                      style={{ backgroundColor: d.color }}
                      aria-hidden
                    >
                      {(a.username ?? "?").slice(0, 1).toUpperCase()}
                    </span>
                    <div className="min-w-0 pt-1">
                      <p className="text-sm text-text">
                        <span className="font-bold">{a.username ?? "Someone"}</span> {d.text}
                      </p>
                      <p className="text-xs text-text-muted" title={formatDateTime(a.created_at)}>
                        {timeAgo(a.created_at)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </Card>

        <Card title="Setup">
          <div className="flex items-center gap-4 rounded-2xl bg-[#f6f7fc] p-4">
            <div className="relative">
              <ProgressRing done={setupDone} total={setupItems.length} />
              <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-text">
                {setupDone}/{setupItems.length}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-text">{setupHeadline}</p>
              <p className="text-xs text-text-muted">{setupNote}</p>
            </div>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {setupItems.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                    item.ok ? "bg-accent text-white" : "bg-secondary/25 text-[#8a6416]"
                  }`}
                  aria-hidden
                >
                  {item.ok ? "✓" : "!"}
                </span>
                <span>
                  <span className="block text-sm font-bold text-text">
                    {item.label} <span className="sr-only">{item.ok ? "(ready)" : "(needs setup)"}</span>
                  </span>
                  <span className="block text-xs text-text-muted">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-2 gap-2 border-t border-black/5 pt-4">
            {[
              { href: "/admin/site-content/organization", label: "Contact details" },
              { href: "/admin/social", label: "Social media" },
              user.role === "Owner"
                ? { href: "/admin/team", label: "Team & access" }
                : { href: "/admin/media", label: "Media library" },
              { href: "/admin/account", label: "My account" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-black/10 px-3 py-2 text-center text-xs font-bold text-text transition hover:border-primary/40 hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <p className="flex items-center gap-2 px-1 text-xs text-text-muted">
        <ImageIcon className="h-3.5 w-3.5" /> Changes you save go live on the website right away.
      </p>
    </div>
  );
}
