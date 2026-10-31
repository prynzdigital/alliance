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

export type Newsletter = {
  id?: number;
  title: string;
  issueLabel: string;
  summary: string | null;
  /** "In this issue" items. */
  highlights: string[];
  pdf: string;
  cover: string | null;
  coverAlt: string | null;
};

// The Fall 2026 issue was supplied by the client on 2026-10-31
// (public/newsletters/soc-fall-2026-newsletter.pdf).
export const defaultNewsletters: Newsletter[] = [
  {
    title: "Fall 2026 Newsletter",
    issueLabel: "Fall 2026",
    summary:
      "Messages from our Board Chair and Executive Director, a look back at the 21st Annual Mardi Gras Scholarship Fundraiser, our 2026 scholarship recipients, and a save-the-date for Omega Mardi Gras 2027.",
    highlights: [
      "A Message from the Board Chair",
      "Message from the Executive Director",
      "A Night to Remember: the 21st Annual Mardi Gras Scholarship Fundraiser",
      "Our 2026 Mardi Gras Sponsors",
      "Five Young Men, Five Bright Futures",
      "Mardi Gras Moments",
      "Save the Date: Omega Mardi Gras 2027",
    ],
    pdf: "/newsletters/soc-fall-2026-newsletter.pdf",
    cover: "/newsletters/fall-2026-cover.webp",
    coverAlt:
      "Cover of the SOC Alliance Fall 2026 Newsletter, headlined “Empowering Chicago communities, one pillar at a time.”",
  },
];

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

// From the Fall 2026 Newsletter (client-supplied, 2026-10-31).
export const fall2026Stories: CommunityStory[] = [
  {
    title: "Five Young Men, Five Bright Futures",
    dateLocation: "July 25, 2026 · Ray and Joan Kroc Center, Chicago",
    body: "The Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc., in conjunction with SOC Alliance, presented scholarships to five young men from the Chicagoland area. Each student received $2,000, for a total of $10,000 in scholarship awards, and the chapter’s brothers are committed to staying in touch as mentors and bridge builders as the recipients begin college.",
    image: "/scholarship-2026-recipients.webp",
    imageAlt:
      "The five 2026 scholarship recipients with Sigma Omega Chapter brothers, holding a $10,000 ceremonial check",
    href: "/programs/scholarship#recipients-2026",
  },
  {
    title: "A Night to Remember at the 21st Annual Mardi Gras",
    dateLocation: "March 14, 2026 · Stadium Club at Rate Field, Chicago",
    body: "Close to 250 guests joined SOC Alliance and the Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc. for music by DJ Phokiss, a live performance by Soul Street Collective, a casino experience, and a full buffet. More than 30 corporate, civic, and community sponsors made the evening possible, and their support directly funds scholarships for Chicagoland students.",
    image: "/mardi-gras-2026-entertainment.webp",
    imageAlt: "Three vocalists performing live with a band at the 21st Annual Mardi Gras Scholarship Fundraiser",
    href: "/donate/mardi-gras-fundraiser#recap-2026",
  },
];

export const defaultStories: CommunityStory[] = [
  ...fall2026Stories,
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
