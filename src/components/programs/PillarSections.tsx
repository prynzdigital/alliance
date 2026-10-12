import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Container } from "@/components/layout/Container";
import { pillars, type Pillar } from "@/lib/programs";

export function CheckIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

const tintBg = (color: string, pct = 14) => ({ backgroundColor: `color-mix(in srgb, ${color} ${pct}%, transparent)` });

/** Pillar switcher shown inside the page header. */
export function PillarNav({ current }: { current: string }) {
  return (
    <nav aria-label="Program pillars" className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
      <Link href="/programs" className="text-sm font-bold text-white/80 transition-colors hover:text-white">
        All Programs
      </Link>
      {pillars.map((p) => (
        <span key={p.slug} className="flex items-center gap-4">
          <span className="hidden h-4 w-px bg-white/40 sm:block" aria-hidden />
          <Link
            href={`/programs/${p.slug}`}
            aria-current={p.slug === current ? "page" : undefined}
            className={`text-sm font-bold transition-colors ${
              p.slug === current ? "text-white underline decoration-2 underline-offset-8" : "text-white/80 hover:text-white"
            }`}
          >
            {p.name}
          </Link>
        </span>
      ))}
    </nav>
  );
}

/** Intro: what this pillar covers, its named programs, and a feature photo. */
export function WhatWeDo({
  pillar,
  children,
  photo,
}: {
  pillar: Pillar;
  children: ReactNode;
  photo: { src: string; alt: string };
}) {
  const Icon = pillar.icon;
  return (
    <Container className="py-14 md:py-20">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl" style={tintBg(pillar.colorVar)}>
            <Icon className="h-7 w-7" style={{ color: pillar.colorVar }} />
          </span>
          <SectionHeading eyebrow={`${pillar.name} Pillar`} title="What We Do" className="mt-5" />
          <div className="mt-4 flex max-w-xl flex-col gap-3 text-sm leading-relaxed text-text-muted">{children}</div>

          <h3 className="mt-8 text-xs font-bold uppercase tracking-widest text-text">Programs include</h3>
          <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {pillar.subPrograms.map((sub) => (
              <li key={sub} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-background px-4 py-3 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={tintBg(pillar.colorVar, 18)}>
                  <CheckIcon className="h-4 w-4" style={{ color: pillar.colorVar }} />
                </span>
                <span className="text-sm font-semibold text-text">{sub}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={75} className="relative">
          <div aria-hidden className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-3xl sm:block" style={tintBg(pillar.colorVar, 30)} />
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </Container>
  );
}

export type Highlight = { date: string; place?: string; title: string; body: ReactNode; image?: { src: string; alt: string } };

/** "Past Highlights": real past events under this pillar, as dated cards. */
export function Highlights({ pillar, items, title = "Past Highlights" }: { pillar: Pillar; items: Highlight[]; title?: string }) {
  return (
    <section className="bg-surface py-14 md:py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="From Our Calendar" title={title} />
        </Reveal>
        <ul className={`mt-8 grid grid-cols-1 gap-6 ${items.length > 1 ? "md:grid-cols-2" : "max-w-3xl"}`}>
          {items.map((h, i) => (
            <li key={h.title}>
              <Reveal delay={i * 75} className="flex h-full flex-col overflow-hidden rounded-3xl bg-background shadow-md ring-1 ring-black/5 sm:flex-row">
                {h.image && (
                  <div className="relative aspect-[16/10] shrink-0 sm:aspect-auto sm:w-2/5">
                    <Image src={h.image.src} alt={h.image.alt} fill sizes="(min-width: 768px) 20vw, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-text" style={tintBg(pillar.colorVar, 18)}>
                    {h.date}
                    {h.place && <span className="font-medium text-text-muted">· {h.place}</span>}
                  </p>
                  <h3 className="mt-3 text-lg">{h.title}</h3>
                  <div className="mt-2 text-sm leading-relaxed text-text-muted">{h.body}</div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** A featured program block (e.g. Talent Hunt, SVPI): photo + rich text side by side. */
export function FeatureProgram({
  eyebrow,
  title,
  image,
  children,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  image: { src: string; alt: string; contain?: boolean };
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <Container className="py-14 md:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface shadow-xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className={image.contain ? "object-contain" : "object-cover"}
            />
          </div>
        </Reveal>
        <Reveal delay={75} className={reverse ? "lg:order-1" : ""}>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <div className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-text-muted">{children}</div>
        </Reveal>
      </div>
    </Container>
  );
}

/** Links to the other three pillars, then a closing call to action. */
export function PillarFooter({ pillar }: { pillar: Pillar }) {
  const others = pillars.filter((p) => p.slug !== pillar.slug);
  return (
    <>
      <Container className="py-14 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Four Pillars, One Mission" title="Explore Our Other Programs" />
        </Reveal>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {others.map((p, i) => {
            const Icon = p.icon;
            return (
              <li key={p.slug}>
                <Reveal delay={i * 75}>
                  <Link href={`/programs/${p.slug}`} className="group block overflow-hidden rounded-3xl bg-background shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={p.feature.src} alt={p.feature.alt} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                        <Icon className="h-5 w-5" style={{ color: p.colorVar }} />
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="font-bold text-text group-hover:text-primary">{p.name}</p>
                      <p className="mt-1 text-sm text-text-muted">{p.summary}</p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>

      <CtaBand
        eyebrow="Get Involved"
        title={`Support Our ${pillar.name} Programs`}
        image={pillar.feature.src}
        primary={{ label: "Volunteer With Us", href: "/get-involved#volunteer" }}
        secondary={{ label: `Donate to ${pillar.name} programs`, href: "/donate" }}
      >
        <p>Volunteers and donors help keep these programs running. There&rsquo;s a place for you.</p>
      </CtaBand>
    </>
  );
}
