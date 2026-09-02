import type { ComponentType, SVGProps } from "react";
import {
  CommunityIcon,
  EconomicDevelopmentIcon,
  HealthIcon,
  ScholarshipIcon,
} from "@/components/icons/PillarIcons";

export type Pillar = {
  slug: string;
  name: string;
  colorVar: string;
  /** Brighter, more saturated variant of colorVar — same hue family, used
   * only for high-contrast decorative accents (e.g. neon glows) where the
   * standard token would read as muted rather than vivid. */
  neon: string;
  summary: string;
  subPrograms: string[];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  image: string;
  imageAlt: string;
};

// Facts sourced from docs/discovery/02_Organization_Research.md, Section 2.
export const pillars: Pillar[] = [
  {
    slug: "scholarship",
    name: "Scholarship",
    colorVar: "var(--color-pillar-scholarship)",
    neon: "#7B7FFF",
    summary: "Mentoring, tutoring, technology/coding programs, and scholarship awards.",
    subPrograms: ["Mentoring", "Tutoring", "Technology / coding programs", "Scholarship awards"],
    icon: ScholarshipIcon,
    image: "/scholarship.png",
    imageAlt: "A graduate in a cap and gown embracing a loved one",
  },
  {
    slug: "economic-development",
    name: "Economic Development",
    colorVar: "var(--color-pillar-economic)",
    neon: "#FFD23F",
    summary: "Employment support, entrepreneurship, financial literacy, and home ownership.",
    subPrograms: [
      "Employment support",
      "Entrepreneurship",
      "Financial literacy",
      "Banking & investments",
      "Development & construction",
      "Home ownership initiatives",
    ],
    icon: EconomicDevelopmentIcon,
    image: "/economic.png",
    imageAlt: "A seedling growing from a stack of coins, symbolizing financial growth",
  },
  {
    slug: "community",
    name: "Community",
    colorVar: "var(--color-pillar-community)",
    neon: "#9B6BFF",
    summary: "Safety, volunteerism, and voter education, including violence prevention.",
    subPrograms: ["Safety", "Volunteerism", "Voter education & registration"],
    icon: CommunityIcon,
    image: "/community.png",
    imageAlt: "A group of community members posing together at a neighborhood gathering",
  },
  {
    slug: "health",
    name: "Health",
    colorVar: "var(--color-pillar-health)",
    neon: "#22E6CE",
    summary: "Food security, nutrition, blood drives, and exercise programs.",
    subPrograms: ["Food security", "Nutrition", "Blood drives", "Exercise programs"],
    icon: HealthIcon,
    image: "/health.png",
    imageAlt: "A healthcare provider speaking warmly with a patient",
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}
