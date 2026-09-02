# 06 — Strategy

Based on the organizational research, website audit, audience analysis, and benchmark research above, this document defines what the redesigned SOC Alliance website must accomplish. Objectives are ranked by importance — ranking reflects both organizational impact (mission/funding) and the severity of the current gap (see `03_Current_Website_Audit.md`).

## Strategic Objectives, Ranked

1. **Remove friction and add trust to the donation and giving experience.** This is the single highest-impact fix identified in the audit: an off-site handoff with zero trust context, no financial transparency anywhere, and a legally binding pledge collected via a plain form. Success measure: donation-page-to-completed-gift conversion rate improves measurably post-launch (baseline to be established via analytics after launch, since no current analytics data was available for this audit); tax-deductibility/EIN/security messaging is present on every giving surface.

2. **Make the four pillars — Scholarship, Economic Development, Community, Health — the organizing structure of the entire site, not a paragraph buried on one page.** Success measure: every major program maps visibly to one of the four pillars in navigation and on the homepage; a first-time visitor can name SOC Alliance's four focus areas within seconds of landing.

3. **Establish and maintain visible organizational credibility.** Add financial transparency (990/annual report/EIN), real board photos and bios, and a real About/History page — closing the single largest trust gap found in the audit. Success measure: a Financials/Transparency page exists and is linked from primary navigation or footer; every board member has a real photo and a short bio; an About page exists with client-approved history copy.

4. **Make the site look and feel active.** Replace the nine-months-stale content pattern with a realistic, sustainable publishing cadence, auto-archived past events, and no dead/stale donation categories. Success measure: no donation category or "upcoming" event remains live past its actual date; the CMS supports easy, non-technical updates by SOC Alliance staff/volunteers.

5. **Give every audience a clear, low-friction next step.** Add a real "Get Involved/Volunteer" pathway (currently missing entirely), give the Talent Hunt Competition and mentoring/life-coaching programs their own evergreen pages with clear eligibility and application paths, and ensure the mentoring page in particular is warm, discoverable, and confidential-feeling given its sensitive audience. Success measure: every primary audience identified in `04_User_Audience_Analysis.md` has a dedicated, findable page with one clear CTA.

6. **Strengthen mobile usability.** Given a community-facing, likely majority-mobile visitor base (typical for local nonprofit sites), the redesign must be built mobile-first, not adapted from desktop. Success measure: full functional and visual parity across mobile/tablet/desktop, Core Web Vitals in the "Good" range on mobile.

7. **Meet WCAG 2.1 AA accessibility standards.** The current site shows inconsistent alt text and heading-hierarchy gaps; a community nonprofit serving a broad public should not create unnecessary access barriers. Success measure: passes an automated accessibility scan (axe/WAVE) with zero critical errors, plus a manual keyboard/screen-reader pass.

8. **Improve technical SEO discoverability.** Fix the orphaned sitemap entry, shorten and rationalize URL structure, add structured data (Organization/Event schema), and establish a realistic content cadence. Success measure: 100% of live, indexable pages appear in the sitemap; all primary pages have unique, keyword-relevant titles/meta descriptions/URLs under 60 characters where practical.

9. **Simplify and consolidate third-party dependencies where it improves the experience, without over-engineering.** Evaluate whether Google Forms-based intake (jobs, mentoring applications) should move to a more integrated, trackable system, and whether Donorbox should be embedded rather than linked out — while respecting that this is a lean, volunteer-run organization that needs low operating cost and low maintenance burden (see `14_Technical_Architecture.md`). Success measure: fewer distinct off-site tools than today, or the same number used more seamlessly (embedded rather than linked away).

10. **Make contacting the organization easy and appropriately routed.** A single generic contact form currently serves donors, program applicants, job seekers, media, and people in crisis alike. Success measure: contact pathways are differentiated by intent (general inquiry, program application, media, volunteer, donor) so messages reach the right response with the right urgency.

## What "Success" Looks Like at Launch

A first-time visitor can, within roughly thirty seconds, understand what SOC Alliance does (the four pillars), see evidence it is active and trustworthy today, and find one clear next step relevant to them — whether that's donating, applying for a program, volunteering, or getting in touch. A returning donor or partner can find financial transparency information in one or two clicks. A person in crisis looking for mentoring support finds a warm, discoverable, confidential-feeling page rather than a bare external form link.
