"use client";

import { FormEvent, useState } from "react";
import { buildMailtoHref } from "@/lib/mailto";
import { Button } from "@/components/ui/Button";

const CONTACT_EMAIL = "info@socalliance.org";

export function MentoringForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.toString() || "Not provided";
    const contact = form.get("contact")?.toString() ?? "";
    const message = form.get("message")?.toString() || "Not provided";

    const subject = "Mentoring & Life Coaching — reaching out";
    const body = `Name: ${name}\nBest way to reach me: ${contact}\nMessage: ${message}`;
    window.location.href = buildMailtoHref(CONTACT_EMAIL, subject, body);
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="mentoring-name" className="block text-sm font-medium text-text">
          Name <span className="font-normal text-text-muted">(optional)</span>
        </label>
        <input
          id="mentoring-name"
          name="name"
          type="text"
          className="mt-1 w-full rounded-button border border-black/15 bg-background px-3 py-2 text-sm text-text"
        />
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
          aria-required="true"
          className="mt-1 w-full rounded-button border border-black/15 bg-background px-3 py-2 text-sm text-text"
        />
      </div>

      <div>
        <label htmlFor="mentoring-message" className="block text-sm font-medium text-text">
          What&rsquo;s going on? <span className="font-normal text-text-muted">(optional — share as much or as little as you want)</span>
        </label>
        <textarea
          id="mentoring-message"
          name="message"
          rows={4}
          className="mt-1 w-full rounded-button border border-black/15 bg-background px-3 py-2 text-sm text-text"
        />
      </div>

      <Button type="submit" className="self-start">
        Reach Out
      </Button>

      <p role="status" className="text-sm text-text-muted">
        {submitted
          ? `Your email app should now be open, ready to send to ${CONTACT_EMAIL}. Someone will follow up using the contact info you shared.`
          : `Online submission isn't wired up yet — this opens your email app pre-filled to ${CONTACT_EMAIL}. Prefer to talk now? Call us directly below.`}
      </p>
    </form>
  );
}
