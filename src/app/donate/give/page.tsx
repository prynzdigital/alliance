import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DonateEmbedPlaceholder } from "@/components/DonateEmbedPlaceholder";

export const metadata: Metadata = {
  title: "Give Once / Monthly",
  description: "Make a one-time or monthly gift to SOC Alliance.",
};

export default function GivePage() {
  return (
    <>
      <PageHeader
        title="Give Once / Monthly"
        description="SOC Alliance is a 501(c)(3) public charity, EIN 36-4047035. Every gift — one-time or monthly — is tax-deductible to the extent allowed by law."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Donate", href: "/donate" },
          { label: "Give Once / Monthly" },
        ]}
      />
      <Container className="py-16 md:py-24">
      <div className="max-w-xl">
        <DonateEmbedPlaceholder />
      </div>
      </Container>
    </>
  );
}
