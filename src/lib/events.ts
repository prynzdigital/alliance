export type EventPillar = "scholarship" | "economic" | "community" | "health" | "general";

export const EVENT_PILLARS: { value: EventPillar; label: string }[] = [
  { value: "scholarship", label: "Scholarship" },
  { value: "economic", label: "Economic Development" },
  { value: "community", label: "Community" },
  { value: "health", label: "Health" },
  { value: "general", label: "General / Organizational" },
];

export type SocEvent = {
  /** Database id; absent on the built-in defaults. */
  id?: number;
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
  pillar: EventPillar;
};

const IMG = {
  scholarship: "/scholarship.png",
  economic: "/economic.png",
  community: "/community.png",
  health: "/health.png",
  impact: "/impact.png",
};

export const PILLAR_NEON: Record<EventPillar, string> = {
  scholarship: "#7B7FFF",
  economic: "#FFD23F",
  community: "#9B6BFF",
  health: "#22E6CE",
  general: "#4DD9FF",
};

/** Fallback image when an event has no photo of its own. */
export const PILLAR_IMAGE: Record<EventPillar, { src: string; alt: string }> = {
  scholarship: { src: IMG.scholarship, alt: "A graduate in a cap and gown embracing a loved one" },
  economic: { src: IMG.economic, alt: "A seedling growing from a stack of coins, symbolizing financial growth" },
  community: { src: IMG.community, alt: "Community members gathered together at a neighborhood event" },
  health: { src: IMG.health, alt: "A healthcare provider speaking warmly with a patient" },
  general: { src: IMG.impact, alt: "Community members gathered together" },
};

function theme(pillar: EventPillar) {
  return { pillar, color: PILLAR_NEON[pillar] };
}

const SCHOLARSHIP_ALT = "A graduate in a cap and gown embracing a loved one";
const COMMUNITY_ALT = "Community members gathered together at a neighborhood event";
const OMEGA_GRAS_ALT = "A gold Mardi Gras mask surrounded by festive confetti and ribbon";

// The following real event photos/flyers (Fuller Park meeting, grant award,
// law enforcement session, blood drive, Talent Hunt, 20th Annual Mardi Gras,
// Giving Tuesday 2024, mentoring flyer) were pulled from the org's own CDN
// (irp.cdn-website.com — the live site's asset host) on 2026-09-29, replacing
// generic thematic stand-ins with the organization's real photography.

