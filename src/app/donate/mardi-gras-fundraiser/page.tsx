import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArrowPillLink, CtaBand } from "@/components/CtaBand";
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
  .filter((e) => e.title.includes("Omega Mardi Gras"))
  .sort((a, b) => b.date.localeCompare(a.date));

export default function MardiGrasPage() {
  // Soonest edition that hasn't happened yet, if one has been announced.
  const nextEdition = editions.filter((e) => getEventStatus(e.date) === "upcoming").at(-1);

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

      {nextEdition && (
        <section className="relative overflow-hidden bg-text py-14 text-white md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/40 blur-3xl"
          />
          <Container className="relative">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(0,420px)]">
              <Reveal>
                <SectionHeading eyebrow="Save the Date" title={nextEdition.title} light />
                <p
                  className="mt-6 text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <time dateTime={nextEdition.date}>{formatEventDate(nextEdition.date)}</time>
                </p>
                {nextEdition.location && (
                  <p className="mt-2 text-sm font-semibold text-white">{nextEdition.location}</p>
                )}
                <p className="mt-6 max-w-xl text-sm text-white/85">
                  The Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc. and Strengthening Our
                  Community Alliance present the next Omega Mardi Gras Scholarship Fundraiser. Mark
                  your calendar and join us in raising scholarship dollars for students in our
                  community.
                </p>
                {!nextEdition.location && (
                  <p className="mt-4 max-w-xl text-sm text-white/70">
                    Venue and ticket details will be posted here as soon as they&rsquo;re announced.
                  </p>
                )}
                <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <ArrowPillLink label="Become a Sponsor" href="/get-involved#partner-with-us" />
                  <Link
                    href="/donate"
                    className="text-sm font-bold text-white underline-offset-4 transition-colors hover:text-secondary hover:underline"
                  >
                    Or make a donation
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={75}>
                <Image
                  src={nextEdition.image}
                  alt={nextEdition.imageAlt}
                  width={1200}
                  height={1680}
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="mx-auto h-auto w-full max-w-sm rounded-card shadow-2xl ring-1 ring-white/10 lg:max-w-none"
                  priority
                />
              </Reveal>
            </div>
          </Container>
        </section>
      )}

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
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        {!nextEdition && (
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
