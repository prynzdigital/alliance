import "server-only";
import { headers } from "next/headers";

// Simple per-instance limiter keyed by caller IP. Resets on cold start, so it's
// a speed bump against scripted abuse rather than a hard guarantee — same
// approach as e-cleanpro's login and public endpoints.
const buckets = new Map<string, { count: number; first: number }>();

export async function isRateLimited(scope: string, maxAttempts: number, windowMs: number): Promise<boolean> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const key = `${scope}:${ip}`;
  const now = Date.now();
  const record = buckets.get(key);
  if (!record || now - record.first > windowMs) {
    buckets.set(key, { count: 1, first: now });
    return false;
  }
  record.count += 1;
  return record.count > maxAttempts;
}
