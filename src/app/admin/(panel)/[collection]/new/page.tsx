import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { saveCollectionItem } from "@/app/admin/actions/content";
import { CollectionForm } from "@/components/admin/CollectionForm";
import { AdminPageHeader } from "@/components/admin/ui";
import { getCollection } from "@/lib/cms/collections";
import { requireUser } from "@/lib/server/auth";
import { getMediaOptions } from "@/lib/server/mediaOptions";

type Params = { collection: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const def = getCollection((await params).collection);
  return { title: def ? `Add ${def.singular}` : "Not found" };
}

export default async function NewCollectionItemPage({ params }: { params: Promise<Params> }) {
  await requireUser();
  const def = getCollection((await params).collection);
  if (!def) notFound();
  const media = await getMediaOptions();

  return (
    <>
      <AdminPageHeader
        eyebrow={
          <Link href={`/admin/${def.slug}`} className="hover:underline">
            ← {def.title}
          </Link>
        }
        title={`Add ${def.singular.toLowerCase()}`}
        description={def.description}
      />
      <CollectionForm slug={def.slug} initial={null} action={saveCollectionItem.bind(null, def.slug, null)} media={media} />
    </>
  );
}
