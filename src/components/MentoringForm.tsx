"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitPublicForm } from "@/app/actions/forms";
import { Button } from "@/components/ui/Button";
import { FieldError, FormStatus, Honeypot, initialFormState, inputClass } from "@/components/forms/FormParts";

export function MentoringForm() {
  const [state, formAction, pending] = useActionState(submitPublicForm.bind(null, "mentoring"), initialFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = state.fieldErrors ?? {};

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="relative flex flex-col gap-5">
      <Honeypot />
      <div>
        <label htmlFor="mentoring-name" className="block text-sm font-medium text-text">
          Name <span className="font-normal text-text-muted">(optional)</span>
        </label>
        <input id="mentoring-name" name="name" type="text" autoComplete="name" className={inputClass} />
      </div>

      <div>
        <label htmlFor="mentoring-contact" className="block text-sm font-medium text-text">
          Best way to reach you — phone or email
        </label>
        <input
          id="mentoring-contact"
          name="contact"
          type="text"
          required
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={errors.contact ? "mentoring-contact-error" : undefined}
          className={inputClass}
        />
        <FieldError id="mentoring-contact-error" message={errors.contact} />
      </div>

      <div>
        <label htmlFor="mentoring-message" className="block text-sm font-medium text-text">
          What&rsquo;s going on?{" "}
          <span className="font-normal text-text-muted">(optional — share as much or as little as you want)</span>
        </label>
        <textarea id="mentoring-message" name="message" rows={4} className={inputClass} />
      </div>

      <Button type="submit" className="self-start" disabled={pending}>
        {pending ? "Sending…" : "Reach Out"}
      </Button>

      <FormStatus state={state} />
    </form>
  );
}
