import Image from "next/image";
import Link from "next/link";
import { AboutAlliance } from "@/components/AboutAlliance";
import { CountUp } from "@/components/CountUp";
import { ArrowPillLink } from "@/components/CtaBand";
import { FourPillarGallery } from "@/components/FourPillarGallery";
import { SupportCarousel } from "@/components/SupportCarousel";
import { PictureCarousel } from "@/components/PictureCarousel";
import { HeroSlider } from "@/components/HeroSlider";
import { PillarBand } from "@/components/PillarBand";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getEvents, getPartners, getSettings, getSocialLinks, getStories } from "@/lib/cms/content";
import { formatEventDate, getPastEvents, getUpcomingEvents } from "@/lib/events";

function ViewAllLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-1.5 pb-1 text-sm font-bold text-primary"
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-1">
        &rarr;
      </span>
    </Link>
  );
}

const participateCards = [
  {
    title: "Volunteer",
    description: "Give your time across any of our four pillars.",
    href: "/get-involved#volunteer",
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
    href: "/get-involved#careers",
    image: "/career.jpg",
    imageAlt: "Illustration of professionals walking, representing careers and employment",
  },
];

export default async function Home() {
  const [events, settings, communityStories, partners, socialLinks] = await Promise.all([
    getEvents(),
    getSettings(),
    getStories(),
    getPartners(),
    getSocialLinks(),
  ]);
  const upcomingEvents = getUpcomingEvents(events).slice(0, 3);
  const latestNews = getPastEvents(events).slice(0, 3);
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

      <HeroSlider socialLinks={socialLinks} />

      <PillarBand />

      <AboutAlliance
        mission={settings.mission}
        vision={settings.vision}
        values={settings.values}
        blurb={settings.about_blurb}
        ein={settings.org_ein}
      />

      <FourPillarGallery />

      {/* Upcoming Events + Blog Post — two Support-Our-Work-style carousel
          cards side by side, moved up to sit directly under About the
          Alliance. */}
      <section>
        <div className="mx-auto max-w-(--container-content) px-6 py-14 md:py-20">
          <div className="grid items-stretch gap-10 md:grid-cols-[40%_1fr]">
            <Reveal className="flex h-full flex-col">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHeading eyebrow="On the Calendar" title="Upcoming Events" />
                <ViewAllLink href="/news-events">View all</ViewAllLink>
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
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHeading eyebrow="From the Blog" title="Latest Stories" />
                <ViewAllLink href="/news-events">View full archive</ViewAllLink>
              </div>
              <div className="mt-8 flex-1">
                <SupportCarousel slides={blogPostSlides} imageSize="lg" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Impact — photo stays fixed while content scrolls over it; the
          headline figure counts up the first time it comes into view. */}
      <section
        className="relative isolate overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed py-20 md:py-28"
        style={{ backgroundImage: "url('/impact_bg.png')" }}
      >
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-text/90 via-text/75 to-text/95" />
        <div aria-hidden className="absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
        <div aria-hidden className="absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />
        <div className="mx-auto max-w-(--container-content) px-6 text-center">
          <Reveal>
            <SectionHeading eyebrow="By the Numbers" title="Our Impact" light align="center" />
            <div className="mt-10 flex flex-col items-center gap-3">
              <CountUp
                value={settings.impact_figure}
                className="bg-gradient-to-br from-[#f6e2a6] via-secondary to-[#c48a1c] bg-clip-text text-7xl font-extrabold leading-none tracking-tight text-transparent sm:text-9xl"
                style={{ fontFamily: "var(--font-heading)" }}
              />
              <p className="max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">{settings.impact_caption}</p>
            </div>
          </Reveal>
          {/* Only one impact figure is client-confirmed so far (see
              docs/discovery/20_Client_Input_Required.md, item 7); the chips
              below are verified organizational facts, not program stats. */}
          <Reveal delay={100}>
            <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { top: "501(c)(3)", bottom: "Registered public charity" },
                { top: "$0", bottom: "Officer compensation" },
                { top: "21", bottom: "Annual Mardi Gras galas, as of 2026" },
              ].map((chip) => (
                <li key={chip.top} className="rounded-2xl bg-white/[0.07] px-5 py-4 ring-1 ring-white/15 backdrop-blur-sm">
                  <p className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                    {chip.top}
                  </p>
                  <p className="mt-0.5 text-xs text-white/70">{chip.bottom}</p>
                </li>
              ))}
            </ul>
            {settings.impact_note && <p className="mx-auto mt-6 max-w-xl text-sm text-white/60">{settings.impact_note}</p>}
            <div className="mt-8 flex justify-center">
              <ArrowPillLink label="Donate Now" href="/donate" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Program / Community Stories — real events pulled from the
          organization's own site (docs/discovery/20_Client_Input_Required.md
          addendum, live-site verification pass). Layout alternates image
          side per story. */}
      <section className="mx-auto max-w-(--container-content) px-6 py-14 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="In the Neighborhood" title="Stories From Our Community" />
        </Reveal>
        <div className="mt-8 flex flex-col gap-10">
          {communityStories.map((story, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={story.id ?? story.title} delay={i * 75}>
                <div
                  className={`glass-panel grid overflow-hidden rounded-card md:items-stretch ${
                    story.image ? "md:grid-cols-2" : ""
                  }`}
                >
                  {story.image && (
                    <div
                      className={`relative aspect-[4/3] md:aspect-auto md:min-h-[380px] ${
                        reversed ? "md:order-2" : ""
                      }`}
                    >
                      <Image
                        src={story.image}
                        alt={story.imageAlt || story.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`flex flex-col justify-center p-8 md:p-12 ${
                      reversed ? "md:order-1" : ""
                    }`}
                  >
                    {story.dateLocation && (
                      <p className="text-sm font-medium text-text-muted">{story.dateLocation}</p>
                    )}
                    <h3 className="mt-2 text-2xl">{story.title}</h3>
                    <p className="mt-4 whitespace-pre-line text-sm text-text-muted">{story.body}</p>
                    {story.href && (
                      <div className="mt-6">
                        <Button href={story.href} variant="outline" size="md" pill>
                          Learn More
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Partner & Collaborator Mentions — static Chicago skyline background,
          same treatment as Our Impact/Support Our Work above. */}
      <section
        className="relative bg-cover bg-center bg-no-repeat bg-fixed py-14 md:py-20"
        style={{ backgroundImage: "url('/chicago.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />
        <div className="relative mx-auto max-w-(--container-content) px-6">
          <Reveal className="text-center">
            <SectionHeading eyebrow="Our Partners" title="Working Alongside Our Community" light align="center" />
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/80">
              SOC Alliance programs are made possible in partnership with these organizations.
            </p>
          </Reveal>
        </div>
        {/* Partner logos are pending client confirmation on which
            organizations may be shown with a logo — see
            docs/discovery/20_Client_Input_Required.md. Name-only badges are
            already verified/public; swap in logos as they're cleared. The
            list scrolls as a ticker (paused on hover, static for reduced
            motion); the second copy exists only to make the loop seamless. */}
        <div className="marquee relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul className="marquee-track flex w-max gap-4 px-2" aria-label="Our partners">
            {[0, 1].map((copy) =>
              partners.map((partner) => (
                <li
                  key={`${copy}-${partner.id ?? partner.name}`}
                  aria-hidden={copy === 1 || undefined}
                  className={`flex shrink-0 items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-md ${
                    copy === 1 ? "marquee-duplicate" : ""
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden />
                  {partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={copy === 1 ? -1 : undefined}
                      className="hover:text-secondary"
                    >
                      {partner.name}
                    </a>
                  ) : (
                    partner.name
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </section>

      {/* How to Participate — full-photo cards */}
      <section className="mx-auto max-w-(--container-content) px-6 py-14 md:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Get Involved" title="How to Participate" />
          <ViewAllLink href="/get-involved">All the ways to help</ViewAllLink>
        </Reveal>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {participateCards.map((card, i) => (
            <li key={card.title}>
              <Reveal delay={i * 75}>
                <Link
                  href={card.href}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-lg transition hover:-translate-y-1 hover:shadow-2xl sm:aspect-[3/4]"
                >
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(min-width: 640px) 32vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-text via-text/50 to-transparent" />
                  <span
                    aria-hidden
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-md transition duration-300 group-hover:rotate-[-45deg] group-hover:bg-secondary group-hover:text-text"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2}>
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-sm font-extrabold text-secondary" style={{ fontFamily: "var(--font-heading)" }}>
                      0{i + 1}
                    </p>
                    <h3 className="mt-1 text-2xl text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">{card.description}</p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Support Our Work — two bold asks side by side, then newsletter */}
      <section className="mx-auto max-w-(--container-content) px-6 pb-16 md:pb-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="h-full">
            <div className="relative isolate flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-text p-8 text-white shadow-2xl sm:p-10">
              <Image src="/donate-photo.jpg" alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" aria-hidden className="-z-10 object-cover opacity-20" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-text via-text/90 to-primary/70" />
              <div aria-hidden className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />
              <div>
                <SectionHeading eyebrow="Make a Difference" title="Fuel Our Mission" light />
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80">
                  Your gift supports scholarship, economic development, community, and health programs
                  run by a 501(c)(3) public charity whose officers serve without pay.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {[`501(c)(3) · EIN ${settings.org_ein}`, "Tax-deductible to the extent allowed by law", "$0 officer compensation"].map((t) => (
                    <li key={t} className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 ring-1 ring-white/15">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <ArrowPillLink label="Donate Now" href="/donate" />
                <Link href="/donate/pledge" className="text-sm font-bold text-white underline-offset-4 hover:text-secondary hover:underline">
                  Or pledge a gift
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={75} className="h-full">
            <Link
              href="/get-involved#volunteer"
              className="group relative isolate flex h-full min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl p-8 text-white shadow-2xl sm:p-10"
            >
              <Image
                src="/help.jpg"
                alt="Two people shaking hands, with a third person smiling in the background"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-accent via-accent/70 to-accent/10" />
              <p className="text-xs font-bold uppercase tracking-widest text-white/80">Give Your Time</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">Lend a Hand</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/85">
                Volunteer across any of our four pillars: scholarship, economic development, community,
                and health.
              </p>
              <span className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-bold text-text transition group-hover:bg-secondary">
                Volunteer With Us
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-text text-white transition-transform group-hover:translate-x-0.5" aria-hidden>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="relative isolate mt-6 overflow-hidden rounded-3xl bg-primary px-8 py-8 sm:px-10">
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary to-accent" />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-10"
              style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "18px 18px" }}
            />
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Stay Connected</h2>
                <p className="mt-1 text-sm text-white/80">Get occasional updates on programs, events, and ways to help.</p>
              </div>
              <div className="w-full lg:max-w-md">
                <NewsletterForm idPrefix="home" dark buttonVariant="outlineInverse" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
