"use client";

import { FormEvent, useState } from "react";
import { buildMailtoHref } from "@/lib/mailto";
import { Button } from "@/components/ui/Button";

const intents = [
  { value: "general", label: "General inquiry" },
  { value: "program", label: "Program application question" },
  { value: "media", label: "Media / press" },
  { value: "volunteer", label: "Volunteering" },
  { value: "partnership", label: "Donor / partnership" },
];

const CONTACT_EMAIL = "info@socalliance.org";

// No transactional email service is wired up yet (pending client preference —
// see docs/discovery/20_Client_Input_Required.md). Until then, submitting
// opens the visitor's email client with the message pre-filled rather than
// silently failing or faking a "message sent" state.
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const intentLabel =
      intents.find((i) => i.value === form.get("intent"))?.label ?? "General inquiry";
    const name = form.get("name")?.toString() ?? "";
    const email = form.get("email")?.toString() ?? "";
    const message = form.get("message")?.toString() ?? "";

    const subject = `[${intentLabel}] Message from ${name}`;
    const body = `${message}\n\n---\nName: ${name}\nEmail: ${email}\nTopic: ${intentLabel}`;
    window.location.href = buildMailtoHref(CONTACT_EMAIL, subject, body);
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate={false}>
      <div>
        <label htmlFor="contact-intent" className="block text-sm font-medium text-text">
          What&rsquo;s this about?
        </label>
        <select
          id="contact-intent"
          name="intent"
          required
          className="mt-1 w-full rounded-button border border-black/15 bg-background px-3 py-2 text-sm text-text"
        >
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
          aria-required="true"
          className="mt-1 w-full rounded-button border border-black/15 bg-background px-3 py-2 text-sm text-text"
        />
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
          aria-required="true"
          className="mt-1 w-full rounded-button border border-black/15 bg-background px-3 py-2 text-sm text-text"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-text">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          aria-required="true"
          rows={5}
          className="mt-1 w-full rounded-button border border-black/15 bg-background px-3 py-2 text-sm text-text"
        />
      </div>

      <Button type="submit" className="self-start">
        Continue to Email
      </Button>

      <p role="status" className="text-sm text-text-muted">
        {submitted
          ? `Your email app should now be open with this message ready to send to ${CONTACT_EMAIL}.`
          : `Online submission isn't wired up yet — this opens your email app with your message pre-filled to ${CONTACT_EMAIL}.`}
      </p>
    </form>
  );
}
