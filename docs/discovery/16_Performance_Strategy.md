# 16 — Responsive Design & Performance Strategy

## Part A — Responsive Design Strategy

Per `06_Strategy.md` (Objective 6), the site must be built **mobile-first**, not adapted down from a desktop design — appropriate for a community-facing nonprofit whose visitors are likely to reach it heavily via mobile (social shares, event promotion, on-the-go search).

### Breakpoints
- **Mobile:** up to 640px
- **Tablet:** 641–1024px
- **Laptop:** 1025–1439px
- **Desktop:** 1440–1919px
- **Large desktop:** 1920px+

### Behavior by Component

**Navigation** — Mobile/tablet: a hamburger-triggered drawer with "Our Programs" expandable in place (accordion), not hover-dependent. Laptop/desktop: a sticky horizontal bar with a click- or keyboard-accessible "Our Programs" dropdown, and the Donate button remaining visually distinct at every size.

**Hero** — Mobile: stacked layout (headline → subhead → CTAs → image), with any background-image treatment keeping text readable via a contrast overlay and avoiding crops that cut off important photo content. Desktop: side-by-side or full-bleed treatment with more generous whitespace.

**Cards** (Pillar, Program, Event, News, Board) — Mobile: single-column, full-width. Tablet: two-column grid. Laptop/Desktop: three- or four-column grid depending on content type (four columns for the pillar cards specifically, so all four stay visible without scrolling on larger screens).

**Forms** — Full-width, single-column fields at every breakpoint (multi-column forms reduce completion rates and complicate mobile use) — applies to contact, donation, pledge, and program-application forms alike. Minimum 44×44px touch targets throughout.

**Tables** — No dense data tables are anticipated in the current content model; if one is introduced later (e.g., a financial-summary table on the Financials page), it should collapse to a stacked, labeled card format on mobile rather than requiring horizontal scroll.

**Events** — Mobile: a vertically stacked list with date, title, and a single CTA per event. Desktop: can support a denser card grid or a hybrid list/calendar view if the client wants that investment later (see `18_Project_Requirements.md`, Future).

**Donation CTAs** — The embedded donation widget (per `14_Technical_Architecture.md`) must render cleanly and remain fully functional at mobile width — this is a conversion-critical path and should be tested on real devices, not just browser emulation, before launch.

**Typography** — Fluid scaling between the mobile and desktop sizes specified in `11_Design_System.md` (e.g., via `clamp()`), so headings never feel oversized on small screens or undersized on large ones.

**Images** — Served responsively (via Next.js `<Image>`) with appropriately sized sources per breakpoint — never a single large desktop image scaled down on mobile.

### Testing Requirement
Verify the primary user journeys from `04_User_Audience_Analysis.md` (donation, program application, mentoring contact, volunteer sign-up) on at least one real mobile device (iOS and Android) in addition to browser-based responsive testing, before launch.

---

## Part B — Performance Strategy

The goal is a fast, professional website, not a visually impressive but slow one — directly relevant here since the current site's real-world load performance could not be measured through this discovery phase's text-based fetching and should be benchmarked with Lighthouse/PageSpeed Insights early in development.

### Image Optimization
Use Next.js's built-in `<Image>` component site-wide for automatic responsive sizing, lazy loading below the fold, and modern-format (WebP/AVIF) serving. All source photography should be compressed and appropriately sized before upload, not relied upon to be optimized automatically at arbitrary original resolution.

### Font Optimization
Self-host the chosen typeface (per `11_Design_System.md`) with `font-display: swap`, subset to only the weights/character sets actually used, and preload the primary heading/body weights to avoid layout shift on load.

### Lazy Loading
Below-the-fold sections (impact statistics, partner logos, news feed, footer) load lazily; above-the-fold content (hero, primary nav) is prioritized for fastest paint.

### JavaScript Reduction
Favor Next.js's static generation for content that doesn't change per-request (pillar pages, About, most program pages), reserving client-side JavaScript for genuinely interactive elements (forms, nav drawer, donation widget). Any animation library usage (see `14_Technical_Architecture.md` on Framer Motion) should be scoped narrowly rather than applied broadly, to avoid unnecessary bundle weight.

### Server Rendering / Static Generation
Static Site Generation (SSG) or Incremental Static Regeneration (ISR) for CMS-driven content (news posts, program pages) balances performance with the ability for staff to publish updates without a full redeploy — directly supporting the sustainable content-cadence goal in `06_Strategy.md`.

### Caching
Leverage Vercel's edge caching for static assets and ISR-generated pages; set appropriate cache headers for images and fonts.

### Third-Party Scripts
Minimize third-party script weight — the embedded Donorbox widget and a single analytics script (per `14_Technical_Architecture.md`) are the primary justified exceptions; avoid adding additional trackers, chat widgets, or embeds without a clear purpose, since each one is a direct performance and privacy cost.

### Core Web Vitals Targets
- **Largest Contentful Paint (LCP):** under 2.5s on mobile
- **Interaction to Next Paint (INP):** under 200ms
- **Cumulative Layout Shift (CLS):** under 0.1

These targets should be verified via Lighthouse/PageSpeed Insights on the homepage, the Donate page, and at least one program page before launch, and spot-checked periodically afterward as content is added.
