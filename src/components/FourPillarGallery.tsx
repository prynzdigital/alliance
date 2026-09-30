import Image from "next/image";
import Link from "next/link";
import { pillars } from "@/lib/programs";
import { Reveal } from "@/components/Reveal";

// Real per-pillar photos: Community and Health are the org's own real event
// photography (already used in News & Events); Scholarship and Economic
// Development are the same stock photos as the reference build, since no
// dedicated photography exists for those two pillars yet.
const pillarPhotos: Record<string, { image: string; imageAlt: string }> = {
  scholarship: {
    image: "/pillar-scholarship.jpg",
    imageAlt: "A graduation cap perched on a stack of coins beside books, symbolizing scholarship funding",
  },
  "economic-development": {
    image: "/pillar-economic.jpg",
    imageAlt: "A businessperson holding a tablet displaying rising economic growth charts",
  },
  community: {
    image: "/svpi-fuller-park.webp",
    imageAlt: "Community members and SVPI staff gathered inside the Fuller Park Fieldhouse",
  },
  health: {
    image: "/blood-drive.jpg",
    imageAlt: "A \"Striking Out Blood Shortages\" flyer for the SOC Alliance community blood drive",
  },
};

export function FourPillarGallery() {
  return (
    <section className="mx-auto max-w-(--container-content) px-6 py-16 md:py-24">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-secondary" aria-hidden />
          <p className="text-xs font-bold uppercase tracking-widest text-secondary-dark">
            The Four Pillar Plan
          </p>
        </div>
        <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl">
          Scholarship, Economic Development, Community and Health
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {pillars.map((pillar, i) => {
          const photo = pillarPhotos[pillar.slug];
          return (
            <Reveal key={pillar.slug} delay={i * 75}>
              <Link
                href={`/programs/${pillar.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-card shadow-md"
              >
                <Image
                  src={photo.image}
                  alt={photo.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 23vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-lg font-bold text-secondary">{String(i + 1).padStart(2, "0")}</p>
                  <p className="text-base font-bold uppercase tracking-wide text-white sm:text-lg">
                    {pillar.name}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
