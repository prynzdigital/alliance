import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteCollectionItem, saveCollectionItem } from "@/app/admin/actions/content";
import { CollectionForm } from "@/components/admin/CollectionForm";
import { ConfirmForm } from "@/components/admin/ConfirmForm";
import { AdminPageHeader, btn, formatDateTime } from "@/components/admin/ui";
import { getCollection, selectColumns } from "@/lib/cms/collections";
import { requireUser } from "@/lib/server/auth";
import { query } from "@/lib/server/db";
import { getMediaOptions } from "@/lib/server/mediaOptions";

type Params = { collection: string; id: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const def = getCollection((await params).collection);
  return { title: def ? `Edit ${def.singular}` : "Not found" };
}

export default async function EditCollectionItemPage({ params }: { params: Promise<Params> }) {
  await requireUser();
  const { collection, id: idParam } = await params;
  const def = getCollection(collection);
  const id = Number.parseInt(idParam, 10);
  if (!def || !Number.isInteger(id) || id <= 0) notFound();

  const [rows, media] = await Promise.all([
    query<Record<string, unknown>>(`SELECT ${selectColumns(def)} FROM ${def.table} WHERE id = $1`, [id]),
    getMediaOptions(),
  ]);
  const item = rows[0];
  if (!item) notFound();
  const title = String(item[def.titleColumn] ?? def.singular);

  return (
    <>
      <AdminPageHeader
        eyebrow={
          <Link href={`/admin/${def.slug}`} className="hover:underline">
            ← {def.title}
          </Link>
        }
        title={title}
        description={`Last updated ${formatDateTime(item.updated_at as string)}`}
        actions={
          <ConfirmForm
            action={deleteCollectionItem.bind(null, def.slug, id)}
            confirm={`Delete “${title}”? This can't be undone.`}
            className={btn.danger}
            pendingLabel="Deleting…"
          >
            Delete
          </ConfirmForm>
        }
      />
      <CollectionForm slug={def.slug} initial={item} action={saveCollectionItem.bind(null, def.slug, id)} media={media} />
    </>
  );
}
