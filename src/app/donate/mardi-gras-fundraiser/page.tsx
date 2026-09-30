import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";
import { formatEventDate, getEventStatus } from "@/lib/events";

export const metadata: Metadata = {
  title: "Mardi Gras Scholarship Fundraiser",
  description:
    "The Omega Mardi Gras Scholarship Fundraiser — SOC Alliance's flagship annual gala, co-hosted with the Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc.",
};

const LATEST_EDITION_DATE = "2026-03-14";

export default function MardiGrasPage() {
  const status = getEventStatus(LATEST_EDITION_DATE);

  return (
    <>
      <PageHeader
        title="Omega Mardi Gras Scholarship Fundraiser"
        description="SOC Alliance's flagship annual gala, co-hosted with the Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc. Sponsorships start at $500, and the event has raised over $100,000 in scholarships cumulatively."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Donate", href: "/donate" },
          { label: "Mardi Gras Scholarship Fundraiser" },
        ]}
        image="/omega-gras.jpg"
        imageAlt="A gold Mardi Gras mask surrounded by festive confetti and ribbon"
      />
      <Container className="py-16 md:py-24">
      <div className="max-w-2xl rounded-card border border-black/10 bg-surface p-6">
        <p className="text-sm font-semibold text-text-muted">
          {status === "upcoming" ? "Next edition" : "Most recent edition (completed)"}
        </p>
        <p className="mt-1 text-xl font-bold text-primary">
          21st Annual &middot; {formatEventDate(LATEST_EDITION_DATE)}
        </p>
        <p className="mt-1 text-sm text-text">Rate Field, Chicago</p>
      </div>

      <div className="mt-8 max-w-2xl">
        <PendingNotice>
          <p>Details, tickets, and sponsorship information for the next edition of this event are pending.</p>
        </PendingNotice>
      </div>

      <div className="mt-12 max-w-2xl border-t border-black/10 pt-8">
        <Link href="/get-involved#partner-with-us" className="text-sm font-semibold text-primary hover:underline">
          Become a Sponsor &rarr;
        </Link>
      </div>
      </Container>
    </>
  );
}
