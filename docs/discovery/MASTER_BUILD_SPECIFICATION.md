# MASTER BUILD SPECIFICATION
## SOC Alliance Website Redesign — Single Source of Truth
Prepared by StateNext Labs · August 24, 2026

This document synthesizes the full discovery, audit, strategy, and design work in the `SOC_Alliance_Redesign_Strategy/` folder into one build-ready specification. **A development team or AI coding agent should be able to begin work from this file alone**, without re-reading the full research set — though the underlying numbered documents (`01`–`20`) remain the source of truth for rationale, citations, and source-verification labels if any claim needs to be double-checked.

**Standing rule for whoever builds from this document: do not invent facts, statistics, testimonials, names, or dates not present in this specification.** Every "pending client confirmation" flag below is a real gap, not a formality — placeholder/invented content must not ship in place of it. See Section 19 for the full list.

---

## 1. Project Objective

Redesign socalliance.org — the website of SOC Alliance (Strengthening Our Community Alliance), a small 501(c)(3) nonprofit in the Woodlawn/Fuller Park area of Chicago's South Side — to remove the friction and trust gaps identified in the current-site audit, organize the entire experience around the organization's four pillars (Scholarship, Economic Development, Community, Health), and give every audience (donors, program participants, volunteers, partners, press) a clear, low-friction path to act. The result should be trustworthy, current-feeling, accessible, fast, and inexpensive to operate and maintain by a lean, volunteer-run organization. Full rationale: `01_Executive_Summary.md`, `06_Strategy.md`.

## 2. Organization Overview

**Legal/working name:** Strengthening Our Community Alliance (SOC Alliance). **Status:** 501(c)(3) public charity, EIN 36-4047035, IRS ruling year 2015. **Address:** 6615 S. Kenwood Ave., Chicago, IL 60637. **Phone:** 773-693-2222. **Email:** info@socalliance.org.

**Mission:** "to uplift and improve the life of the community." **Vision:** "to create a community in which all people thrive and develop to their greatest potential."

**Four pillars and their named sub-programs:**
- **Scholarship** — mentoring, tutoring, technology/coding programs, scholarship awards; anchored by the annual **Talent Hunt Competition** (Chicagoland high school students, vocal/instrumental performance).
- **Economic Development** — employment support, entrepreneurship, financial literacy, banking/investments, home ownership initiatives.
- **Community** — safety, volunteerism, voter education/registration; anchored by the **Strengthening Violence Prevention Initiative (SVPI)** (violence interrupters, case managers, field managers, victim services), funded in part by Illinois DHS.
- **Health** — food security, nutrition, blood drives, exercise programs.

**Flagship fundraiser:** the annual **Omega Mardi Gras Scholarship Fundraiser**, co-hosted with the Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc. (21st annual edition: March 14, 2026, Rate Field; sponsorships from $500; cumulative "$100,000+ in scholarships awarded"). Also active: an annual **Giving Tuesday** campaign.

**Named community partners:** Sigma Omega Chapter of Omega Psi Phi Fraternity, Chicago Park District/Fuller Park Fieldhouse, Fuller Park Advisory Council, Illinois Department of Human Services, Cook County Government (2024 Starting Block Grant recipient), Kroc Center, Westside Justice Center, Vandercook College of Music.

**Financial profile (FY ending Oct 2024):** Revenue $82,682 · Total assets $175,938 · All officers report $0 compensation. **This is a lean, volunteer-driven organization — every technical and operational recommendation in this specification is scoped accordingly.**

**Unresolved organizational-history questions requiring client sign-off before publishing:** the site's "established in 1995" claim conflicts with the 2015 IRS ruling year, and public nonprofit registries suggest a possible (unconfirmed) link to a predecessor "Sigma Omega Foundation" entity under the same EIN. **Do not publish either the 1995 date or the Sigma Omega Foundation connection as confirmed history without explicit client approval.** Full detail: `02_Organization_Research.md`.

## 3. Target Audiences

Primary: community members/residents, students/families (scholarships & mentoring), individual donors, program participants in crisis (violence-prevention/mentoring — highest sensitivity). Secondary: volunteers, businesses/sponsors, community/institutional partners, SVPI job seekers, general visitors/press. Full profiles, needs, and barriers for each: `04_User_Audience_Analysis.md`.

## 4. User Journeys (summary — full detail in `04_User_Audience_Analysis.md`)

- **First-time donor:** homepage → trust evaluation → Donate → currently fails at an unbranded off-site handoff → must be fixed with embedded, trust-framed giving.
- **Parent researching Talent Hunt:** needs an evergreen program page with current eligibility/deadline — does not exist today, only past-event recaps.
- **Person seeking mentoring support (crisis context):** needs a warm, discoverable (currently missing from the sitemap), confidential-feeling page with both a form and a direct phone option.
- **Prospective volunteer:** needs a dedicated Volunteer page and sign-up — does not exist today at all.

