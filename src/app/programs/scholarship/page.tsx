import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";
import { PillarCTAs, PillarIntro } from "@/components/PillarIntro";
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
      />
      <Container className="py-16 md:py-24">
      <PillarIntro pillar={pillar} />

      <div className="mt-10 max-w-3xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-card shadow-sm">
          <Image
            src="/talent-hunt.png"
            alt="A collage of student performers at the 2025 Talent Hunt Competition, playing violin, piano, and trumpet"
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-12 max-w-3xl">
        <h2>Talent Hunt Competition</h2>
        <p className="mt-3 text-text">
          SOC Alliance&rsquo;s annual scholarship competition for Chicagoland high school
          students, judged on vocal or instrumental performance.
        </p>

        <div className="mt-4">
          <PendingNotice>
            <p>Eligibility, deadline, and application details for the next Talent Hunt Competition are pending.</p>
          </PendingNotice>
        </div>

        <h3 className="mt-8">Past Highlights</h3>
        <div className="mt-3 rounded-card border border-black/10 bg-surface p-5">
          <p className="text-sm font-semibold text-text-muted">March 22, 2025 &middot; Vandercook College of Music</p>
          <p className="mt-1 text-text">
            2025 winner: <strong>Tiffany Tyus</strong>, piano — &ldquo;Spain&rdquo; by Chick
            Corea. Co-sponsored by the Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc.
          </p>
        </div>

        <p className="mt-4 text-sm text-text-muted">
          The Talent Hunt Competition is funded in part by the{" "}
          <Link href="/donate/mardi-gras-fundraiser" className="font-semibold text-primary hover:underline">
            Omega Mardi Gras Scholarship Fundraiser
          </Link>
          , which has awarded over $100,000 in scholarships cumulatively.
        </p>

        <h3 className="mt-8">Career &amp; Skills Readiness</h3>
        <div className="mt-3 rounded-card border border-black/10 bg-surface p-5">
          <p className="text-sm font-semibold text-text-muted">March 22, 2023</p>
          <p className="mt-1 text-text">
            &ldquo;Soft Skills Training&rdquo; with Michelle Relerford — a student professional
            skills training session.
          </p>
        </div>
      </div>

      <PillarCTAs pillarName={pillar.name} />
      </Container>
    </>
  );
}
