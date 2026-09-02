# 07 — Recommended Sitemap

This information architecture is designed around the user needs identified in `04_User_Audience_Analysis.md` and the strategic objectives in `06_Strategy.md` — it is not a reproduction of the current eight-item flat navigation. It organizes the site around the four pillars as the primary navigational spine (per the benchmark pattern in `05_Competitor_Analysis.md`), separates "give me money" from "give me time" from "help me," and gives credibility-building content (About, Leadership, Financials) equal prominence to program content, matching what serious donors and partners look for.

## Primary Navigation

```
Home
About
  ├─ Our Story  (mission, vision, history — pending client confirmation, see Client Input Required)
  ├─ Leadership & Board
  └─ Financials & Transparency
Our Programs
  ├─ Scholarship         (incl. Talent Hunt Competition)
  ├─ Economic Development
  ├─ Community            (incl. Violence Prevention / SVPI)
  └─ Health
Get Involved
  ├─ Volunteer
  ├─ Careers (SVPI & other roles)
  ├─ Partner With Us (businesses, sponsors, community orgs)
  └─ Mentoring & Life Coaching (apply / request support)
News & Events
Donate
  ├─ Give Once / Monthly
  ├─ Mardi Gras Scholarship Fundraiser
  └─ Pledge a Gift (Monthly Pledge / Building Fund)
Contact
```

Footer navigation mirrors the above at a summary level, plus: Privacy Policy, social links, EIN/501(c)(3) statement, and the current design/dev credit line (or its successor after this redesign).

## Page-by-Page Rationale

### Home
**Purpose:** communicate who SOC Alliance is, what it does, and give every audience type a fast path to their next step. **Primary audience:** all — first-time visitors especially. **Primary CTA:** Donate (with Volunteer and Learn About Our Programs as strong secondary CTAs). **Key content:** mission statement, four-pillar overview, current impact numbers (once confirmed by the client), a spotlighted program story, upcoming events, a donation CTA, partner logos, newsletter signup. Full section-by-section blueprint in `08_Homepage_UX.md`.

### About → Our Story
**Purpose:** establish organizational credibility and history. **Primary audience:** donors, partners, press, general visitors. **Primary CTA:** Meet Our Leadership. **Key content:** mission/vision, founding history (pending client confirmation — see `20_Client_Input_Required.md`), the four-pillar framework explained, service area. This page does not exist today and is one of the highest-value additions in this redesign.

### About → Leadership & Board
**Purpose:** humanize and credential the organization's leadership. **Primary audience:** donors, partners, press. **Primary CTA:** Contact Us / Partner With Us. **Key content:** real photos and short bios for each board member and the Executive Director (replacing the current all-identical stock-photo pattern), corrected/confirmed titles and roster (see board discrepancies flagged in `02_Organization_Research.md`).

### About → Financials & Transparency
**Purpose:** close the single largest trust gap identified in the audit. **Primary audience:** donors, foundations/grant-makers, due-diligence-minded visitors. **Primary CTA:** Donate. **Key content:** most recent Form 990/990-EZ (linkable PDF), a plain-language summary of revenue/expenses, EIN, and (once eligible) third-party ratings such as Charity Navigator or GuideStar. This page does not exist today.

### Our Programs (pillar landing + four sub-pages)
**Purpose:** make the four pillars the site's organizing structure, each with enough substance to stand alone. **Primary audience:** program participants, students/families, partners. **Primary CTA:** varies by pillar (Apply / Learn More / Donate to this pillar). **Key content per pillar page:** a plain-language description of the pillar, the specific named programs under it (mentoring, tutoring, Talent Hunt, financial literacy, SVPI, food security, etc.), eligibility/how to get involved, and — where available — a named participant story. The **Scholarship** pillar page houses an evergreen Talent Hunt Competition section (current-year dates, eligibility, prize structure, and a past-winners showcase) rather than only past-event blog recaps. The **Community** pillar page houses the Violence Prevention/SVPI content, rewritten with real program description (not just a job posting) plus a clearly separated careers sub-section.

### Get Involved → Volunteer
**Purpose:** close the current complete gap in volunteer pathways. **Primary audience:** prospective volunteers. **Primary CTA:** Sign up. **Key content:** specific, current volunteer opportunities by pillar and time commitment, any requirements (e.g., background checks for youth-facing roles), a simple sign-up form. This page does not exist today.

