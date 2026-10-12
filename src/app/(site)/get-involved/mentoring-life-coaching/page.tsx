import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { MentoringForm } from "@/components/MentoringForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getSettings } from "@/lib/cms/content";
import { telHref } from "@/lib/cms/settings";

// Must stay in the sitemap and be indexed — the current live site omits an
// equivalent page from its sitemap entirely (MASTER_BUILD_SPECIFICATION.md,
// Section 7). Tone written dignity-first and trauma-informed per
// docs/discovery/09_Content_Strategy.md, Content Rule 3 — still recommend a
// client read-through before this goes live given the sensitivity here.
export const metadata: Metadata = {
  title: "Mentoring & Life Coaching",
  description: "Support for people affected by firearm violence — reach out by form or phone, in confidence.",
};

const facts = ["Free", "Trauma-informed", "One-on-one", "Ages 18 to 35"];
const areas = ["Fuller Park", "South Chicago", "South Deering"];

const steps = [
  {
    title: "You reach out",
    body: "Use the form or call us. Share as much or as little as you want.",
  },
  {
    title: "We follow up",
    body: "A member of our team follows up directly, using whatever contact method you tell us works best.",
  },
  {
    title: "We talk it through",
    body: "No obligation and no judgment. Together we work out what kind of support makes sense for your situation.",
  },
];

function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.25" />
    </svg>
  );
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M4.5 4.5h3.2l1.6 4-2 1.5a11 11 0 0 0 5.7 5.7l1.5-2 4 1.6v3.2c0 1-.9 1.8-1.9 1.6C9.9 19.3 4.7 14.1 3 7.4 2.8 6.4 3.6 5.5 4.5 4.5Z" />
    </svg>
  );
}

export default async function MentoringPage() {
  const { contact_phone: phone } = await getSettings();
  return (
    <>
      <PageHeader
        title="Mentoring & Life Coaching"
        description="If you or someone you care about has been affected by firearm violence, you don't have to figure out what's next alone. SOC Alliance offers one-on-one mentoring and life coaching, and we're here to listen first."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/get-involved" },
          { label: "Mentoring & Life Coaching" },
        ]}
        image="/lady.jpg"
        imageAlt="A young woman smiling while writing in a notebook"
      />

      {/* Who this serves */}
      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Who This Program Serves" title="Support, on Your Terms" />
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Program at a glance">
              {facts.map((f) => (
                <li key={f} className="rounded-full bg-accent/10 px-3.5 py-1.5 text-xs font-bold text-accent">
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-text-muted">
              Free, trauma-informed mentoring and life coaching for survivors of violence ages 18 to 35,
              offered through SOC Alliance&rsquo;s Strengthening Violence Prevention Initiative in
              partnership with the Illinois Department of Human Services (IDHS).
            </p>

            <h3 className="mt-8 text-xs font-bold uppercase tracking-widest text-text">Serving</h3>
            <ul className="mt-3 flex flex-wrap gap-3">
              {areas.map((a) => (
                <li key={a} className="inline-flex items-center gap-2 rounded-2xl border border-black/5 bg-background px-4 py-2.5 text-sm font-bold text-text shadow-sm">
                  <PinIcon className="h-4 w-4 text-secondary-dark" />
                  {a}
                </li>
              ))}
            </ul>

            <p className="mt-8 flex max-w-xl items-start gap-3 rounded-2xl bg-surface p-4 text-sm leading-relaxed text-text-muted">
              <LockIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              What you share with us is kept in confidence and used only to connect you with the right
              support.
            </p>
          </Reveal>

          <Reveal delay={75} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div aria-hidden className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-3xl bg-accent/15 sm:block" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/mentoring-flyer.png"
                alt="Flyer for the SOC Alliance Mentoring & Life Coaching Program, in partnership with IDHS and the Strengthening Violence Prevention Initiative"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>
        </div>
      </Container>

      {/* What happens next */}
      <section className="bg-surface py-14 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="What to Expect" title="What Happens After You Reach Out" />
          </Reveal>
          <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 75} className="h-full rounded-3xl bg-background p-6 shadow-md ring-1 ring-black/5">
                  <span className="block text-4xl font-extrabold text-secondary" style={{ fontFamily: "var(--font-heading)" }} aria-hidden>
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Reach out */}
      <Container className="py-14 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Reach Out" title="Whenever You're Ready" />
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="rounded-3xl bg-background p-6 shadow-xl ring-1 ring-black/5 sm:p-8">
            <h3 className="text-xl">Reach Out Online</h3>
            <p className="mt-1 text-sm text-text-muted">Only a way to reach you is required.</p>
            <div className="mt-6">
              <MentoringForm />
            </div>
          </Reveal>
          <Reveal delay={75} className="flex flex-col justify-between gap-6 rounded-3xl bg-text p-6 text-white shadow-xl sm:p-8">
            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-secondary">
                <PhoneIcon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl text-white">Reach Out by Phone</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">Prefer to talk to someone directly right now?</p>
            </div>
            <a
              href={telHref(phone)}
              className="group inline-flex items-center justify-between gap-4 rounded-full bg-secondary py-2 pl-6 pr-2 text-sm font-bold text-text transition-colors hover:bg-secondary-dark"
            >
              Call {phone}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-text text-white transition-transform group-hover:translate-x-0.5">
                <PhoneIcon className="h-4 w-4" />
              </span>
            </a>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
