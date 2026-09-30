import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";
import { Reveal } from "@/components/Reveal";
import { Card, CardImage } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { MissionIcon, ValuesIcon, VisionIcon } from "@/components/icons/AboutIcons";
import { pillars } from "@/lib/programs";

const ORG_ADDRESS = "6615 S. Kenwood Ave., Chicago, IL 60637";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about SOC Alliance's mission, vision, four pillars, and volunteer Board of Directors.",
};

const values = [
  {
    icon: MissionIcon,
    title: "Mission",
    body: "The Mission is to uplift and improve the life of the community.",
  },
  {
    icon: VisionIcon,
    title: "Vision",
    body: "The Vision is to create a community in which all people thrive and develop to their greatest potential.",
  },
  {
    icon: ValuesIcon,
    title: "Values",
    body: "We believe in a four pillar plan to uplift the community: Scholarship, Economic Development, Community, and Health.",
  },
];

// Roster and photos sourced directly from the live site (socalliance.org/board-of-directors)
// on 2026-08-30 — see docs/assets/board-photos/README.md for provenance and
// docs/discovery/02_Organization_Research.md, Section 4, for the Form 990
// discrepancies noted below. Officers listed first, then directors, purely
// for visual grouping — the underlying roster and titles are unchanged.
const officers = [
  { name: "Theodore Davis", title: "Board Chair", image: "/board/theodore-davis-board-chair.webp" },
  { name: "Ronald Hughes", title: "Executive Director", image: "/board/ronald-hughes-executive-director.webp" },
  { name: "Bruce Nash", title: "Treasurer", image: "/board/bruce-nash-treasurer.webp" },
];
const directors = [
  { name: "Dana O'Banion", title: "Director", image: "/board/dana-obanion-director.webp" },
  { name: "Dathon O'Banion", title: "Director", image: "/board/dathon-obanion-director.webp" },
  { name: "Stephen Coleman", title: "Director", image: "/board/stephen-coleman-director.webp" },
  { name: "Gerald McCarthy", title: "Director", image: "/board/gerald-mccarthy-director.webp" },
  { name: "Dejuan Lever", title: "Director", image: "/board/dejuan-lever-director.webp" },
];

function BoardCard({ person }: { person: { name: string; title: string; image: string } }) {
  return (
    <div className="group overflow-hidden rounded-card border border-black/10 bg-background shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square w-full bg-surface">
        <Image
          src={person.image}
          alt={`Portrait of ${person.name}, ${person.title} of SOC Alliance`}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="font-semibold text-text">{person.name}</p>
        <p className="text-sm font-medium text-secondary-dark">{person.title}</p>
      </div>
    </div>
  );
}

