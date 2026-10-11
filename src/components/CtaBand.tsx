import Link from "next/link";
import { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

type Action = { label: string; href: string };

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function ArrowPillLink({ label, href }: Action) {
  const className =
    "group inline-flex shrink-0 items-center gap-4 rounded-full bg-secondary py-2 pl-6 pr-2 text-sm font-bold text-text transition-colors hover:bg-secondary-dark";
  const content = (
    <>
      {label}
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-text text-white transition-transform group-hover:translate-x-0.5">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );
  if (isExternal(href)) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={className}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

// Full-bleed photo band with a headline and a gold pill call-to-action.
// Must be rendered outside <Container> so it can span the full width.
export function CtaBand({
  eyebrow,
  title,
  children,
  image,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  image: string;
  primary: Action;
  secondary?: Action;
}) {
  return (
    <Reveal>
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-16 md:py-24"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div aria-hidden className="absolute inset-0 bg-text/80" />
        <div className="relative mx-auto flex max-w-(--container-content) flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <SectionHeading eyebrow={eyebrow} title={title} light />
            {children && <div className="mt-4 text-sm text-white/85">{children}</div>}
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <ArrowPillLink {...primary} />
            {secondary && (
              <Link
                href={secondary.href}
                className="text-sm font-bold text-white underline-offset-4 transition-colors hover:text-secondary hover:underline"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
