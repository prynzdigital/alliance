import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { PendingNotice } from "@/components/PendingNotice";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Pledge a Gift",
  description: "Make a longer-term commitment to SOC Alliance through a Monthly Pledge or the Building Fund.",
};

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 20.5h16M6 20.5V9l6-4.5L18 9v11.5" />
      <path d="M10 20.5v-5h4v5M9.5 11h.01M14.5 11h.01" />
    </svg>
  );
}

const steps = [
  {
    title: "Reach out",
    body: "Contact us by phone, email, or our contact form to let us know you'd like to make a pledge.",
  },
  {
    title: "Talk it through",
    body: "We'll walk you through the Monthly and Building Pledge options and answer your questions.",
  },
  {
    title: "Sign your agreement",
    body: "Pledges are five-year agreements governed by Illinois law, so each one is formally signed.",
  },
];

export default function PledgePage() {
  return (
    <>
      <PageHeader
        title="Pledge a Gift"
        description="Make a longer-term commitment to SOC Alliance through a five-year pledge agreement."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Donate", href: "/donate" },
          { label: "Pledge a Gift" },
        ]}
        image="/community-work.png"
        imageAlt="Volunteers in green shirts working together in the community"
      />

      <Container className="py-14 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Commit for the Long Term" title="Two Ways to Pledge" />
          <p className="mt-4 max-w-2xl text-sm text-text-muted">
            Beyond a one-time or monthly gift, SOC Alliance offers two ways to make a longer-term
            commitment. Both are structured as five-year, Illinois-law-governed pledge agreements.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <article className="flex h-full flex-col rounded-card border-t-4 border-primary bg-background p-6 shadow-md ring-1 ring-black/5 md:p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-text">
                <CalendarIcon className="h-6 w-6 text-secondary" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl">Monthly Pledge</h3>
              <p className="mt-2 text-sm text-text-muted">
                A recurring monthly commitment over a five-year term, supporting SOC Alliance&rsquo;s
                programs across all four pillars.
              </p>
              <p className="mt-auto pt-6 text-xs font-bold uppercase tracking-widest text-secondary-dark">
                5-year term &middot; All four pillars
              </p>
            </article>
          </Reveal>
          <Reveal delay={75} className="h-full">
            <article className="flex h-full flex-col rounded-card border-t-4 border-secondary bg-background p-6 shadow-md ring-1 ring-black/5 md:p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-text">
                <BuildingIcon className="h-6 w-6 text-secondary" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl">Building Pledge</h3>
              <p className="mt-2 text-sm text-text-muted">
                A five-year commitment supporting a capital project.
              </p>
              <div className="mt-4">
                <PendingNotice>
                  <p>The scope, cost, and timeline of the underlying capital project are pending.</p>
                </PendingNotice>
              </div>
              <p className="mt-auto pt-6 text-xs font-bold uppercase tracking-widest text-secondary-dark">
                5-year term &middot; Capital project
              </p>
            </article>
          </Reveal>
        </div>
      </Container>

      <section className="bg-surface py-14 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How It Works" title="Starting a Pledge" />
          </Reveal>
          <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 75} className="h-full rounded-card bg-background p-6 shadow-md">
                  <span
                    className="block text-4xl font-extrabold text-secondary"
                    style={{ fontFamily: "var(--font-heading)" }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal delay={200}>
            <div className="mt-8 max-w-3xl">
              <PendingNotice>
                <p>
                  Pledge agreements are a legal commitment, so they&rsquo;ll be signed through a
                  dedicated e-signature platform rather than a web form once SOC Alliance selects
                  one. In the meantime, reach out and we&rsquo;ll walk you through starting a
                  pledge directly.
                </p>
              </PendingNotice>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        eyebrow="Ready to Commit?"
        title="Start Your Pledge Today"
        image="/community-2.jpg"
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Or give once", href: "/donate" }}
      >
        <p>
          Reach out and we&rsquo;ll walk you through the pledge that fits you best.
        </p>
      </CtaBand>
    </>
  );
}
