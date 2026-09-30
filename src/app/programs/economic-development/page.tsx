import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PillarCTAs, PillarIntro } from "@/components/PillarIntro";
import { SectionHeading } from "@/components/SectionHeading";
import { getPillar } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Economic Development",
  description:
    "SOC Alliance's Economic Development pillar: employment support, entrepreneurship, financial literacy, and home ownership.",
};

const pillar = getPillar("economic-development")!;

export default function EconomicDevelopmentPage() {
  return (
    <>
      <PageHeader
        title={pillar.name}
        description={pillar.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Programs", href: "/programs" },
          { label: "Economic Development" },
        ]}
        image="/pillar-economic.jpg"
        imageAlt="A businessperson holding a tablet displaying rising economic growth charts"
        tint={pillar.neon}
      />
      <Container className="py-16 md:py-24">
      <PillarIntro pillar={pillar} />

      <div className="mt-10 max-w-3xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-card shadow-sm">
          <Image
            src="/pillar-economic.jpg"
            alt="A businessperson holding a tablet displaying rising economic growth charts"
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-12 max-w-3xl">
        <p className="text-sm text-text">
          SOC Alliance runs seminars and roundtables with financial-industry professionals,
          helping community members build the skills and knowledge behind lasting economic
          stability — from first job to first home.
        </p>

        <SectionHeading eyebrow="Recent Events" title="Past Highlights" className="mt-10" />
        <div className="mt-3 rounded-card border border-black/10 bg-surface p-5">
          <p className="text-sm font-semibold text-text-muted">September 2022</p>
          <p className="mt-1 text-sm text-text">
            &ldquo;Finance Matters&rdquo; — a three-part financial literacy webinar series with
            Tamara Dervin, Certified Financial Educator, covering budgeting, debt, and saving
            &amp; investing.
          </p>
        </div>
      </div>

      <PillarCTAs pillarName={pillar.name} />
      </Container>
    </>
  );
}
