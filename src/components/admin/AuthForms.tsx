"use client";

import Link from "next/link";
import { useActionState } from "react";
import { forgotPasswordAction, loginAction, resetPasswordAction } from "@/app/admin/actions/auth";
import { idleState, type ActionState } from "@/lib/admin/types";

const input =
  "mt-1.5 w-full rounded-xl border border-white/25 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-secondary focus:bg-white/15 focus:outline-none";
const label = "block text-xs font-bold uppercase tracking-widest text-white/75";
const submit =
  "mt-2 inline-flex w-full items-center justify-center rounded-full bg-secondary px-5 py-3 text-sm font-bold text-text shadow-lg transition hover:bg-secondary-dark disabled:opacity-60";

function Message({ state }: { state: ActionState }) {
  if (state.status === "idle") return null;
  return (
    <p
      role={state.status === "error" ? "alert" : "status"}
      className={`mb-4 rounded-xl border px-3.5 py-2.5 text-sm ${
        state.status === "error"
          ? "border-red-300/40 bg-red-500/15 text-red-100"
          : "border-emerald-300/40 bg-emerald-500/15 text-emerald-100"
      }`}
    >
      {state.message}
    </p>
  );
}

export function LoginForm({ next, notice }: { next?: string; notice?: string }) {
  const [state, action, pending] = useActionState(loginAction, idleState);
  return (
    <form action={action}>
      {notice && state.status === "idle" && (
        <p role="status" className="mb-4 rounded-xl border border-emerald-300/40 bg-emerald-500/15 px-3.5 py-2.5 text-sm text-emerald-100">
          {notice}
        </p>
      )}
      <Message state={state} />
      <input type="hidden" name="next" value={next ?? ""} />
      <div className="mb-4">
        <label htmlFor="username" className={label}>
          Username or email
        </label>
        <input id="username" name="username" autoComplete="username" required className={input} />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className={label}>
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={input} />
      </div>
      <button type="submit" className={submit} disabled={pending}>
        {pending ? "Signing in…" : "Sign In"}
      </button>
      <Link href="/admin/forgot" className="mt-5 block text-center text-sm font-semibold text-white/70 underline hover:text-white">
        Forgot password?
      </Link>
    </form>
  );
}

export function ForgotForm({ emailReady }: { emailReady: boolean }) {
  const [state, action, pending] = useActionState(forgotPasswordAction, idleState);
  return (
    <form action={action}>
      <Message state={state} />
      {!emailReady && (
        <p className="mb-4 rounded-xl border border-secondary/40 bg-secondary/15 px-3.5 py-2.5 text-sm text-white/90">
          Email sending isn&rsquo;t set up yet, so reset links can&rsquo;t be delivered. Ask an Owner to reset your
          password from Team &amp; Access.
        </p>
      )}
      <div className="mb-5">
        <label htmlFor="email" className={label}>
          Account email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={input} />
      </div>
      <button type="submit" className={submit} disabled={pending}>
        {pending ? "Sending…" : "Send Reset Link"}
      </button>
      <Link href="/admin/login" className="mt-5 block text-center text-sm font-semibold text-white/70 underline hover:text-white">
        Back to sign in
      </Link>
    </form>
  );
}

export function ResetForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetPasswordAction, idleState);
  return (
    <form action={action}>
      <Message state={state} />
      <input type="hidden" name="token" value={token} />
      <div className="mb-4">
        <label htmlFor="password" className={label}>
          New password
        </label>
        <input id="password" name="password" type="password" autoComplete="new-password" minLength={10} required className={input} />
      </div>
      <div className="mb-5">
        <label htmlFor="confirm" className={label}>
          Confirm new password
        </label>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" minLength={10} required className={input} />
      </div>
      <button type="submit" className={submit} disabled={pending}>
        {pending ? "Saving…" : "Set New Password"}
      </button>
    </form>
  );
}
