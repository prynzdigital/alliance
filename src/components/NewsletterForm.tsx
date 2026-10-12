"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitPublicForm } from "@/app/actions/forms";
import { Button } from "@/components/ui/Button";
import { FormStatus, Honeypot, initialFormState } from "@/components/forms/FormParts";

// Signups are stored in the admin Inbox (Newsletter), where they can be
// exported as a CSV for whichever mailing tool SOC Alliance uses.
export function NewsletterForm({
  idPrefix,
  dark = false,
  stacked = false,
  buttonVariant = "primary",
}: {
  idPrefix: string;
  dark?: boolean;
  /** Force a vertical layout even at wider viewports — for narrow columns. */
  stacked?: boolean;
  buttonVariant?: "primary" | "secondary" | "outlineInverse";
}) {
  const [state, formAction, pending] = useActionState(submitPublicForm.bind(null, "newsletter"), initialFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const inputId = `${idPrefix}-newsletter-email`;

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <div>
      <form
        ref={formRef}
        action={formAction}
        className={`relative flex flex-col gap-2 ${stacked ? "" : "sm:flex-row"}`}
        aria-label="Newsletter signup"
      >
        <Honeypot />
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={`w-full rounded-button border bg-background px-3 py-2 text-sm text-text ${
            stacked ? "" : "sm:max-w-xs"
          } ${dark ? "border-white/30" : "border-black/15"}`}
        />
        <Button
          type="submit"
          size="sm"
          variant={buttonVariant}
          className={stacked ? "w-full" : ""}
          disabled={pending}
        >
          {pending ? "Signing up…" : "Sign up"}
        </Button>
      </form>
      <div className="mt-2">
        <FormStatus state={state} dark={dark} />
      </div>
    </div>
  );
}
