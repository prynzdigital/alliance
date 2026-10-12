import "server-only";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

// Connecting a Vercel Blob store adds either BLOB_READ_WRITE_TOKEN (classic
// token) or BLOB_STORE_ID (newer stores, authenticated via Vercel's OIDC
// token at runtime). @vercel/blob accepts either, so treat either as connected.
function blobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export function storageMode(): "blob" | "local" | "none" {
  if (blobConfigured()) return "blob";
  return process.env.NODE_ENV !== "production" ? "local" : "none";
}

export type StoredFile = { url: string; pathname: string; filename: string; contentType: string; size: number };

// Uploads go to Vercel Blob in production. In local development without a
// Blob token they're written to public/uploads/ (git-ignored) so the admin can
// be tried out without any cloud setup.
export async function storeImage(file: File, folder: string): Promise<StoredFile> {
  const ext = ALLOWED_IMAGE_TYPES[file.type];
  if (!ext) throw new Error("Please upload a JPG, PNG, WebP, or GIF image.");
  if (file.size === 0) throw new Error("That file is empty.");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Images must be under 4 MB.");

  const safeFolder = folder.replace(/[^a-z0-9-]/gi, "") || "uploads";
  const key = `${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const mode = storageMode();

  if (mode === "blob") {
    const { put } = await import("@vercel/blob");
    const blob = await put(key, file, { access: "public", contentType: file.type });
    return { url: blob.url, pathname: blob.pathname, filename: file.name, contentType: file.type, size: file.size };
  }
  if (mode === "local") {
    const dest = path.join(process.cwd(), "public", "uploads", key);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await file.arrayBuffer()));
    return { url: `/uploads/${key}`, pathname: key, filename: file.name, contentType: file.type, size: file.size };
  }
  throw new Error("Image storage isn't configured yet. Connect a Vercel Blob store to this project.");
}

export async function deleteStoredFile(url: string): Promise<void> {
  try {
    if (url.startsWith("/uploads/") && storageMode() === "local") {
      const rel = url.slice("/uploads/".length);
      if (rel.includes("..")) return;
      await unlink(path.join(process.cwd(), "public", "uploads", rel));
      return;
    }
    if (/^https:\/\/[^/]+\.blob\.vercel-storage\.com\//.test(url) && blobConfigured()) {
      const { del } = await import("@vercel/blob");
      await del(url);
    }
  } catch (err) {
    console.error("Failed to delete stored file:", err);
  }
}
