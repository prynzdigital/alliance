import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";
import { FeatureProgram, Highlights, PillarFooter, PillarNav, WhatWeDo } from "@/components/programs/PillarSections";
import { getPillar } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Scholarship",
  description:
    "SOC Alliance's Scholarship pillar: mentoring, tutoring, technology programs, and the annual Talent Hunt Competition.",
};

const pillar = getPillar("scholarship")!;

export default function ScholarshipPage() {
  return (
    <>
      <PageHeader
        title={pillar.name}
        description={pillar.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Programs", href: "/programs" },
          { label: "Scholarship" },
        ]}
        image={pillar.image}
        imageAlt={pillar.imageAlt}
        tint={pillar.neon}
      >
        <PillarNav current={pillar.slug} />
      </PageHeader>

      <WhatWeDo pillar={pillar} photo={{ src: "/pillar-scholarship.jpg", alt: "A graduation cap resting on stacks of coins beside a book" }}>
        <p>
          SOC Alliance&rsquo;s Scholarship pillar supports students through mentoring, tutoring,
          technology and coding programs, and scholarship awards.
        </p>
        <p>
          Its flagship program is the annual Talent Hunt Competition, funded in part by the{" "}
          <Link href="/donate/mardi-gras-fundraiser" className="font-semibold text-primary hover:underline">
            Omega Mardi Gras Scholarship Fundraiser
          </Link>
          , which has awarded over $100,000 in scholarships cumulatively.
        </p>
      </WhatWeDo>

      <FeatureProgram
        eyebrow="Flagship Program"
        title="Talent Hunt Competition"
        image={{
          src: "/talent-hunt.png",
          alt: "A collage of student performers at the 2025 Talent Hunt Competition, playing violin, piano, and trumpet",
        }}
      >
        <p>
          SOC Alliance&rsquo;s annual scholarship competition for Chicagoland high school students,
          judged on vocal or instrumental performance.
        </p>
        <div className="mt-2">
          <PendingNotice>
            <p>Eligibility, deadline, and application details for the next Talent Hunt Competition are pending.</p>
          </PendingNotice>
        </div>
      </FeatureProgram>

      <Highlights
        pillar={pillar}
        items={[
          {
            date: "March 22, 2025",
            place: "Vandercook College of Music",
            title: "2025 Talent Hunt Competition",
            body: (
              <p>
                2025 winner: <strong className="text-text">Tiffany Tyus</strong>, piano — &ldquo;Spain&rdquo; by
                Chick Corea. Co-sponsored by the Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc.
              </p>
            ),
          },
          {
            date: "March 22, 2023",
            title: "Soft Skills Training",
            body: (
              <p>
                &ldquo;Soft Skills Training&rdquo; with Michelle Relerford — a student professional skills
                training session focused on career and skills readiness.
              </p>
            ),
          },
        ]}
      />

      <PillarFooter pillar={pillar} />
    </>
  );
}
