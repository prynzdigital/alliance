# 14 — Technical Recommendations

## Scoping Context
Per `02_Organization_Research.md`, SOC Alliance is a genuinely small, volunteer-led organization (FY2024 revenue $82,682; all officers reporting $0 compensation). The technical architecture must optimize for **low ongoing cost, low maintenance burden, and ease of non-technical content updates** over enterprise-grade sophistication. Every recommendation below is evaluated against that constraint first.

## Evaluating StateNext Labs' Standard Stack for This Project

| Technology | Recommended for this project? | Reasoning |
|---|---|---|
| **Next.js (React, TypeScript)** | **Yes** | Strong fit: excellent SEO via server-side rendering/static generation (directly supports `12_SEO_Strategy.md`), fast performance out of the box, and a very common, well-supported stack — important for long-term maintainability by whichever developer/agency supports the site after launch. |
| **Tailwind CSS** | **Yes** | Speeds implementation of the design system in `11_Design_System.md` (spacing/color/typography tokens map directly to Tailwind config) and keeps the CSS footprint small, supporting the performance goals in `16_Performance_Strategy.md`. |
| **Framer Motion** | **Use sparingly, optional** | The design direction in `10_Design_Direction.md` deliberately calls for minimal, restrained animation. Framer Motion is fine for the few purposeful scroll-reveal/transition moments called for, but should not be used to justify heavier interaction patterns than the content needs — a lighter CSS-transition approach may suffice for most of the site and should be considered first. |
| **PostgreSQL / Neon** | **Not recommended as a required dependency** | This site's content model (pages, programs, news posts, events, board members) is well served by a headless CMS (see below) without needing a custom relational database. A database adds hosting cost and maintenance surface area disproportionate to this org's needs. **Exception:** if the redesign scope grows to include something genuinely transactional/relational — e.g., a searchable volunteer-opportunity database with sign-up tracking, or an internal donor CRM — Postgres/Neon becomes appropriate at that point, not before. |
| **Vercel** | **Yes** | Vercel's free/hobby or low-cost Pro tier comfortably fits a low-traffic nonprofit site, integrates natively with Next.js, and requires minimal DevOps — appropriate for an organization without dedicated technical staff. |

**Overall recommendation: proceed with Next.js + TypeScript + Tailwind CSS on Vercel, paired with a headless CMS (see below), and skip Framer Motion/Postgres unless a specific, justified need emerges during build.** This is the simplest architecture that reliably meets the client's actual needs — the guiding principle for this section per the project brief.

## CMS Approach & Content Model
A **headless CMS** (e.g., Sanity, or a comparably simple option StateNext Labs already has tooling around) is recommended over a custom database or a page-builder platform like the current Olive Street Design-managed site. This gives SOC Alliance's staff/volunteers a simple, non-technical editing interface for the content types that actually change over time, while keeping the front-end fast and fully controlled by the development team.

**Recommended content types:**
- **Page** (flexible sections, for About/Our Story, pillar pages, etc.)
- **Program** (pillar association, description, eligibility, application link/form, past-highlights relation)
- **News Post** (category: Event / Announcement / Program Update; status: Upcoming / Past — auto-derivable from date; date; body; optional event fields — location, ticket link)
- **Board Member** (name, title, photo, short bio)
- **Partner/Sponsor** (name, logo, link)
- **Site Settings** (contact info, social links, EIN, footer content)

## Forms & Intake
Given the audit finding that all current application flows route to disconnected external Google Forms, the redesign should implement forms natively within the Next.js site (using a lightweight forms/email service — e.g., Resend, or a simple serverless function posting to the client's email and/or a lightweight CRM/spreadsheet) so submissions are trackable and branded, without requiring a full CRM build-out unless the client specifically wants one. **Exception — legal pledge agreements:** the Monthly Pledge and Building Pledge Agreement forms should move to a dedicated e-signature platform (e.g., DocuSign, Dropbox Sign) rather than a native form, per the trust/legal concern raised in `03_Current_Website_Audit.md` (Weakness #4) — this is a case where adding a purpose-built third-party tool is the right call despite the general preference for consolidation.

## Donation Integration
Retain **Donorbox** as the payment processor (it is already in use, already trusted by the organization, and appropriate for this scale) but change the integration pattern from an off-site link to an **embedded, on-page widget** (Donorbox supports iframe embedding), paired with the trust-building copy specified in `08_Homepage_UX.md` and `15_Conversion_Strategy.md`. This directly resolves the audit's top-priority weakness without introducing a new payment processor or the compliance/PCI overhead of building custom payment handling.

## Email & Contact Handling
Route all form submissions through a transactional email service (e.g., Resend, Postmark) to the organization's existing `info@socalliance.org` inbox, with auto-reply confirmation messaging (mirroring, but improving on, the current "Thank you for contacting us" pattern). A differentiated intent selector (general / program application / media / volunteer / donor) on the Contact page, per `07_Recommended_Sitemap.md`, can route to the same inbox with a clear subject-line tag, avoiding the cost/complexity of separate inboxes for a small volunteer team.

## SEO Implementation
Next.js's built-in metadata API handles per-page titles/descriptions/Open Graph tags; a sitemap should be generated programmatically from the CMS content (resolving the current orphaned-page problem structurally, not just as a one-time fix) using `next-sitemap` or an equivalent. Structured data (schema.org `NonprofitOrganization`, `Event`, `BreadcrumbList`) is implemented as JSON-LD in page templates.

## Image Optimization
Next.js's built-in `<Image>` component (automatic responsive sizing, lazy loading, modern format serving) should be used site-wide, replacing the presumably unoptimized images on the current site. All photography should be sourced and sized appropriately at upload (see `16_Performance_Strategy.md`).

## Analytics
A privacy-respecting analytics tool (e.g., Vercel Analytics, Plausible, or Google Analytics 4 if the client already uses/prefers it) should be implemented from day one — the current site has no evident analytics, meaning the audit's "Success measure: conversion rate improves" language in `06_Strategy.md` has no baseline today. Establishing a baseline immediately post-launch is itself a project deliverable.

## Security
Standard modern web-app security practices: HTTPS enforced (via Vercel by default), form spam protection (honeypot fields and/or a lightweight CAPTCHA alternative such as Cloudflare Turnstile), no sensitive data (payment details, SSNs) ever handled directly by the site itself (Donorbox and the e-signature platform handle that), and dependency updates kept current. Given that this site will collect personal information via donation, pledge, and application forms, a clear Privacy Policy is required (see `19_Acceptance_Criteria.md`).

## Hosting & Domain
Continue using the existing `socalliance.org` domain; confirm current domain registrar/DNS access as part of project kickoff (see `17_Client_Questions.md`) since the current site is managed by an outside agency. Host on Vercel as noted above.

## What This Architecture Deliberately Avoids
No custom backend server, no relational database unless a specific future need justifies it, no heavy animation library dependency by default, no multiple redundant third-party form tools, and no over-built CRM/donor-management system at launch — all consistent with the brief's instruction to recommend the simplest architecture that can reliably meet this client's actual needs, not the most impressive one.
