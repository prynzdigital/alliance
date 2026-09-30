import Image from "next/image";
import { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";

export function PageHeader({
  title,
  description,
  breadcrumbs,
  children,
  image,
  imageAlt,
  tint,
}: {
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  children?: ReactNode;
  /** Optional photo shown behind the header, darkened for readable white
      text — gives each page its own visual identity instead of the flat
      gradient alone. */
  image?: string;
  imageAlt?: string;
  /** Overrides the default navy/teal/gold hero-mesh tint with a single
      solid color (e.g. a program pillar's accent) — used to give each
      pillar page its own identity while sharing the same layout. */
  tint?: string;
}) {
  return (
    <section className={`relative overflow-hidden ${image ? "" : tint ? "" : "hero-mesh"}`} style={!image && tint ? { backgroundColor: tint } : undefined}>
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {tint ? (
            <>
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-0 mix-blend-color" style={{ backgroundColor: tint }} />
            </>
          ) : (
            <div className="absolute inset-0 hero-mesh opacity-90 mix-blend-multiply" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        </>
      )}
      <div className="relative mx-auto max-w-(--container-content) px-6 py-12 md:py-16">
        <Breadcrumbs items={breadcrumbs} variant="light" />
        <h1 className="mt-3 text-white">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-white/85">{description}</p>}
        {children}
      </div>
    </section>
  );
}
