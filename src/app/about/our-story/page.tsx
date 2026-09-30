import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";
import { MissionIcon, ValuesIcon, VisionIcon } from "@/components/icons/AboutIcons";
import { pillars } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about SOC Alliance's mission, vision, four pillars, and volunteer Board of Directors.",
};

// Roster and photos sourced directly from the live site (socalliance.org/board-of-directors)
// on 2026-08-30 — see docs/assets/board-photos/README.md for provenance and
// docs/discovery/02_Organization_Research.md, Section 4, for the Form 990
// discrepancies noted below.
const board = [
  { name: "Theodore Davis", title: "Board Chair", image: "/board/theodore-davis-board-chair.webp" },
  { name: "Ronald Hughes", title: "Executive Director", image: "/board/ronald-hughes-executive-director.webp" },
  { name: "Bruce Nash", title: "Treasurer", image: "/board/bruce-nash-treasurer.webp" },
  { name: "Dana O'Banion", title: "Director", image: "/board/dana-obanion-director.webp" },
  { name: "Dathon O'Banion", title: "Director", image: "/board/dathon-obanion-director.webp" },
  { name: "Stephen Coleman", title: "Director", image: "/board/stephen-coleman-director.webp" },
  { name: "Gerald McCarthy", title: "Director", image: "/board/gerald-mccarthy-director.webp" },
  { name: "Dejuan Lever", title: "Director", image: "/board/dejuan-lever-director.webp" },
];

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
      <Container className="py-16 md:py-24">
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        <a href="#our-story" className="text-primary hover:underline">
          Our Story
        </a>
        <a href="#leadership" className="text-primary hover:underline">
          Leadership &amp; Board
        </a>
      </div>

      <div id="our-story" className="mt-8 max-w-3xl scroll-mt-24">
        <p className="text-lg text-text">
          Strengthening Our Community Alliance is a 501(c)(3) organization that provides
          scholarships and community services to the Woodlawn Community and greater Chicago. The
          Alliance will utilize our facility in Woodlawn to hold meetings and conduct community
          service programs. SOC Alliance will also collaborate with the local community on
          numerous programs.
        </p>
      </div>

      <div className="mt-12 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
        <div>
          <MissionIcon className="h-8 w-8 text-primary" />
          <h2 className="mt-3">Mission</h2>
          <p className="mt-2 text-text-muted">
            The Mission is to uplift and improve the life of the community.
          </p>
        </div>
        <div>
          <VisionIcon className="h-8 w-8 text-primary" />
          <h2 className="mt-3">Vision</h2>
          <p className="mt-2 text-text-muted">
            The Vision is to create a community in which all people thrive and develop to their
            greatest potential.
          </p>
        </div>
        <div>
          <ValuesIcon className="h-8 w-8 text-primary" />
          <h2 className="mt-3">Values</h2>
          <p className="mt-2 text-text-muted">
            We believe in a four pillar plan to uplift the community: Scholarship, Economic
            Development, Community, and Health.
          </p>
        </div>
      </div>

      <div className="mt-12 max-w-3xl">
        <h2>Our Four Pillars</h2>
        <p className="mt-3 text-text-muted">
          SOC Alliance organizes its work around four pillars, each with its own named programs.
        </p>
        <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.slug} className="rounded-card border border-black/10 bg-surface p-5">
                <Icon className="h-6 w-6" style={{ color: pillar.colorVar }} />
                <dt className="mt-2 font-semibold text-text">{pillar.name}</dt>
                <dd className="mt-1 text-sm text-text-muted">{pillar.summary}</dd>
              </div>
            );
          })}
        </dl>
      </div>

      <div className="mt-12 max-w-3xl">
        <h2>Where We Work</h2>
        <p className="mt-3 text-text">
          SOC Alliance is based in Woodlawn on Chicago&rsquo;s South Side, where it holds
          meetings and runs community service programs out of its own facility, while
          collaborating with partners across greater Chicago.
        </p>
      </div>

      <div className="mt-12 max-w-3xl">
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
      </div>

      <div id="leadership" className="mt-16 border-t border-black/10 pt-12 scroll-mt-24">
        <h2>Leadership &amp; Board</h2>
        <p className="mt-3 max-w-3xl text-text-muted">
          SOC Alliance is led entirely by a volunteer Board of Directors &mdash; every officer
          reports $0 compensation.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {board.map((person) => (
            <div key={person.name} className="overflow-hidden rounded-card border border-black/10 bg-background">
              <div className="relative aspect-square w-full bg-surface">
                <Image
                  src={person.image}
                  alt={`Portrait of ${person.name}, ${person.title} of SOC Alliance`}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-text">{person.name}</p>
                <p className="text-sm text-text-muted">{person.title}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-sm text-text-muted">
          Note on accuracy: SOC Alliance&rsquo;s most recent IRS Form 990 lists Gerald McCarthy
          as Treasurer (rather than Director) and includes an additional director, John Moore,
          who does not appear on the roster above. This page reflects the current live site;
          we&rsquo;ve flagged the discrepancy with SOC Alliance and will update it once
          confirmed.
        </p>
      </div>

      <div className="mt-12 max-w-3xl border-t border-black/10 pt-8">
        <Link href="/about/financials-transparency" className="text-sm font-semibold text-primary hover:underline">
          Financials &amp; Transparency &rarr;
        </Link>
      </div>
      </Container>
    </>
  );
}
