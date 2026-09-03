"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type CarouselSlide = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  color: string;
};

// Image/content carousel — originally built for the homepage "Support Our
// Work" section, reused wherever a set of items needs one-at-a-time,
// image-bled cards. Each slide carries its own accent color, applied to the
// image's duotone tint, its glow, and its CTA, so items read as visually
// distinct rather than a single wall of text. Defaults to the Support Our
// Work slides when no `slides` prop is supplied.
const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    image: "/help.jpg",
    imageAlt: "Two people shaking hands, with a third person smiling in the background",
    eyebrow: "Get Involved",
    title: "Lend a Hand",
    body: "Give your time across scholarship, economic development, community, and health programs. Every volunteer hour reaches a neighbor directly.",
    cta: "Volunteer",
    href: "/get-involved/volunteer",
    color: "var(--color-accent)",
  },
  {
    image: "/donate-photo.jpg",
    imageAlt: "A raised fist held by another hand, among a group of people with arms raised together",
    eyebrow: "Support Our Work",
    title: "Fuel Our Mission",
    body: "Every gift funds scholarships, economic development, community safety, and health programs across Chicago’s South Side. Since SOC Alliance runs entirely on volunteers, more of it reaches the community directly.",
    cta: "Donate Now",
    href: "/donate",
    color: "var(--color-secondary-dark)",
  },
];

const AUTO_ADVANCE_MS = 7000;

export function SupportCarousel({
  slides = DEFAULT_SLIDES,
  imageSize = "md",
}: {
  slides?: CarouselSlide[];
  /** "lg" makes the image panel wider and taller — for columns with room to
      spare, without changing the default Support Our Work sizing. */
  imageSize?: "md" | "lg";
}) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (hovering || reducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [hovering, reducedMotion, slides.length]);

  const slide = slides[index];

  return (
    <div
      className="relative flex h-full w-full flex-col justify-center rounded-card bg-background p-5 shadow-md sm:p-6 md:py-7 md:px-12"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-12 sm:pr-8">
        <div
          className={`relative -mt-12 h-36 w-36 shrink-0 sm:mt-0 sm:h-auto sm:-ml-[10%] ${
            imageSize === "lg" ? "sm:w-[54%] sm:aspect-[5/4]" : "sm:w-[40%] sm:aspect-[4/3]"
          }`}
        >
          <div
            aria-hidden
            className="absolute -inset-2 rounded-2xl opacity-25 blur-lg transition-colors duration-500"
            style={{ backgroundColor: slide.color }}
          />
          <div
            key={slide.image}
            className="hero-content-fade-in relative h-full w-full overflow-hidden rounded-2xl shadow-sm"
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              sizes={imageSize === "lg" ? "320px" : "240px"}
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-multiply transition-colors duration-500"
              style={{ backgroundColor: slide.color, opacity: 0.25 }}
            />
          </div>
        </div>

        <div key={slide.title} className="hero-content-fade-in flex flex-1 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <p
            className="text-xs font-bold uppercase tracking-widest transition-colors duration-500"
            style={{ color: slide.color }}
          >
            {slide.eyebrow}
          </p>
          <h3 className="line-clamp-2 min-h-[3.5rem] text-2xl font-bold text-text sm:min-h-[4rem]">
            {slide.title}
          </h3>
          <p className="line-clamp-3 min-h-[4.5rem] text-text-muted">{slide.body}</p>
          <Link
            href={slide.href}
            className="mt-2 inline-flex items-center rounded-full border-2 bg-transparent px-6 py-2.5 text-sm font-bold uppercase tracking-wide transition-all hover:-translate-y-0.5"
            style={{
              borderColor: slide.color,
              color: slide.color,
              boxShadow: `0 6px 16px -10px ${slide.color}`,
            }}
          >
            {slide.cta}
          </Link>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2 sm:absolute sm:right-6 sm:top-1/2 sm:mt-0 sm:flex-col sm:-translate-y-1/2">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${s.title}`}
            aria-current={i === index}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === index ? 22 : 8,
              height: 8,
              backgroundColor: i === index ? slide.color : "var(--color-text-muted)",
              opacity: i === index ? 1 : 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
