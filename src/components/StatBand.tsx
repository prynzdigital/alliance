import Image from "next/image";
import type { ReactNode, SVGProps } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      {children}
    </svg>
  );
}

const ICONS = {
  scholarship: (p: IconProps) => (
    <Svg {...p}>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6" />
    </Svg>
  ),
  shield: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 3.5 5 6v5.5c0 4.2 2.9 7.6 7 8.5 4.1-.9 7-4.3 7-8.5V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  ),
  heart: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 20s-7-4.4-9.2-9A5 5 0 0 1 12 6a5 5 0 0 1 9.2 5c-2.2 4.6-9.2 9-9.2 9Z" />
    </Svg>
  ),
  calendar: (p: IconProps) => (
    <Svg {...p}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4M8 13.5h.01M12 13.5h.01M16 13.5h.01M8 17h.01M12 17h.01" />
    </Svg>
  ),
  handshake: (p: IconProps) => (
    <Svg {...p}>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8" />
    </Svg>
  ),
  chart: (p: IconProps) => (
    <Svg {...p}>
      <path d="M3 3v18h18" />
      <path d="m7 15 4-5 4 3 5-7" />
    </Svg>
  ),
} as const;

export type StatIcon = keyof typeof ICONS;
export type StatItem = { value: string; label: string; icon?: StatIcon };

// Full-width navy band for headline figures: soft glows, an optional faded
// photo, and frosted cards with gold icons and gold-gradient numbers. Every
// value passed in must be a verified fact (see
// docs/discovery/20_Client_Input_Required.md before adding new ones).
export function StatBand({
  eyebrow,
  title,
  intro,
  items,
  image,
  footer,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  items: StatItem[];
  /** Optional photo, heavily faded into the navy background. */
  image?: string;
  footer?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-text py-16 text-white md:py-24">
      {image && <Image src={image} alt="" fill sizes="100vw" aria-hidden className="-z-10 object-cover opacity-15" />}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-text via-text/95 to-primary/60" />
      <div aria-hidden className="absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 -right-20 -z-10 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />

      <div className="mx-auto max-w-(--container-content) px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow={eyebrow} title={title} light align="center" />
          {intro && <div className="mt-4 text-sm leading-relaxed text-white/75">{intro}</div>}
        </Reveal>

        <dl className={`mt-12 grid grid-cols-1 gap-5 ${items.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {items.map((item, i) => {
            const Icon = item.icon ? ICONS[item.icon] : null;
            return (
              <Reveal key={item.label} delay={i * 90}>
                <div className="group relative flex h-full flex-col-reverse overflow-hidden rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09] hover:ring-secondary/40">
                  <span aria-hidden className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent" />
                  <dt className="mt-3 text-sm leading-relaxed text-white/75">{item.label}</dt>
                  <dd className="flex flex-col gap-5">
                    {Icon && (
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/15 text-secondary ring-1 ring-secondary/30">
                        <Icon className="h-6 w-6" />
                      </span>
                    )}
                    <span
                      className="bg-gradient-to-br from-[#f3d98b] via-secondary to-[#c48a1c] bg-clip-text text-5xl font-extrabold leading-none tracking-tight text-transparent md:text-6xl"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {item.value}
                    </span>
                  </dd>
                </div>
              </Reveal>
            );
          })}
        </dl>

        {footer && <Reveal delay={200} className="mt-10 text-center">{footer}</Reveal>}
      </div>
    </section>
  );
}
