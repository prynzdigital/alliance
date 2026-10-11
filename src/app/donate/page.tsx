import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DonorboxEmbed } from "@/components/DonorboxEmbed";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StatTiles } from "@/components/StatTiles";
import { Card, CardImage } from "@/components/ui/Card";
import { pillars } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support SOC Alliance's four pillars of scholarship, economic development, community, and health.",
};

const otherWays = [
  {
    title: "Mardi Gras Scholarship Fundraiser",
    description: "Our flagship annual gala. Attend, sponsor, or give to the scholarship fund.",
    href: "/donate/mardi-gras-fundraiser",
    image: "/omega-gras.jpg",
    imageAlt: "A gold Mardi Gras mask surrounded by festive confetti and ribbon",
  },
  {
    title: "Pledge a Gift",
    description: "Make a longer-term commitment through a Monthly Pledge or the Building Pledge.",
    href: "/donate/pledge",
    image: "/community-work.png",
    imageAlt: "Volunteers in green shirts working together in the community",
  },
  {
    title: "Give Your Time",
    description: "Volunteers power our programs across all four pillars. Find a way to lend a hand.",
    href: "/get-involved#volunteer",
    image: "/volunteer.jpg",
    imageAlt: "A group of volunteers smiling together outdoors",
  },
];

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3.5 5 6v5.5c0 4.2 2.9 7.6 7 8.5 4.1-.9 7-4.3 7-8.5V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function DonatePage() {
  return (
    <>
      <PageHeader
        title="Donate"
        description="Your gift funds scholarship, economic development, community, and health programs on Chicago's South Side."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Donate" }]}
        image="/donate-photo.jpg"
        imageAlt="A raised fist held by another hand, among a group of people with arms raised together"
      />

      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,500px)] lg:items-start">
          <Reveal>
            <SectionHeading eyebrow="Give Today" title="Where Your Gift Goes" />
            <p className="mt-4 max-w-xl text-sm text-text-muted">
              Every donation supports SOC Alliance&rsquo;s Four Pillar plan to uplift the
              community. Choose a one-time or monthly gift in the form.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <li key={pillar.slug}>
                    <Link
                      href={`/programs/${pillar.slug}`}
                      className="group flex items-start gap-4 rounded-card border border-black/5 bg-background p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-text">
                        <Icon className="h-5 w-5 text-secondary" />
                      </span>
                      <span>
                        <span className="block font-bold text-text group-hover:text-primary">{pillar.name}</span>
                        <span className="mt-0.5 block text-sm text-text-muted">{pillar.summary}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex items-start gap-3 rounded-card border border-black/10 bg-surface p-5">
              <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">Tax-deductible.</span> SOC Alliance is a
                501(c)(3) public charity, EIN 36-4047035. Gifts are tax-deductible to the extent
                allowed by law.
              </p>
            </div>

            <div className="relative mt-8 hidden aspect-[3/2] overflow-hidden rounded-card shadow-lg lg:block">
              <Image
                src="/impact.jpg"
                alt="A group of young adults laughing together on outdoor wooden steps"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={75}>
            <div className="rounded-card bg-background p-2 shadow-xl ring-1 ring-black/5">
              <DonorboxEmbed />
            </div>
          </Reveal>
        </div>
      </Container>

      <section className="bg-surface py-14 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Why Give" title="A Record You Can Trust" />
          </Reveal>
          <Reveal delay={75} className="mt-8">
            <StatTiles
              items={[
                {
                  value: "$100,000+",
                  label: "in scholarships awarded through the Omega Mardi Gras Scholarship Fundraiser",
                },
                { value: "501(c)(3)", label: "public charity · EIN 36-4047035" },
                { value: "$0", label: "officer compensation. Our officers serve without pay." },
              ]}
            />
          </Reveal>
          <Reveal delay={125}>
            <Link
              href="/about/financials-transparency"
              className="mt-6 inline-block text-sm font-bold text-primary hover:underline"
            >
              See our financials &rarr;
            </Link>
          </Reveal>
        </Container>
      </section>

      <Container className="py-14 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="More Ways to Help" title="Other Ways to Give" />
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {otherWays.map((way, i) => (
            <Reveal key={way.href} delay={i * 75}>
              <Card href={way.href} className="h-full">
                <CardImage src={way.image} alt={way.imageAlt} />
                <h3 className="text-lg">{way.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{way.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
                  Learn more &rarr;
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>

      <CtaBand
        eyebrow="Have Questions?"
        title="We're Happy to Help"
        image="/help.jpg"
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Call 773-693-2222", href: "tel:+17736932222" }}
      >
        <p>
          Questions about giving, pledges, or sponsorship? Call us or send a message through
          our contact page.
        </p>
      </CtaBand>
    </>
  );
}
