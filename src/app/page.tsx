import Image from "next/image";
import Link from "next/link";
import { AboutAlliance } from "@/components/AboutAlliance";
import { FourPillarGallery } from "@/components/FourPillarGallery";
import { SupportCarousel } from "@/components/SupportCarousel";
import { PictureCarousel } from "@/components/PictureCarousel";
import { HeroSlider } from "@/components/HeroSlider";
import { PillarBand } from "@/components/PillarBand";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Card, CardImage } from "@/components/ui/Card";
import { formatEventDate, getPastEvents, getUpcomingEvents } from "@/lib/events";

const namedPartners = [
  "Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc.",
  "Chicago Park District's Fuller Park Fieldhouse",
  "Fuller Park Advisory Council",
  "Illinois Department of Human Services",
  "Cook County Government",
  "Kroc Center",
  "Westside Justice Center",
];

const communityStories = [
  {
    image: "/svpi-fuller-park.webp",
    imageAlt:
      "SOC Alliance staff and Fuller Park Advisory Council members posing together at the Fuller Park Fieldhouse",
    title: "Strengthening Violence Prevention Initiative Partners With Fuller Park Advisory Council",
    dateLocation: "August 20, 2025 · Fuller Park Fieldhouse, Chicago",
    body: "SOC Alliance’s Strengthening Violence Prevention Initiative held a kickoff meeting with the Chicago Park District’s Fuller Park Fieldhouse and the Fuller Park Advisory Council. It’s one more way the Alliance brings residents and local partners together, working from the same idea behind all of SOC Alliance’s community safety work: shared priorities, from traffic safety to youth engagement, are stronger when neighbors help set them.",
    href: "/programs/community",
  },
  {
    image: "/positive-loitering.webp",
    imageAlt:
      "Community members and Chicago Police Department officers gathered together at the SOC Alliance facility in Woodlawn",
    title: "SOC Alliance Promotes Positive Loitering",
    dateLocation: "November 15, 2021 · Woodlawn, Chicago",
    body: "SOC Alliance opened its Woodlawn facility to neighbors and officers from the Chicago Police Department for a “positive loitering” gathering, one of the ways the Alliance brings residents and law enforcement together face to face. The idea behind it is simple: familiarity builds trust, and trust between neighbors and police helps reduce violence in the community.",
    href: "/programs/community",
  },
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
  const upcomingEventSlides = upcomingEvents.map((event) => ({
    image: event.image,
    imageAlt: event.imageAlt,
    eyebrow: event.location
      ? `${formatEventDate(event.date)} · ${event.location}`
      : formatEventDate(event.date),
    title: event.title,
    body: event.description,
    cta: event.cta,
    href: event.href,
    color: event.color,
  }));
  const blogPostSlides = latestNews.map((post) => ({
    image: post.image,
    imageAlt: post.imageAlt,
    eyebrow: formatEventDate(post.date),
    title: post.title,
    body: post.description,
    cta: "Read More",
    href: post.href,
    color: post.color,
  }));

  return (
    <div className="mesh-bg-soft">
      <h1 className="sr-only">Strengthening Our Community Alliance (SOC Alliance)</h1>

      <HeroSlider />

      <PillarBand />

      <AboutAlliance />

      <FourPillarGallery />

      {/* Upcoming Events + Blog Post — two Support-Our-Work-style carousel
          cards side by side, moved up to sit directly under About the
          Alliance. */}
      <section>
        <div className="mx-auto max-w-(--container-content) px-6 py-16 md:py-24">
          <div className="grid items-stretch gap-10 md:grid-cols-[40%_1fr]">
            <Reveal className="flex h-full flex-col">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2>Upcoming Events</h2>
                <Link href="/news-events" className="text-sm font-semibold text-primary hover:underline">
                  View all &rarr;
                </Link>
              </div>
              {upcomingEvents.length > 0 ? (
                <div className="mt-8 flex-1">
                  <PictureCarousel slides={upcomingEventSlides} />
                </div>
              ) : (
                <div className="glass-panel mt-8 flex flex-1 flex-col items-center justify-center gap-4 rounded-card px-6 py-10 text-center">
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
                      New dates are added as they&rsquo;re confirmed, so check{" "}
                      <Link href="/news-events" className="font-semibold text-primary hover:underline">
                        News &amp; Events
                      </Link>{" "}
                      for the latest.
                    </p>
                  </div>
                </div>
              )}
            </Reveal>

            <Reveal delay={75} className="flex h-full flex-col">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2>Blog Post</h2>
                <Link href="/news-events" className="text-sm font-semibold text-primary hover:underline">
                  View full archive &rarr;
                </Link>
              </div>
              <div className="mt-8 flex-1">
                <SupportCarousel slides={blogPostSlides} imageSize="lg" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

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
              More of our impact story, like students mentored and families supported, is on its
              way as we confirm the numbers.
            </p>
            <div className="mt-8">
              <Button href="/donate" variant="outlineInverse" size="lg" pill>
                Donate Now
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Program / Community Stories — real events pulled from the
          organization's own site (docs/discovery/20_Client_Input_Required.md
          addendum, live-site verification pass). Layout alternates image
          side per story. */}
      <section className="mx-auto max-w-(--container-content) px-6 py-16 md:py-24">
        <Reveal>
          <h2>Stories From Our Community</h2>
        </Reveal>
        <div className="mt-8 flex flex-col gap-10">
          {communityStories.map((story, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={story.title} delay={i * 75}>
                <div className="glass-panel grid overflow-hidden rounded-card md:grid-cols-2 md:items-stretch">
                  <div
                    className={`relative aspect-[4/3] md:aspect-auto md:min-h-[380px] ${
                      reversed ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={story.image}
                      alt={story.imageAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div
                    className={`flex flex-col justify-center p-8 md:p-12 ${
                      reversed ? "md:order-1" : ""
                    }`}
                  >
                    <p className="text-sm font-medium text-text-muted">{story.dateLocation}</p>
                    <h3 className="mt-2 text-2xl">{story.title}</h3>
                    <p className="mt-4 text-text-muted">{story.body}</p>
                    <div className="mt-6">
                      <Button href={story.href} variant="outline" size="md" pill>
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
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

      {/* Support Our Work — image/content carousel alternating Volunteer and
          Donate asks, each with its own accent color per
          docs/discovery/20_Client_Input_Required.md build notes. Shares its
          row with a compact Stay Connected panel (80/20 split). */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-(--container-content) px-6">
          <Reveal>
            <h2 className="text-center">Support Our Work</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-text-muted">
              SOC Alliance is a 501(c)(3) public charity, EIN 36-4047035. Every gift and every
              volunteer hour is tax-deductible and reaches the community directly.
            </p>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-stretch">
              <div className="md:w-[80%]">
                <SupportCarousel />
              </div>
              <div className="flex flex-col justify-center rounded-card bg-primary px-6 py-6 text-center md:w-[20%]">
                <h3 className="text-lg text-white">Stay Connected</h3>
                <p className="mt-2 text-sm text-white/80">Get updates on programs and events.</p>
                <div className="mt-4">
                  <NewsletterForm idPrefix="home" stacked dark buttonVariant="outlineInverse" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
