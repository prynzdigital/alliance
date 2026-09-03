export type SocEvent = {
  title: string;
  date: string; // ISO date
  location?: string;
  description: string;
  href: string;
  cta: string;
  /** Thematic image (one of the four pillar photos, or the impact photo for
   * general/organizational news) — not a photo of the specific event, since
   * no per-event photography exists yet. */
  image: string;
  imageAlt: string;
  /** Neon accent color, matching the same theme as `image` (see
   * lib/programs.ts's `neon` field for the pillar-derived values). */
  color: string;
};

const IMG = {
  scholarship: "/scholarship.png",
  economic: "/economic.png",
  community: "/community.png",
  health: "/health.png",
  impact: "/impact.png",
};

const NEON = {
  scholarship: "#7B7FFF",
  economic: "#FFD23F",
  community: "#9B6BFF",
  health: "#22E6CE",
  impact: "#4DD9FF",
};

const SCHOLARSHIP_ALT = "A graduate in a cap and gown embracing a loved one";
const SCHOLARSHIP_FUND_ALT = "A graduate in a cap and gown, representing the scholarships this event funds";
const COMMUNITY_ALT = "Community members gathered together at a neighborhood event";
const IMPACT_ALT = "Community members joining hands together";
const OMEGA_GRAS_ALT = "A gold Mardi Gras mask surrounded by festive confetti and ribbon";

