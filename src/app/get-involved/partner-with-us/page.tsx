import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Partner With Us",
  description: "Sponsorship and partnership opportunities with SOC Alliance for businesses and institutions.",
};

export default function PartnerWithUsPage() {
  return (
    <>
      <PageHeader
        title="Partner With Us"
        description="SOC Alliance works alongside businesses, sponsors, and institutional partners year-round — not only around our flagship Mardi Gras Scholarship Fundraiser, where sponsorships start at $500."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/get-involved" },
          { label: "Partner With Us" },
        ]}
        image="/chicago.png"
        imageAlt="The Chicago skyline"
      />
      <Container className="py-16 md:py-24">
      <div className="max-w-2xl">
        <PendingNotice>
          <p>Year-round sponsorship tiers and in-kind partnership options are still being finalized.</p>
        </PendingNotice>
      </div>

      <div className="mt-10 flex flex-wrap gap-4 border-t border-black/10 pt-8">
        <Button href="/contact">Contact Us About Partnering</Button>
        <Button href="/donate/mardi-gras-fundraiser" variant="outline">
          Sponsor the Mardi Gras Fundraiser
        </Button>
      </div>
      </Container>
    </>
  );
}
