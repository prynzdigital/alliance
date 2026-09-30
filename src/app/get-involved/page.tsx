import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Volunteer, apply for a career, partner with us, or reach out for mentoring and life coaching support.",
};

const sections = [
  { title: "Volunteer", description: "Give your time across any of our four pillars.", href: "/get-involved/volunteer" },
  {
    title: "Careers",
    description: "Open roles, including positions with our Violence Prevention Initiative.",
    href: "/get-involved/careers",
  },
  {
    title: "Partner With Us",
    description: "Sponsorship and partnership opportunities for businesses and institutions.",
    href: "/get-involved/partner-with-us",
  },
  {
    title: "Mentoring & Life Coaching",
    description: "Support for people affected by firearm violence.",
    href: "/get-involved/mentoring-life-coaching",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        title="Get Involved"
        description="There are many ways to support SOC Alliance beyond giving."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved" }]}
        image="/help.jpg"
        imageAlt="Two people shaking hands, with a third person smiling in the background"
      />
      <Container className="py-16 md:py-24">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
