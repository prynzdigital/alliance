import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PillarCTAs, PillarIntro } from "@/components/PillarIntro";
import { getPillar } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Economic Development",
  description:
    "SOC Alliance's Economic Development pillar: employment support, entrepreneurship, financial literacy, and home ownership.",
};

const pillar = getPillar("economic-development")!;

export default function EconomicDevelopmentPage() {
  return (
    <Container className="py-16 md:py-24">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Our Programs", href: "/programs" },
          { label: "Economic Development" },
        ]}
      />
      <PillarIntro pillar={pillar} />

      <div className="mt-10 max-w-3xl">
        <ImagePlaceholder label="Financial literacy workshop or seminar photo" />
      </div>

      <div className="mt-12 max-w-3xl">
        <p className="text-text">
          SOC Alliance runs seminars and roundtables with financial-industry professionals,
          helping community members build the skills and knowledge behind lasting economic
          stability — from first job to first home.
        </p>

        <h2 className="mt-10">Past Highlights</h2>
        <div className="mt-3 rounded-card border border-black/10 bg-surface p-5">
          <p className="text-sm font-semibold text-text-muted">September 2022</p>
          <p className="mt-1 text-text">
            &ldquo;Finance Matters&rdquo; — a three-part financial literacy webinar series with
            Tamara Dervin, Certified Financial Educator, covering budgeting, debt, and saving
            &amp; investing.
          </p>
        </div>
      </div>

      <PillarCTAs pillarName={pillar.name} />
    </Container>
  );
}
