"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  href: string;
  color: string;
};

const AUTO_ADVANCE_MS = 5000;

// Compact, image-first carousel — full-bleed photo with a caption over a
// scrim, no side-by-side content panel. Built for narrower columns where
// the SupportCarousel's split layout wouldn't have room to breathe.
export function PictureCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (slides.length < 2 || hovering || reducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [slides.length, hovering, reducedMotion]);

  if (slides.length === 0) return null;
  const slide = slides[index];

  return (
    <Link
      href={slide.href}
      target={slide.href.startsWith("http") ? "_blank" : undefined}
      rel={slide.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-card shadow-lg md:aspect-auto md:h-full md:min-h-[320px]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div key={slide.image} className="hero-content-fade-in absolute inset-0">
        <Image
          src={slide.image}
          alt={slide.imageAlt}
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: slide.color }}
        >
          {slide.eyebrow}
        </p>
        <h3 className="mt-1 text-lg font-bold text-white">{slide.title}</h3>
      </div>

      {slides.length > 1 && (
        <div className="absolute right-4 top-4 flex gap-1.5" aria-hidden>
          {slides.map((s, i) => (
            <span
              key={s.title}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 16 : 6,
                backgroundColor: i === index ? slide.color : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </div>
      )}
    </Link>
  );
}