export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        title="Our Story"
        description="Our mission, vision, four pillars, and the volunteer Board of Directors behind them."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Our Story" }]}
        image="/impact.jpg"
        imageAlt="A raised fist clasped by another hand, with community members raising their hands together in the background"
      />

      {/* Sticky-feeling pill sub-nav */}
      <div className="border-b border-black/10 bg-surface">
        <Container className="flex flex-wrap gap-2 py-3">
          <a href="#our-story" className="rounded-full bg-background px-4 py-1.5 text-sm font-semibold text-text shadow-sm transition-colors hover:text-primary">
            Our Story
          </a>
          <a href="#pillars" className="rounded-full bg-background px-4 py-1.5 text-sm font-semibold text-text shadow-sm transition-colors hover:text-primary">
            Four Pillars
          </a>
          <a href="#leadership" className="rounded-full bg-background px-4 py-1.5 text-sm font-semibold text-text shadow-sm transition-colors hover:text-primary">
            Leadership &amp; Board
          </a>
        </Container>
      </div>

      <Container className="py-16 md:py-24">
      {/* Intro — photo + copy side by side */}
      <div id="our-story" className="grid scroll-mt-24 grid-cols-1 items-center gap-10 md:grid-cols-[45%_1fr]">
        <Reveal className="relative aspect-[4/3] w-full overflow-hidden rounded-card shadow-lg">
          <Image
            src="/community-2.jpg"
            alt="A group of young community members lying together in a circle, smiling"
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={75}>
          <SectionHeading eyebrow="Who We Are" title="A 501(c)(3) Rooted in Chicago’s South Side" />
          <p className="mt-4 text-lg text-text">
            Strengthening Our Community Alliance is a 501(c)(3) organization that provides
            scholarships and community services to the Woodlawn Community and greater Chicago.
            The Alliance utilizes its own facility in Woodlawn to hold meetings and conduct
            community service programs, and collaborates with the local community on numerous
            programs.
          </p>
        </Reveal>
      </div>
      </Container>

      {/* Mission / Vision / Values — full-bleed section with a faded,
          desaturated photo wash (same technique and photo as the reference
          build) instead of a flat white background. */}
      <Reveal>
        <section className="relative overflow-hidden bg-background py-16 md:py-24">
          <Image
            src="/svpi-fuller-park.webp"
            alt=""
            fill
            aria-hidden
            sizes="100vw"
            className="object-cover opacity-40"
            style={{ filter: "saturate(0.7)" }}
          />
          <div aria-hidden className="absolute inset-0 bg-background/55" />
          <div className="relative mx-auto max-w-(--container-content) px-6">
            <SectionHeading eyebrow="What Drives Us" title="Our Mission, Vision & Values" className="max-w-2xl" />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="rounded-card bg-background p-7 shadow-md">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-text">
                      <Icon className="h-7 w-7 text-secondary" />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-text">{value.title}</h3>
                    <p className="mt-2 text-text-muted">{value.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      <Container className="py-16 md:py-24">
      {/* Four Pillars — real photo cards linking to each program */}
      <div id="pillars" className="scroll-mt-24">
        <Reveal>
          <SectionHeading eyebrow="How We Work" title="Our Four Pillars" className="max-w-2xl" />
          <p className="mt-3 max-w-2xl text-text-muted">
            SOC Alliance organizes its work around four pillars, each with its own named programs.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.slug} delay={i * 75}>
                <Card href={`/programs/${pillar.slug}`} accentColor={pillar.colorVar} className="h-full">
                  <CardImage src={pillar.image} alt={pillar.imageAlt} />
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `color-mix(in srgb, ${pillar.colorVar} 14%, transparent)` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: pillar.colorVar }} />
                  </span>
                  <h3 className="mt-3 text-lg">{pillar.name}</h3>
                  <p className="mt-2 text-sm text-text-muted">{pillar.summary}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
                    Learn more &rarr;
                  </span>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>

      </Container>

      {/* Where We Work — full-width CTA band, breaking out of the container */}
      <Reveal>
        <section
          className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-16 md:py-24"
          style={{ backgroundImage: "url('/chicago.png')" }}
        >
          <div aria-hidden className="absolute inset-0 bg-text/80" />
          <div className="relative mx-auto flex max-w-(--container-content) flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <SectionHeading eyebrow="Where We Work" title="Woodlawn, Chicago — and Beyond" light />
              <p className="mt-4 text-white/85">
                SOC Alliance is based in Woodlawn on Chicago&rsquo;s South Side, where it holds
                meetings and runs community service programs out of its own facility, while
                collaborating with partners across greater Chicago.
              </p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ORG_ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-4 self-start rounded-full bg-secondary py-2 pl-6 pr-2 text-sm font-bold text-text transition-colors hover:bg-secondary-dark md:self-auto"
            >
              Get Directions
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-text text-white transition-transform group-hover:translate-x-0.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </section>
      </Reveal>

      <Container className="py-16 md:py-24">
      {/* Our History */}
      <Reveal className="max-w-3xl">
        <h2>Our History</h2>
        <div className="mt-3">
          <PendingNotice>
            <p>
              SOC Alliance&rsquo;s founding history is currently being confirmed with the
              organization. The current site states the organization was established in 1995,
              which does not align with its 2015 IRS tax-exempt ruling year, and public
              nonprofit registries suggest a possible — unconfirmed — connection to a
              predecessor entity. Neither claim will be published here until SOC Alliance
              confirms the accurate history.
            </p>
          </PendingNotice>
        </div>
      </Reveal>

      {/* Leadership & Board */}
      <div id="leadership" className="mt-20 scroll-mt-24 border-t border-black/10 pt-16">
        <Reveal>
          <SectionHeading eyebrow="Who Leads Us" title="Leadership & Board" className="max-w-2xl" />
          <p className="mt-3 max-w-2xl text-text-muted">
            SOC Alliance is led entirely by a volunteer Board of Directors &mdash; every officer
            reports $0 compensation.
          </p>
        </Reveal>

        <Reveal delay={75} className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {officers.map((person) => (
            <BoardCard key={person.name} person={person} />
          ))}
        </Reveal>

        <Reveal delay={125} className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {directors.map((person) => (
            <BoardCard key={person.name} person={person} />
          ))}
        </Reveal>

        <p className="mt-10 max-w-3xl text-sm text-text-muted">
          Note on accuracy: SOC Alliance&rsquo;s most recent IRS Form 990 lists Gerald McCarthy
          as Treasurer (rather than Director) and includes an additional director, John Moore,
          who does not appear on the roster above. This page reflects the current live site;
          we&rsquo;ve flagged the discrepancy with SOC Alliance and will update it once
          confirmed.
        </p>
      </div>

      <Reveal className="mt-16 flex max-w-3xl flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-8">
        <p className="text-text-muted">See our financial summary and tax-exempt status.</p>
        <Button href="/about/financials-transparency" variant="outline">
          Financials &amp; Transparency
        </Button>
      </Reveal>
      </Container>
    </>
  );
}
