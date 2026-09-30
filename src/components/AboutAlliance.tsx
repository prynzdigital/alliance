"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MissionIcon, ValuesIcon, VisionIcon } from "@/components/icons/AboutIcons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const tabs = [
  {
    label: "Our Mission",
    icon: MissionIcon,
    body: "The Mission is to uplift and improve the life of the community.",
  },
  {
    label: "Our Vision",
    icon: VisionIcon,
    body: "The Vision is to create a community in which all people thrive and develop to their greatest potential.",
  },
  {
    label: "Our Values",
    icon: ValuesIcon,
    body: "We believe in a four pillar plan to uplift the community, Scholarships, Economic Development, Community and Health.",
  },
];

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3.5 5 6v5.5c0 4.2 2.9 7.6 7 8.5 4.1-.9 7-4.3 7-8.5V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function AboutAlliance() {
  const [active, setActive] = useState(0);
  const activeTab = tabs[active];
  const ActiveIcon = activeTab.icon;

  return (
    <section className="mx-auto max-w-(--container-content) px-6 py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-[40%_1fr] md:items-center md:gap-6">
        {/* Photo collage */}
        <Reveal className="relative mx-auto w-full max-w-xs pb-8 pl-3 pt-3 sm:max-w-sm md:mx-0 md:max-w-none">
          <div
            aria-hidden
            className="absolute -bottom-2 -left-2 h-16 w-16 opacity-50"
            style={{
              backgroundImage: "radial-gradient(var(--color-secondary) 1.5px, transparent 1.5px)",
              backgroundSize: "9px 9px",
            }}
          />

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card shadow-lg">
            <Image
              src="/impact.jpg"
              alt="A group of young people from the community laughing together"
              fill
              sizes="(min-width: 768px) 25vw, 60vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-8 -right-4 h-28 w-28 overflow-hidden rounded-full border-4 border-background shadow-lg sm:h-32 sm:w-32">
            <Image
              src="/lady.jpg"
              alt="A young woman smiling while writing in a notebook"
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>

          <div className="absolute -top-2 right-2 rounded-xl bg-secondary px-3 py-2 text-left shadow-lg sm:right-6">
            <p className="text-lg font-extrabold leading-none text-text">$100K+</p>
            <p className="mt-1 text-[10px] font-semibold text-text">Raised for Scholarships</p>
          </div>

          <div className="absolute left-0 top-[38%] flex -translate-x-3 items-center gap-2 rounded-xl bg-text px-3 py-2 shadow-lg sm:-translate-x-6">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-text">
              <ShieldCheckIcon className="h-4 w-4" />
            </span>
            <span className="whitespace-nowrap text-left">
              <span className="block text-xs font-bold text-white">501(c)(3)</span>
              <span className="block text-[10px] text-white/70">Public Charity</span>
            </span>
          </div>
        </Reveal>

        {/* Content */}
        <Reveal delay={75}>
          <SectionHeading eyebrow="About Us" title="About the Alliance" />

          <div className="mt-4 flex flex-wrap gap-2">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  i === active ? "bg-secondary text-text" : "text-text-muted hover:text-text"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-3">
            <ActiveIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-text-muted">{activeTab.body}</p>
          </div>

          <p className="mt-4 max-w-lg text-sm text-text-muted">
            Strengthening Our Community Alliance is a 501(c)(3) organization that provides
            scholarships and community services to the Woodlawn Community and greater Chicago.
            The Alliance will utilize our facility in Woodlawn to hold meetings and conduct
            community service programs, and will also collaborate with the local community on
            numerous programs.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/about"
              className="group inline-flex items-center gap-4 rounded-full bg-secondary py-2 pl-6 pr-2 text-sm font-bold text-text transition-colors hover:bg-secondary-dark"
            >
              Explore More
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-text text-white transition-transform group-hover:translate-x-0.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            <Link href="/about/financials-transparency" className="text-sm text-text-muted hover:text-primary">
              <span className="block font-bold text-text">EIN 36-4047035</span>
              501(c)(3) public charity
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
