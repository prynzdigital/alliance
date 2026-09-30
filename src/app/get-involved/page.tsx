import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PendingNotice } from "@/components/PendingNotice";
import { SectionHeading } from "@/components/SectionHeading";
import { VolunteerForm } from "@/components/VolunteerForm";
import { buildMailtoHref } from "@/lib/mailto";
import { pillars } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Volunteer, apply for a career, partner with us, or reach out for mentoring and life coaching support.",
};

const svpiRoles = [
  "Area Violence Interrupter",
  "Area Field Manager",
  "Case Manager",
  "Victim Services Facilitator",
];

export default function GetInvolvedPage() {
  const applyHref = buildMailtoHref(
    "info@socalliance.org",
    "SVPI role inquiry",
    "I'm interested in learning more about open roles with the Strengthening Violence Prevention Initiative.\n\nName:\nRole of interest:\n"
  );

  return (
    <>
      <PageHeader
        title="Get Involved"
        description="There are many ways to support SOC Alliance beyond giving."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved" }]}
        image="/help.jpg"
        imageAlt="Two people shaking hands, with a third person smiling in the background"
      />
      <Container className="py-16 md:py-24">
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        <a href="#volunteer" className="text-primary hover:underline">
          Volunteer
        </a>
        <a href="#careers" className="text-primary hover:underline">
          Careers
        </a>
        <a href="#partner-with-us" className="text-primary hover:underline">
          Partner With Us
        </a>
        <Link href="/get-involved/mentoring-life-coaching" className="text-primary hover:underline">
          Mentoring &amp; Life Coaching
        </Link>
      </div>

      <div id="volunteer" className="mt-10 max-w-2xl scroll-mt-24">
        <SectionHeading eyebrow="Give Your Time" title="Volunteer" />
        <p className="mt-4 text-sm text-text-muted">
          SOC Alliance runs entirely on volunteer leadership and support. There&rsquo;s a place
          for you across any of our four pillars.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {pillars.map((pillar) => (
            <li key={pillar.slug} className="rounded-full bg-surface px-3 py-1 text-sm text-text-muted">
              {pillar.name}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <PendingNotice>
            <p>A list of specific, current volunteer opportunities and time commitments is pending.</p>
          </PendingNotice>
        </div>

        <div className="mt-8 max-w-xl">
          <h3>Tell Us You&rsquo;re Interested</h3>
          <div className="mt-4">
            <VolunteerForm />
          </div>
        </div>
      </div>

      <div id="careers" className="mt-16 max-w-2xl border-t border-black/10 pt-12 scroll-mt-24">
        <SectionHeading eyebrow="Join Our Team" title="Careers" />
        <p className="mt-4 text-sm text-text-muted">
          SOC Alliance&rsquo;s Strengthening Violence Prevention Initiative (SVPI) hires across
          the following role categories, funded in part by the Illinois Department of Human
          Services.
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {svpiRoles.map((role) => (
            <li key={role} className="rounded-card border border-black/10 bg-surface p-4 text-text">
              {role}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <PendingNotice>
            <p>Specific current openings, qualifications, and compensation ranges are pending.</p>
          </PendingNotice>
        </div>

        <div className="mt-8">
          <Button href={applyHref}>Inquire About a Role</Button>
        </div>
      </div>

      <div id="partner-with-us" className="mt-16 max-w-2xl border-t border-black/10 pt-12 scroll-mt-24">
        <SectionHeading eyebrow="Businesses & Institutions" title="Partner With Us" />
        <p className="mt-4 text-sm text-text-muted">
          SOC Alliance works alongside businesses, sponsors, and institutional partners
          year-round &mdash; not only around our flagship Mardi Gras Scholarship Fundraiser,
          where sponsorships start at $500.
        </p>

        <div className="mt-6">
          <PendingNotice>
            <p>Year-round sponsorship tiers and in-kind partnership options are still being finalized.</p>
          </PendingNotice>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">Contact Us About Partnering</Button>
          <Button href="/donate/mardi-gras-fundraiser" variant="outline">
            Sponsor the Mardi Gras Fundraiser
          </Button>
        </div>
      </div>

      <div className="mt-16 max-w-2xl border-t border-black/10 pt-12">
        <Card href="/get-involved/mentoring-life-coaching">
          <h2 className="text-lg">Mentoring &amp; Life Coaching</h2>
          <p className="mt-2 text-sm text-text-muted">
            Support for people affected by firearm violence.
          </p>
          <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
            Learn more &rarr;
          </span>
        </Card>
      </div>
      </Container>
    </>
  );
}
