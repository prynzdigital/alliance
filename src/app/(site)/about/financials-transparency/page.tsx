import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StatBand } from "@/components/StatBand";
import { ArrowPillLink } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Financials & Transparency",
  description: "SOC Alliance's financial summary, tax-exempt status, and transparency information.",
};

// Fiscal year ending October 2024. Source: ProPublica Nonprofit Explorer /
// GuideStar (docs/discovery/02_Organization_Research.md).
const financials = [
  { label: "Revenue", value: "$82,682", tone: "#5657c1" },
  { label: "Expenses", value: "$64,999", tone: "#0d6e78" },
  { label: "Net income", value: "$17,683", tone: "#d1a542" },
  { label: "Total assets", value: "$175,938", tone: "#5657c1" },
  { label: "Total liabilities", value: "$25,782", tone: "#0d6e78" },
  { label: "Net assets", value: "$150,156", tone: "#d1a542" },
];

const revenueMix = [
  { label: "Contributions", pct: 64.2, color: "#5657c1" },
  { label: "Program services", pct: 24.2, color: "#0d6e78" },
  { label: "Other", pct: 11.4, color: "#d1a542" },
  { label: "Investment income", pct: 0.2, color: "#081c2e" },
];

export default function FinancialsPage() {
  return (
    <>
      <PageHeader
        title="Financials & Transparency"
        description="SOC Alliance is a 501(c)(3) public charity, EIN 36-4047035, with an IRS tax-exempt ruling year of 2015. All officers report $0 compensation, and the organization is led by a volunteer Board of Directors."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Financials & Transparency" },
        ]}
        image="/economic-2.jpg"
        imageAlt="Rising stacks of gold coins in front of a blurred financial growth chart"
      />

      <StatBand
        eyebrow="At a Glance"
        title="Accountable by Design"
        items={[
          { value: "501(c)(3)", label: "Public charity · EIN 36-4047035", icon: "shield" },
          { value: "2015", label: "IRS tax-exempt ruling year", icon: "calendar" },
          { value: "$0", label: "Officer compensation reported", icon: "heart" },
        ]}
      />

      {/* Financial summary */}
      <Container className="py-14 md:py-20">
        <Reveal className="max-w-2xl">
          <SectionHeading eyebrow="Transparency" title="Most Recent Financial Summary" />
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-xs font-semibold text-text-muted">
            Fiscal year ending October 2024 · Source: ProPublica Nonprofit Explorer / GuideStar
          </p>
        </Reveal>

        <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {financials.map((item, i) => (
            <Reveal key={item.label} delay={(i % 3) * 75}>
              <div className="relative flex h-full flex-col-reverse overflow-hidden rounded-3xl bg-background p-6 shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg">
                <span aria-hidden className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: item.tone }} />
                <dt className="mt-1 text-sm font-semibold text-text-muted">{item.label}</dt>
                <dd className="text-3xl font-extrabold tracking-tight text-text md:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.value}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>

      {/* Revenue mix + growth */}
      <section className="bg-surface py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Reveal className="rounded-3xl bg-background p-6 shadow-md ring-1 ring-black/5 sm:p-8">
              <h3 className="text-xl">Where Revenue Comes From</h3>
              <p className="mt-1 text-sm text-text-muted">Share of total revenue, FY2024.</p>
              <div
                className="mt-6 flex h-5 w-full overflow-hidden rounded-full bg-black/5"
                role="img"
                aria-label={revenueMix.map((r) => `${r.label} ${r.pct}%`).join(", ")}
              >
                {revenueMix.map((r) => (
                  <span key={r.label} style={{ width: `${r.pct}%`, backgroundColor: r.color }} title={`${r.label}: ${r.pct}%`} />
                ))}
              </div>
              <ul className="mt-6 flex flex-col gap-4">
                {revenueMix.map((r) => (
                  <li key={r.label}>
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="inline-flex items-center gap-2.5 font-semibold text-text">
                        <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: r.color }} aria-hidden />
                        {r.label}
                      </span>
                      <span className="font-extrabold text-text" style={{ fontFamily: "var(--font-heading)" }}>
                        {r.pct}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/5" aria-hidden>
                      <div className="h-full rounded-full" style={{ width: `${Math.max(r.pct, 1)}%`, backgroundColor: r.color }} />
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={75} className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-text p-6 text-white shadow-xl sm:p-8">
              <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-secondary/25 blur-3xl" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary">A Decade of Growth</p>
                <p
                  className="mt-4 bg-gradient-to-br from-[#f3d98b] via-secondary to-[#c48a1c] bg-clip-text text-6xl font-extrabold leading-none text-transparent"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  ~13x
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  growth in total assets over SOC Alliance&rsquo;s first decade of federal filings.
                </p>
              </div>
              <div className="relative mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                  <p className="text-xs text-white/60">FY2015 total assets</p>
                  <p className="mt-1 text-xl font-extrabold" style={{ fontFamily: "var(--font-heading)" }}>
                    $12,898
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-secondary/40">
                  <p className="text-xs text-white/60">FY2024 total assets</p>
                  <p className="mt-1 text-xl font-extrabold text-secondary" style={{ fontFamily: "var(--font-heading)" }}>
                    $175,938
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Documents + donate */}
      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Documents" title="Form 990 & Annual Report" />
            <div className="mt-6 max-w-xl">
              <PendingNotice>
                <p>Publishing the filed Form 990 or an annual report here requires SOC Alliance&rsquo;s permission.</p>
              </PendingNotice>
            </div>
          </Reveal>
          <Reveal delay={75} className="rounded-3xl bg-surface p-6 ring-1 ring-black/5 sm:p-8">
            <h3 className="text-xl">Support the Work</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Gifts to SOC Alliance are tax-deductible to the extent allowed by law.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <ArrowPillLink label="Donate Now" href="/donate" />
              <Link href="/about/our-story#leadership" className="text-sm font-bold text-primary hover:underline">
                Meet our board &rarr;
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
