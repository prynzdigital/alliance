import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PillarCTAs, PillarIntro } from "@/components/PillarIntro";
import { getPillar } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Health",
  description: "SOC Alliance's Health pillar: food security, nutrition, blood drives, and exercise programs.",
};

const pillar = getPillar("health")!;

export default function HealthPage() {
  return (
    <Container className="py-16 md:py-24">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Our Programs", href: "/programs" },
          { label: "Health" },
        ]}
      />
      <PillarIntro pillar={pillar} />

      <div className="mt-10 max-w-3xl">
        <ImagePlaceholder label="Blood drive or health program photo" />
      </div>

      <div className="mt-12 max-w-3xl">
        <h2>Past Highlights</h2>
        <div className="mt-3 rounded-card border border-black/10 bg-surface p-5">
          <p className="text-sm font-semibold text-text-muted">November 15, 2023 &middot; Kroc Center</p>
          <p className="mt-1 text-text">SOC Alliance hosted a community blood drive at the Kroc Center.</p>
        </div>
      </div>

      <PillarCTAs pillarName={pillar.name} />
    </Container>
  );
}
