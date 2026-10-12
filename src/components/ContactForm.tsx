"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitPublicForm } from "@/app/actions/forms";
import { Button } from "@/components/ui/Button";
import { FieldError, FormStatus, Honeypot, initialFormState, inputClass } from "@/components/forms/FormParts";

const intents = [
  { value: "General inquiry", label: "General inquiry" },
  { value: "Program application question", label: "Program application question" },
  { value: "Media / press", label: "Media / press" },
  { value: "Volunteering", label: "Volunteering" },
  { value: "Donor / partnership", label: "Donor / partnership" },
];

// Submissions land in the admin dashboard's Inbox (and are emailed to the
// organization once email sending is configured).
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitPublicForm.bind(null, "contact"), initialFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = state.fieldErrors ?? {};

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="relative flex flex-col gap-5">
      <Honeypot />
      <div>
        <label htmlFor="contact-intent" className="block text-sm font-medium text-text">
          What&rsquo;s this about?
        </label>
        <select id="contact-intent" name="topic" required className={inputClass}>
          {intents.map((intent) => (
            <option key={intent.value} value={intent.value}>
              {intent.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-text">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={inputClass}
        />
        <FieldError id="contact-name-error" message={errors.name} />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-text">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={inputClass}
        />
        <FieldError id="contact-email-error" message={errors.email} />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-text">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={inputClass}
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      <Button type="submit" className="self-start" disabled={pending}>
        {pending ? "Sending…" : "Send Message"}
      </Button>

      <FormStatus state={state} />
    </form>
  );
}
