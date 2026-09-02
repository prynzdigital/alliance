# 03 — Current Website Audit
**Site audited:** https://www.socalliance.org/ · **Date:** August 24, 2026 · **Method:** read-only page-by-page fetch and analysis (no forms submitted, no logins attempted, nothing on the live site modified). Sixteen pages were audited directly, plus `sitemap.xml` and `robots.txt`. A follow-up pass with a real browser/Lighthouse/accessibility scanner is recommended before finalizing technical scope (see Section 8).

---

## 1. Sitemap & Navigation Structure

`robots.txt` allows all crawlers and points to `sitemap.xml`, which lists **25 URLs**. Global navigation (identical on every page) is a flat, eight-item horizontal menu: **Home | Community Involvement | Board of Directors | Donate | Contact | Blog | Violence Prevention | Pledges.** There are no breadcrumbs and no dropdown/mega-menu structure. The footer is identical site-wide: a contact block (email, phone, fax, address), a single Facebook link, a copyright line, and a design credit ("Created by Olive + Ash. Managed by Olive Street Design.").

**Indexing gap:** `/apply-for-mentoring-life-coaching` is linked prominently from the homepage but is missing from `sitemap.xml` entirely — a real, live, orphaned-from-search-index page, and notably the page whose entire purpose is reaching people in crisis.

## 2. Page-by-Page Findings

**Home (`/`)** — Title: "Community Development | Strengthening Our Community Alliance | Chicago." The H1 is the four-pillar tagline; mission/vision are stated in short blocks. The full Board of Directors list is duplicated on this page (names, titles, and the same repeated stock photo for every member). A long "Updates From The Alliance" feed mixes 2021–2025 content with no distinction between current and archived items. Primary CTAs: "SUBMIT A DONATION" / "DONATE TODAY" (→ /donate) and "LEARN MORE" (→ /community-involvement, /board-of-directors). No testimonials, no partner logos, no financial-transparency link.

**Donate (`/donate`)** — H2s for "General Donations" and **"Mardi Gras 2026"** — the latter still live as of this Aug 24, 2026 audit, months after that event. Donation platform is **Donorbox**, via an off-site link (`donorbox.org/general-donation-36`), not an embedded widget. No 501(c)(3)/EIN/tax-deductibility statement and no trust badging appear on the page itself. Body copy is a single generic sentence with no breakdown of what a gift funds.

**Community Involvement (`/community-involvement`)** — The strongest content page on the site: each of the four pillars is broken into concrete sub-programs. It also duplicates the full Board block and has no application/signup forms despite describing multiple joinable programs. Some images here do carry descriptive alt text — a positive exception to the rest of the site.

**Board of Directors (`/board-of-directors`)** — Nine people listed with name and title only; every "photo" is the same generic stock graduation-cap image. A possible name inconsistency was observed ("Dathon O'Banion" vs. "Dana O'Banion" across pages) that could not be resolved from content alone and should be verified directly with the client rather than treated as confirmed.

**Contact Us (`/contact-us`)** — A native contact form exists but field-level `<label>` usage could not be confirmed from the fetched markup (needs a DevTools check). No map embed despite the org being a physically-rooted, place-based organization. Full Board block duplicated again.

**Blog (`/blog`)** — Chronological list with pagination, but no categories/tags and no author bylines. The newest identifiable post is "Giving Tuesday on December 2nd" (published Nov 30, 2025) — roughly nine months stale as of this audit.

**Violence Prevention (`/learn-more-about-the-strengthening-violence-prevention-initiative`)** — An 89-character URL, the longest and least scannable on the site. Content is thin: essentially a job-application CTA (Area Violence Interrupter, Area Field Manager, Case Manager, Victim Services Facilitator roles) via an external Google Form, with no program description, partner detail, or eligibility criteria — surprisingly little substance for one of only eight top-level nav destinations.

**Pledges (`/pledges`)** — A bare landing stub: an H1 and two outbound links (/monthly-pledge, /building-pledge-agreement) with zero explanatory copy. A first-time visitor cannot tell what either option means before clicking into a legally worded form.

**Monthly Pledge (`/monthly-pledge`) & Building Pledge Agreement (`/building-pledge-agreement`)** — Both are five-year, Illinois-law-governed legal pledge agreements collected via what appears to be a plain native HTML form (Pledgor name, address, amount, email, phone, date, signature), with **no identifiable third-party e-signature platform**. Neither page explains the underlying capital project (scope, cost, timeline) before asking for a legal financial commitment.

**Apply for Mentoring & Life Coaching** — Loads correctly and is linked from the homepage but, as noted above, is absent from the sitemap. Applications route through an external Google Form.