## 5. Strategic Goals (ranked — full detail `06_Strategy.md`)

1. Remove friction/add trust to the donation and giving experience.
2. Make the four pillars the organizing structure of the entire site.
3. Establish visible organizational credibility (financial transparency, real board photos/bios, a real About/History page).
4. Make the site look and feel active (realistic content cadence, no stale campaigns).
5. Give every audience a clear next step (especially: add the missing Volunteer and evergreen program pages).
6. Mobile-first usability.
7. WCAG 2.1 AA accessibility.
8. Technical SEO discoverability (fix orphaned sitemap page, URL structure, structured data).
9. Simplify third-party dependencies without over-engineering.
10. Route contact inquiries by intent.

## 6. Sitemap

```
Home
About
  ├─ Our Story              [PENDING CLIENT CONTENT — history/founding]
  ├─ Leadership & Board     [PENDING CLIENT CONTENT — bios/photos, confirmed roster]
  └─ Financials & Transparency  [PENDING CLIENT CONTENT — 990/annual report]
Our Programs
  ├─ Scholarship  (incl. Talent Hunt Competition)
  ├─ Economic Development
  ├─ Community    (incl. Violence Prevention / SVPI program info)
  └─ Health
Get Involved
  ├─ Volunteer               [NEW — no current equivalent]
  ├─ Careers (SVPI & other roles)
  ├─ Partner With Us         [NEW — no current equivalent]
  └─ Mentoring & Life Coaching (apply / request support)
News & Events   (categories: Events, Announcements/Press, Program Updates; Upcoming vs. Past status)
Donate
  ├─ Give Once / Monthly
  ├─ Mardi Gras Scholarship Fundraiser
  └─ Pledge a Gift (Monthly Pledge / Building Fund)
Contact
```
Footer mirrors this at summary level, plus Privacy Policy, social links, EIN/501(c)(3) statement. Full page-by-page purpose/audience/CTA/content rationale: `07_Recommended_Sitemap.md`.

## 7. Page Requirements

