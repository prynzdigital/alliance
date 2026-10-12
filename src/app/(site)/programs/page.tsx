import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CheckIcon } from "@/components/programs/PillarSections";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { pillars } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Our Programs",
  description: "SOC Alliance's four program pillars: Scholarship, Economic Development, Community, and Health.",
};

const tintBg = (color: string, pct = 14) => ({ backgroundColor: `color-mix(in srgb, ${color} ${pct}%, transparent)` });

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        title="Our Programs"
        description="Every program SOC Alliance runs falls under one of four pillars."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Programs" }]}
        image="/impact_bg.png"
        imageAlt="Community members joining hands together"
      >
        <nav aria-label="Program pillars" className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          {pillars.map((p, i) => (
            <span key={p.slug} className="flex items-center gap-4">
              {i > 0 && <span className="hidden h-4 w-px bg-white/40 sm:block" aria-hidden />}
              <a href={`#${p.slug}`} className="text-sm font-bold text-white transition-colors hover:text-white/70">
                {p.name}
              </a>
            </span>
          ))}
        </nav>
      </PageHeader>

      {/* Overview: one tile per pillar */}
      <Container className="py-14 md:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow="How We Work" title="Four Pillars, One Mission" align="center" />
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            SOC Alliance believes in a four pillar plan to uplift the community: Scholarship, Economic
            Development, Community, and Health. Each pillar has its own named programs.
          </p>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <li key={p.slug}>
                <Reveal delay={i * 60}>
                  <a
                    href={`#${p.slug}`}
                    className="group flex h-full flex-col items-start rounded-3xl border border-black/5 bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span className="flex w-full items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl" style={tintBg(p.colorVar)}>
                        <Icon className="h-6 w-6" style={{ color: p.colorVar }} />
                      </span>
                      <span className="text-3xl font-extrabold text-black/10" style={{ fontFamily: "var(--font-heading)" }} aria-hidden>
                        0{i + 1}
                      </span>
                    </span>
                    <span className="mt-4 font-bold text-text group-hover:text-primary">{p.name}</span>
                    <span className="mt-1 text-xs leading-relaxed text-text-muted">{p.subPrograms.length} program areas</span>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>

      {/* One feature row per pillar, alternating sides */}
      {pillars.map((p, i) => {
        const Icon = p.icon;
        const reversed = i % 2 === 1;
        return (
          <section key={p.slug} id={p.slug} className={`scroll-mt-28 py-14 md:py-20 ${i % 2 === 0 ? "bg-surface" : ""}`}>
            <Container>
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className={`relative ${reversed ? "lg:order-2" : ""}`}>
                  <div
                    aria-hidden
                    className={`absolute -bottom-4 hidden h-full w-full rounded-3xl sm:block ${reversed ? "-left-4" : "-right-4"}`}
                    style={tintBg(p.colorVar, 30)}
                  />
                  <Link href={`/programs/${p.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                    <Image
                      src={p.feature.src}
                      alt={p.feature.alt}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span
                      className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold tracking-widest text-text backdrop-blur"
                      aria-hidden
                    >
                      PILLAR 0{i + 1}
                    </span>
                  </Link>
                </Reveal>

                <Reveal delay={75} className={reversed ? "lg:order-1" : ""}>
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl" style={tintBg(p.colorVar)}>
                    <Icon className="h-7 w-7" style={{ color: p.colorVar }} />
                  </span>
                  <h2 className="mt-5 text-3xl font-extrabold leading-[1.1] text-text sm:text-4xl">{p.name}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted">{p.summary}</p>
                  <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                    {p.subPrograms.map((sub) => (
                      <li key={sub} className="flex items-center gap-3 text-sm font-semibold text-text">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={tintBg(p.colorVar, 20)}>
                          <CheckIcon className="h-3.5 w-3.5" style={{ color: p.colorVar }} />
                        </span>
                        {sub}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/programs/${p.slug}`}
                    className="group mt-8 inline-flex items-center gap-4 rounded-full bg-text py-2 pl-6 pr-2 text-sm font-bold text-white transition-colors hover:bg-primary"
                  >
                    Explore {p.name}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-text transition-transform group-hover:translate-x-0.5">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}

      <CtaBand
        eyebrow="Get Involved"
        title="Be Part of the Work"
        image="/volunteer.jpg"
        primary={{ label: "Volunteer With Us", href: "/get-involved#volunteer" }}
        secondary={{ label: "Or make a donation", href: "/donate" }}
      >
        <p>Volunteer across any of the four pillars, or give to support the programs that matter most to you.</p>
      </CtaBand>
    </>
  );
}
