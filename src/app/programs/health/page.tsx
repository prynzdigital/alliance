import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PillarCTAs, PillarIntro } from "@/components/PillarIntro";
import { getPillar } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Health",
  description: "SOC Alliance's Health pillar: food security, nutrition, blood drives, and exercise programs.",
};

const pillar = getPillar("health")!;

export default function HealthPage() {
  return (
    <>
      <PageHeader
        title={pillar.name}
        description={pillar.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Programs", href: "/programs" },
          { label: "Health" },
        ]}
        image={pillar.image}
        imageAlt={pillar.imageAlt}
        tint={pillar.neon}
      />
      <Container className="py-16 md:py-24">
      <PillarIntro pillar={pillar} />

      <div className="mt-10 max-w-3xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-card shadow-sm">
          <Image
            src="/blood-drive.jpg"
            alt="A &quot;Striking Out Blood Shortages&quot; flyer for the SOC Alliance community blood drive"
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-12 max-w-3xl">
        <h2>Past Highlights</h2>
        <div className="mt-3 rounded-card border border-black/10 bg-surface p-5">
          <p className="text-sm font-semibold text-text-muted">November 15, 2023 &middot; Kroc Center</p>
          <p className="mt-1 text-sm text-text">SOC Alliance hosted a community blood drive at the Kroc Center.</p>
        </div>
      </div>

      <PillarCTAs pillarName={pillar.name} />
      </Container>
    </>
  );
}
