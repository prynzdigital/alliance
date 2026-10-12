import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { FeatureProgram, Highlights, PillarFooter, PillarNav, WhatWeDo } from "@/components/programs/PillarSections";
import { getPillar } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Community",
  description:
    "SOC Alliance's Community pillar: safety, volunteerism, voter education, and the Strengthening Violence Prevention Initiative.",
};

const pillar = getPillar("community")!;

// Tone reviewed against docs/discovery/06_Strategy.md and 09_Content_Strategy.md
// (dignity-first, trauma-informed language) — still needs a client tone review
// before final publish per 09_Content_Strategy.md, Content Rule 3.
export default function CommunityPage() {
  return (
    <>
      <PageHeader
        title={pillar.name}
        description={pillar.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Programs", href: "/programs" },
          { label: "Community" },
        ]}
        image="/positive-loitering.webp"
        imageAlt="Community members and Chicago Police Department officers gathered together at the SOC Alliance facility in Woodlawn"
        tint={pillar.neon}
      >
        <PillarNav current={pillar.slug} />
      </PageHeader>

      <WhatWeDo pillar={pillar} photo={{ src: pillar.image, alt: pillar.imageAlt }}>
        <p>
          SOC Alliance&rsquo;s Community pillar covers safety, volunteerism, and voter education and
          registration, including the Strengthening Violence Prevention Initiative (SVPI).
        </p>
      </WhatWeDo>

      <FeatureProgram
        eyebrow="Community Safety"
        title="Strengthening Violence Prevention Initiative"
        image={{ src: "/svpi-fuller-park.webp", alt: "Community members and SVPI staff gathered inside the Fuller Park Fieldhouse" }}
      >
        <p>
          SVPI is a community-based violence prevention program, funded in part by the Illinois
          Department of Human Services. It brings together Violence Interrupters, Field Managers, Case
          Managers, and Victim Services Facilitators to work directly with the people and blocks most
          affected by violence — building safety from the inside of the community, not outside of it.
        </p>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href="/get-involved/mentoring-life-coaching"
            className="group rounded-2xl border border-black/5 bg-background p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="block text-sm font-bold text-text group-hover:text-primary">Need support? →</span>
            <span className="mt-1 block text-xs text-text-muted">Our Mentoring &amp; Life Coaching program is here to help.</span>
          </Link>
          <Link
            href="/get-involved#careers"
            className="group rounded-2xl border border-black/5 bg-background p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="block text-sm font-bold text-text group-hover:text-primary">Work with SVPI →</span>
            <span className="mt-1 block text-xs text-text-muted">See the roles we hire for on our Careers page.</span>
          </Link>
        </div>
      </FeatureProgram>

      <Highlights
        pillar={pillar}
        items={[
          {
            date: "August 21, 2025",
            place: "Fuller Park Fieldhouse",
            title: "SVPI × Fuller Park Advisory Council Kickoff",
            body: (
              <p>
                SVPI joined the Chicago Park District&rsquo;s Fuller Park Fieldhouse and the Fuller Park
                Advisory Council for a community kickoff, identifying shared priorities: traffic safety,
                the need for male mentors, creative youth opportunities, and transportation access to
                community events.
              </p>
            ),
          },
        ]}
      />

      <PillarFooter pillar={pillar} />
    </>
  );
}
