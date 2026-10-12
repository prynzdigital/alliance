import type { Metadata } from "next";
import Image from "next/image";
import { deleteMediaAction } from "@/app/admin/actions/manage";
import { ConfirmForm } from "@/components/admin/ConfirmForm";
import { CopyButton } from "@/components/admin/CopyButton";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { AdminPageHeader, Badge, EmptyState, Flash, btn, formatDateTime } from "@/components/admin/ui";
import { requireUser } from "@/lib/server/auth";
import { sql } from "@/lib/server/db";
import { storageMode } from "@/lib/server/storage";

export const metadata: Metadata = { title: "Media Library" };

type MediaRow = {
  id: number;
  url: string;
  filename: string | null;
  size_bytes: number | null;
  uploaded_by: string | null;
  created_at: string;
  in_use: boolean;
};

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

export default async function MediaPage() {
  await requireUser();
  // "In use" = referenced by any event, story, or board member, so deleting
  // it would leave a broken image on the site.
  const rows = await sql<MediaRow>`
    SELECT m.id, m.url, m.filename, m.size_bytes, m.uploaded_by, m.created_at,
      (EXISTS (SELECT 1 FROM events e WHERE e.image_url = m.url)
        OR EXISTS (SELECT 1 FROM stories s WHERE s.image_url = m.url)
        OR EXISTS (SELECT 1 FROM board_members b WHERE b.photo_url = m.url)) AS in_use
    FROM media m ORDER BY m.created_at DESC
  `;
  const storage = storageMode();

  return (
    <>
      <AdminPageHeader
        title="Media Library"
        description="Photos and flyers uploaded for the website. Images uploaded while editing an event, story, or board member also appear here."
      />
      {storage !== "blob" && (
        <Flash tone="info">
          {storage === "local"
            ? "Development mode: uploads are saved to this computer (public/uploads). Connect a Vercel Blob store for the live site."
            : "Image storage isn't connected yet. Add a Vercel Blob store to this project to enable uploads."}
        </Flash>
      )}

      <MediaUploader />

      {rows.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No uploads yet">Images you upload will be listed here.</EmptyState>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {rows.map((m) => (
            <li key={m.id} className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
              <div className="relative aspect-[4/3] bg-[#f4f5fb]">
                <Image src={m.url} alt={m.filename ?? "Uploaded image"} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
                {m.in_use && (
                  <span className="absolute left-2 top-2">
                    <Badge tone="green">In use</Badge>
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-semibold text-text" title={m.filename ?? undefined}>
                  {m.filename ?? "Image"}
                </p>
                <p className="text-xs text-text-muted">
                  {[formatSize(m.size_bytes), m.uploaded_by, formatDateTime(m.created_at)].filter(Boolean).join(" · ")}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <CopyButton text={m.url} className={btn.small} />
                  {m.in_use ? (
                    <span className="text-xs text-text-muted" title="Remove it from the page using it first">
                      Can&rsquo;t delete
                    </span>
                  ) : (
                    <ConfirmForm
                      action={deleteMediaAction.bind(null, m.id)}
                      confirm="Delete this image permanently?"
                      className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </ConfirmForm>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
