import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { Newsletter } from "@/lib/cms/defaults";

function DocIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" strokeLinejoin="round" />
      <path d="M14 3v5h5M9 13h6M9 17h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cover({ issue, sizes, className = "" }: { issue: Newsletter; sizes: string; className?: string }) {
  return (
    <div className={`relative aspect-[935/1210] overflow-hidden rounded-xl bg-white ${className}`}>
      {issue.cover ? (
        <Image
          src={issue.cover}
          alt={issue.coverAlt || `Cover of the ${issue.title}`}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary to-text p-6 text-center text-white">
          <DocIcon className="h-10 w-10 text-secondary" />
          <p className="text-lg font-extrabold">{issue.issueLabel}</p>
        </div>
      )}
    </div>
  );
}

// Newsletter issues on News & Events: the newest is featured with its "In this
// issue" list and Read/Download buttons; older issues follow as an archive.
export function NewsletterFeature({ newsletters }: { newsletters: Newsletter[] }) {
  const [latest, ...past] = newsletters;
  if (!latest) return null;

  return (
    <section id="newsletter" className="relative isolate scroll-mt-32 overflow-hidden bg-text py-16 text-white md:py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: [
            "radial-gradient(45% 50% at 10% 10%, color-mix(in srgb, var(--color-primary) 35%, transparent), transparent)",
            "radial-gradient(40% 45% at 95% 90%, color-mix(in srgb, var(--color-secondary) 18%, transparent), transparent)",
          ].join(","),
        }}
      />
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <a
              href={latest.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mx-auto block w-full max-w-xs sm:max-w-sm"
            >
              <span aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-xl bg-secondary/80" />
              <span aria-hidden className="absolute inset-0 translate-x-2 translate-y-2 rotate-[1.5deg] rounded-xl bg-white/20" />
              <Cover
                issue={latest}
                sizes="(min-width: 1024px) 380px, 320px"
                className="shadow-2xl shadow-black/40 ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-rotate-1"
              />
              <span className="sr-only">Read the {latest.title} (PDF, opens in a new tab)</span>
            </a>
          </Reveal>

          <Reveal delay={75} className="order-1 lg:order-2">
            <SectionHeading eyebrow={`Our Newsletter · ${latest.issueLabel}`} title={latest.title} light />
            {latest.summary && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">{latest.summary}</p>}

            {latest.highlights.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-white/60">In this issue</p>
                <ol className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  {latest.highlights.map((item, i) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/90">
                      <span
                        aria-hidden
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-[11px] font-extrabold text-secondary"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="pt-0.5">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={latest.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-text shadow-lg shadow-secondary/20 transition hover:-translate-y-0.5 hover:bg-secondary-dark"
              >
                <DocIcon />
                Read the Newsletter
                <span className="sr-only">(PDF, opens in a new tab)</span>
              </a>
              <a
                href={latest.pdf}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
              >
                <DownloadIcon />
                Download PDF
              </a>
            </div>
          </Reveal>
        </div>

        {past.length > 0 && (
          <div className="mt-16 border-t border-white/10 pt-10">
            <h3 className="text-lg font-bold text-white">Past Issues</h3>
            <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {past.map((issue) => (
                <li key={issue.id ?? issue.pdf}>
                  <a href={issue.pdf} target="_blank" rel="noopener noreferrer" className="group block">
                    <Cover
                      issue={issue}
                      sizes="(min-width: 1024px) 200px, 45vw"
                      className="shadow-lg ring-1 ring-white/10 transition-transform group-hover:-translate-y-1"
                    />
                    <p className="mt-3 text-sm font-bold text-white group-hover:text-secondary">{issue.title}</p>
                    <p className="text-xs text-white/60">
                      {issue.issueLabel} · PDF<span className="sr-only">, opens in a new tab</span>
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
