import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pledge a Gift",
  description: "Make a longer-term commitment to SOC Alliance through a Monthly Pledge or the Building Fund.",
};

export default function PledgePage() {
  return (
    <>
      <PageHeader
        title="Pledge a Gift"
        description="Beyond a one-time or monthly gift, SOC Alliance offers two ways to make a longer-term commitment. Both are structured as five-year, Illinois-law-governed pledge agreements."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Donate", href: "/donate" },
          { label: "Pledge a Gift" },
        ]}
        image="/community-work.png"
        imageAlt="Volunteers in green shirts working together in the community"
      />
      <Container className="py-16 md:py-24">
      <div className="grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-card border border-black/10 bg-surface p-6">
          <h2 className="text-lg">Monthly Pledge</h2>
          <p className="mt-2 text-sm text-text">
            A recurring monthly commitment over a five-year term, supporting SOC Alliance&rsquo;s
            programs across all four pillars.
          </p>
        </div>
        <div className="rounded-card border border-black/10 bg-surface p-6">
          <h2 className="text-lg">Building Pledge</h2>
          <p className="mt-2 text-sm text-text">
            A five-year commitment supporting a capital project.
          </p>
          <div className="mt-3">
            <PendingNotice>
              <p>The scope, cost, and timeline of the underlying capital project are pending.</p>
            </PendingNotice>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-3xl">
        <PendingNotice>
          <p>
            Pledge agreements are a legal commitment, so they&rsquo;ll be signed through a
            dedicated e-signature platform rather than a web form once SOC Alliance selects one.
            In the meantime, reach out and we&rsquo;ll walk you through starting a pledge
            directly.
          </p>
        </PendingNotice>
      </div>

      <div className="mt-10 max-w-3xl border-t border-black/10 pt-8">
        <Button href="/contact">Contact Us to Start a Pledge</Button>
      </div>
      </Container>
    </>
  );
}
