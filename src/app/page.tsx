import Image from "next/image";
import Link from "next/link";
import { AboutAlliance } from "@/components/AboutAlliance";
import { HeroSlider } from "@/components/HeroSlider";
import { PillarBand } from "@/components/PillarBand";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Card, CardImage } from "@/components/ui/Card";
import { formatEventDate, getPastEvents, getUpcomingEvents } from "@/lib/events";

const namedPartners = [
  "Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc.",
  "Chicago Park District — Fuller Park Fieldhouse",
  "Fuller Park Advisory Council",
  "Illinois Department of Human Services",
  "Cook County Government",
  "Kroc Center",
  "Westside Justice Center",
];

const participateCards = [
  {
    title: "Volunteer",
    description: "Give your time across any of our four pillars.",
    href: "/get-involved/volunteer",
    image: "/volunteer.jpg",
    imageAlt: "A group of volunteers smiling together outdoors",
  },
  {
    title: "Apply for a Program",
    description: "Explore mentoring, scholarship, and support programs you may be eligible for.",
    href: "/programs",
    image: "/application.jpg",
    imageAlt: "A hand filling out a scholarship application form",
  },
  {
    title: "Careers",
    description: "See open roles, including positions with our Violence Prevention Initiative.",
    href: "/get-involved/careers",
    image: "/career.jpg",
    imageAlt: "Illustration of professionals walking, representing careers and employment",
  },
];

