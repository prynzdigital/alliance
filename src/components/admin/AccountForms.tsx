"use client";

import { useActionState, useEffect, useRef } from "react";
import { changeOwnPasswordAction, updateOwnEmailAction } from "@/app/admin/actions/auth";
import { idleState, type ActionState } from "@/lib/admin/types";
import { btn, field } from "./ui";

function Status({ state }: { state: ActionState }) {
  if (state.status === "idle") return null;
  return (
    <p role="status" className={`text-sm font-semibold ${state.status === "error" ? "text-red-700" : "text-emerald-700"}`}>
      {state.message}
    </p>
  );
}

export function EmailForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(updateOwnEmailAction, idleState);
  return (
    <form action={action} className="flex flex-col gap-4">
      <div>
        <label htmlFor="acct-email" className={field.label}>
          Email
        </label>
        <input id="acct-email" name="email" type="email" required defaultValue={email} autoComplete="email" className={field.input} />
        <p className={field.help}>Used for &ldquo;Forgot password?&rdquo; reset links.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className={btn.primary} disabled={pending}>
          {pending ? "Saving…" : "Save email"}
        </button>
        <Status state={state} />
      </div>
    </form>
  );
}

export function PasswordForm() {
  const [state, action, pending] = useActionState(changeOwnPasswordAction, idleState);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.status === "success") ref.current?.reset();
  }, [state]);
  return (
    <form ref={ref} action={action} className="flex flex-col gap-4">
      <div>
        <label htmlFor="acct-current" className={field.label}>
          Current password
        </label>
        <input id="acct-current" name="current" type="password" required autoComplete="current-password" className={field.input} />
      </div>
      <div>
        <label htmlFor="acct-new" className={field.label}>
          New password
        </label>
        <input id="acct-new" name="password" type="password" required minLength={10} autoComplete="new-password" className={field.input} />
        <p className={field.help}>At least 10 characters.</p>
      </div>
      <div>
        <label htmlFor="acct-confirm" className={field.label}>
          Confirm new password
        </label>
        <input id="acct-confirm" name="confirm" type="password" required minLength={10} autoComplete="new-password" className={field.input} />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className={btn.primary} disabled={pending}>
          {pending ? "Updating…" : "Change password"}
        </button>
        <Status state={state} />
      </div>
    </form>
  );
}
