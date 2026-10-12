"use client";

import { useEffect, useRef } from "react";

/** Splits "$100,000+" into "$", 100000, "+" so the number can be animated. */
function parse(value: string) {
  const match = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const n = Number(match[2].replace(/,/g, ""));
  if (!Number.isFinite(n)) return null;
  return { prefix: match[1], number: n, suffix: match[3], grouped: match[2].includes(",") };
}

// Counts a figure up from zero the first time it scrolls into view. The real
// value is rendered on the server (and is what screen readers read, via a
// visually hidden copy), so nothing is lost without JavaScript; the animation only
// runs if the number starts off-screen and motion isn't reduced.
export function CountUp({ value, className, style }: { value: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parsed = parse(value);
    if (!el || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // already visible: leave as-is

    const format = (n: number) =>
      `${parsed.prefix}${parsed.grouped ? Math.round(n).toLocaleString("en-US") : Math.round(n)}${parsed.suffix}`;
    el.textContent = format(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1800;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = t < 1 ? format(parsed.number * eased) : value;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span className={className} style={style}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden>
        {value}
      </span>
    </span>
  );
}
