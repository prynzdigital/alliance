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

type BlobAuth = { token: string } | { storeId: string };

// Connecting a Vercel Blob store adds either a read-write token
// (BLOB_READ_WRITE_TOKEN, value "vercel_blob_rw_…") or, on newer stores, a
// store id (BLOB_STORE_ID, value "store_…", authenticated with Vercel's OIDC
// token at runtime). If the store was connected with a custom prefix the
// variable names change (e.g. MEDIA_READ_WRITE_TOKEN), so fall back to finding
// the credential by its value shape. Credentials are passed to @vercel/blob
// explicitly so any of these work.
function blobAuth(): BlobAuth | null {
  const env = process.env;
  if (env.BLOB_READ_WRITE_TOKEN) return { token: env.BLOB_READ_WRITE_TOKEN };
  if (env.BLOB_STORE_ID) return { storeId: env.BLOB_STORE_ID };
  const entries = Object.entries(env);
  const token = entries.find(([, v]) => v?.startsWith("vercel_blob_rw_"))?.[1];
  if (token) return { token };
  const storeId = entries.find(([k, v]) => k.endsWith("STORE_ID") && v?.startsWith("store_"))?.[1];
  if (storeId) return { storeId };
  return null;
}

/** Names (never values) of env vars that look Blob-related — shown on the dashboard to help diagnose setup. */
export function blobEnvNames(): string[] {
  return Object.keys(process.env)
    .filter((k) => /BLOB|READ_WRITE_TOKEN|STORE_ID/.test(k))
    .sort();
}

export function storageMode(): "blob" | "local" | "none" {
  if (blobAuth()) return "blob";
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
  const auth = blobAuth();
  const mode = storageMode();

  if (auth) {
    const { put } = await import("@vercel/blob");
    const blob = await put(key, file, { access: "public", contentType: file.type, ...auth });
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
    const auth = blobAuth();
    if (/^https:\/\/[^/]+\.blob\.vercel-storage\.com\//.test(url) && auth) {
      const { del } = await import("@vercel/blob");
      await del(url, auth);
    }
  } catch (err) {
    console.error("Failed to delete stored file:", err);
  }
}
