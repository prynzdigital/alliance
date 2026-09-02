import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";
import { MissionIcon, ValuesIcon, VisionIcon } from "@/components/icons/AboutIcons";
import { pillars } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about SOC Alliance's mission, vision, and the four pillars that organize our work on Chicago's South Side.",
};

export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        title="Our Story"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Our Story" }]}
      />
      <Container className="py-16 md:py-24">
      <div className="max-w-3xl">
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

      <div className="mt-12 max-w-3xl border-t border-black/10 pt-8">
        <Link href="/about/leadership-board" className="text-sm font-semibold text-primary hover:underline">
          Meet Our Leadership &rarr;
        </Link>
      </div>
      </Container>
    </>
  );
}
