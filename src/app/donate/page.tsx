import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DonorboxEmbed } from "@/components/DonorboxEmbed";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support SOC Alliance's four pillars of scholarship, economic development, community, and health.",
};

export default function DonatePage() {
  return (
    <>
      <PageHeader
        title="Donate"
        description="SOC Alliance is a 501(c)(3) public charity, EIN 36-4047035. Your gift is tax-deductible to the extent allowed by law and directly funds scholarship, economic development, community, and health programs on Chicago's South Side."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Donate" }]}
        image="/donate-photo.jpg"
        imageAlt="A raised fist held by another hand, among a group of people with arms raised together"
      />
      <Container className="py-16 md:py-24">
      <div className="max-w-xl">
        <DonorboxEmbed />
      </div>

      <div className="mt-12 grid max-w-3xl grid-cols-1 gap-6 border-t border-black/10 pt-8 sm:grid-cols-2">
        <Card href="/donate/mardi-gras-fundraiser">
          <h2 className="text-lg">Mardi Gras Scholarship Fundraiser</h2>
          <p className="mt-2 text-sm text-text-muted">
            Our flagship annual gala — over $100,000 in scholarships awarded to date.
          </p>
          <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
            Learn more &rarr;
          </span>
        </Card>
        <Card href="/donate/pledge">
          <h2 className="text-lg">Pledge a Gift</h2>
          <p className="mt-2 text-sm text-text-muted">
            Make a longer-term commitment through a Monthly Pledge or the Building Fund.
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