For every page: implement per the purpose/audience/CTA/content detailed in `07_Recommended_Sitemap.md`. Key build notes:
- **Mentoring & Life Coaching** must be included in the auto-generated sitemap (the current site's page of this kind is missing from it — do not repeat that bug) and must include both a form and a direct phone/contact option, written in warm, plain, non-bureaucratic language.
- **Donate** must embed the giving widget on-page (not link off-site), state 501(c)(3)/EIN/tax-deductibility directly beside it, and cross-link to the Mardi Gras Fundraiser and Pledge options.
- **Pledge pages** (Monthly Pledge / Building Fund) must include explanatory context before the commitment form, and should route through a proper e-signature platform rather than a native HTML form (pending client platform decision).
- **Leadership & Board** must use real, individual photos and bios — never a repeated generic stock image — and reflect the client-confirmed roster (see Section 19).
- **News & Events** posts must carry a clear Upcoming/Past status derived from date, so time-bound content cannot silently go stale the way it has on the current site.

## 8. Homepage Structure

In order, per `08_Homepage_UX.md`: (1) Header/Nav with persistent Donate CTA — (2) Hero, dignity-first mission framing — (3) Four Pillars overview grid — (4) Impact Statistics *[pending client-confirmed numbers — do not fabricate]* — (5) Featured Program/Community Story *[pending client-supplied, consented material]* — (6) Upcoming Events (auto-archives past events) — (7) Trust & Transparency strip (EIN/501(c)(3), link to Financials) — (8) Partner/Collaborator logos *[pending client confirmation of which partners may be listed]* — (9) How to Participate (Volunteer / Apply / Careers) — (10) Donation CTA (repeat, standalone) — (11) Newsletter signup — (12) Footer. No auto-playing video, no duplicated full Board block, no stock photography where real photography is available.

## 9. Content Requirements

Full migration/rewrite plan: `09_Content_Strategy.md`. Hard rules: no fabricated facts/stats/testimonials/dates; every date-bound item must have a clear archiving mechanism built into the CMS (not manual discipline alone); sensitive content (violence prevention, mentoring) must be reviewed by the client for tone before publishing; any founding-history content referencing 1995 or a "Sigma Omega Foundation" connection requires explicit client approval (see Section 2 above and Section 19 below).

## 10. Design Direction

Professional, community-centered, trustworthy, modern, accessible, human, mission-driven — deliberately avoiding both the generic template feel of the current site and over-designed animation-heavy trendiness (inappropriate given the site's violence-prevention/crisis-support content). Real, authentic, consented photography replacing the current single repeated stock image. A confident warm primary color plus a Chicago-rooted accent, one consistent typeface family, simple line/duotone pillar icons, a consistent card/button/spacing system, minimal purposeful animation respecting `prefers-reduced-motion`. **Note:** exact current brand colors/logo could not be captured via this discovery pass's text-based research — confirm existing brand assets with the client before finalizing (see Section 19). Full detail: `10_Design_Direction.md`.

## 11. Design System

**Typography:** single sans-serif family (e.g., Inter), H1 48/32px, H2 34/26px, H3 24/20px, Body 17/16px (desktop/mobile), self-hosted with `font-display: swap`.
**Color tokens (starting proposal, confirm with client):** Primary `#1E4D3A` · Secondary `#C9A227` · Accent `#B23A2E` · Background `#FFFFFF` · Surface `#F6F4EF` · Text `#1A1A1A` · Text-muted `#5A5A5A` · Success `#2E7D4F` · Error `#B3261E`. Pillar accents: Scholarship `#2E5EAA`, Economic Development `#C9A227`, Community `#B23A2E`, Health `#1E4D3A`. All pairs must pass WCAG AA contrast before implementation.
**Spacing:** 8px base unit; section padding 64–96px desktop / 40–56px mobile; max content width ~1200–1280px; 8px button/input radius, 12–16px card radius.
Full component list (Navbar, Footer, Hero, CTA Banner, Buttons, Pillar/Program/Event/News/Leadership cards, Impact Statistic Tile, Testimonial Card, Forms, Donation Section, Breadcrumbs, Alert, Modal, Partner Logo Row) with state notes: `11_Design_System.md`.

## 12. SEO Requirements

Unique title (~60 char) + meta description (~155 char) per page; exactly one H1 per page with logical heading order; short, deliberate hyphenated URLs (replacing current 80–89 character slugs) with 301 redirects from every existing indexed URL; CMS-auto-generated sitemap including 100% of live pages (fixing the current mentoring-page omission); `NonprofitOrganization`, `Event`, and `BreadcrumbList` schema.org structured data; Open Graph/Twitter Card tags site-wide; descriptive alt text on every meaningful image. Target keyword themes (directional, not guaranteed): "Woodlawn Chicago nonprofit," "South Side Chicago community organization," "Chicago violence prevention program," "Chicago high school scholarship competition," "Chicago youth mentoring firearm violence." Full detail: `12_SEO_Strategy.md`.

## 13. Accessibility Requirements

WCAG 2.1 AA is a hard requirement, not aspirational. Full checklist in `13_Accessibility.md`, covering: verified color contrast on every token pair; full keyboard operability with a skip-to-content link; visible focus states; semantic landmark HTML with correct heading hierarchy; every form input with a visible associated `<label>`; specific (not generic) alt text on every meaningful image, especially board/leadership photos; meaningful link text (no bare "click here"); breadcrumbs on nested pages; `prefers-reduced-motion` respected throughout; pre-launch verification via automated scan (axe/WAVE), manual keyboard pass, and a screen-reader spot-check of the homepage, Donate flow, and Mentoring page specifically.

## 14. Technical Architecture

**Stack:** Next.js + React + TypeScript + Tailwind CSS, hosted on Vercel. **Framer Motion:** optional, used sparingly for a few purposeful moments only — do not over-animate. **PostgreSQL/Neon:** not required for launch scope; a headless CMS covers the content model (Page, Program, News Post, Board Member, Partner/Sponsor, Site Settings) without database overhead — revisit only if a genuinely relational/transactional feature (e.g., tracked volunteer sign-ups, a donor CRM) is added in a later phase. **Forms:** native Next.js forms via a lightweight email service (e.g., Resend) for contact/volunteer/job/program applications, replacing the current disconnected external Google Forms — **except** the Monthly/Building Pledge agreements, which should move to a dedicated e-signature platform given their legal weight. **Donations:** retain Donorbox as processor, but embed it on-page rather than linking off-site. **Images:** Next.js `<Image>` component site-wide. **SEO:** Next.js metadata API + `next-sitemap` + JSON-LD structured data. **Security:** HTTPS-only, form spam protection (honeypot/Turnstile), no direct handling of payment/signature data by the site itself, current dependencies. Full evaluation and reasoning: `14_Technical_Architecture.md`.

## 15. Integrations

- **Donorbox** — embedded donation widget (retained from current site, integration pattern upgraded).
- **E-signature platform** (DocuSign, Dropbox Sign, or similar) — for the two pledge agreements (pending client decision, see Section 19).
- **Transactional email service** (e.g., Resend/Postmark) — for all native form submissions.
- **Analytics** — Vercel Analytics, Plausible, or GA4 (pending client preference) — implemented from day one so a real conversion baseline exists post-launch.
- **Email newsletter platform** (Mailchimp/Constant Contact or similar) — pending client preference, for the new newsletter-signup capability.
- **Google Maps embed (or accessible alternative)** — Contact page.
- **Facebook** — the org's one confirmed social channel; ensure Open Graph tags render correctly when shared there.

## 16. Performance Requirements

Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1 (mobile), verified via Lighthouse/PageSpeed Insights on the homepage, Donate page, and at least one program page. Responsive images via Next.js `<Image>` with lazy loading below the fold; self-hosted, subsetted web fonts with `font-display: swap`; JavaScript kept minimal (SSG/ISR for content-only pages, client-side JS reserved for genuinely interactive elements); Vercel edge caching; third-party scripts limited to the donation widget and one analytics tool. Full responsive-breakpoint behavior (mobile/tablet/laptop/desktop/large-desktop, component-by-component) and performance detail: `16_Performance_Strategy.md`.

## 17. Acceptance Criteria

Full checklist: `19_Acceptance_Criteria.md`. Headline bars: zero critical/serious accessibility scan errors; every page has a unique title/description and one H1; 100% sitemap coverage with verified 301 redirects from all legacy URLs; Core Web Vitals "Good" thresholds met; every form field properly labeled with working spam protection; no placeholder text or fabricated content live at launch; no stale/date-passed content live at launch; HTTPS-only with no unresolved high/critical dependency vulnerabilities; at least one SOC Alliance staff/volunteer independently trained and able to publish content in the CMS before launch sign-off.

## 18. Client-Input Dependencies

The following **must** be resolved with SOC Alliance before the associated content can be finalized — do not launch with invented placeholders for any of these. Full list with rationale: `20_Client_Input_Required.md`.

**Blocking for About/Leadership/Financials/Donate pages specifically:**
1. True founding story/year (1995 claim vs. 2015 IRS ruling year) — do not publish either the date or any "Sigma Omega Foundation" connection without explicit sign-off.
2. Accurate, current Board roster and titles (website vs. Form 990 conflict).
3. Board member bios and headshots.
4. Service area/eligibility definition (Woodlawn vs. citywide).
5. Purpose/scope of the Building Pledge capital project.
6. Quantified program-outcome statistics (only one verified figure exists today: "$100,000+ in scholarships awarded" cumulatively).
7. Permission to publish the most recent Form 990/annual report.
8. Which partners may be publicly listed/logo'd.
9. Privacy Policy content/requirements.
10. E-signature platform decision for pledge agreements.

**Needed for launch readiness but not content-blocking in the same way:**
11. Domain/DNS access; current CMS/hosting platform confirmation; Donorbox account access; existing brand assets if any; social channels beyond Facebook; current volunteer opportunities; existing photography or a photography-session commitment; consented participant stories.

## 19. Fact-Accuracy Rule (repeated for emphasis)

Every statistic, date, name, and organizational claim in the built site must trace to either (a) content verified on the current socalliance.org site, (b) an externally cited, verifiable source, or (c) material the client explicitly supplies during this project. Where information is genuinely unavailable, the correct build behavior is to omit the claim or use a clearly labeled placeholder pending client input — never to invent a plausible-sounding number, quote, or date.

## 20. Recommended Development Phases

**Phase 0 — Client Alignment (before build starts):** resolve the blocking items in Section 18 (especially the founding-history question and board-roster accuracy), confirm brand assets, confirm technical access (domain, Donorbox, current CMS).

**Phase 1 — Foundation:** set up the Next.js/Tailwind/Vercel project, implement the design system (`11_Design_System.md`), build the CMS content model, implement global navigation/footer.

**Phase 2 — Core Pages:** Home, About (Our Story, Leadership, Financials), the four Program pillar pages, Contact — using confirmed content only; ship with explicit "pending" placeholders only where absolutely unavoidable and flagged for the client, not fabricated.

**Phase 3 — Conversion Pages:** Donate (embedded widget), Pledge pages (e-signature integration), Get Involved (Volunteer, Careers, Partner With Us, Mentoring & Life Coaching).

**Phase 4 — News & Events:** categorized News hub, evergreen Talent Hunt and Mardi Gras Fundraiser pages with past-highlights sections.

**Phase 5 — QA & Launch:** full pass against `19_Acceptance_Criteria.md` (accessibility scan, performance audit, cross-browser/device testing, 301-redirect verification, CMS training for client staff), then DNS cutover.

**Phase 6 — Post-Launch (first 30–60 days):** confirm analytics baseline is capturing real data, monitor Core Web Vitals in the field, first content-cadence check-in to confirm the new CMS workflow is sustainable for the client's volunteer team.

**Future phases (see `18_Project_Requirements.md`, Future):** searchable events calendar, donor CRM/volunteer-management system if scale justifies it, "sponsor a specific student" giving mechanism, dedicated press/media workflow.
