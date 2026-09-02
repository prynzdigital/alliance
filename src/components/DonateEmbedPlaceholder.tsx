// Donorbox is the confirmed payment processor (docs/discovery/14_Technical_Architecture.md),
// but embedding the live widget needs account access that hasn't been granted yet
// (docs/discovery/20_Client_Input_Required.md, item 17). This renders the intended
// layout inertly and offers a working fallback in the meantime.
export function DonateEmbedPlaceholder() {
  return (
    <div className="rounded-card border border-black/10 bg-surface p-6">
      <div
        className="pointer-events-none flex flex-col gap-4 opacity-50"
        aria-hidden="true"
      >
        <div className="flex overflow-hidden rounded-button border border-black/15">
          <span className="flex-1 bg-primary px-4 py-2 text-center text-sm font-semibold text-white">
            One-Time
          </span>
          <span className="flex-1 px-4 py-2 text-center text-sm font-semibold text-text">
            Monthly
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["$25", "$50", "$100", "$250"].map((amount) => (
            <span
              key={amount}
              className="rounded-button border border-black/15 py-2 text-center text-sm font-semibold text-text"
            >
              {amount}
            </span>
          ))}
        </div>
        <span className="rounded-button bg-accent py-3 text-center text-sm font-semibold text-white">
          Give Now
        </span>
      </div>

      <div className="mt-5 border-t border-black/10 pt-4">
        <p className="text-sm font-semibold text-text-muted">
          [PENDING: Donorbox account access to embed live giving — see
          docs/discovery/20_Client_Input_Required.md, item 17]
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Want to give today?{" "}
          <a href="mailto:info@socalliance.org" className="font-semibold text-primary hover:underline">
            Email us
          </a>{" "}
          or call{" "}
          <a href="tel:+17736932222" className="font-semibold text-primary hover:underline">
            773-693-2222
          </a>
          .
        </p>
      </div>
    </div>
  );
}
