"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FacebookIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import { pillars } from "@/lib/programs";

const FACEBOOK_URL = "https://www.facebook.com/socommunityalliance";
const LINKEDIN_URL = "https://www.linkedin.com/company/strengthening-our-community-alliance/";

const AUTO_ADVANCE_MS = 6500;

// Slide-specific image overrides — used only here, not on the pillar cards/
// pages elsewhere that still reference the original pillar.image.
const SLIDE_IMAGE_OVERRIDES: Partial<Record<string, { src: string; alt: string }>> = {
  "economic-development": {
    src: "/economic-2.jpg",
    alt: "Stacks of coins rising alongside an upward financial growth chart",
  },
};

function PauseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const isPaused = hovering || userPaused || reducedMotion;

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % pillars.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  function goTo(i: number) {
    setIndex(i);
  }

  return (
    <section
      className="relative -mt-[7.25rem] h-[600px] w-full overflow-hidden bg-primary sm:h-[680px] md:h-[760px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our four pillars"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div aria-live="off">
        {pillars.map((pillar, i) => {
          const isActive = i === index;
          const image = SLIDE_IMAGE_OVERRIDES[pillar.slug] ?? { src: pillar.image, alt: pillar.imageAlt };
          return (
            <div
              key={pillar.slug}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${pillars.length}`}
              aria-hidden={!isActive}
            >
              <div
                key={isActive ? `${pillar.slug}-zoom-${index}` : pillar.slug}
                className={`absolute inset-0 ${isActive && !reducedMotion ? "hero-slide-zoom" : ""}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/45" />
              <div className="relative z-10 flex h-full items-center justify-center px-14 text-center sm:px-16">
                <div
                  key={isActive ? `${pillar.slug}-content-${index}` : pillar.slug}
                  className={`max-w-2xl ${isActive && !reducedMotion ? "hero-content-fade-in" : ""}`}
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 3c1 3 4 3 4 7 0 3-2 5-4 5s-4-2-4-5c0-4 3-4 4-7Z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 15v6" strokeLinecap="round" />
                    </svg>
                    Four Pillars, One Mission
                  </span>
                  <h2 className="mt-4 text-5xl font-bold text-white sm:text-6xl md:text-7xl">
                    {pillar.name}
                  </h2>
                  <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">{pillar.summary}</p>
                  <div className="mt-8">
                    <Button
                      href={`/programs/${pillar.slug}`}
                      variant="outlineInverse"
                      size="sm"
                      pill
                      className="pr-1.5"
                      tabIndex={isActive ? 0 : -1}
                    >
                      Learn More
                      <span className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute left-5 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-3 sm:left-8">
        {pillars.map((pillar, i) => (
          <button
            key={pillar.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${pillar.name}`}
            aria-current={i === index}
            className={`w-2.5 rounded-full transition-all ${
              i === index ? "h-8 bg-white" : "h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
          className="mt-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50"
        >
          {userPaused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
        </button>
      </div>

      <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 sm:right-8 md:flex">
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SOC Alliance on Facebook"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
        >
          <FacebookIcon className="h-4 w-4" />
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SOC Alliance on LinkedIn"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
        >
          <LinkedInIcon className="h-4 w-4" />
        </a>
        <span
          className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-white/70"
          style={{ writingMode: "vertical-rl" }}
        >
          Follow Us
        </span>
      </div>
    </section>
  );
}
