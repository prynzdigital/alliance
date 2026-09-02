import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PillarCTAs, PillarIntro } from "@/components/PillarIntro";
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
    <Container className="py-16 md:py-24">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Our Programs", href: "/programs" },
          { label: "Community" },
        ]}
      />
      <PillarIntro pillar={pillar} />

      <div className="mt-10 max-w-3xl">
        <ImagePlaceholder label="Community event or Fuller Park Advisory Council photo" />
      </div>

      <div className="mt-12 max-w-3xl">
        <h2>Strengthening Violence Prevention Initiative (SVPI)</h2>
        <p className="mt-3 text-text">
          SVPI is a community-based violence prevention program, funded in part by the Illinois
          Department of Human Services. It brings together Violence Interrupters, Field
          Managers, Case Managers, and Victim Services Facilitators to work directly with the
          people and blocks most affected by violence — building safety from the inside of the
          community, not outside of it.
        </p>
        <p className="mt-3 text-text">
          If you or someone you know needs support, our{" "}
          <Link href="/get-involved/mentoring-life-coaching" className="font-semibold text-primary hover:underline">
            Mentoring &amp; Life Coaching
          </Link>{" "}
          program is here to help.
        </p>

        <div className="mt-6 rounded-card border border-black/10 bg-surface p-5">
          <p className="text-sm font-semibold text-text-muted">August 21, 2025 &middot; Fuller Park Fieldhouse</p>
          <p className="mt-1 text-text">
            SVPI joined the Chicago Park District&rsquo;s Fuller Park Fieldhouse and the Fuller
            Park Advisory Council for a community kickoff, identifying shared priorities:
            traffic safety, the need for male mentors, creative youth opportunities, and
            transportation access to community events.
          </p>
        </div>

        <p className="mt-6 text-text">
          Interested in working with SVPI? Open roles are listed on our{" "}
          <Link href="/get-involved/careers" className="font-semibold text-primary hover:underline">
            Careers
          </Link>{" "}
          page.
        </p>
      </div>

      <PillarCTAs pillarName={pillar.name} />
    </Container>
  );
}
