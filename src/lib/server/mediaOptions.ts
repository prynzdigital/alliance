import "server-only";
import type { MediaOption } from "@/components/admin/CollectionForm";
import { sql } from "./db";

/** Recent Media Library uploads, offered as quick picks on image fields. */
export async function getMediaOptions(): Promise<MediaOption[]> {
  try {
    return await sql<MediaOption>`SELECT url, filename FROM media ORDER BY created_at DESC LIMIT 60`;
  } catch {
    return [];
  }
}
