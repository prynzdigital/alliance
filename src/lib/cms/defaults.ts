// Built-in content defaults, moved verbatim from the pages that used to
// hard-code them. They seed the CMS database on first run and are what the
// public site renders if the database is ever unreachable, so the site never
// shows an empty section. Edit live content in the admin dashboard instead.

export type BoardMember = {
  id?: number;
  name: string;
  title: string;
  group: "Officer" | "Director";
  photo: string | null;
  bio: string | null;
};

export type Partner = { id?: number; name: string; url: string | null };

export type CareerRole = { id?: number; title: string; description: string | null };

export type CommunityStory = {
  id?: number;
  title: string;
  dateLocation: string | null;
  body: string;
  image: string | null;
  imageAlt: string | null;
  href: string | null;
};

// Roster and photos sourced directly from the live site
// (socalliance.org/board-of-directors) on 2026-08-30 — see
// docs/assets/board-photos/README.md for provenance and
// docs/discovery/02_Organization_Research.md, Section 4, for the Form 990
// discrepancies still pending client confirmation.
export const defaultBoard: BoardMember[] = [
  { name: "Theodore Davis", title: "Board Chair", group: "Officer", photo: "/board/theodore-davis-board-chair.webp", bio: null },
  { name: "Ronald Hughes", title: "Executive Director", group: "Officer", photo: "/board/ronald-hughes-executive-director.webp", bio: null },
  { name: "Bruce Nash", title: "Treasurer", group: "Officer", photo: "/board/bruce-nash-treasurer.webp", bio: null },
  { name: "Dana O'Banion", title: "Director", group: "Director", photo: "/board/dana-obanion-director.webp", bio: null },
  { name: "Dathon O'Banion", title: "Director", group: "Director", photo: "/board/dathon-obanion-director.webp", bio: null },
  { name: "Stephen Coleman", title: "Director", group: "Director", photo: "/board/stephen-coleman-director.webp", bio: null },
  { name: "Gerald McCarthy", title: "Director", group: "Director", photo: "/board/gerald-mccarthy-director.webp", bio: null },
  { name: "Dejuan Lever", title: "Director", group: "Director", photo: "/board/dejuan-lever-director.webp", bio: null },
];

export const defaultPartners: Partner[] = [
  { name: "Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc.", url: null },
  { name: "Chicago Park District's Fuller Park Fieldhouse", url: null },
  { name: "Fuller Park Advisory Council", url: null },
  { name: "Illinois Department of Human Services", url: null },
  { name: "Cook County Government", url: null },
  { name: "Kroc Center", url: null },
  { name: "Westside Justice Center", url: null },
];

export const defaultCareerRoles: CareerRole[] = [
  { title: "Area Violence Interrupter", description: null },
  { title: "Area Field Manager", description: null },
  { title: "Case Manager", description: null },
  { title: "Victim Services Facilitator", description: null },
];

export const defaultStories: CommunityStory[] = [
  {
    title: "Strengthening Violence Prevention Initiative Partners With Fuller Park Advisory Council",
    dateLocation: "August 20, 2025 · Fuller Park Fieldhouse, Chicago",
    body: "SOC Alliance’s Strengthening Violence Prevention Initiative held a kickoff meeting with the Chicago Park District’s Fuller Park Fieldhouse and the Fuller Park Advisory Council. It’s one more way the Alliance brings residents and local partners together, working from the same idea behind all of SOC Alliance’s community safety work: shared priorities, from traffic safety to youth engagement, are stronger when neighbors help set them.",
    image: "/svpi-fuller-park.webp",
    imageAlt:
      "SOC Alliance staff and Fuller Park Advisory Council members posing together at the Fuller Park Fieldhouse",
    href: "/programs/community",
  },
  {
    title: "SOC Alliance Promotes Positive Loitering",
    dateLocation: "November 15, 2021 · Woodlawn, Chicago",
    body: "SOC Alliance opened its Woodlawn facility to neighbors and officers from the Chicago Police Department for a “positive loitering” gathering, one of the ways the Alliance brings residents and law enforcement together face to face. The idea behind it is simple: familiarity builds trust, and trust between neighbors and police helps reduce violence in the community.",
    image: "/positive-loitering.webp",
    imageAlt:
      "Community members and Chicago Police Department officers gathered together at the SOC Alliance facility in Woodlawn",
    href: "/programs/community",
  },
];
