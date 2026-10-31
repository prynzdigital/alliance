import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardImage } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about SOC Alliance's mission, leadership, and financial transparency.",
};

const sections = [
  {
    title: "Our Story",
    description: "Our mission, vision, the four pillars that organize our work, and the volunteer Board of Directors who lead us.",
    href: "/about/our-story",
    image: "/impact.jpg",
    imageAlt: "A raised fist clasped by another hand, with community members raising their hands together in the background",
  },
  {
    title: "Financials & Transparency",
    description: "Our financial summary and tax-exempt status.",
    href: "/about/financials-transparency",
    image: "/economic-2.jpg",
    imageAlt: "Rising stacks of gold coins in front of a blurred financial growth chart",
  },
];

// Excerpts from the leadership letters in the Fall 2026 Newsletter
// (client-supplied, 2026-10-31).
const leadershipNotes = [
  {
    quote:
      "Our name, Strengthening Our Community Alliance, continues to reflect what we believe: stronger communities are created when people and organizations come together, build relationships, and work toward a shared vision.",
    name: "Theodore Davis",
    title: "Board Chair",
  },
  {
    quote:
      "It has been a purposeful and productive year. Strengthening Our Community Alliance continues to be impactful throughout the Chicagoland area.",
    name: "Ronald J. Hughes",
    title: "Executive Director",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About SOC Alliance"
        description="SOC Alliance is a 501(c)(3) nonprofit working to uplift and improve the life of the community on Chicago's South Side."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image="/community-2.jpg"
        imageAlt="A group of young community members lying together in a circle, smiling"
      />
      <Container className="py-16 md:py-24">
      <div className="grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.href} href={section.href}>
            <CardImage src={section.image} alt={section.imageAlt} />
            <h2 className="text-lg">{section.title}</h2>
            <p className="mt-2 text-sm text-text-muted">{section.description}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
              Learn more &rarr;
            </span>
          </Card>
        ))}
      </div>
      </Container>

      <section className="bg-surface py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Fall 2026" title="From Our Leadership" />
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {leadershipNotes.map((note, i) => (
              <li key={note.name}>
                <Reveal delay={i * 75} className="h-full">
                  <figure className="relative flex h-full flex-col rounded-3xl bg-background p-8 shadow-md ring-1 ring-black/5 sm:p-10">
                    <span
                      aria-hidden
                      className="absolute -top-5 left-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-3xl font-extrabold leading-none text-text shadow-lg"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      &ldquo;
                    </span>
                    <blockquote className="flex-1 text-lg leading-relaxed text-text">
                      <p>{note.quote}</p>
                    </blockquote>
                    <figcaption className="mt-6 border-t border-black/5 pt-5">
                      <p className="font-bold text-text">{note.name}</p>
                      <p className="text-sm text-text-muted">{note.title}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delay={150}>
            <p className="mt-8 text-sm text-text-muted">
              Read both letters in full in our{" "}
              <Link href="/news-events#newsletter" className="font-semibold text-primary hover:underline">
                Fall 2026 Newsletter
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
