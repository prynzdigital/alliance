import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { pillars } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Our Programs",
  description: "SOC Alliance's four program pillars: Scholarship, Economic Development, Community, and Health.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        title="Our Programs"
        description="Every program SOC Alliance runs falls under one of four pillars."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Programs" }]}
        image="/impact_bg.png"
        imageAlt="Community members joining hands together"
      />
      <Container className="py-16 md:py-24">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Card key={pillar.slug} href={`/programs/${pillar.slug}`} accentColor={pillar.colorVar}>
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                style={{ backgroundColor: `color-mix(in srgb, ${pillar.colorVar} 14%, transparent)` }}
              >
                <Icon className="h-6 w-6" style={{ color: pillar.colorVar }} />
              </span>
              <h2 className="mt-4 text-lg">{pillar.name}</h2>
              <p className="mt-2 text-sm text-text-muted">{pillar.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {pillar.subPrograms.map((sub) => (
                  <li key={sub} className="rounded-full bg-surface px-3 py-1 text-xs text-text-muted">
                    {sub}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
                Learn more &rarr;
              </span>
            </Card>
          );
        })}
      </div>
      </Container>
    </>
  );
}
