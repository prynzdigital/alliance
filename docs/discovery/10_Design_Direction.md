# 10 — Visual & Brand Direction

## A Note on Method

This discovery pass audited the current site's content and structure through automated, text-based page fetching, which does not reliably capture rendered visual details (exact brand colors, font choices, spacing, imagery treatment as displayed). What can be said with confidence from the research: the current site relies heavily on one repeated generic stock photograph (a "graduates throwing caps" image) across nearly every page, uses a standard small-business-website-builder layout pattern, and carries no visible logo/brand-system sophistication beyond a basic wordmark. **Before final visual design begins, StateNext Labs should do a direct, in-browser visual review of the live site** (screenshots across breakpoints, a color picker on brand elements, and a look at any existing logo/brand files) and request any existing brand guidelines, logo files, or brand colors directly from the client or their current agency (Olive + Ash / Olive Street Design) — see `17_Client_Questions.md`. The direction below is therefore a **recommended new direction**, not a description of the current brand, and should be presented to the client as a starting proposal rather than an assumed final answer.

## Recommended Visual Personality

The design should feel **professional, community-centered, trustworthy, modern, accessible, human, and mission-driven** — explicitly avoiding two failure modes seen across the benchmark set: the generic, under-designed feel of a template-driven small-nonprofit site (the current SOC Alliance site's own failure mode), and the opposite over-designed, animation-heavy trendiness that can undercut trust for an organization whose subject matter (violence prevention, supporting people in crisis) calls for restraint and clarity over visual flash.

## Color Direction
A recommended palette anchors on one confident, warm primary color rather than a cold "corporate nonprofit blue," paired with a strong accent tied to the organization's Chicago South Side identity, and a full neutral scale for text/backgrounds/surfaces to ensure accessible contrast throughout (see `11_Design_System.md` for exact token values and `13_Accessibility.md` for contrast requirements). Color should be used consistently to help visually distinguish the four pillars from one another (as GAGDC does with its Adinkra-symbol color system) without fragmenting the overall brand — each pillar gets a distinct accent tint of the same core palette, not four unrelated colors.

## Typography
A clean, highly legible sans-serif for both headings and body text, prioritizing readability at small sizes on mobile over decorative display fonts. A single typeface family (with a serif or distinct display option reserved only for large hero headlines, if desired) keeps the system simple to implement and maintain for a small organization with limited design resources going forward.

## Photography Style
Real, authentic photography of actual SOC Alliance programs, participants (with consent), board members, and Woodlawn/Fuller Park community locations should replace the current site's single repeated stock image entirely. Where real photography is not yet available for a given page at launch, the redesign should use warm, honest placeholder treatments (e.g., simple color-blocked pillar icons, not more generic stock photography) rather than perpetuating the current credibility problem with different stock images. A professional photography/content-gathering session with the client should be scoped as part of this project (see `18_Project_Requirements.md`).

## Iconography
A simple, consistent icon set (one per pillar, plus a small supporting set for contact/social/document icons) reinforces the four-pillar navigational system identified as a top priority in `06_Strategy.md` and `08_Homepage_UX.md`. Icons should be simple line or duotone style, not literal clip-art, and should feel intentional rather than decorative.

## Button, Card & Component Styling
Buttons should be clearly interactive (sufficient size and contrast for touch targets — see `13_Accessibility.md`), with a single consistent primary/secondary button hierarchy used site-wide, replacing the current site's inconsistent all-caps button labeling pattern ("SUBMIT A DONATION," "DONATE TODAY," "LEARN MORE" all appearing as visually different styles for functionally similar actions). Cards (program pillars, events, board members, news posts) should share one consistent shape language — moderate border radius, consistent padding and shadow treatment — so the four pillar cards, event cards, and board cards all read as one coherent system rather than as separately styled page components, which is a pattern visible in the current site's page-by-page inconsistency.

## Section Spacing & Border Radius
Generous, consistent vertical spacing between homepage sections (per `08_Homepage_UX.md`) improves scannability on both mobile and desktop and gives the page room to breathe — a contrast to the current site's dense, tightly packed layout (particularly the repeated Board block appearing on nearly every page). A moderate, consistently applied border radius (not sharp corners, not an overly rounded "bubbly" look) supports the "professional but human" personality target.

## Navigation Style
A clean, sticky (or scroll-aware) top navigation bar with the four-pillar-driven "Our Programs" as a dropdown/mega-menu on desktop and a clear, accessible hamburger/drawer pattern on mobile — replacing the current flat eight-item bar, which does not scale well to the expanded IA recommended in `07_Recommended_Sitemap.md`.

## Footer Style
A structured, multi-column footer (sitemap summary, contact block with map link, social icons, EIN/501(c)(3) statement, newsletter signup) — a meaningful upgrade from the current single-column text block, and the natural home for the transparency and trust signals identified as missing in `03_Current_Website_Audit.md`.

## Animation Philosophy
Animation should be minimal, purposeful, and never a distraction from content or a barrier to accessibility: subtle fade/slide-in on scroll for section reveals is acceptable, but no auto-playing background video, no distracting parallax, and no animated statistics counters that could misrepresent still-unconfirmed numbers. All motion must respect the `prefers-reduced-motion` browser setting (see `13_Accessibility.md`). This restraint is a deliberate choice appropriate to an organization whose content includes violence-prevention and crisis-support material — the site should feel calm and trustworthy, not flashy.
