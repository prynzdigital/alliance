import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteCollectionItem, togglePublished } from "@/app/admin/actions/content";
import { ConfirmForm } from "@/components/admin/ConfirmForm";
import { PlusIcon } from "@/components/admin/icons";
import { AdminPageHeader, Badge, EmptyState, Flash, btn } from "@/components/admin/ui";
import { getCollection, selectColumns } from "@/lib/cms/collections";
import { formatEventDate, getEventStatus, PILLAR_IMAGE, type EventPillar } from "@/lib/events";
import { requireUser } from "@/lib/server/auth";
import { query } from "@/lib/server/db";

type Params = { collection: string };
type Search = { saved?: string; deleted?: string; q?: string; when?: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const def = getCollection((await params).collection);
  return { title: def?.title ?? "Not found" };
}

export default async function CollectionListPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  await requireUser();
  const def = getCollection((await params).collection);
  if (!def) notFound();
  const { saved, deleted, q = "", when = "all" } = await searchParams;
  const isEvents = def.slug === "events";

  const conditions: string[] = [];
  const values: unknown[] = [];
  if (q.trim()) {
    values.push(`%${q.trim()}%`);
    conditions.push(`${def.titleColumn} ILIKE $${values.length}`);
  }
  if (isEvents && when === "upcoming") conditions.push(`event_date >= (now() AT TIME ZONE 'America/Chicago')::date`);
  if (isEvents && when === "past") conditions.push(`event_date < (now() AT TIME ZONE 'America/Chicago')::date`);
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const rows = await query<Record<string, unknown> & { id: number }>(
    `SELECT ${selectColumns(def)} FROM ${def.table} ${where} ORDER BY ${def.orderBy}`,
    values
  );
  const hasPublished = def.fields.some((f) => f.name === "published");

  return (
    <>
      <AdminPageHeader
        eyebrow="Website Content"
        title={def.title}
        description={
          <>
            {def.description} <span className="text-text">Appears on: {def.appearsOn}.</span>
          </>
        }
        actions={
          <Link href={`/admin/${def.slug}/new`} className={btn.primary}>
            <PlusIcon className="h-4 w-4" /> Add {def.singular.toLowerCase()}
          </Link>
        }
      />

      {saved && <Flash>Saved — the live website has been updated.</Flash>}
      {deleted && <Flash>Deleted.</Flash>}

      <form className="mb-5 flex flex-wrap items-center gap-3" role="search">
        <label htmlFor="q" className="sr-only">
          Search {def.title}
        </label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder={`Search ${def.title.toLowerCase()}…`}
          className="w-full max-w-xs rounded-full border border-black/10 bg-white px-4 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {isEvents && (
          <>
            <label htmlFor="when" className="sr-only">
              Show
            </label>
            <select
              id="when"
              name="when"
              defaultValue={when}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm shadow-sm"
            >
              <option value="all">All dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </>
        )}
        <button type="submit" className={btn.ghost}>
          Filter
        </button>
        {(q || when !== "all") && (
          <Link href={`/admin/${def.slug}`} className="text-sm font-semibold text-primary hover:underline">
            Clear
          </Link>
        )}
        <span className="ml-auto text-sm text-text-muted">
          {rows.length} {rows.length === 1 ? "item" : "items"}
        </span>
      </form>

      {rows.length === 0 ? (
        <EmptyState title={q ? "No matches" : `No ${def.title.toLowerCase()} yet`}>
          <Link href={`/admin/${def.slug}/new`} className="font-semibold text-primary hover:underline">
            Add the first one
          </Link>
        </EmptyState>
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map((row) => {
            const title = String(row[def.titleColumn] ?? "Untitled");
            const published = row.published !== false;
            const pillar = (row.pillar as EventPillar) || "general";
            const image = def.imageColumn
              ? (row[def.imageColumn] as string | null) || (isEvents ? PILLAR_IMAGE[pillar]?.src : null)
              : null;
            const subtitle = def.subtitleColumns
              .map((c) => {
                const v = row[c];
                if (!v) return null;
                return c === "event_date" ? formatEventDate(String(v)) : String(v);
              })
              .filter(Boolean)
              .join(" · ");
            return (
              <li
                key={row.id}
                className={`flex flex-wrap items-center gap-4 rounded-2xl border bg-white p-3 pr-4 shadow-sm sm:flex-nowrap ${
                  String(row.id) === saved ? "border-secondary ring-2 ring-secondary/30" : "border-black/5"
                }`}
              >
                {def.imageColumn && (
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface">
                    {image ? (
                      <Image src={image} alt="" fill sizes="64px" className="object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-lg font-extrabold text-text-muted">
                        {title.slice(0, 1)}
                      </span>
                    )}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <Link href={`/admin/${def.slug}/${row.id}`} className="block truncate font-bold text-text hover:text-primary">
                    {title}
                  </Link>
                  {subtitle && <p className="mt-0.5 line-clamp-1 text-sm text-text-muted">{subtitle}</p>}
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {hasPublished && (published ? <Badge tone="green">Published</Badge> : <Badge>Hidden</Badge>)}
                    {isEvents &&
                      (getEventStatus(String(row.event_date)) === "upcoming" ? (
                        <Badge tone="gold">Upcoming</Badge>
                      ) : (
                        <Badge tone="blue">Past</Badge>
                      ))}
                  </div>
                </div>
                <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
                  {hasPublished && (
                    <ConfirmForm action={togglePublished.bind(null, def.slug, row.id, !published)} className={btn.small}>
                      {published ? "Hide" : "Publish"}
                    </ConfirmForm>
                  )}
                  <Link href={`/admin/${def.slug}/${row.id}`} className={btn.small}>
                    Edit
                  </Link>
                  <ConfirmForm
                    action={deleteCollectionItem.bind(null, def.slug, row.id)}
                    confirm={`Delete “${title}”? This can't be undone.`}
                    className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </ConfirmForm>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
