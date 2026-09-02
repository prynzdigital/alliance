import { Button } from "@/components/ui/Button";

export function NewsletterForm({ idPrefix, dark = false }: { idPrefix: string; dark?: boolean }) {
  const inputId = `${idPrefix}-newsletter-email`;
  return (
    <div>
      <form className="flex flex-col gap-2 sm:flex-row" aria-label="Newsletter signup">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={`w-full rounded-button border bg-background px-3 py-2 text-sm text-text sm:max-w-xs ${
            dark ? "border-white/30" : "border-black/15"
          }`}
        />
        <Button type="submit" size="sm">
          Sign up
        </Button>
      </form>
      <p className={`mt-2 text-xs ${dark ? "text-white/60" : "text-text-muted"}`}>
        [PENDING: newsletter provider integration — see docs/discovery/20_Client_Input_Required.md]
      </p>
    </div>
  );
}
