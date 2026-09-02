# 08 — Homepage UX Blueprint

The homepage is designed around the journey: **Who we are → What we do → Who we help → Our impact → How to participate → How to support us.** Every section below has a stated purpose; none are included merely because they are common on other sites. Sections marked *(pending client content)* depend on information listed in `20_Client_Input_Required.md` and should not launch with placeholder/invented statistics.

---

### 1. Header / Navigation
**Purpose:** orient every visitor immediately and make the four pillars and Donate CTA persistently accessible. **Audience:** all. **Content:** logo, primary nav (per `07_Recommended_Sitemap.md`), a persistent "Donate" button visually distinct from other nav items. **CTA:** Donate. **UX reasoning:** benchmark research shows Donate performing best when it's a persistent, visually distinct element (Chicago CRED, GAGDC), not buried in a dropdown.

### 2. Hero
**Purpose:** state, within seconds, who SOC Alliance is and what it stands for — leading with dignity and strength, not deficit framing. **Audience:** first-time visitors. **Content:** the mission statement (or a tightened version of it), a strong community photograph (real, not stock), and two CTAs — a primary "Donate" and a secondary "See Our Programs" or "Get Involved." **UX reasoning:** modeled on Chicago CRED's strengths-based opening; avoids leading with statistics or jargon before establishing tone.

### 3. Four Pillars Overview
**Purpose:** immediately establish the organization's structure and scope. **Audience:** all, especially program participants and partners trying to understand the org's full scope. **Content:** four cards (Scholarship, Economic Development, Community, Health), each with a short description, a simple icon/symbol, and a "Learn More" link into its pillar page. **CTA:** Learn More (per pillar). **UX reasoning:** directly modeled on GAGDC's pillar grid — the single most transferable pattern from the benchmark research, and the fix for the current site's "pillars mentioned once, buried mid-page" problem.

### 4. Impact Statistics *(pending client content)*
**Purpose:** give visitors fast, credible proof of scale and effectiveness. **Audience:** donors, partners, press. **Content:** three to five hard numbers (e.g., scholarships awarded, students mentored, years serving the community, Talent Hunt participants) — **only using figures SOC Alliance confirms**; the only verified figure found in research to date is "$100,000+ in scholarships awarded" cumulatively via the Mardi Gras Fundraiser. **CTA:** none required — this section supports, not replaces, the Donate CTA elsewhere. **UX reasoning:** every strong benchmark site (Chicago CRED, BBBS Chicago, charity: water, DonorsChoose, United Way) leads with a compact stat row; SOC Alliance's current site has none anywhere.

### 5. Featured Program / Community Story *(pending client content)*
**Purpose:** make the mission concrete through one real, named, photographed story (a Talent Hunt alumnus, scholarship recipient, or program participant who has consented to be featured). **Audience:** donors, general visitors. **Content:** a photo, name (with consent), a short quote or narrative, and a CTA tied directly to that story's pillar. **CTA:** Donate to [Pillar] / Learn About [Program]. **UX reasoning:** modeled on BBBS Chicago's pattern of pairing story with ask directly, which performs better than separating narrative from the giving CTA. Requires client-supplied, consented material — must not be fabricated.

### 6. Upcoming Events
**Purpose:** demonstrate current activity — directly countering the current site's "looks inactive" problem. **Audience:** community members, donors. **Content:** the next one to three real, dated events (e.g., the Mardi Gras Fundraiser, Giving Tuesday, Talent Hunt), each with a date and "Learn More/RSVP" link, and clear removal/archiving once the date passes. **CTA:** Learn More / RSVP / Buy Tickets. **UX reasoning:** this section only ever shows current, forward-looking content — the redesign's CMS should make stale content structurally difficult, not just a manual habit.

### 7. Trust & Transparency Strip
**Purpose:** surface credibility signals that are currently completely absent from the site. **Audience:** donors, partners, foundations. **Content:** a 501(c)(3)/EIN statement, a link to Financials & Transparency, and (once eligible) third-party badges (Charity Navigator, GuideStar). **CTA:** View Our Financials. **UX reasoning:** directly closes the single largest trust gap identified in the audit (Section 9 of `03_Current_Website_Audit.md`), and mirrors what every top-performing benchmark site does.

### 8. Partner & Collaborator Logos *(pending client confirmation of which partners may be publicly listed)*
**Purpose:** build trust through visible association with credible partners. **Audience:** donors, partners, press. **Content:** a simple logo row for confirmed partners (Cook County, IDHS, Fuller Park Advisory Council, Kroc Center, Westside Justice Center, Sigma Omega Chapter). **UX reasoning:** modeled on Chicago CRED and United Way; notably absent from every South Side peer site reviewed (IMAN, GAGDC), making it an easy differentiator for SOC Alliance.

### 9. How to Participate (Get Involved)
**Purpose:** give visitors who aren't ready to donate a lower-friction way to engage. **Audience:** volunteers, students/families, job seekers. **Content:** three short cards — Volunteer, Apply for a Program, Careers — each with a one-line description and a link. **CTA:** Get Involved. **UX reasoning:** the current site has no volunteer pathway at all; this section makes that new option visible from the homepage rather than buried in a submenu.

### 10. Donation CTA (Support Our Work)
**Purpose:** a clear, standalone giving moment near the end of the page for visitors who are ready to act after reading everything above. **Audience:** donors. **Content:** tax-deductibility/EIN reminder, one-time/monthly toggle, and a link to the full Donate page (or an embedded widget, per `14_Technical_Architecture.md`). **CTA:** Donate Now. **UX reasoning:** benchmark sites place at least one additional donate moment beyond the header/nav (Chicago CRED duplicates it mid-page); repetition without pressure improves conversion for visitors who scroll the full page before deciding.

### 11. Newsletter Signup
**Purpose:** capture visitors who are interested but not ready to give or apply today — currently a total gap on the existing site. **Audience:** all. **Content:** a simple email field with a one-line value statement ("Get updates on programs and events"). **CTA:** Subscribe. **UX reasoning:** email is typically a nonprofit's highest-ROI, lowest-cost re-engagement channel; this closes the single easiest content gap identified in the audit.

### 12. Footer
**Purpose:** provide wayfinding, compliance, and contact information consistently across the site. **Audience:** all. **Content:** condensed sitemap, contact info with embedded-map link, social icons, EIN/501(c)(3) line, Privacy Policy link, and a design/development credit line. **UX reasoning:** standard, expected pattern; no deviation needed here.

---

## Sections Deliberately Excluded

- **No auto-playing video or animation-heavy hero** — the design direction in `10_Design_Direction.md` explicitly favors restraint over visual trendiness, especially given SOC Alliance's serious subject matter (violence prevention, mentoring people in crisis).
- **No full duplicated Board of Directors block** — this is the current site's most-repeated content problem; the homepage instead links to the Leadership page.
- **No stock photography** where a real community photo is available or obtainable — see `10_Design_Direction.md` for the photography standard.
