import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";
import { VolunteerForm } from "@/components/VolunteerForm";
import { pillars } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Volunteer with SOC Alliance across our four program pillars.",
};

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        title="Volunteer"
        description="SOC Alliance runs entirely on volunteer leadership and support. There's a place for you across any of our four pillars."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/get-involved" },
          { label: "Volunteer" },
        ]}
      />
      <Container className="py-16 md:py-24">
      <ul className="flex flex-wrap gap-2">
        {pillars.map((pillar) => (
          <li key={pillar.slug} className="rounded-full bg-surface px-3 py-1 text-sm text-text-muted">
            {pillar.name}
          </li>
        ))}
      </ul>

      <div className="mt-8 max-w-2xl">
        <PendingNotice>
          <p>A list of specific, current volunteer opportunities and time commitments is pending.</p>
        </PendingNotice>
      </div>

      <div className="mt-10 max-w-xl">
        <h2>Tell Us You&rsquo;re Interested</h2>
        <div className="mt-4">
          <VolunteerForm />
        </div>
      </div>
      </Container>
    </>
  );
}
