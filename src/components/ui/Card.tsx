import Image from "next/image";
import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

// Bleeds an image to the card's edges, undoing the card's own padding.
// Use as the first child inside a <Card>.
export function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative -mx-6 -mt-6 mb-4 aspect-video">
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
    </div>
  );
}

type CardProps = {
  children: ReactNode;
  href?: string;
  accentColor?: string;
  /** Dim colored bottom border that turns neon-bright with a glow on hover. */
  neonAccent?: string;
  /** Frosted glassmorphism treatment instead of a solid card — for use over
      the homepage's .mesh-bg-soft background. */
  glass?: boolean;
  className?: string;
};

const solidBase =
  "block overflow-hidden rounded-card border border-black/10 bg-background p-6 shadow-sm transition-all duration-200 ease-out";
const solidInteractive = "hover:-translate-y-1 hover:shadow-lg hover:border-black/15";
const glassBase = "glass-panel block overflow-hidden rounded-card p-6 transition-all duration-200 ease-out";
const glassInteractive = "hover:-translate-y-1 hover:shadow-xl";

export function Card({ children, href, accentColor, neonAccent, glass = false, className = "" }: CardProps) {
  const style: CSSProperties = {};
  if (accentColor) {
    style.borderTopWidth = 4;
    style.borderTopColor = accentColor;
  }
  if (neonAccent) {
    (style as Record<string, string>)["--card-accent"] = neonAccent;
  }
  const neonClass = neonAccent ? "card-neon-bottom" : "";
  const base = glass ? glassBase : solidBase;
  const interactive = glass ? glassInteractive : solidInteractive;

  if (href) {
    return (
      <Link href={href} className={`group ${base} ${interactive} ${neonClass} ${className}`} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <div className={`${base} ${neonClass} ${className}`} style={style}>
      {children}
    </div>
  );
}
