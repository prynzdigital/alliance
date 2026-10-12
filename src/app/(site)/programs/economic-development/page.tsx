import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Highlights, PillarFooter, PillarNav, WhatWeDo } from "@/components/programs/PillarSections";
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
        image={pillar.feature.src}
        imageAlt={pillar.feature.alt}
        tint={pillar.neon}
      >
        <PillarNav current={pillar.slug} />
      </PageHeader>

      <WhatWeDo
        pillar={pillar}
        photo={{ src: "/economic-2.jpg", alt: "Stacks of coins rising alongside an upward financial growth chart" }}
      >
        <p>
          SOC Alliance runs seminars and roundtables with financial-industry professionals, helping
          community members build the skills and knowledge behind lasting economic stability — from
          first job to first home.
        </p>
      </WhatWeDo>

      <Highlights
        pillar={pillar}
        items={[
          {
            date: "September 2022",
            title: "“Finance Matters” Webinar Series",
            body: (
              <p>
                A three-part financial literacy webinar series with Tamara Dervin, Certified Financial
                Educator, covering budgeting, debt, and saving &amp; investing.
              </p>
            ),
            image: { src: "/economic.png", alt: "A seedling growing from a stack of coins, symbolizing financial growth" },
          },
        ]}
      />

      <PillarFooter pillar={pillar} />
    </>
  );
}
