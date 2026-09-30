export type NavLink = {
  label: string;
  href: string;
};

export type NavSection = {
  label: string;
  href: string;
  children?: NavLink[];
};

// Sitemap per docs/discovery/07_Recommended_Sitemap.md and
// MASTER_BUILD_SPECIFICATION.md Section 6. Single source of truth for the
// header nav, footer sitemap columns, and route stubs.
export const primaryNav: NavSection[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about/our-story" },
      { label: "Leadership & Board", href: "/about/our-story#leadership" },
      { label: "Financials & Transparency", href: "/about/financials-transparency" },
    ],
  },
  {
    label: "Our Programs",
    href: "/programs",
    children: [
      { label: "Scholarship", href: "/programs/scholarship" },
      { label: "Economic Development", href: "/programs/economic-development" },
      { label: "Community", href: "/programs/community" },
      { label: "Health", href: "/programs/health" },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Volunteer", href: "/get-involved/volunteer" },
      { label: "Careers", href: "/get-involved/careers" },
      { label: "Partner With Us", href: "/get-involved/partner-with-us" },
      { label: "Mentoring & Life Coaching", href: "/get-involved/mentoring-life-coaching" },
    ],
  },
  { label: "News & Events", href: "/news-events" },
  {
    label: "Donate",
    href: "/donate",
    children: [
      { label: "Give Once / Monthly", href: "/donate/give" },
      { label: "Mardi Gras Scholarship Fundraiser", href: "/donate/mardi-gras-fundraiser" },
      { label: "Pledge a Gift", href: "/donate/pledge" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerLegal: NavLink[] = [{ label: "Privacy Policy", href: "/privacy-policy" }];