**Individual blog posts reviewed** (Giving Tuesday 2025, 2025 Talent Hunt Competition, Cook County Starting Block Grant, Soft Skills Training) show a recurring pattern: events are described in forward-looking language and never revisited with a recap after the fact. One post (Soft Skills Training) showed a two-year discrepancy between its visible content date and its sitemap `lastmod`, and a name rendered two different ways ("Michele Releford" vs. "Michelle Relerford") — both flagged for manual, in-browser verification rather than asserted as fact.

## 3. Forms Inventory

| Form | Location | Platform |
|---|---|---|
| Contact form | /contact-us | Native site form |
| General donation | /donate | Donorbox (off-site handoff) |
| Monthly Pledge agreement | /monthly-pledge | Native form, no e-signature platform detected |
| Building Pledge agreement | /building-pledge-agreement | Native form, no e-signature platform detected |
| SVPI job application | /learn-more-about-the-strengthening-violence-prevention-initiative | Google Forms + a separate scheduling widget |
| Mentoring/Life Coaching application | /apply-for-mentoring-life-coaching | Google Forms |

**No newsletter/email signup exists anywhere on the site.**

## 4. Donation Experience Analysis

The donation experience is the single highest-priority fix. Giving is handled entirely by Donorbox via an off-site link rather than an embedded on-page widget. Only one clear donation "product" (General Donations) plus a stale event-specific campaign ("Mardi Gras 2026") were found. There is no tax-deductibility/EIN statement, no security or trust badging near the CTA, and no cross-linking between the main Donate page and the separate Pledge options — a visitor who only sees `/donate` has no way to know the pledge pathways exist.

## 5. Content Quality Issues

The homepage's "Updates" feed spans 2021–2025 with no archiving; no content newer than roughly November 2025 exists anywhere on the site; the "Mardi Gras 2026" donation category remained live months past the event; the full Board block is duplicated across at least five pages; the Pledges page and Building Pledge page both ask for a legal commitment with no explanatory context first; several blog posts read as perpetually "upcoming" even long after their events passed; and every program/board photo is the same generic stock image, repeated dozens of times, which undercuts authenticity for an organization whose core value proposition is being rooted in a specific community.

## 6. Accessibility Observations

*(Content-structure-level observations from fetched markup, not a full WCAG audit — a manual/automated scan with real assistive technology is recommended before redesign sign-off.)*

Alt text coverage is inconsistent — present and descriptive on some Community Involvement images, absent elsewhere. Where alt text exists on board photos, it describes a generic stock scene rather than identifying the actual person, which is both an accessibility and an authenticity gap. Heading hierarchy has real gaps (at least one blog post appears to use an H3 as its top-level heading with no true H1). Some interactive elements appeared to render with no visible label text in the fetched markup. Whether form fields use proper `<label>` associations versus placeholder-only text could not be confirmed and should be checked directly in-browser.

## 7. SEO Observations

Titles and meta descriptions exist and are reasonably distinct on every page checked — a genuine positive. URL structure is a significant weak point: several slugs are long, auto-generated-looking, and redundant (e.g., an 89-character Violence Prevention URL, an 88-character Cook County grant post URL containing filler like "web-post-of"). The mentoring application page is missing from the sitemap. No blog categories or tags exist, limiting topical internal linking. No structured data (Organization, NonprofitOrganization, or Event schema) was surfaced in any fetch. Combined with roughly nine months of content staleness, these factors work against freshness and relevance signals search engines use.

## 8. Technical & Platform Observations

The underlying platform could not be definitively confirmed via public markers — no Squarespace, Webflow, or Wix signatures were found; the clearest clue was assets served via a domain called `cdn-website.com`, suggestive of a smaller all-in-one website-builder product, but this is **not confirmed** and should be verified directly (View Source/DevTools, or by asking the agency of record) before finalizing a migration plan. The footer credits an active agency of record ("Olive + Ash" / "Olive Street Design"), meaning a handoff or migration conversation will be needed. The site depends on multiple off-site tools rather than native functionality — Donorbox for payments, Google Forms for every application/intake flow, and an unidentified scheduling widget for SVPI interviews. Page-load performance, true mobile responsiveness, and link integrity could not be measured through text-based fetching and should be assessed with Lighthouse/PageSpeed Insights and a link-checker crawl as a fast follow-up before finalizing technical scope.

## 9. Trust Signals — Present vs. Missing

