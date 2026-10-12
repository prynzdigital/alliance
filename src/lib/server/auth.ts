import "server-only";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { sql } from "./db";

export type Role = "Owner" | "Admin";
export const ROLES: Role[] = ["Owner", "Admin"];

export type SessionUser = {
  id: number;
  username: string;
  email: string | null;
  role: Role;
};

const COOKIE_NAME = "soc_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function sessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV !== "production") return "dev-only-session-secret-change-me-0000000000";
  throw new Error("SESSION_SECRET must be set (at least 32 characters) in production");
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
}

function createToken(userId: number): string {
  const payload = Buffer.from(
    JSON.stringify({ uid: userId, exp: Date.now() + SESSION_TTL_SECONDS * 1000 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string | undefined): number | null {
  if (!token || !token.includes(".")) return null;
  const [payload, signature] = token.split(".");
  if (!signature || !timingSafeEqual(signature, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.uid !== "number" || !data.exp || Date.now() > data.exp) return null;
    return data.uid;
  } catch {
    return null;
  }
}

export async function startSession(userId: number): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, createToken(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Re-checks the account against the database on every call rather than
// trusting the signed cookie alone, so deactivating a user or changing their
// role takes effect on their very next request. Memoized per request.
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const jar = await cookies();
  const userId = verifyToken(jar.get(COOKIE_NAME)?.value);
  if (!userId) return null;
  try {
    const rows = await sql<SessionUser>`
      SELECT id, username, email, role FROM admin_users WHERE id = ${userId} AND status = 'Active'
    `;
    return rows[0] ?? null;
  } catch (err) {
    console.error("Failed to verify admin session:", err);
    return null;
  }
});

/** For admin pages: redirects to the login screen when signed out. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}

/** For admin pages that only Owners may see. */
export async function requireOwner(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "Owner") redirect("/admin");
  return user;
}

export class AuthError extends Error {}

/** For Server Actions: throws instead of redirecting, so callers can report it. */
export async function assertUser(role?: Role): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new AuthError("Your session has expired. Please sign in again.");
  if (role === "Owner" && user.role !== "Owner") throw new AuthError("Only Owners can do that.");
  return user;
}
