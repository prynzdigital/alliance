# 18 — Project Requirements

Formal MoSCoW requirements document, protecting project scope per the brief. Each item traces back to a specific finding or objective elsewhere in this document set.

## Must Have (critical for launch)

- Responsive, mobile-first site covering the full sitemap in `07_Recommended_Sitemap.md`.
- Homepage built per the section-by-section blueprint in `08_Homepage_UX.md`, using only client-confirmed statistics and content (no fabricated numbers).
- Four-pillar structure (Scholarship, Economic Development, Community, Health) as the primary navigational and visual system.
- Donate page with an embedded (not off-site-linked) donation widget, tax-deductibility/EIN messaging, and one-time/monthly giving options.
- A working, differentiated Contact form with an embedded map.
- Mentoring & Life Coaching page, properly indexed in the sitemap, with warm, plain-language, confidentiality-respecting content.
- Board of Directors / Leadership page with real photos and bios (pending client-supplied material) and a corrected, client-confirmed roster.
- 301 redirects mapped from every existing indexed URL to its new destination.
- WCAG 2.1 AA compliance across all page templates (per checklist in `13_Accessibility.md`).
- Complete on-page SEO fundamentals (unique titles/descriptions, correct heading hierarchy, auto-generated sitemap, structured data) per `12_SEO_Strategy.md`.
- Working analytics implementation from day one of launch.
- Privacy Policy page (pending client confirmation of requirements).
- Core Web Vitals targets met on the homepage, Donate page, and at least one program page (per `16_Performance_Strategy.md`).
- CMS enabling non-technical staff to publish/edit News & Events, Program, and Board content without developer involvement.

## Should Have (important, adds significant value)

- Financials & Transparency page with the most recent Form 990/annual-report summary (pending client-supplied documents).
- Get Involved → Volunteer page with a working sign-up form.
- Get Involved → Partner With Us page with sponsorship tiers and a partner-logo wall (pending client confirmation of which partners may be listed).
- Evergreen, dedicated pages for the Talent Hunt Competition and the Mardi Gras Scholarship Fundraiser, each with a "past highlights" section.
- Newsletter signup integrated with an email platform.
- Impact-statistics section on the homepage (pending client-confirmed figures).
- Featured program/community story section on the homepage (pending client-supplied, consented material).
- Migration of the Monthly Pledge / Building Pledge Agreement forms to a dedicated e-signature platform.
- Consolidation of job/program application intake into the site's own native forms (replacing external Google Forms), pending client preference.

## Could Have (useful if budget/time permits)

- Third-party trust badges (Charity Navigator, GuideStar) once the organization qualifies/registers for them.
- Blog/News categorization and filtering UI beyond a basic list (e.g., filter by pillar or category).
- Press/Media Kit page (logos, boilerplate description, media contact).
- FAQ page addressing common eligibility/program questions.
- A "who are you?" homepage entry point routing visitors by role (student, parent, volunteer, donor, partner).
- Multi-language support (if the client's community need supports it — not yet assessed; see `20_Client_Input_Required.md`).

## Future (potential phase-two features)

- Searchable/filterable events calendar system.
- A donor CRM or volunteer-management system, if scale eventually justifies it (explicitly not recommended at current organizational scale per `14_Technical_Architecture.md`).
- A "sponsor a specific student/scholarship" giving mechanism modeled on the DonorsChoose pattern discussed in `05_Competitor_Analysis.md`.
- A dedicated Press/News distribution workflow for grant announcements and media coverage.
- Deeper integration between the site and a database, if the organization's data-tracking needs grow beyond what a headless CMS supports (see `14_Technical_Architecture.md`, PostgreSQL/Neon exception case).

## Explicitly Out of Scope (unless the client requests otherwise)

- Any custom-built donor/payment processing system (Donorbox remains the processor).
- Any statistics, testimonials, or historical claims not confirmed by the client.
- Publishing the inferred "Sigma Omega Foundation" organizational-history connection without explicit client sign-off.
