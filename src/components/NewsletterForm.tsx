import { Button } from "@/components/ui/Button";

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
  buttonVariant?: "primary" | "outlineInverse";
}) {
  const inputId = `${idPrefix}-newsletter-email`;
  return (
    <div>
      <form
        className={`flex flex-col gap-2 ${stacked ? "" : "sm:flex-row"}`}
        aria-label="Newsletter signup"
      >
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={`w-full rounded-button border bg-background px-3 py-2 text-sm text-text ${
            stacked ? "" : "sm:max-w-xs"
          } ${dark ? "border-white/30" : "border-black/15"}`}
        />
        <Button type="submit" size="sm" variant={buttonVariant} className={stacked ? "w-full" : ""}>
          Sign up
        </Button>
      </form>
      <p className={`mt-2 text-xs ${dark ? "text-white/60" : "text-text-muted"}`}>
        [PENDING: newsletter provider integration — see docs/discovery/20_Client_Input_Required.md]
      </p>
    </div>
  );
}
