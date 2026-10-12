import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { VolunteerForm } from "@/components/VolunteerForm";
import { Button } from "@/components/ui/Button";
import { getCareerRoles, getSettings } from "@/lib/cms/content";
import { telHref } from "@/lib/cms/settings";
import { buildMailtoHref } from "@/lib/mailto";
import { pillars } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Volunteer, apply for a career, partner with us, or reach out for mentoring and life coaching support.",
};

const tintBg = (color: string, pct = 14) => ({ backgroundColor: `color-mix(in srgb, ${color} ${pct}%, transparent)` });

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="2.5" y="7" width="19" height="13.5" rx="2" />
      <path d="M16 20.5V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v15.5" />
    </svg>
  );
}

const ways = [
  {
    href: "#volunteer",
    eyebrow: "Give Your Time",
    title: "Volunteer",
    body: "Lend a hand across any of our four pillars.",
    image: "/volunteer.jpg",
    imageAlt: "A group of volunteers smiling together outdoors",
  },
  {
    href: "#careers",
    eyebrow: "Join Our Team",
    title: "Careers",
    body: "Roles with our Strengthening Violence Prevention Initiative.",
    image: "/career.jpg",
    imageAlt: "Illustration of professionals walking, representing careers and employment",
  },
  {
    href: "#partner-with-us",
    eyebrow: "Businesses & Institutions",
    title: "Partner With Us",
    body: "Sponsor, collaborate, and support the work year-round.",
    image: "/help.jpg",
    imageAlt: "Two people shaking hands, with a third person smiling in the background",
  },
  {
    href: "/get-involved/mentoring-life-coaching",
    eyebrow: "Support for Survivors",
    title: "Mentoring & Life Coaching",
    body: "Free, trauma-informed support for survivors of violence ages 18 to 35.",
    image: "/lady.jpg",
    imageAlt: "A young woman smiling while writing in a notebook",
  },
];