**Present:** an explicit 501(c)(3) statement on the homepage, a named nine-person board, consistent contact information site-wide, and named funder/partner mentions within blog content (Cook County, Fuller Park Advisory Council, Kroc Center, Westside Justice Center, Sigma Omega Chapter).

**Missing:** any Form 990 or annual report link, a visible EIN, testimonials or participant stories, partner/funder **logos** (only text mentions), security/trust badging near the donation flow, and any quantified impact statistics anywhere on the site, including on the pillar pages where they would fit most naturally.

## 10. Prioritized Major Weaknesses

Each entry: **Problem → Why it matters → Recommended solution.**

1. **Donation flow hands donors off with no trust-building context.** *Why it matters:* the click-through to an unbranded third-party domain is the highest-anxiety moment in the giving journey; nothing reassures a first-time or older donor there. *Recommendation:* embed Donorbox on-page (it supports iframe embedding) or add explicit tax-deductibility, EIN, and security copy immediately around the CTA.

2. **The site reads as inactive.** *Why it matters:* nine months without new content, plus a stale event-specific donation category, erodes donor confidence and risks soliciting for an event that already happened. *Recommendation:* build a realistic content cadence into the redesign's CMS workflow, and auto-archive time-bound donation categories.

3. **No financial transparency anywhere.** *Why it matters:* serious donors and grant-making foundations actively look for a 990/annual report/EIN; its absence costs larger gifts and is inexpensive to fix. *Recommendation:* add a Financials/Transparency section with the latest 990, annual report, and EIN.

4. **A five-year binding pledge agreement runs through a plain web form with no confirmed e-signature platform.** *Why it matters:* this is a higher-stakes transaction than a simple donation, and lacks the audit trail (timestamp, IP, identity confirmation) a legal commitment of that weight should have. *Recommendation:* move to a proper e-signature platform, or reframe as a non-binding "intent to give," paired with real explanatory copy.

5. **Board of Directors has no real photos or bios.** *Why it matters:* for a trust-dependent local nonprofit, an anonymous-looking board section undercuts the exact credibility it exists to build. *Recommendation:* collect real headshots and short bios as part of the redesign's content-gathering process.

6. **The Board block is duplicated across at least five pages.** *Why it matters:* bloats every page, slows scanning, and dilutes page-specific SEO relevance. *Recommendation:* keep the full board only on its own page; link to it elsewhere instead of repeating it.

7. **Several key URLs are 80+ characters and auto-generated-looking.** *Why it matters:* hard to share, weak for SEO keyword focus. *Recommendation:* adopt a short, deliberate URL convention with 301 redirects from the old URLs to preserve existing search equity.

8. **The mentoring-application page is missing from the sitemap.** *Why it matters:* this page exists to reach people in crisis — exactly the audience that most needs to find it via search. *Recommendation:* audit sitemap generation to ensure completeness and auto-updating going forward.

9. **The Pledges and Building Pledge pages ask for a financial/legal commitment with no context first.** *Why it matters:* visitors cannot make an informed decision, which is both a trust and conversion barrier. *Recommendation:* add an "About this campaign" section (goals, scope, progress-to-date) before any pledge form.

10. **No newsletter/email capture exists anywhere.** *Why it matters:* email is typically a nonprofit's highest-ROI engagement channel; without it, every visitor not ready to give today is lost rather than nurtured. *Recommendation:* add a simple, integrated newsletter signup in the footer and/or homepage.

11. **Inconsistent alt text and heading hierarchy.** *Why it matters:* an unreliable screen-reader experience and a missed on-page SEO signal. *Recommendation:* enforce an accessibility content standard (alt text on every meaningful image, consistent H1→H2→H3) verified with an automated tool before launch.

12. **All application/intake flows route to generic external Google Forms.** *Why it matters:* breaks brand continuity at the exact moment someone commits to engaging, and offers none of the org's own tracking or follow-up automation. *Recommendation:* evaluate consolidating intake into the new site's own form system.

13. **No map embed on the Contact page.** *Why it matters:* a place-based organization should make its physical location as easy as possible to find. *Recommendation:* add an accessible embedded map to the redesigned Contact page.

14. **No blog categories/tags or author attribution.** *Why it matters:* makes it hard for a returning visitor, journalist, or funder to find "just the press releases" or "just the events." *Recommendation:* add a simple category taxonomy and byline field in the new CMS.

15. **Platform identity is unconfirmed and the site depends on an outside agency for management.** *Why it matters:* directly affects the redesign's migration path, hosting plan, and payment-integration approach. *Recommendation:* confirm the current CMS/hosting platform and admin access directly with the client or current agency before scoping build work — do not rely on inference from public markup alone.
