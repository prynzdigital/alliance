"use client";

import { useActionState, useState } from "react";
import { SETTING_GROUPS } from "@/lib/cms/settings";
import { idleState, type ActionState } from "@/lib/admin/types";
import { btn, field as fieldCls } from "./ui";

export function SettingsForm({
  groupSlug,
  values,
  action,
}: {
  groupSlug: string;
  values: Record<string, string>;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const group = SETTING_GROUPS.find((g) => g.slug === groupSlug)!;
  const [state, formAction, pending] = useActionState(action, idleState);
  const errors = state.fieldErrors ?? {};

  // Remount fields after each save so they show what was just saved (or, on
  // an error, what was just typed) rather than React's post-action reset.
  const [version, setVersion] = useState(0);
  const [lastState, setLastState] = useState(state);
  if (lastState !== state) {
    setLastState(state);
    setVersion((v) => v + 1);
  }
  const current = state.values ?? values;

  return (
    <form action={formAction} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6" noValidate>
      {state.status !== "idle" && (
        <p
          role={state.status === "error" ? "alert" : "status"}
          className={`mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${
            state.status === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          {state.message}
        </p>
      )}
      <div className="flex flex-col gap-5">
        {group.fields.map((f) => {
          const id = `s-${f.key}`;
          const error = errors[f.key];
          const props = {
            id,
            name: f.key,
            defaultValue: current[f.key] ?? "",
            "aria-invalid": Boolean(error),
            "aria-describedby": [f.help ? `${id}-help` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined,
            className: fieldCls.input,
          };
          return (
            <div key={`${f.key}-${version}`}>
              <label htmlFor={id} className={fieldCls.label}>
                {f.label}
              </label>
              {f.type === "textarea" ? (
                <textarea {...props} rows={4} />
              ) : (
                <input {...props} type={f.type === "tel" ? "tel" : f.type === "email" ? "email" : f.type === "url" ? "url" : "text"} />
              )}
              <p id={`${id}-help`} className={fieldCls.help}>
                {f.help ? `${f.help} ` : ""}
                {f.default.length <= 80 && <span className="text-text-muted/80">Default: {f.default || "(blank)"}</span>}
              </p>
              {error && (
                <p id={`${id}-error`} className={fieldCls.error}>
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center gap-3 border-t border-black/5 pt-5">
        <button type="submit" className={btn.primary} disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </button>
        <p className="text-xs text-text-muted">Changes go live on the website as soon as you save.</p>
      </div>
    </form>
  );
}