export default function Home() {
  const upcomingEvents = getUpcomingEvents().slice(0, 3);
  const latestNews = getPastEvents().slice(0, 3);

  return (
    <div className="mesh-bg-soft">
      <h1 className="sr-only">SOC Alliance — Strengthening Our Community Alliance</h1>

      <HeroSlider />

      <PillarBand />

      <AboutAlliance />

      {/* Impact Statistics — static background image, content scrolls over it */}
      <section
        className="relative bg-cover bg-center bg-no-repeat bg-fixed py-20 md:py-28"
        style={{ backgroundImage: "url('/impact_bg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />
        <div className="relative mx-auto max-w-(--container-content) px-6 text-center">
          <Reveal>
            <h2 className="text-white">Our Impact</h2>
            <div className="mt-8 flex flex-col items-center gap-2">
              <p className="text-6xl font-bold text-white sm:text-7xl">$100,000+</p>
              <p className="max-w-md text-white/85">
                in scholarships awarded, cumulatively, through the Omega Mardi Gras Scholarship
                Fundraiser <span className="whitespace-nowrap">(as of March 2026)</span>
              </p>
            </div>
            {/* Only one impact figure is client-confirmed so far (see
                docs/discovery/20_Client_Input_Required.md, item 7). This line
                is written to be honest about that without inventing numbers —
                replace once more figures are confirmed. */}
            <p className="mt-4 text-sm text-white/60">
              More of our impact story — students mentored, families supported, and more — is on
              its way as we confirm the numbers.
            </p>
            <div className="mt-8">
              <Button href="/donate" variant="outlineInverse" size="lg" pill>
                Donate Now
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Program / Community Story — real event pulled from the
          organization's own site (docs/discovery/20_Client_Input_Required.md
          addendum, live-site verification pass). */}
      <section className="mx-auto max-w-(--container-content) px-6 py-16 md:py-24">
        <Reveal>
          <div className="glass-panel grid overflow-hidden rounded-card md:grid-cols-2 md:items-stretch">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px]">
              <Image
                src="/positive-loitering.webp"
                alt="Community members and Chicago Police Department officers gathered together at the SOC Alliance facility in Woodlawn"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                Stories From Our Community
              </p>
              <h2 className="mt-2">SOC Alliance Promotes Positive Loitering</h2>
              <p className="mt-2 text-sm font-medium text-text-muted">
                November 15, 2021 &middot; Woodlawn, Chicago
              </p>
              <p className="mt-4 text-text-muted">
                SOC Alliance opened its Woodlawn facility to neighbors and officers from the
                Chicago Police Department for a &ldquo;positive loitering&rdquo; gathering — one
                of the ways the Alliance brings residents and law enforcement together face to
                face. The idea behind it is straightforward: familiarity builds trust, and trust
                between neighbors and police is one more tool for reducing violence in the
                community.
              </p>
              <div className="mt-6">
                <Button href="/programs/community" variant="outline" size="md" pill>
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Upcoming Events */}
      <section>
        <div className="mx-auto max-w-(--container-content) px-6 py-16 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2>Upcoming Events</h2>
              <Link href="/news-events" className="text-sm font-semibold text-primary hover:underline">
                View all news &amp; events &rarr;
              </Link>
            </div>
          </Reveal>
          {upcomingEvents.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {upcomingEvents.map((event, i) => (
                <Reveal key={event.title} delay={i * 75}>
                  <Card className="h-full" glass neonAccent={event.color}>
                    <CardImage src={event.image} alt={event.imageAlt} />
                    <p className="text-sm font-semibold text-accent">{formatEventDate(event.date)}</p>
                    <h3 className="mt-2 text-lg">{event.title}</h3>
                    {event.location && (
                      <p className="mt-1 text-sm text-text-muted">{event.location}</p>
                    )}
                    <p className="mt-2 text-sm text-text-muted">{event.description}</p>
                    <Link
                      href={event.href}
                      className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                    >
                      {event.cta} &rarr;
                    </Link>
                  </Card>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="glass-panel mt-8 flex flex-col items-center gap-4 rounded-card px-8 py-12 text-center sm:flex-row sm:text-left">
                <div className="relative h-20 w-20 shrink-0">
                  <Image
                    src="/upcoming.png"
                    alt="Upcoming events"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-text">No upcoming events on the calendar right now</p>
                  <p className="mt-1 text-sm text-text-muted">
                    New dates are added as they&rsquo;re confirmed — check{" "}
                    <Link href="/news-events" className="font-semibold text-primary hover:underline">
                      News &amp; Events
                    </Link>{" "}
                    for the latest, or browse highlights from recent SOC Alliance events below.
                  </p>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Latest News — pulled from the full blog archive in lib/events.ts */}
      <section className="mx-auto max-w-(--container-content) px-6 py-16 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2>Latest News</h2>
            <Link href="/news-events" className="text-sm font-semibold text-primary hover:underline">
              View full archive &rarr;
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {latestNews.map((event, i) => (
            <Reveal key={event.title} delay={i * 75}>
              <Card href={event.href} className="h-full" glass neonAccent={event.color}>
                <CardImage src={event.image} alt={event.imageAlt} />
                <p className="text-sm font-semibold text-text-muted">{formatEventDate(event.date)}</p>
                <h3 className="mt-2 text-lg">{event.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{event.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
                  Learn more &rarr;
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust & Transparency */}
      <section className="mx-auto max-w-(--container-content) px-6 py-14 text-center">
        <div className="glass-panel mx-auto inline-block rounded-full px-6 py-3">
          <p className="text-sm font-semibold text-text-muted">
            SOC Alliance is a 501(c)(3) public charity &middot; EIN 36-4047035
          </p>
          <Link
            href="/about/financials-transparency"
            className="mt-1 inline-block text-sm font-medium text-primary underline underline-offset-2"
          >
            View our financials &amp; transparency
          </Link>
        </div>
      </section>

      {/* Partner & Collaborator Mentions — static Chicago skyline background,
          same treatment as Our Impact/Support Our Work above. */}
      <section
        className="relative bg-cover bg-center bg-no-repeat bg-fixed py-16 md:py-24"
        style={{ backgroundImage: "url('/chicago.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />
        <div className="relative mx-auto max-w-(--container-content) px-6">
          <Reveal className="text-center">
            <h2 className="text-white">Working Alongside Our Community</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              SOC Alliance programs are made possible in partnership with these organizations.
            </p>
            {/* Partner logos are pending client confirmation on which
                organizations may be shown with a logo — see
                docs/discovery/20_Client_Input_Required.md. Name-only badges
                below are already verified/public; swap in logos as they're
                cleared rather than adding a visible "pending" notice for
                site visitors. */}
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {namedPartners.map((partner) => (
                <li
                  key={partner}
                  className="rounded-full border border-black/10 bg-background px-4 py-2 text-sm font-medium text-text shadow-sm"
                >
                  {partner}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* How to Participate */}
      <section className="mx-auto max-w-(--container-content) px-6 py-16 md:py-24">
        <Reveal>
          <h2>How to Participate</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {participateCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 75}>
              <Card href={card.href} className="h-full" glass>
                <CardImage src={card.image} alt={card.imageAlt} />
                <h3 className="text-lg">{card.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{card.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
                  Learn more &rarr;
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Support Our Work */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-(--container-content) px-6 text-center">
          <Reveal>
            <h2>Support Our Work</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              Every gift funds scholarships, economic development, community safety, and health
              programs across Chicago&rsquo;s South Side. SOC Alliance is run entirely by
              volunteers — every officer reports $0 compensation — so more of what you give
              reaches the community directly.
            </p>
            <p className="mt-4 text-sm text-text-muted">
              SOC Alliance is a 501(c)(3) public charity, EIN 36-4047035. Your gift is
              tax-deductible to the extent allowed by law.
            </p>
            <div className="mt-8">
              <Button href="/donate" variant="accent" size="lg" pill>
                Donate Now
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-(--container-content) px-6 py-16">
        <div className="glass-panel mx-auto max-w-xl rounded-card px-8 py-10 text-center md:px-12">
          <h2>Stay Connected</h2>
          <p className="mx-auto mt-2 max-w-md text-text-muted">
            Get updates on programs and events.
          </p>
          <div className="mx-auto mt-6 max-w-sm text-left">
            <NewsletterForm idPrefix="home" />
          </div>
        </div>
      </section>
    </div>
  );
}
