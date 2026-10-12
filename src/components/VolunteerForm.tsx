"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitPublicForm } from "@/app/actions/forms";
import { pillars } from "@/lib/programs";
import { Button } from "@/components/ui/Button";
import { FieldError, FormStatus, Honeypot, initialFormState, inputClass } from "@/components/forms/FormParts";

export function VolunteerForm() {
  const [state, formAction, pending] = useActionState(submitPublicForm.bind(null, "volunteer"), initialFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = state.fieldErrors ?? {};

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="relative flex flex-col gap-5">
      <Honeypot />
      <div>
        <label htmlFor="volunteer-name" className="block text-sm font-medium text-text">
          Name
        </label>
        <input
          id="volunteer-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "volunteer-name-error" : undefined}
          className={inputClass}
        />
        <FieldError id="volunteer-name-error" message={errors.name} />
      </div>

      <div>
        <label htmlFor="volunteer-email" className="block text-sm font-medium text-text">
          Email
        </label>
        <input
          id="volunteer-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "volunteer-email-error" : undefined}
          className={inputClass}
        />
        <FieldError id="volunteer-email-error" message={errors.email} />
      </div>

      <div>
        <label htmlFor="volunteer-pillar" className="block text-sm font-medium text-text">
          Which pillar interests you most?
        </label>
        <select id="volunteer-pillar" name="topic" required className={inputClass}>
          {pillars.map((pillar) => (
            <option key={pillar.slug} value={pillar.name}>
              {pillar.name}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="volunteer-availability" className="block text-sm font-medium text-text">
          Availability / notes
        </label>
        <textarea id="volunteer-availability" name="message" rows={4} className={inputClass} />
      </div>

      <Button type="submit" className="self-start" disabled={pending}>
        {pending ? "Sending…" : "Send"}
      </Button>

      <FormStatus state={state} />
    </form>
  );
}