export default async function GetInvolvedPage() {
  const [settings, svpiRoles] = await Promise.all([getSettings(), getCareerRoles()]);
  const applyHref = buildMailtoHref(
    settings.contact_email,
    "SVPI role inquiry",
    "I'm interested in learning more about open roles with the Strengthening Violence Prevention Initiative.\n\nName:\nRole of interest:\n"
  );

  return (
    <>
      <PageHeader
        title="Get Involved"
        description="There's more than one way to strengthen our community. Find the one that fits you."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved" }]}
        image="/community-work.png"
        imageAlt="Volunteers in green shirts working together in the community"
      >
        {/* Sub-nav — rendered in-flow inside the header so it always sits
            within the photo, however tall the header ends up being. */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a href="#volunteer" className="text-sm font-bold text-white transition-colors hover:text-white/70">
            Volunteer
          </a>
          <span className="h-4 w-px bg-white/40" aria-hidden />
          <a href="#careers" className="text-sm font-bold text-white transition-colors hover:text-white/70">
            Careers
          </a>
          <span className="h-4 w-px bg-white/40" aria-hidden />
          <a href="#partner-with-us" className="text-sm font-bold text-white transition-colors hover:text-white/70">
            Partner With Us
          </a>
          <span className="h-4 w-px bg-white/40" aria-hidden />
          <Link href="/get-involved/mentoring-life-coaching" className="text-sm font-bold text-white transition-colors hover:text-white/70">
            Mentoring &amp; Life Coaching
          </Link>
        </div>
      </PageHeader>

      {/* Ways to get involved */}
      <Container className="py-14 md:py-20">
        <Reveal className="max-w-2xl">
          <SectionHeading eyebrow="Ways to Help" title="Find Your Place" />
        </Reveal>
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ways.map((w, i) => (
            <li key={w.title}>
              <Reveal delay={i * 60} className="h-full">
                <Link
                  href={w.href}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-background shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={w.image} alt={w.imageAlt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-secondary-dark">{w.eyebrow}</p>
                    <p className="mt-1.5 text-lg font-bold text-text group-hover:text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                      {w.title}
                    </p>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-text-muted">{w.body}</p>
                    <span className="mt-4 text-sm font-bold text-primary">
                      Learn more <span aria-hidden>&rarr;</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      {/* Volunteer */}
      <section id="volunteer" className="scroll-mt-28 bg-surface py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_minmax(0,480px)] lg:gap-16">
            <Reveal>
              <SectionHeading eyebrow="Give Your Time" title="Volunteer" />
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-muted">
                SOC Alliance is led by a volunteer Board of Directors, and volunteers support programs
                across all four of our pillars. Tell us where you&rsquo;d like to help and we&rsquo;ll be
                in touch.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {pillars.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li key={p.slug}>
                      <Link
                        href={`/programs/${p.slug}`}
                        className="group flex items-center gap-3 rounded-2xl border border-black/5 bg-background p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={tintBg(p.colorVar)}>
                          <Icon className="h-5 w-5" style={{ color: p.colorVar }} />
                        </span>
                        <span className="text-sm font-bold text-text group-hover:text-primary">{p.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 max-w-xl">
                <PendingNotice>
                  <p>A list of specific, current volunteer opportunities and time commitments is pending.</p>
                </PendingNotice>
              </div>
            </Reveal>

            <Reveal delay={75}>
              <div className="rounded-3xl bg-background p-6 shadow-xl ring-1 ring-black/5 sm:p-8">
                <h3 className="text-xl">Tell Us You&rsquo;re Interested</h3>
                <p className="mt-1 text-sm text-text-muted">It only takes a minute.</p>
                <div className="mt-6">
                  <VolunteerForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Careers */}
      <section id="careers" className="scroll-mt-28 py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="relative">
              <div aria-hidden className="absolute -bottom-4 -left-4 hidden h-full w-full rounded-3xl bg-accent/20 sm:block" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image src="/career.jpg" alt="Illustration of professionals walking, representing careers and employment" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={75}>
              <SectionHeading eyebrow="Join Our Team" title="Careers" />
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-muted">
                SOC Alliance&rsquo;s Strengthening Violence Prevention Initiative (SVPI) hires across the
                following role categories, funded in part by the Illinois Department of Human Services.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {svpiRoles.map((role) => (
                  <li key={role.id ?? role.title} className="flex items-start gap-3 rounded-2xl border border-black/5 bg-background p-4 shadow-sm">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
                      <BriefcaseIcon className="h-4.5 w-4.5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-text">{role.title}</span>
                      {role.description && <span className="mt-0.5 block text-xs leading-relaxed text-text-muted">{role.description}</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <PendingNotice>
                  <p>Specific current openings, qualifications, and compensation ranges are pending.</p>
                </PendingNotice>
              </div>
              <div className="mt-6">
                <Button href={applyHref} pill>
                  Inquire About a Role
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Partner With Us */}
      <section id="partner-with-us" className="scroll-mt-28 bg-surface py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="lg:order-2 relative">
              <div aria-hidden className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-3xl bg-secondary/25 sm:block" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image src="/omega-gras.jpg" alt="A gold Mardi Gras mask surrounded by festive confetti and ribbon" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={75} className="lg:order-1">
              <SectionHeading eyebrow="Businesses & Institutions" title="Partner With Us" />
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-muted">
                SOC Alliance works alongside businesses, sponsors, and institutional partners year-round
                &mdash; not only around our flagship Mardi Gras Scholarship Fundraiser, where sponsorships
                start at $500.
              </p>
              <div className="mt-6 max-w-xl">
                <PendingNotice>
                  <p>Year-round sponsorship tiers and in-kind partnership options are still being finalized.</p>
                </PendingNotice>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/contact" pill>
                  Contact Us About Partnering
                </Button>
                <Button href="/donate/mardi-gras-fundraiser" variant="outline" pill>
                  Sponsor the Mardi Gras Fundraiser
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mentoring */}
      <CtaBand
        eyebrow="Support for Survivors"
        title="Mentoring & Life Coaching"
        image="/impact.jpg"
        primary={{ label: "Learn More & Reach Out", href: "/get-involved/mentoring-life-coaching" }}
        secondary={{ label: `Or call ${settings.contact_phone}`, href: telHref(settings.contact_phone) }}
      >
        <p>
          Free, trauma-informed mentoring and life coaching for survivors of violence ages 18 to 35,
          offered through SOC Alliance&rsquo;s Strengthening Violence Prevention Initiative.
        </p>
      </CtaBand>
    </>
  );
}
