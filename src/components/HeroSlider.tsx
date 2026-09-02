"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { pillars } from "@/lib/programs";

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
      className="relative -mt-24 h-[600px] w-full overflow-hidden bg-primary sm:h-[680px] md:h-[760px]"
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
                  <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
                    Four Pillars, One Mission
                  </p>
                  <h2 className="mt-4 text-5xl font-bold text-white sm:text-6xl md:text-7xl">
                    {pillar.name}
                  </h2>
                  <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">{pillar.summary}</p>
                  <div className="mt-8">
                    <Button
                      href={`/programs/${pillar.slug}`}
                      variant="outlineInverse"
                      size="lg"
                      pill
                      tabIndex={isActive ? 0 : -1}
                    >
                      Learn More
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
    </section>
  );
}
