import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Highlights, PillarFooter, PillarNav, WhatWeDo } from "@/components/programs/PillarSections";
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
      >
        <PillarNav current={pillar.slug} />
      </PageHeader>

      <WhatWeDo pillar={pillar} photo={{ src: pillar.feature.src, alt: pillar.feature.alt }}>
        <p>
          SOC Alliance&rsquo;s Health pillar focuses on food security, nutrition, blood drives, and
          exercise programs that support the well-being of the community.
        </p>
      </WhatWeDo>

      <Highlights
        pillar={pillar}
        items={[
          {
            date: "November 15, 2023",
            place: "Kroc Center",
            title: "Community Blood Drive",
            body: <p>SOC Alliance hosted a community blood drive at the Kroc Center.</p>,
            image: {
              src: "/blood-drive.jpg",
              alt: "A “Striking Out Blood Shortages” flyer for the SOC Alliance community blood drive",
            },
          },
        ]}
      />

      <PillarFooter pillar={pillar} />
    </>
  );
}
