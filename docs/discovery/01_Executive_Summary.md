# 01 — Executive Summary
**Project:** SOC Alliance Website Redesign — Discovery, Audit & Strategic Blueprint
**Prepared by:** StateNext Labs
**Date:** August 24, 2026
**Phase:** Discovery / Strategy (pre-development). No code has been written and the live site has not been modified.

---

## What This Document Set Is

This is the strategic blueprint for the redesign of the SOC Alliance website (https://www.socalliance.org/). It is the product of three research streams — organizational research, a full page-by-page audit of the current site, and a benchmark study of eight comparable nonprofit websites — synthesized into a sitemap, homepage blueprint, content strategy, visual direction, design system, SEO/accessibility requirements, technical architecture, and a formal requirements document. The companion file `MASTER_BUILD_SPECIFICATION.md` condenses all of this into the single reference a development team (human or AI coding agent) should build from.

Every factual claim about SOC Alliance in this document set is labeled by source: **[VERIFIED-WEBSITE]** (found on socalliance.org), **[VERIFIED-EXTERNAL]** (found via an external, cited source such as ProPublica or GuideStar), or **[ASSUMPTION/INFERENCE]** (a reasoned inference, never presented as fact). Nothing about SOC Alliance's history, programs, finances, or people has been invented. Where the record is genuinely incomplete or contradictory, it is flagged in `20_Client_Input_Required.md` rather than guessed at.

## Who SOC Alliance Is, Briefly

SOC Alliance (Strengthening Our Community Alliance) is a small, volunteer-led 501(c)(3) nonprofit headquartered at 6615 S. Kenwood Ave. in the Woodlawn/Fuller Park area of Chicago's South Side. Its mission is "to uplift and improve the life of the community," organized around four pillars: **Scholarship, Economic Development, Community, and Health**. Its most visible programs are a Talent Hunt scholarship competition for Chicagoland high schoolers, a Strengthening Violence Prevention Initiative (SVPI) that employs violence interrupters and case managers, mentoring/life-coaching support for people affected by firearm violence, and an annual Mardi Gras Scholarship Fundraiser gala (now in its 21st year) co-hosted with the Sigma Omega Chapter of Omega Psi Phi Fraternity, Inc. Per its most recent Form 990-EZ (FY ending Oct 2024), SOC Alliance reported $82,682 in revenue and $175,938 in total assets — a genuinely small organization, run lean, with all officers reporting $0 compensation. Full detail is in `02_Organization_Research.md`.

## What's Wrong With the Current Site, Briefly

The current site is a small, dated, single-agency-managed website (built/managed by Olive + Ash / Olive Street Design) that undersells a credible, active, locally-embedded organization. The most consequential problems, in order of impact:

1. **The donation experience creates unnecessary hesitation.** Giving hands donors off to an unbranded `donorbox.org` link with no tax-deductibility, EIN, or security messaging anywhere nearby — exactly where first-time donors are most likely to abandon.
2. **The site reads as inactive.** No content has been published in roughly nine months as of this audit, and a "Mardi Gras 2026" donation category was still live on the Donate page months after that event had already occurred.
3. **There is no financial transparency anywhere** — no 990, no annual report, no visible EIN — which costs the organization larger, due-diligence-minded gifts and institutional/foundation trust.
4. **A five-year legally binding "Monthly Pledge" agreement is collected through what appears to be a plain HTML form**, with no confirmed e-signature platform, audit trail, or explanatory context about what the pledge funds.
5. **The Board of Directors — the organization's core credibility asset — has no real photos or bios**; every profile reuses the same generic stock "graduation caps" image, and it is duplicated in full on five different pages.
6. **There is no About/History page**, and the one founding claim on the site ("established in 1995") does not match the organization's 2015 IRS tax-exempt ruling year — a discrepancy that needs client clarification before any new About page is written.

The full audit, with fifteen prioritized weaknesses each framed as Problem → Why it matters → Recommended solution, is in `03_Current_Website_Audit.md`.

## What the Redesign Should Accomplish

The new site should do five things the current one does not: build immediate trust (financial transparency, real people, real photos), make the four pillars legible as the organization's core structure rather than a buried list, remove friction from every conversion path (donating, volunteering, applying, contacting), keep itself visibly current with a sustainable content workflow, and perform well on mobile, accessibility, and search — without over-engineering a platform sized for a sub-$100K annual budget and a volunteer-driven team. Full strategic objectives, ranked, are in `06_Strategy.md`.

## What Still Needs the Client

Ten items require direct confirmation from SOC Alliance before final content can be written — most importantly the organization's actual founding story (the site's "1995" claim conflicts with its 2015 IRS ruling year, and public nonprofit records suggest a possible link to a predecessor "Sigma Omega Foundation" entity under the same EIN, which is not stated anywhere on the current site), current board roster accuracy (the website and the most recent Form 990 disagree on two names/roles), the purpose of the "Building Pledge" capital ask, and any quantified program-outcome statistics beyond the one figure found ("$100,000+ in scholarships awarded" cumulatively via the Mardi Gras fundraiser). The complete list, with why each item matters to the redesign, is in `20_Client_Input_Required.md`.

## How to Use This Document Set

Documents `02` through `05` are the research base. Documents `06` through `19` are the strategy and specification built from that research. `MASTER_BUILD_SPECIFICATION.md` is the synthesized, single-source-of-truth version intended for a development team or AI coding agent to build from directly, without needing to re-read the full research set. `20_Client_Input_Required.md` is the punch list StateNext Labs should resolve with SOC Alliance before development begins in earnest.
