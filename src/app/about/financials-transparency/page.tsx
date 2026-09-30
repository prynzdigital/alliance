import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";

export const metadata: Metadata = {
  title: "Financials & Transparency",
  description: "SOC Alliance's financial summary, tax-exempt status, and transparency information.",
};

const financials = [
  { label: "Revenue", value: "$82,682" },
  { label: "Expenses", value: "$64,999" },
  { label: "Net income", value: "$17,683" },
  { label: "Total assets", value: "$175,938" },
  { label: "Total liabilities", value: "$25,782" },
  { label: "Net assets", value: "$150,156" },
];

const revenueMix = [
  { label: "Contributions", value: "64.2%" },
  { label: "Program services", value: "24.2%" },
  { label: "Investment income", value: "0.2%" },
  { label: "Other", value: "11.4%" },
];

export default function FinancialsPage() {
  return (
    <>
      <PageHeader
        title="Financials & Transparency"
        description="SOC Alliance is a 501(c)(3) public charity, EIN 36-4047035, with an IRS tax-exempt ruling year of 2015. All officers report $0 compensation — SOC Alliance is led entirely by volunteers."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Financials & Transparency" },
        ]}
        image="/economic-2.jpg"
        imageAlt="Rising stacks of gold coins in front of a blurred financial growth chart"
      />
      <Container className="py-16 md:py-24">
      <div className="max-w-3xl">
        <h2>Most Recent Financial Summary</h2>
        <p className="mt-2 text-sm text-text-muted">
          Fiscal year ending October 2024. Source: ProPublica Nonprofit Explorer / GuideStar.
        </p>
        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {financials.map((item) => (
            <div key={item.label} className="rounded-card border border-black/10 bg-surface p-5">
              <dt className="text-sm text-text-muted">{item.label}</dt>
              <dd className="mt-1 text-2xl font-bold text-primary">{item.value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-10">Revenue Mix</h2>
        <ul className="mt-4 flex flex-col gap-2">
          {revenueMix.map((item) => (
            <li key={item.label} className="flex items-center justify-between rounded-md bg-surface px-4 py-2">
              <span className="text-text">{item.label}</span>
              <span className="font-semibold text-text">{item.value}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-text-muted">
          SOC Alliance has grown from $12,898 in total assets in its first federal filing (FY2015)
          to $175,938 in FY2024 — roughly 13x growth over its first decade of filings.
        </p>

        <h2 className="mt-10">Form 990 & Annual Report</h2>
        <div className="mt-3">
          <PendingNotice>
            <p>Publishing the filed Form 990 or an annual report here requires SOC Alliance&rsquo;s permission.</p>
          </PendingNotice>
        </div>
      </div>

      <div className="mt-12 max-w-3xl border-t border-black/10 pt-8">
        <Link href="/donate" className="text-sm font-semibold text-primary hover:underline">
          Donate &rarr;
        </Link>
      </div>
      </Container>
    </>
  );
}
