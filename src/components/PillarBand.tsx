import Link from "next/link";
import { pillars } from "@/lib/programs";

// Full-bleed frosted band beneath the hero slider, pulled up to overlap the
// hero's tail so its photo (blurred, darkened) peeks through the gaps
// between cards. Each card follows the same shape language as the "Our Four
// Pillars" cards (rounded, colored top border) — just in a dark theme with
// a brighter neon accent so it reads against the photo backdrop.
export function PillarBand() {
  return (
    <section className="relative z-10 -mt-20 grid grid-cols-1 gap-2 px-4 sm:-mt-28 sm:grid-cols-2 sm:px-6 md:-mt-32 lg:grid-cols-4 lg:px-8">
      {pillars.map((pillar) => {
        const Icon = pillar.icon;
        return (
          <Link
            key={pillar.slug}
            href={`/programs/${pillar.slug}`}
            className="group relative flex min-h-[240px] flex-col justify-center overflow-hidden rounded-card border border-white/60 bg-slate-100/55 px-8 py-10 backdrop-blur-lg transition-[transform,background-color] duration-200 hover:-translate-y-1 hover:bg-slate-100/65"
            style={{
              borderTopWidth: 4,
              borderTopColor: pillar.neon,
              boxShadow: `0 10px 25px -8px rgba(0,0,0,0.5), 0 -6px 20px -6px ${pillar.neon}`,
            }}
          >
            <div className="relative flex items-center gap-3">
              <Icon className="h-6 w-6 shrink-0 text-text" />
              <h2 className="text-lg font-bold text-text md:text-xl">{pillar.name}</h2>
            </div>
            <p className="relative mt-3 max-w-xs italic text-text/85">{pillar.summary}</p>
            <span className="relative mt-6 inline-block w-fit border-b-2 border-text/70 pb-1 text-xs font-bold uppercase tracking-wide text-text transition-colors group-hover:border-text">
              Learn More
            </span>
          </Link>
        );
      })}
    </section>
  );
}
