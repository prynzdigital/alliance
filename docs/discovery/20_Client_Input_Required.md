# 20 — Client Input Required

This is the consolidated punch list of everything in this document set that could not be verified from public sources and requires SOC Alliance's direct confirmation before final content can be written or specific claims published. Items are grouped by theme; each references where it's discussed in more depth elsewhere in this document set.

## Organizational History (Highest Priority — Sensitive)

1. **True founding story and year.** The current site states "established in 1995," but the organization's 501(c)(3) IRS ruling year is 2015 — a 20-year gap the site does not explain. *(`02_Organization_Research.md`, Section 1)*
2. **Relationship to "Sigma Omega Foundation."** Public nonprofit registries (GuideStar, CauseIQ) list the same EIN under the name "Sigma Omega Foundation," and the Sigma Omega Chapter of Omega Psi Phi Fraternity's own website describes a decade-long partnership with that Foundation on Chicago scholarships. This is an inference from external records, never stated on socalliance.org, and **must not be presented as confirmed organizational history without explicit client sign-off.** *(`02_Organization_Research.md`, Section 1)*

## Leadership & Governance

3. **Accurate current Board roster and titles.** The website and the most recent Form 990 disagree: a director (John Moore) appears on the 990 but not the website; the website lists Bruce Nash as Treasurer while the 990 lists Gerald McCarthy as Treasurer. Ronald Hughes's title also appears inconsistently (Executive Director vs. "Director of Community Partnerships"). **UPDATE (2026-08-31):** per the client's direction, `/about/leadership-board` has been published using the live site's current roster (8 people) with a visible on-page note disclosing the Form 990 discrepancy. Still needs a final client confirmation to remove that caveat. *(`02_Organization_Research.md`, Section 4)*
4. **Board member bios and headshots** — real individual headshots exist on the live Board of Directors page (superseding the original "generic stock photo" finding) and have been downloaded and published on `/about/leadership-board` (see `docs/assets/board-photos/README.md`). Bios still don't exist and none have been fabricated. *(`03_Current_Website_Audit.md`, Weakness #5; `02_Organization_Research.md`, Addendum)*

## Programs & Content

5. ~~**Service area / eligibility.**~~ **RESOLVED (2026-08-31, client-supplied):** SOC Alliance provides scholarships and community services to "the Woodlawn Community and greater Chicago," and operates out of its own Woodlawn facility for meetings and community service programs. Published on `/about/our-story`. *(`02_Organization_Research.md`, Section 3)*
6. **Purpose of the "Building Pledge Agreement."** The underlying capital project (scope, cost, timeline) is never explained on the current site. *(`02_Organization_Research.md`, Section 6)*
7. **Quantified program-outcome statistics.** Only one public figure was found ("$100,000+ in scholarships awarded" cumulatively via the Mardi Gras Fundraiser). No figures exist for annual scholarships awarded, mentees served, jobs created, or health-program reach — all would substantially strengthen the redesigned homepage and program pages, but none should be published without client confirmation. *(`02_Organization_Research.md`, Section 10; `08_Homepage_UX.md`, Section 4)*
8. **Exact Cook County Starting Block Grant award amount** — not published by either SOC Alliance or Cook County in sources reviewed. *(`02_Organization_Research.md`, Section 2)*
9. **Confirmation of informal partnerships** not found in public sources (e.g., University of Chicago, Chicago Public Schools). *(`02_Organization_Research.md`, Section 5)*
10. **Which named partners may be publicly listed with logos** (Cook County, IDHS, Fuller Park Advisory Council, Kroc Center, Westside Justice Center, Sigma Omega Chapter). *(`08_Homepage_UX.md`, Section 8)*

## Financial & Legal

11. **Permission to publish the most recent Form 990/annual-report summary** on a new Financials & Transparency page. *(`07_Recommended_Sitemap.md`)*
12. **Privacy Policy requirements** — none appear to exist on the current site; needed given the forms the redesign will add. *(`19_Acceptance_Criteria.md`)*
13. **Decision on an e-signature platform** for the Monthly Pledge / Building Pledge agreements, and who will manage that account. *(`03_Current_Website_Audit.md`, Weakness #4)*

## Social & Digital Presence

14. **Confirmation of all active social media channels** — Facebook and, as of a 2026-08-30 live-site check, a LinkedIn company page were found linked; actual post content/engagement could not be retrieved without login access, and other channels (Instagram, X/Twitter, YouTube, TikTok) are still unconfirmed. *(`02_Organization_Research.md`, Section 9 & Addendum)*

## Technical & Access

15. **Domain registrar/DNS access** for socalliance.org.
16. **Confirmation of current CMS/hosting platform** and a handoff conversation with the current agency (Olive + Ash / Olive Street Design). *(`03_Current_Website_Audit.md`, Weakness #15; `14_Technical_Architecture.md`)*
17. **Donorbox account access** to configure an embedded donation widget. *(`14_Technical_Architecture.md`)*
18. ~~**Existing brand guidelines, logo files, or color preferences**~~ **RESOLVED (2026-08-30):** logo files were supplied directly and verified against the live site — they match exactly. Brand colors have been derived from the logo by pixel sampling (see `11_Design_System.md` implementation). *(`10_Design_Direction.md`)*

## Content Production

19. **Existing photography** of programs, events, and board members, or agreement to scope a dedicated photography session. *(`10_Design_Direction.md`)*
20. **Consented, named participant stories** for the homepage/program story sections — none currently exist publicly and none should be fabricated. *(`08_Homepage_UX.md`, Section 5)*
21. **Current volunteer opportunities** to populate a new Volunteer page — no current page or list exists. *(`04_User_Audience_Analysis.md`, Journey D)*

## Administrative (Low Priority, Not a Redesign Blocker)

22. **NTEE classification discrepancy** — the organization's IRS filing category is listed as both general community-improvement and, separately, "Student Sororities, Fraternities" (B83). Worth a client conversation but not a website redesign issue. *(`02_Organization_Research.md`, Section 10)*

---

**How to use this list:** StateNext Labs should walk through items 1–18 with SOC Alliance before final content is written for the About, Leadership, Financials, and Donate pages specifically, since those pages depend most directly on unresolved items above. Items 19–21 can be scoped as part of a content-production phase running in parallel with development. Item 22 can be raised opportunistically and does not block the project.
