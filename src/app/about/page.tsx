import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about SOC Alliance's mission, leadership, and financial transparency.",
};

const sections = [
  {
    title: "Our Story",
    description: "Our mission, vision, and the four pillars that organize our work.",
    href: "/about/our-story",
  },
  {
    title: "Leadership & Board",
    description: "Meet the volunteers who lead SOC Alliance.",
    href: "/about/leadership-board",
  },
  {
    title: "Financials & Transparency",
    description: "Our financial summary and tax-exempt status.",
    href: "/about/financials-transparency",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About SOC Alliance"
        description="SOC Alliance is a 501(c)(3) nonprofit working to uplift and improve the life of the community on Chicago's South Side."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <Container className="py-16 md:py-24">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.href} href={section.href}>
            <h2 className="text-lg">{section.title}</h2>
            <p className="mt-2 text-sm text-text-muted">{section.description}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
              Learn more &rarr;
            </span>
          </Card>
        ))}
      </div>
      </Container>
    </>
  );
}
