import type { Metadata } from "next";
import Link from "next/link";
import { DownloadIcon } from "@/components/admin/icons";
import { AdminPageHeader, Badge, EmptyState, Flash, btn, formatDateTime, timeAgo } from "@/components/admin/ui";
import { SUBMISSION_STATUSES, SUBMISSION_TYPES } from "@/lib/admin/types";
import { requireUser } from "@/lib/server/auth";
import { query, sql } from "@/lib/server/db";

export const metadata: Metadata = { title: "Inbox" };

type Search = { type?: string; status?: string; q?: string; deleted?: string };
type Row = {
  id: number;
  form_type: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  topic: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const typeLabel = (t: string) => SUBMISSION_TYPES.find((s) => s.value === t)?.label ?? t;

function statusBadge(status: string) {
  if (status === "New") return <Badge tone="gold">New</Badge>;
  if (status === "In Progress") return <Badge tone="blue">In progress</Badge>;
  return <Badge tone="green">Closed</Badge>;
}

export default async function InboxPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireUser();
  const { type = "", status = "", q = "", deleted } = await searchParams;

  const conditions: string[] = [];
  const values: unknown[] = [];
  if (SUBMISSION_TYPES.some((t) => t.value === type)) {
    values.push(type);
    conditions.push(`form_type = $${values.length}`);
  }
  if ((SUBMISSION_STATUSES as readonly string[]).includes(status)) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }
  if (q.trim()) {
    values.push(`%${q.trim()}%`);
    conditions.push(`(name ILIKE $${values.length} OR email ILIKE $${values.length} OR message ILIKE $${values.length})`);
  }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const [rows, counts] = await Promise.all([
    query<Row>(
      `SELECT id, form_type, name, email, phone, topic, message, status, created_at FROM submissions ${where}
       ORDER BY created_at DESC LIMIT 300`,
      values
    ),
    sql<{ form_type: string; total: number; fresh: number }>`
      SELECT form_type, COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status = 'New')::int AS fresh
      FROM submissions GROUP BY form_type
    `,
  ]);
  const countFor = (t: string) => counts.find((c) => c.form_type === t);
  const allTotal = counts.reduce((sum, c) => sum + Number(c.total), 0);

  const tabHref = (t: string) => {
    const params = new URLSearchParams();
    if (t) params.set("type", t);
    if (status) params.set("status", status);
    return `/admin/inbox${params.size ? `?${params}` : ""}`;
  };

  return (
    <>
      <AdminPageHeader
        title="Inbox"
        description="Every message sent through the website's Contact, Volunteer, Mentoring, and Newsletter forms."
        actions={
          <a href={`/admin/inbox/export${type ? `?type=${type}` : ""}`} className={btn.ghost}>
            <DownloadIcon className="h-4 w-4" /> Export CSV
          </a>
        }
      />
      {deleted && <Flash>Submission deleted.</Flash>}

      <div className="mb-5 flex gap-1 overflow-x-auto rounded-full border border-black/5 bg-white p-1 shadow-sm">
        {[{ value: "", label: "All" }, ...SUBMISSION_TYPES].map((t) => {
          const active = t.value === type;
          const c = t.value ? countFor(t.value) : null;
          return (
            <Link
              key={t.value || "all"}
              href={tabHref(t.value)}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                active ? "bg-text text-white" : "text-text-muted hover:text-text"
              }`}
            >
              {t.label}
              <span className={`text-xs ${active ? "text-white/70" : "text-text-muted"}`}>
                {t.value ? Number(c?.total ?? 0) : allTotal}
              </span>
              {c && Number(c.fresh) > 0 && <span className="h-2 w-2 rounded-full bg-secondary" aria-label={`${c.fresh} new`} />}
            </Link>
          );
        })}
      </div>

      <form className="mb-5 flex flex-wrap items-center gap-3" role="search">
        {type && <input type="hidden" name="type" value={type} />}
        <label htmlFor="q" className="sr-only">
          Search messages
        </label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder="Search name, email, or message…"
          className="w-full max-w-xs rounded-full border border-black/10 bg-white px-4 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <label htmlFor="status" className="sr-only">
          Status
        </label>
        <select id="status" name="status" defaultValue={status} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm shadow-sm">
          <option value="">Any status</option>
          {SUBMISSION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="submit" className={btn.ghost}>
          Filter
        </button>
      </form>

      {rows.length === 0 ? (
        <EmptyState title="No messages here">
          New submissions from the website will show up automatically.
        </EmptyState>
      ) : (
        <ul className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
          {rows.map((r) => (
            <li key={r.id} className="border-b border-black/5 last:border-0">
              <Link
                href={`/admin/inbox/${r.id}`}
                className={`flex flex-col gap-1 px-5 py-4 transition hover:bg-[#f8f8fd] sm:flex-row sm:items-center sm:gap-4 ${
                  r.status === "New" ? "bg-secondary/5" : ""
                }`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      r.status === "New" ? "bg-secondary text-text" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {(r.name || r.email || "?").slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className={`truncate text-sm text-text ${r.status === "New" ? "font-extrabold" : "font-semibold"}`}>
                      {r.name || r.email || r.phone || "Anonymous"}
                      <span className="ml-2 text-xs font-medium text-text-muted">{typeLabel(r.form_type)}</span>
                    </p>
                    <p className="line-clamp-1 text-sm text-text-muted">
                      {r.form_type === "newsletter" ? r.email : [r.topic, r.message].filter(Boolean).join(" — ") || "(no message)"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-[52px] sm:pl-0">
                  {statusBadge(r.status)}
                  <span className="w-24 text-right text-xs text-text-muted" title={formatDateTime(r.created_at)}>
                    {timeAgo(r.created_at)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
