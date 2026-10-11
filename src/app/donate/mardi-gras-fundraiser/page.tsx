import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StatTiles } from "@/components/StatTiles";
import { events, formatEventDate, getEventStatus } from "@/lib/events";

export const metadata: Metadata = {
  title: "Mardi Gras Scholarship Fundraiser",
  description:
    "The Omega Mardi Gras Scholarship Fundraiser — SOC Alliance's flagship annual gala, co-hosted with the Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc.",
};

// Editions come from the shared events list, newest first, so a new edition
// only needs adding in one place and its status is always derived from its date.
const editions = events
  .filter((e) => e.title.includes("Omega Mardi Gras Scholarship Fundraiser"))
  .sort((a, b) => b.date.localeCompare(a.date));

export default function MardiGrasPage() {
  const hasUpcoming = editions.some((e) => getEventStatus(e.date) === "upcoming");

  return (
    <>
      <PageHeader
        title="Omega Mardi Gras Scholarship Fundraiser"
        description="SOC Alliance's flagship annual gala, raising scholarship dollars for students in our community."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Donate", href: "/donate" },
          { label: "Mardi Gras Scholarship Fundraiser" },
        ]}
        image="/omega-gras.jpg"
        imageAlt="A gold Mardi Gras mask surrounded by festive confetti and ribbon"
      />

      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading eyebrow="Our Flagship Gala" title="A Night That Funds Futures" />
            <p className="mt-4 text-sm text-text-muted">
              The Omega Mardi Gras Scholarship Fundraiser is co-hosted by SOC Alliance and the
              Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc. Over the years, it has raised
              more than $100,000 in scholarships for students, and it also helps fund our Talent
              Hunt.
            </p>
            <p className="mt-4 text-sm text-text-muted">
              Businesses and individuals can support the gala as sponsors, with sponsorships
              starting at $500.
            </p>
          </Reveal>
          <Reveal delay={75}>
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-card shadow-xl lg:mr-0">
              <Image
                src="/omega-gras-20th.jpg"
                alt="Save-the-date graphic for the 20th Annual Omega Mardi Gras Scholarship Fundraiser, featuring a jeweled masquerade mask"
                fill
                sizes="(min-width: 768px) 448px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>

      <section className="bg-surface py-14 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="By the Numbers" title="A Tradition of Giving" />
          </Reveal>
          <Reveal delay={75} className="mt-8">
            <StatTiles
              items={[
                { value: "$100,000+", label: "raised in scholarships, cumulatively" },
                { value: "21", label: "annual editions, as of 2026" },
                { value: "$500", label: "sponsorships start here" },
              ]}
            />
          </Reveal>
        </Container>
      </section>

      <Container className="py-14 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Recent Editions" title="On the Calendar" />
        </Reveal>
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {editions.map((edition, i) => {
            const upcoming = getEventStatus(edition.date) === "upcoming";
            return (
              <li key={edition.date}>
                <Reveal delay={i * 75} className="flex h-full items-start gap-5 rounded-card bg-background p-6 shadow-md ring-1 ring-black/5">
                  <span
                    className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-text text-white"
                    aria-hidden
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                      {new Date(`${edition.date}T00:00:00`).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="text-2xl font-extrabold leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                      {new Date(`${edition.date}T00:00:00`).getDate()}
                    </span>
                  </span>
                  <div>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        upcoming ? "bg-secondary text-text" : "bg-black/5 text-text-muted"
                      }`}
                    >
                      {upcoming ? "Upcoming" : "Completed"}
                    </span>
                    <h3 className="mt-3 text-lg">{edition.title.replace(" Omega Mardi Gras Scholarship Fundraiser", "")}</h3>
                    <p className="mt-1 text-sm text-text-muted">
                      <time dateTime={edition.date}>{formatEventDate(edition.date)}</time>
                      {edition.location && <> &middot; {edition.location}</>}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
        {!hasUpcoming && (
          <Reveal delay={150}>
            <p className="mt-8 max-w-2xl text-sm text-text-muted">
              Date, venue, and ticket details for the next edition will be posted here as soon as
              they&rsquo;re announced.
            </p>
          </Reveal>
        )}
      </Container>

      <CtaBand
        eyebrow="Support the Gala"
        title="Become a Sponsor"
        image="/omega-gras.jpg"
        primary={{ label: "Sponsor the Gala", href: "/get-involved#partner-with-us" }}
        secondary={{ label: "Or make a donation", href: "/donate" }}
      >
        <p>
          Sponsorships start at $500 and put your name behind scholarships for students in our
          community.
        </p>
      </CtaBand>
    </>
  );
}
