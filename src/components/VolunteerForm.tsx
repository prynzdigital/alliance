"use client";

import { FormEvent, useState } from "react";
import { buildMailtoHref } from "@/lib/mailto";
import { pillars } from "@/lib/programs";
import { Button } from "@/components/ui/Button";

const CONTACT_EMAIL = "info@socalliance.org";

export function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.toString() ?? "";
    const email = form.get("email")?.toString() ?? "";
    const pillar = form.get("pillar")?.toString() ?? "";
    const availability = form.get("availability")?.toString() ?? "";

    const subject = `Volunteer interest from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nPillar of interest: ${pillar}\nAvailability / notes: ${availability}`;
    window.location.href = buildMailtoHref(CONTACT_EMAIL, subject, body);
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="volunteer-name" className="block text-sm font-medium text-text">
          Name
        </label>
        <input
          id="volunteer-name"
          name="name"
          type="text"
          required
          aria-required="true"
          className="mt-1 w-full rounded-button border border-black/15 bg-background px-3 py-2 text-sm text-text"
        />
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
          aria-required="true"
          className="mt-1 w-full rounded-button border border-black/15 bg-background px-3 py-2 text-sm text-text"
        />
      </div>

      <div>
        <label htmlFor="volunteer-pillar" className="block text-sm font-medium text-text">
          Which pillar interests you most?
        </label>
        <select
          id="volunteer-pillar"
          name="pillar"
          required
          className="mt-1 w-full rounded-button border border-black/15 bg-background px-3 py-2 text-sm text-text"
        >
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
        <textarea
          id="volunteer-availability"
          name="availability"
          rows={4}
          className="mt-1 w-full rounded-button border border-black/15 bg-background px-3 py-2 text-sm text-text"
        />
      </div>

      <Button type="submit" className="self-start">
        Continue to Email
      </Button>

      <p role="status" className="text-sm text-text-muted">
        {submitted
          ? `Your email app should now be open with this message ready to send to ${CONTACT_EMAIL}.`
          : `Online submission isn't wired up yet — this opens your email app with your interest pre-filled to ${CONTACT_EMAIL}.`}
      </p>
    </form>
  );
}
