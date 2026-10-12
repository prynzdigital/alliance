"use client";

import { useActionState, useEffect, useRef } from "react";
import { createTeamMember } from "@/app/admin/actions/manage";
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

export function AddTeamMemberForm() {
  const [state, action, pending] = useActionState(createTeamMember, idleState);
  const ref = useRef<HTMLFormElement>(null);
  const errors = state.fieldErrors ?? {};
  useEffect(() => {
    if (state.status === "success") ref.current?.reset();
  }, [state]);

  return (
    <form ref={ref} action={action} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="new-username" className={field.label}>
          Username
        </label>
        <input id="new-username" name="username" required autoComplete="off" aria-invalid={Boolean(errors.username)} className={field.input} />
        {errors.username && <p className={field.error}>{errors.username}</p>}
      </div>
      <div>
        <label htmlFor="new-email" className={field.label}>
          Email
        </label>
        <input id="new-email" name="email" type="email" required autoComplete="off" aria-invalid={Boolean(errors.email)} className={field.input} />
        {errors.email && <p className={field.error}>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="new-password" className={field.label}>
          Temporary password
        </label>
        <input
          id="new-password"
          name="password"
          type="password"
          required
          minLength={10}
          autoComplete="new-password"
          aria-invalid={Boolean(errors.password)}
          className={field.input}
        />
        <p className={errors.password ? field.error : field.help}>{errors.password ?? "At least 10 characters. They can change it under My account."}</p>
      </div>
      <div>
        <label htmlFor="new-role" className={field.label}>
          Role
        </label>
        <select id="new-role" name="role" defaultValue="Admin" className={field.input}>
          <option value="Admin">Admin — edit content &amp; inbox</option>
          <option value="Owner">Owner — also manages team &amp; activity log</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <button type="submit" className={btn.primary} disabled={pending}>
          {pending ? "Adding…" : "Add team member"}
        </button>
        <Status state={state} />
      </div>
    </form>
  );
}

export function EditTeamMemberForm({
  role,
  status,
  action,
  isSelf,
}: {
  role: string;
  status: string;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  isSelf: boolean;
}) {
  const [state, formAction, pending] = useActionState(action, idleState);
  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3">
      <label className="text-xs font-semibold text-text-muted">
        Role
        <select name="role" defaultValue={role} className="mt-1 block rounded-lg border border-black/15 bg-white px-2.5 py-1.5 text-sm text-text">
          <option value="Admin">Admin</option>
          <option value="Owner">Owner</option>
        </select>
      </label>
      <label className="text-xs font-semibold text-text-muted">
        Status
        <select
          name="status"
          defaultValue={status}
          disabled={isSelf}
          className="mt-1 block rounded-lg border border-black/15 bg-white px-2.5 py-1.5 text-sm text-text disabled:opacity-60"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {isSelf && <input type="hidden" name="status" value={status} />}
      </label>
      <label className="text-xs font-semibold text-text-muted">
        Reset password
        <input
          name="password"
          type="password"
          minLength={10}
          autoComplete="new-password"
          placeholder="Leave blank to keep"
          className="mt-1 block w-44 rounded-lg border border-black/15 bg-white px-2.5 py-1.5 text-sm text-text"
        />
      </label>
      <button type="submit" className={btn.small} disabled={pending}>
        {pending ? "Saving…" : "Save"}
      </button>
      <Status state={state} />
    </form>
  );
}
