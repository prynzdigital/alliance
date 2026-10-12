"use client";

import { useActionState } from "react";
import { SUBMISSION_STATUSES, idleState, type ActionState } from "@/lib/admin/types";
import { btn, field } from "./ui";

export function SubmissionForm({
  status,
  notes,
  action,
}: {
  status: string;
  notes: string;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, idleState);
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="status" className={field.label}>
          Status
        </label>
        <select id="status" name="status" defaultValue={status} className={field.input}>
          {SUBMISSION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="admin_notes" className={field.label}>
          Internal notes
        </label>
        <textarea
          id="admin_notes"
          name="admin_notes"
          rows={5}
          defaultValue={notes}
          placeholder="Who's following up, what was said…"
          className={field.input}
        />
        <p className={field.help}>Only visible to admins.</p>
      </div>
      <button type="submit" className={btn.primary} disabled={pending}>
        {pending ? "Saving…" : "Save"}
      </button>
      {state.status !== "idle" && (
        <p role="status" className={`text-sm font-semibold ${state.status === "error" ? "text-red-700" : "text-emerald-700"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
