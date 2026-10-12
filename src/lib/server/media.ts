import "server-only";
import type { SessionUser } from "./auth";
import { sql } from "./db";
import type { StoredFile } from "./storage";

/** Adds an uploaded file to the Media Library list. */
export async function recordMedia(user: SessionUser, stored: StoredFile): Promise<void> {
  await sql`
    INSERT INTO media (url, pathname, filename, content_type, size_bytes, uploaded_by)
    VALUES (${stored.url}, ${stored.pathname}, ${stored.filename}, ${stored.contentType}, ${stored.size}, ${user.username})
  `;
}
