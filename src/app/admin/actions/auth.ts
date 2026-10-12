"use server";

import crypto from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ActionState } from "@/lib/admin/types";
import { logAudit } from "@/lib/server/audit";
import {
  assertUser,
  AuthError,
  endSession,
  getCurrentUser,
  hashPassword,
  startSession,
  verifyPassword,
} from "@/lib/server/auth";
import { DatabaseUnavailableError, sql } from "@/lib/server/db";
import { escapeHtml, sendEmail, wrapEmail } from "@/lib/server/email";
import { isRateLimited } from "@/lib/server/rateLimit";

type UserRow = { id: number; username: string; email: string | null; role: "Owner" | "Admin"; status: string; password_hash: string };

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (await isRateLimited("login", 8, 10 * 60 * 1000)) {
    return { status: "error", message: "Too many sign-in attempts. Please wait a few minutes and try again." };
  }
  const identifier = String(formData.get("username") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!identifier || !password) return { status: "error", message: "Enter your username and password." };

  let user: UserRow | undefined;
  try {
    [user] = await sql<UserRow>`
      SELECT id, username, email, role, status, password_hash FROM admin_users
      WHERE lower(username) = ${identifier} OR lower(email) = ${identifier}
      LIMIT 1
    `;
  } catch (err) {
    console.error("Login lookup failed:", err);
    return {
      status: "error",
      message:
        err instanceof DatabaseUnavailableError
          ? "The admin database isn't connected yet. Add DATABASE_URL in Vercel and redeploy."
          : "Sign-in is temporarily unavailable. Please try again shortly.",
    };
  }

  // Same message whether the username or the password was wrong, so this
  // form can't be used to discover which accounts exist.
  if (!user || user.status !== "Active" || !(await verifyPassword(password, user.password_hash))) {
    return { status: "error", message: "Incorrect username or password." };
  }

  await sql`UPDATE admin_users SET last_login_at = now() WHERE id = ${user.id}`;
  await startSession(user.id);
  await logAudit({ id: user.id, username: user.username, email: user.email, role: user.role }, {
    action: "login",
    resource: "session",
  });
  const next = String(formData.get("next") ?? "");
  redirect(next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin");
}

export async function logoutAction(): Promise<void> {
  const user = await getCurrentUser();
  if (user) await logAudit(user, { action: "logout", resource: "session" });
  await endSession();
  redirect("/admin/login");
}

export async function forgotPasswordAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  // Identical response whatever we find, so this can't reveal which emails
  // have an account.
  const generic: ActionState = {
    status: "success",
    message: "If an account with that email exists, we've sent a password reset link. It expires in 1 hour.",
  };
  if (await isRateLimited("forgot", 5, 15 * 60 * 1000)) {
    return { status: "error", message: "Too many requests. Please try again later." };
  }
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return generic;

  try {
    const [user] = await sql<{ id: number; username: string; email: string }>`
      SELECT id, username, email FROM admin_users WHERE lower(email) = ${email} AND status = 'Active'
    `;
    if (user) {
      const token = crypto.randomBytes(32).toString("base64url");
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
      await sql`
        UPDATE admin_users SET reset_token = ${tokenHash}, reset_token_expires = now() + interval '1 hour'
        WHERE id = ${user.id}
      `;
      const h = await headers();
      const host = h.get("x-forwarded-host") ?? h.get("host");
      const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
      const resetUrl = `${proto}://${host}/admin/reset?token=${token}`;
      await sendEmail({
        to: user.email,
        subject: "Reset your SOC Alliance admin password",
        html: wrapEmail(`
          <p>Hi ${escapeHtml(user.username)},</p>
          <p>We received a request to reset your SOC Alliance admin password. This link expires in 1 hour.</p>
          <p style="margin:20px 0;"><a href="${resetUrl}" style="background:#5657c1;color:#fff;padding:12px 24px;border-radius:99px;text-decoration:none;font-weight:700;">Reset Password</a></p>
          <p style="font-size:12.5px;color:#5a6470;">If you didn't ask for this, you can ignore this email and your password won't change. If the button doesn't work, paste this link into your browser:<br>${resetUrl}</p>
        `),
      });
    }
  } catch (err) {
    console.error("Forgot-password request failed:", err);
  }
  return generic;
}

export async function resetPasswordAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (password.length < 10) return { status: "error", message: "Use at least 10 characters." };
  if (password !== confirm) return { status: "error", message: "The two passwords don't match." };

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const [user] = await sql<{ id: number; username: string; email: string | null; role: "Owner" | "Admin" }>`
    SELECT id, username, email, role FROM admin_users
    WHERE reset_token = ${tokenHash} AND reset_token_expires > now() AND status = 'Active'
  `;
  if (!token || !user) {
    return { status: "error", message: "This reset link is invalid or has expired. Request a new one." };
  }
  await sql`
    UPDATE admin_users SET password_hash = ${await hashPassword(password)}, reset_token = NULL, reset_token_expires = NULL
    WHERE id = ${user.id}
  `;
  await logAudit(user, { action: "reset-password", resource: "users", resourceId: user.id });
  redirect("/admin/login?reset=1");
}

export async function changeOwnPasswordAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const user = await assertUser();
    const current = String(formData.get("current") ?? "");
    const next = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirm") ?? "");
    if (next.length < 10) return { status: "error", message: "Use at least 10 characters for the new password." };
    if (next !== confirm) return { status: "error", message: "The new passwords don't match." };
    const [row] = await sql<{ password_hash: string }>`SELECT password_hash FROM admin_users WHERE id = ${user.id}`;
    if (!row || !(await verifyPassword(current, row.password_hash))) {
      return { status: "error", message: "Your current password is incorrect." };
    }
    await sql`UPDATE admin_users SET password_hash = ${await hashPassword(next)} WHERE id = ${user.id}`;
    await logAudit(user, { action: "change-password", resource: "users", resourceId: user.id });
    return { status: "success", message: "Password updated." };
  } catch (err) {
    if (err instanceof AuthError) return { status: "error", message: err.message };
    console.error(err);
    return { status: "error", message: "Couldn't update your password. Please try again." };
  }
}

export async function updateOwnEmailAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const user = await assertUser();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "error", message: "Enter a valid email address." };
    await sql`UPDATE admin_users SET email = ${email} WHERE id = ${user.id}`;
    await logAudit(user, { action: "update", resource: "users", resourceId: user.id, details: "email updated" });
    return { status: "success", message: "Email updated. It's used for password resets." };
  } catch (err) {
    if (err instanceof AuthError) return { status: "error", message: err.message };
    if (String((err as Error).message).toLowerCase().includes("duplicate") || String((err as Error).message).includes("unique")) {
      return { status: "error", message: "That email is already used by another account." };
    }
    console.error(err);
    return { status: "error", message: "Couldn't update your email. Please try again." };
  }
}
