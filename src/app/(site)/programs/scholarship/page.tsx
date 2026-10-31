import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureProgram, Highlights, PillarFooter, PillarNav, WhatWeDo } from "@/components/programs/PillarSections";
import { getPillar } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Scholarship",
  description:
    "SOC Alliance's Scholarship pillar: mentoring, tutoring, technology programs, and the annual Talent Hunt Competition.",
};

const pillar = getPillar("scholarship")!;

// 2026 recipients, gift levels, and committee from the Fall 2026 Newsletter
// (client-supplied, 2026-10-31).
const recipients2026 = [
  { name: "Xavier Couch", from: "DeVry Advantage Academy", to: "Hampton University" },
  { name: "Myles Jenkins", from: "ITW David Speer Academy", to: "Morehouse College" },
  { name: "James Lasester Hall", from: "De La Salle Institute", to: "North Carolina A&T" },
  { name: "Cameron Mwachullah", from: "Kenwood Academy", to: "North Carolina A&T" },
  { name: "Pryce Robinson", from: "Brooks College Prep", to: "UNLV" },
];

const giftLevels = [
  { amount: "$1,000", label: "One semester of support" },
  { amount: "$5,000", label: "A full-year scholarship" },
  { amount: "$10,000", label: "A named legacy scholarship" },
];

function CapIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" strokeLinejoin="round" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

      <section id="recipients-2026" className="scroll-mt-32 py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <Reveal>
              <SectionHeading eyebrow="Scholarship Spotlight · 2026" title="Five Young Men, Five Bright Futures" />
              <p className="mt-5 text-base leading-relaxed text-text-muted">
                On July 25, 2026, the Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc., in
                conjunction with SOC Alliance, presented scholarships to five deserving young men from the
                Chicagoland area at the Ray and Joan Kroc Center on Chicago&rsquo;s South Side. Each student
                received <strong className="text-text">$2,000</strong>, for a total of{" "}
                <strong className="text-text">$10,000</strong> in scholarship awards.
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                The brothers of Sigma Omega Chapter are committed to staying in contact with these young men
                and continuing as bridge builders for them, so each scholarship becomes a lasting
                relationship.
              </p>
              <figure className="mt-8">
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                  <Image
                    src="/scholarship-2026-recipients.webp"
                    alt="The five 2026 scholarship recipients with Sigma Omega Chapter brothers, holding a $10,000 ceremonial check"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-text-muted">
                  The 2026 recipients with Sigma Omega Chapter brothers at the July 25 presentation.
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={75}>
              <h3 className="text-lg font-bold text-text">Congratulations to the 2026 recipients</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {recipients2026.map((r) => (
                  <li
                    key={r.name}
                    className="flex items-center gap-4 rounded-2xl bg-background p-4 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <CapIcon />
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-text">{r.name}</p>
                      <p className="text-sm text-text-muted">
                        {r.from} <span aria-hidden>&rarr;</span>
                        <span className="sr-only">, now attending</span>{" "}
                        <span className="font-semibold text-primary">{r.to}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl border-l-4 border-secondary bg-surface p-4 text-sm leading-relaxed text-text-muted">
                With thanks to the Scholarship Committee: Brothers William &ldquo;Rick&rdquo; Johnson,
                Christopher Ford, Charles Flanigan, Reggie Holiday, Charles Davis, Phillip Sevier, and
                Theodore Davis.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-text py-14 text-white md:py-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(50% 60% at 0% 0%, color-mix(in srgb, var(--color-primary) 45%, transparent), transparent), radial-gradient(40% 50% at 100% 100%, color-mix(in srgb, var(--color-secondary) 20%, transparent), transparent)",
          }}
        />
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <SectionHeading eyebrow="Your Gift. Their Future." title="Every Dollar Helps a Student Rise" light />
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80">
                Scholarship gifts open doors for Chicagoland students as they start college. Choose a level
                below or give any amount.
              </p>
              <Link
                href="/donate"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-text shadow-lg shadow-secondary/20 transition hover:-translate-y-0.5 hover:bg-secondary-dark"
              >
                Give to Scholarships
                <span aria-hidden>&rarr;</span>
              </Link>
            </Reveal>
            <Reveal delay={75}>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {giftLevels.map((g) => (
                  <li
                    key={g.amount}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:border-secondary/60"
                  >
                    <p
                      className="bg-gradient-to-b from-[#f3d27a] to-secondary bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {g.amount}
                    </p>
                    <p className="mt-2 text-sm text-white/80">{g.label}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

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