### Get Involved → Careers
**Purpose:** present SVPI and other open roles clearly and professionally. **Primary audience:** job seekers. **Primary CTA:** Apply. **Key content:** real role descriptions, qualifications, and (if the client is willing to publish it) compensation ranges — replacing the current thin, application-only page.

### Get Involved → Partner With Us
**Purpose:** give businesses, sponsors, and institutional partners a year-round path (not just Mardi Gras-specific). **Primary audience:** businesses, community/institutional partners. **Primary CTA:** Contact / Become a Sponsor. **Key content:** sponsorship tiers, in-kind partnership options, and a logo wall of current partners (Cook County, IDHS, Fuller Park Advisory Council, Kroc Center, Westside Justice Center, Sigma Omega Chapter, pending each partner's confirmation to be publicly listed).

### Get Involved → Mentoring & Life Coaching
**Purpose:** serve the site's most sensitive audience — people affected by firearm violence seeking support — with warmth, clarity, and discoverability. **Primary audience:** program participants in crisis, referring case workers/community members. **Primary CTA:** Reach out (form + direct phone option). **Key content:** plain-language program description, confidentiality assurance, what happens after someone reaches out, and a direct phone/text option alongside any form. This page must be included in the sitemap and properly indexed — a direct fix to the orphaned-page issue found in the audit.

### News & Events
**Purpose:** replace the current undifferentiated blog with a structured, current, and easy-to-scan hub. **Primary audience:** community members, donors, press. **Primary CTA:** varies by post (Donate, RSVP, Apply). **Key content:** categorized posts (Events, Announcements/Press, Program Updates), clear date/status labeling (Upcoming vs. Past), event-specific pages for recurring flagship events (Talent Hunt, Mardi Gras Fundraiser, Giving Tuesday) that persist and update year over year rather than being replaced by a new post each year.

### Donate
**Purpose:** convert intent to give into a completed, trust-confident gift. **Primary audience:** donors. **Primary CTA:** Give Now. **Key content:** 501(c)(3)/EIN and tax-deductibility statement immediately visible, one-time/monthly toggle, gift-to-outcome framing (e.g., "$X funds one Talent Hunt scholarship application"), and clear cross-links to the Mardi Gras Fundraiser and Pledge options so a visitor discovers all giving pathways from one place — fixing the current disconnected structure. Full donation-UX detail in `15_Conversion_Strategy.md`.

### Donate → Pledge a Gift
**Purpose:** present the Monthly Pledge and Building Fund options with the explanatory context they currently lack. **Primary audience:** committed/major donors. **Primary CTA:** Start a Pledge. **Key content:** plain-language explanation of what each pledge type is and funds (the Building Fund's underlying capital project needs client confirmation — see `20_Client_Input_Required.md`), moved to a proper e-signature platform per the audit's recommendation.

### Contact
**Purpose:** route inquiries to the right response quickly. **Primary audience:** all. **Primary CTA:** Send a message (with intent selector: general, program application, media, volunteer, donor/partnership). **Key content:** address with an embedded map (missing today), phone, email, a differentiated contact form, and social links.

## Pages Deliberately Not Carried Forward As-Is

- The current flat `/pledges` stub is absorbed into `Donate → Pledge a Gift` with real explanatory content added.
- The current undifferentiated `/blog` becomes the structured `News & Events` hub with categories.
- Standalone past-event posts (e.g., individual Mardi Gras or Talent Hunt year-recaps) move under their evergreen program pages as a "past highlights" section, rather than existing only as one-off blog posts that go stale.

## Additional Pages to Consider (pending client priorities)
- **Press/Media Kit** — if SOC Alliance wants to make it easier for journalists or grant-makers to cover/cite the organization (logo files, boilerplate description, media contact).
- **FAQ** — a natural home for eligibility questions across programs, especially for the Scholarship and Mentoring pages, once the client confirms common questions they field.
- **Privacy Policy** — required for any site collecting personal data through donation, pledge, or application forms; currently not confirmed to exist (see `19_Acceptance_Criteria.md`).