// Facts trace to docs/discovery/02_Organization_Research.md, Section 7 and its
// 2026-08-30/2026-08-31 live-site verification addenda (pulled from
// socalliance.org/blog) — do not add an entry without a source.
//
// These are the built-in defaults: they seed the CMS database on first run and
// are what the public site shows if the database is ever unreachable. Day-to-day
// edits happen in the admin dashboard (/admin/events), not here.
export const defaultEvents: SocEvent[] = [
  {
    // Save-the-date flyer supplied by the client on 2026-10-10. The flyer gives
    // only the name, date, and co-presenters; venue and tickets aren't announced
    // yet, so `location` is deliberately left unset.
    title: "Omega Mardi Gras 2027",
    date: "2027-03-20",
    description:
      "Save the date! The Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc. and SOC Alliance present the Omega Mardi Gras Scholarship Fundraiser. Venue and ticket details are coming soon.",
    href: "/donate/mardi-gras-fundraiser",
    cta: "Learn More",
    image: "/omega-gras-2027.webp",
    imageAlt:
      "Save-the-date flyer for Omega Mardi Gras 2027 on March 20, 2027, featuring a purple and gold masquerade mask, presented by the Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc. and Strengthening Our Community Alliance",
    ...theme("scholarship"),
  },
  {
    title: "Apply for Mentoring & Life Coaching",
    date: "2026-06-18",
    description:
      "SOC Alliance's Strengthening Violence Prevention Initiative offers free, trauma-informed mentoring and life coaching for survivors of violence ages 18-35 in Fuller Park, South Chicago, and South Deering.",
    href: "/get-involved/mentoring-life-coaching",
    cta: "Learn More",
    image: "/mentoring-flyer.png",
    imageAlt: "Flyer for the SOC Alliance Mentoring & Life Coaching Program, serving Fuller Park, South Chicago, and South Deering",
    ...theme("community"),
  },
  {
    title: "Happy Labor Day",
    date: "2026-09-07",
    description:
      "SOC Alliance joins the nation in celebrating Labor Day, honoring the contributions of American workers.",
    href: "/news-events",
    cta: "Learn More",
    image: "/labor-day.png",
    imageAlt: "An American flag beside a chalkboard sign reading \"Happy Labor Day\"",
    ...theme("general"),
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
    ...theme("scholarship"),
  },
  {
    title: "Giving Tuesday 2025",
    date: "2025-12-02",
    description: "SOC Alliance's recurring year-end campaign, with a $10,000 goal across all four pillars.",
    href: "/donate",
    cta: "Learn More",
    image: "/giving.png",
    imageAlt: "A hand offering a purple heart to another open hand, with a \"Giving Tuesday\" wordmark",
    ...theme("general"),
  },
  {
    title: "SVPI × Fuller Park Advisory Council Kickoff",
    date: "2025-08-21",
    location: "Fuller Park Fieldhouse",
    description:
      "A joint kickoff meeting between the Strengthening Violence Prevention Initiative, the Chicago Park District's Fuller Park Fieldhouse, and the Fuller Park Advisory Council.",
    href: "/programs/community",
    cta: "Learn More",
    image: "/svpi-fuller-park.webp",
    imageAlt: "Community members and SVPI staff gathered inside the Fuller Park Fieldhouse for the Advisory Council kickoff",
    ...theme("community"),
  },
  {
    title: "Strengthening Violence Prevention Initiative Is Hiring",
    date: "2025-04-08",
    description:
      "SOC Alliance opened applications for Area Violence Interrupter, Area Field Manager, Case Manager, and Victim Services Facilitator roles.",
    href: "/get-involved#careers",
    cta: "See Careers",
    image: IMG.community,
    imageAlt: COMMUNITY_ALT,
    ...theme("community"),
  },
  {
    title: "2025 Talent Hunt Competition",
    date: "2025-03-22",
    location: "Vandercook College of Music",
    description:
      "The annual scholarship competition for Chicagoland high school students. 2025 winner: Tiffany Tyus, piano (\"Spain\" by Chick Corea).",
    href: "/programs/scholarship",
    cta: "Learn More",
    image: "/talent-hunt.png",
    imageAlt: "A collage of student performers at the 2025 Talent Hunt Competition, playing violin, piano, and trumpet",
    ...theme("scholarship"),
  },
  {
    title: "20th Annual Omega Mardi Gras Scholarship Fundraiser",
    date: "2025-03-08",
    location: "Huntington Bank Stadium Club, Chicago White Sox",
    description: "The 20th-anniversary edition of SOC Alliance's flagship scholarship gala.",
    href: "/donate/mardi-gras-fundraiser",
    cta: "Learn More",
    image: "/omega-gras-20th.jpg",
    imageAlt: "Save-the-date graphic for the 20th Annual Omega Mardi Gras Scholarship Fundraiser, featuring a jeweled masquerade mask",
    ...theme("scholarship"),
  },
  {
    title: "Giving Tuesday 2024",
    date: "2024-11-25",
    description: "SOC Alliance's year-end giving campaign.",
    href: "/donate",
    cta: "Learn More",
    image: "/giving-tuesday-2024.png",
    imageAlt: "A wooden desk calendar reading December 3, Tuesday, next to a handwritten \"Giving Tuesday\" note",
    ...theme("general"),
  },
  {
    title: "Cook County Starting Block Grant Secured",
    date: "2024-07-09",
    description:
      "SOC Alliance was awarded a Cook County Starting Block Grant, supporting capacity-building for community-based organizations.",
    href: "/about/financials-transparency",
    cta: "Learn More",
    image: "/grant-award.png",
    imageAlt: "A \"We Received a Grant!\" graphic for the Cook County Starting Block Grants program",
    ...theme("general"),
  },
  {
    // Flyer found on the org's own CDN gives this event's date as July 22,
    // 2023 — conflicting with the November 15, 2023 date recorded during
    // discovery (docs/discovery/02_Organization_Research.md, Addendum). Left
    // as-is pending client confirmation on whether these are the same event;
    // see conversation note to the user.
    title: "Kroc Center Blood Drive",
    date: "2023-11-15",
    location: "Kroc Center",
    description: "SOC Alliance hosted a community blood drive at the Kroc Center.",
    href: "/programs/health",
    cta: "Learn More",
    image: "/blood-drive.jpg",
    imageAlt: "A \"Striking Out Blood Shortages\" flyer for the SOC Alliance community blood drive at the Kroc Center",
    ...theme("health"),
  },
  {
    title: "Interacting with Law Enforcement",
    date: "2023-10-11",
    description:
      "A legal-rights workshop with the Westside Justice Center, presented by criminal law attorney April Preyer, Esq.",
    href: "/programs/community",
    cta: "Learn More",
    image: "/law-enforcement.jpg",
    imageAlt: "Flyer for the \"Interacting with Law Enforcement\" session with attorney April Preyer, Esq., and the Westside Justice Center",
    ...theme("community"),
  },
  {
    title: "Soft Skills Training with Michelle Relerford",
    date: "2023-03-22",
    description: "A student professional skills training session.",
    href: "/programs/scholarship",
    cta: "Learn More",
    image: IMG.scholarship,
    imageAlt: SCHOLARSHIP_ALT,
    ...theme("scholarship"),
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
    ...theme("economic"),
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
    ...theme("community"),
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
    ...theme("community"),
  },
  {
    title: "Annual Back To School BBQ",
    date: "2018-09-02",
    description: "SOC Alliance's second annual Back to School BBQ for the community.",
    href: "/programs/community",
    cta: "Learn More",
    image: IMG.community,
    imageAlt: COMMUNITY_ALT,
    ...theme("community"),
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
    ...theme("economic"),
  },
  {
    title: "Back To School BBQ",
    date: "2017-09-04",
    description: "SOC Alliance's first annual Back to School BBQ for the community.",
    href: "/programs/community",
    cta: "Learn More",
    image: IMG.community,
    imageAlt: COMMUNITY_ALT,
    ...theme("community"),
  },
];

/** Today's calendar date in Chicago, as YYYY-MM-DD. */
function chicagoToday(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

// An event stays "upcoming" through the whole of its own day in Chicago,
// rather than flipping to "past" at UTC midnight the evening before.
export function getEventStatus(dateIso: string, now: Date = new Date()): "upcoming" | "past" {
  return dateIso.slice(0, 10) >= chicagoToday(now) ? "upcoming" : "past";
}

export function formatEventDate(dateIso: string): string {
  return new Date(`${dateIso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getUpcomingEvents(events: SocEvent[], now: Date = new Date()): SocEvent[] {
  return events
    .filter((e) => getEventStatus(e.date, now) === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getPastEvents(events: SocEvent[], now: Date = new Date()): SocEvent[] {
  return events
    .filter((e) => getEventStatus(e.date, now) === "past")
    .sort((a, b) => b.date.localeCompare(a.date));
}
