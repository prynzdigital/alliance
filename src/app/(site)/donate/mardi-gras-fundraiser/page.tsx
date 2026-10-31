import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArrowPillLink, CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StatBand } from "@/components/StatBand";
import { getEvents } from "@/lib/cms/content";
import { formatEventDate, getEventStatus } from "@/lib/events";

export const metadata: Metadata = {
  title: "Mardi Gras Scholarship Fundraiser",
  description:
    "The Omega Mardi Gras Scholarship Fundraiser — SOC Alliance's flagship annual gala, co-hosted with the Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc.",
};

export default async function MardiGrasPage() {
  // Editions come from the shared Events & News list (any event whose title
  // mentions Omega Mardi Gras), newest first, so a new edition only needs
  // adding once in the admin and its status is always derived from its date.
  const editions = (await getEvents())
    .filter((e) => e.title.includes("Omega Mardi Gras"))
    .sort((a, b) => b.date.localeCompare(a.date));

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

      <section id="recap-2026" className="scroll-mt-32 bg-surface py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <SectionHeading eyebrow="2026 Recap" title="A Night to Remember" />
              <p className="mt-5 text-base leading-relaxed text-text-muted">
                On March 14, 2026, SOC Alliance and the Sigma Omega Chapter of Omega Psi Phi Fraternity,
                Inc. hosted the 21st Annual Mardi Gras Scholarship Fundraiser. Close to 250 guests filled
                the Stadium Club at Rate Field for an evening that paired celebration with purpose.
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                The night had something for everyone: music by DJ Phokiss, a live performance by Soul
                Street Collective, a lively casino experience, and a full buffet. More than 30 corporate,
                civic, and community sponsors made it possible, and their investment directly funds
                scholarships for students across Chicagoland.
              </p>
              <ul className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { value: "~250", label: "Guests" },
                  { value: "30+", label: "Sponsors" },
                  { value: "21st", label: "Annual gala" },
                ].map((s) => (
                  <li key={s.label} className="rounded-2xl bg-background p-4 text-center shadow-sm ring-1 ring-black/5">
                    <p className="text-2xl font-extrabold text-primary sm:text-3xl" style={{ fontFamily: "var(--font-heading)" }}>
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-text-muted">{s.label}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-text-muted">
                See the{" "}
                <Link href="/programs/scholarship#recipients-2026" className="font-semibold text-primary hover:underline">
                  2026 scholarship recipients
                </Link>{" "}
                this night helped support.
              </p>
            </Reveal>

            <Reveal delay={75} className="flex flex-col gap-6">
              <figure>
                <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                  <Image
                    src="/mardi-gras-2026-leadership.webp"
                    alt="Four men in suits and Mardi Gras beads posing together at the 2026 gala"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-text-muted">
                  Left to right: Dana O&rsquo;Banion (Fundraising Chair), Ron Hughes (Executive Director),
                  Theodore Davis (Board Chair), and Dathon O&rsquo;Banion (Basileus, Sigma Omega Chapter).
                </figcaption>
              </figure>
              <figure>
                <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                  <Image
                    src="/mardi-gras-2026-entertainment.webp"
                    alt="Three vocalists performing live with a band at the 2026 gala"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-text-muted">Live entertainment at the 21st Annual gala.</figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-1 items-center gap-10 rounded-3xl bg-text p-6 text-white shadow-2xl sm:p-10 lg:grid-cols-[1fr_minmax(0,380px)]">
            <Reveal>
              <SectionHeading eyebrow="Thank You" title="Our 2026 Sponsors" light />
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80">
                Thank you to our 2026 Confetti, Krewe, Second Line, and Patron sponsors. Their support
                elevated one night and expands educational access for deserving students across
                Chicagoland.
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <ArrowPillLink label="Become a Sponsor" href="/get-involved#partner-with-us" />
              </div>
            </Reveal>
            <Reveal delay={75}>
              <Image
                src="/mardi-gras-2026-sponsors.webp"
                alt="Omega Mardi Gras 2026 Event Sponsors poster. Confetti Sponsors: Bro. Glenn Brewer and Karen Haskins-Brewer; Bro. Dana Keone O'Banion. Krewe Sponsors: Bro. Ernest Edwards; Bro. Ronald and Santha Hughes. Second Line Sponsors: Bro. Zaid Abdul Aleem and Family; Jeannie L. Adams; Bro. Sean Armstead, Phenomenal Fitness; Bro. Theodore Davis, DJ Chip Davis; Ron Lewis, Real Digital; Angela O'Banion, AFO Technology Group; Bro. Daniel T. Parker; Bro. Charles Alexander. Patron Sponsors: Duane Akin, DJ Duane Akin; Michelle Blakely, PhD; Bro. Dr. Steve Bowman; Bro. Jeff Cade, Healthy Lifestyle Specialist; Tony Coates, Ja' Grill; Bro. Ken Dickerson, Christian Brothers Automotive Aurora; Bro. Robert E. Fox Jr., Rush Solutions; Bro. William Greer; Dr. Karen Lever, 28 To Brush; Daria McDowell, Favors Décor and More; Bro. Pastor Mike Neal, Timothy Community Corporation; Neighborhood Housing Services; Bro. Lionel Pittman Sr., Pittman Plumbing; Providence Bank; Bro. Craig Richardson, Batter and Berries; Lori Hayes Shaw, State Farm; Sigma Omega Spring 2020 Line; Bro. Anthony Thomas, LATSC; Bro. Gregory Vanduan; Bro. Kalvin Watson, Massively OWT Products."
                width={1100}
                height={1651}
                sizes="(min-width: 1024px) 380px, 100vw"
                className="mx-auto h-auto w-full max-w-sm rounded-2xl shadow-2xl ring-1 ring-white/10"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <StatBand
        eyebrow="By the Numbers"
        title="A Tradition of Giving"
        image="/omega-gras.jpg"
        items={[
          { value: "$100K+", label: "Raised in scholarships, cumulatively", icon: "scholarship" },
          { value: "21", label: "Annual editions, as of 2026", icon: "calendar" },
          { value: "$500", label: "Sponsorships start here", icon: "handshake" },
        ]}
      />

      <Container className="py-14 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Recent Editions" title="On the Calendar" />
        </Reveal>
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {editions.map((edition, i) => {
            const upcoming = getEventStatus(edition.date) === "upcoming";
            return (
              <li key={edition.id ?? edition.date}>
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