// Facts trace to docs/discovery/02_Organization_Research.md, Section 7 and its
// 2026-08-30/2026-08-31 live-site verification addenda (pulled from
// socalliance.org/blog) — do not add an entry without a source.
export const events: SocEvent[] = [
  {
    title: "Happy Labor Day",
    date: "2026-09-07",
    description:
      "SOC Alliance joins the nation in celebrating Labor Day, honoring the contributions of American workers.",
    href: "/news-events",
    cta: "Learn More",
    image: "/labor-day.png",
    imageAlt: "An American flag beside a chalkboard sign reading \"Happy Labor Day\"",
    color: NEON.impact,
  },
  {
    title: "21st Annual Omega Mardi Gras Scholarship Fundraiser",
    date: "2026-03-14",
    location: "Rate Field, Chicago",
    description:
      "SOC Alliance's flagship annual gala, co-hosted with the Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc.",
    href: "/donate/mardi-gras-fundraiser",
    cta: "Learn More",
    image: "/omega-gras.jpg",
    imageAlt: OMEGA_GRAS_ALT,
    color: NEON.scholarship,
  },
  {
    title: "Giving Tuesday 2025",
    date: "2025-12-02",
    description: "SOC Alliance's recurring year-end campaign, with a $10,000 goal across all four pillars.",
    href: "/donate",
    cta: "Learn More",
    image: "/giving.png",
    imageAlt: "A hand offering a purple heart to another open hand, with a \"Giving Tuesday\" wordmark",
    color: NEON.impact,
  },
  {
    title: "SVPI × Fuller Park Advisory Council Kickoff",
    date: "2025-08-21",
    location: "Fuller Park Fieldhouse",
    description:
      "A joint kickoff meeting between the Strengthening Violence Prevention Initiative, the Chicago Park District's Fuller Park Fieldhouse, and the Fuller Park Advisory Council.",
    href: "/programs/community",
    cta: "Learn More",
    image: IMG.community,
    imageAlt: COMMUNITY_ALT,
    color: NEON.community,
  },
  {
    title: "Strengthening Violence Prevention Initiative Is Hiring",
    date: "2025-04-08",
    description:
      "SOC Alliance opened applications for Area Violence Interrupter, Area Field Manager, Case Manager, and Victim Services Facilitator roles.",
    href: "/get-involved/careers",
    cta: "See Careers",
    image: IMG.community,
    imageAlt: COMMUNITY_ALT,
    color: NEON.community,
  },
  {
    title: "2025 Talent Hunt Competition",
    date: "2025-03-22",
    location: "Vandercook College of Music",
    description:
      "The annual scholarship competition for Chicagoland high school students. 2025 winner: Tiffany Tyus, piano (\"Spain\" by Chick Corea).",
    href: "/programs/scholarship",
    cta: "Learn More",
    image: IMG.scholarship,
    imageAlt: SCHOLARSHIP_ALT,
    color: NEON.scholarship,
  },
  {
    title: "20th Annual Omega Mardi Gras Scholarship Fundraiser",
    date: "2025-03-08",
    description: "The 20th-anniversary edition of SOC Alliance's flagship scholarship gala.",
    href: "/donate/mardi-gras-fundraiser",
    cta: "Learn More",
    image: IMG.scholarship,
    imageAlt: SCHOLARSHIP_FUND_ALT,
    color: NEON.scholarship,
  },
  {
    title: "Giving Tuesday 2024",
    date: "2024-11-25",
    description: "SOC Alliance's year-end giving campaign.",
    href: "/donate",
    cta: "Learn More",
    image: IMG.impact,
    imageAlt: IMPACT_ALT,
    color: NEON.impact,
  },
  {
    title: "Cook County Starting Block Grant Secured",
    date: "2024-07-09",
    description:
      "SOC Alliance was awarded a Cook County Starting Block Grant, supporting capacity-building for community-based organizations.",
    href: "/about/financials-transparency",
    cta: "Learn More",
    image: IMG.impact,
    imageAlt: IMPACT_ALT,
    color: NEON.impact,
  },
  {
    title: "Kroc Center Blood Drive",
    date: "2023-11-15",
    location: "Kroc Center",
    description: "SOC Alliance hosted a community blood drive at the Kroc Center.",
    href: "/programs/health",
    cta: "Learn More",
    image: IMG.health,
    imageAlt: "A healthcare provider speaking warmly with a patient",
    color: NEON.health,
  },
  {
    title: "Interacting with Law Enforcement",
    date: "2023-10-11",
    description:
      "A legal-rights workshop with the Westside Justice Center, presented by criminal law attorney April Preyer, Esq.",
    href: "/programs/community",
    cta: "Learn More",
    image: IMG.community,
    imageAlt: COMMUNITY_ALT,
    color: NEON.community,
  },
  {
    title: "Soft Skills Training with Michelle Relerford",
    date: "2023-03-22",
    description: "A student professional skills training session.",
    href: "/programs/scholarship",
    cta: "Learn More",
    image: IMG.scholarship,
    imageAlt: SCHOLARSHIP_ALT,
    color: NEON.scholarship,
  },
  {
    title: "Finance Matters Webinar Series",
    date: "2022-09-08",
    description:
      "A three-part financial literacy webinar series with Tamara Dervin, Certified Financial Educator: Budgeting, Demolishing Debt, and Saving & Investing.",
    href: "/programs/economic-development",
    cta: "Learn More",
    image: IMG.economic,
    imageAlt: "A seedling growing from a stack of coins, symbolizing financial growth",
    color: NEON.economic,
  },
  {
    title: "SOC Alliance Promotes Positive Loitering",
    date: "2021-11-15",
    description:
      "Community members, neighbors, and Chicago Police Department officers joined SOC Alliance at its own facility to build trust as a tool for decreasing violence.",
    href: "/programs/community",
    cta: "Learn More",
    image: IMG.community,
    imageAlt: COMMUNITY_ALT,
    color: NEON.community,
  },
  {
    title: "Eugene Williams Memorial",
    date: "2019-09-30",
    description:
      "A fundraiser supporting a memorial tombstone for Eugene Williams, whose 1919 death sparked Chicago's race riot of that year.",
    href: "/programs/community",
    cta: "Learn More",
    image: IMG.community,
    imageAlt: COMMUNITY_ALT,
    color: NEON.community,
  },
  {
    title: "Annual Back To School BBQ",
    date: "2018-09-02",
    description: "SOC Alliance's second annual Back to School BBQ for the community.",
    href: "/programs/community",
    cta: "Learn More",
    image: IMG.community,
    imageAlt: COMMUNITY_ALT,
    color: NEON.community,
  },
  {
    title: "Know Your Rights: A Seminar on Property Taxes",
    date: "2017-10-04",
    description:
      "A free public seminar with Attorney Tanya Woods of the Westside Justice Center on home ownership and property taxes, alongside SOC Alliance's quarterly food drive.",
    href: "/programs/economic-development",
    cta: "Learn More",
    image: IMG.economic,
    imageAlt: "A seedling growing from a stack of coins, symbolizing financial growth",
    color: NEON.economic,
  },
  {
    title: "Back To School BBQ",
    date: "2017-09-04",
    description: "SOC Alliance's first annual Back to School BBQ for the community.",
    href: "/programs/community",
    cta: "Learn More",
    image: IMG.community,
    imageAlt: COMMUNITY_ALT,
    color: NEON.community,
  },
];

export function getEventStatus(dateIso: string, now: Date = new Date()): "upcoming" | "past" {
  return new Date(dateIso) >= now ? "upcoming" : "past";
}

export function formatEventDate(dateIso: string): string {
  return new Date(`${dateIso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getUpcomingEvents(now: Date = new Date()): SocEvent[] {
  return events
    .filter((e) => getEventStatus(e.date, now) === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getPastEvents(now: Date = new Date()): SocEvent[] {
  return events
    .filter((e) => getEventStatus(e.date, now) === "past")
    .sort((a, b) => b.date.localeCompare(a.date));
}
