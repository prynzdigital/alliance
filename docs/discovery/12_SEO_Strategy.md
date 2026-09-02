# 12 — SEO Strategy

## SEO Audit Summary (from `03_Current_Website_Audit.md`)
Titles and meta descriptions exist and are reasonably distinct on every page — a real positive to preserve. Against that: several URLs run 80–89 characters with redundant, auto-generated-looking phrasing; one live, linked page (`/apply-for-mentoring-life-coaching`) is missing entirely from `sitemap.xml`; heading hierarchy has confirmed gaps (at least one page appears to lack a true H1); no blog categories/tags exist to build topical internal linking; no structured data (schema.org) was found anywhere; and roughly nine months of content staleness works against freshness signals search engines use for re-crawl prioritization.

## Recommended SEO Strategy for the Redesign

### Titles, Meta Descriptions & Headings
Every page gets a unique, keyword-relevant title (ideally under ~60 characters) and meta description (under ~155 characters), written in plain language that matches how a real visitor would search (e.g., "SOC Alliance Talent Hunt Competition — Chicago High School Scholarships" rather than a generic label). Every page has exactly one H1, with a logical H2/H3 hierarchy beneath it — a hard build requirement, not a stylistic preference, since it also directly supports accessibility (see `13_Accessibility.md`).

### URL Structure
Adopt short, deliberate, hyphenated URLs matching the new IA in `07_Recommended_Sitemap.md` — e.g., `/programs/community` (replacing the 89-character Violence Prevention URL) and `/news/cook-county-grant-2024` (replacing the 88-character current slug). **301 redirects must be mapped from every existing indexed URL to its new destination** to preserve whatever existing search equity the current site has built, especially for the mentoring/violence-prevention pages, which serve a vulnerable audience that may already be linked from external referral sources (case workers, partner orgs).

### Sitemap & Robots
Regenerate `sitemap.xml` automatically from the CMS so no page can be orphaned the way the mentoring page currently is; keep `robots.txt` permissive (no reason found to block any current section) and pointing to the sitemap.

### Internal Linking
The News & Events restructure (categories: Events, Announcements/Press, Program Updates) and the pillar-page structure both create natural internal-linking opportunities that don't exist today (e.g., a Talent Hunt news post links to the evergreen Scholarship pillar page, which links back to relevant news).

### Image Alt Text
Every meaningful image gets specific, descriptive alt text — replacing the current inconsistent coverage and the particularly problematic pattern of generic "graduates throwing caps" alt text on what are meant to be individual board-member photos. Purely decorative images get empty `alt=""` per standard accessibility practice.

### Structured Data (Schema.org)
Implement `NonprofitOrganization` (or `Organization`) schema site-wide with name, logo, address, EIN if the client approves, and social profile links; `Event` schema on the Talent Hunt Competition and Mardi Gras Fundraiser pages (name, date, location, ticket/registration link); and `BreadcrumbList` schema on nested pages. None of this exists today per the audit.

### Open Graph & Social Sharing
Add Open Graph and Twitter Card meta tags site-wide (title, description, image) so links shared to Facebook — the org's one confirmed social channel — render with a proper preview image and description rather than a generic or missing card.

### Local & Community Search Opportunities
Based on verified organizational facts, realistic target keyword themes include: "Woodlawn Chicago nonprofit," "South Side Chicago community organization," "Chicago violence prevention program," "Fuller Park community programs," "Chicago high school scholarship competition," "Chicago youth mentoring firearm violence," and "Cook County community organizations." These are directional themes based on what SOC Alliance actually does and where it operates — not guaranteed rankings, and not a substitute for the client's own knowledge of how their community actually searches for them (a question worth asking directly, see `17_Client_Questions.md`).

### Program-Related Search Opportunities
The Talent Hunt Competition and the annual Mardi Gras Scholarship Fundraiser are both named, dated, recurring events with real external visibility (e.g., third-party ticketing listings) — each deserves its own evergreen, well-optimized page rather than living only in blog posts, since these are exactly the kind of named-entity searches ("SOC Alliance Talent Hunt," "Omega Mardi Gras Fundraiser Chicago") a well-structured page can reliably capture.

### Freshness & Content Cadence
A realistic, sustainable publishing cadence (see `06_Strategy.md`, Objective 4) is itself an SEO input, not just a UX one — search engines deprioritize re-crawling sites that rarely change. This does not require frequent output; even a modest, honest cadence (e.g., one update per month tied to real organizational activity) is a meaningful improvement over the current nine-month gap.

## What This Strategy Does Not Promise
No specific ranking position, traffic volume, or timeline is promised here — that would be an unrealistic claim for any SEO strategy, and especially for a small, low-budget local nonprofit competing in a general "nonprofit"/"community organization" search space. The measurable, controllable goals are: complete and accurate technical SEO fundamentals (titles, descriptions, headings, sitemap completeness, structured data), and content that is genuinely current and specific enough to be found by the people actually searching for what SOC Alliance offers.
