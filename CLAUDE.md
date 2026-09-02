# SOC Alliance Website Redesign — Project Instructions

You are building the redesigned website for **SOC Alliance** (Strengthening Our Community Alliance), a small 501(c)(3) nonprofit in the Woodlawn/Fuller Park area of Chicago's South Side. This project is being delivered by **StateNext Labs**. A full discovery, audit, and strategy phase is already complete — do not redo that research. Your job starts at implementation.

**Read `docs/discovery/MASTER_BUILD_SPECIFICATION.md` in full before writing any code.** It is the single source of truth for scope, sitemap, page requirements, design system, and technical architecture. The `docs/discovery/01`–`20` files it references are the underlying research if you need more depth or a citation on any specific claim (e.g., `02_Organization_Research.md` for verified org facts, `03_Current_Website_Audit.md` for what's wrong with the current site, `11_Design_System.md` for exact design tokens).

## The One Rule That Matters Most

**Never invent facts, statistics, testimonials, names, dates, or organizational claims about SOC Alliance.** Every one of these has already been sorted into three buckets in the discovery docs: verified-from-website, verified-external (cited), or pending client confirmation. If you need copy for something that falls in the "pending" bucket — see `docs/discovery/20_Client_Input_Required.md` for the full list — use an obvious, clearly-marked placeholder (e.g., `[PENDING CLIENT: board bio]`) and flag it back to the user in your response. Do not write a plausible-sounding number or quote to fill a gap. This matters even more than usual here: two board-roster discrepancies and a founding-date/history question are still unresolved with the client (see the Client Alignment section below).

## Tech Stack

- **Framework:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS, configured with the design tokens in `docs/discovery/11_Design_System.md`
- **CMS:** Headless CMS (content model in `docs/discovery/14_Technical_Architecture.md`) — confirm which specific provider with the user before wiring it up; don't assume one
- **Hosting:** Vercel
- **Animation:** plain CSS transitions by default; reach for Framer Motion only for the few purposeful moments the design direction calls for — don't default to it
- **No database (Postgres/Neon) unless a specific relational/transactional need emerges** — the CMS covers the content model. Don't add one speculatively.
- **Forms:** native Next.js forms + a transactional email service (e.g., Resend) for contact/volunteer/application intake. **Exception:** the Monthly Pledge / Building Pledge agreements are a legal commitment and should route through a proper e-signature platform, not a native form — confirm the platform with the user first.
- **Donations:** Donorbox, **embedded on-page** (not linked off-site — this is the #1 fix from the audit, don't regress to the old off-site-link pattern).
- **Images:** Next.js `<Image>` component everywhere; no unoptimized `<img>` tags.

Full stack rationale and what to avoid over-engineering: `docs/discovery/14_Technical_Architecture.md`.

## Sitemap (build to this — don't reproduce the old flat 8-item nav)

```
Home
About → Our Story, Leadership & Board, Financials & Transparency
Our Programs → Scholarship, Economic Development, Community, Health
Get Involved → Volunteer, Careers, Partner With Us, Mentoring & Life Coaching
News & Events
Donate → Give Once/Monthly, Mardi Gras Scholarship Fundraiser, Pledge a Gift
Contact
```
Full page-by-page purpose/audience/CTA/content spec: `docs/discovery/07_Recommended_Sitemap.md`. Homepage section-by-section blueprint: `docs/discovery/08_Homepage_UX.md`.

## Non-Negotiable Requirements

- **Mobile-first, responsive** at all breakpoints (`docs/discovery/16_Performance_Strategy.md`).
- **WCAG 2.1 AA accessibility** — this is a hard requirement, not a nice-to-have. Full checklist: `docs/discovery/13_Accessibility.md`. Every image needs real alt text, every form field needs a visible `<label>`, one true `<h1>` per page, visible focus states, keyboard-operable nav.
- **The mentoring/violence-prevention pages must be in the sitemap and properly indexed** — the current live site has a page like this missing from its sitemap, which was flagged as a real problem given who that page serves. Don't repeat that bug.
- **301 redirects from every URL on the old site to its new equivalent** — see the URL mapping implied in `docs/discovery/12_SEO_Strategy.md` and the migration table in `docs/discovery/09_Content_Strategy.md`.
- **No stale content patterns** — anything date-bound (events, donation campaigns) needs a status derived from its date, not manually maintained. This was one of the current site's biggest problems.
- **No duplicated Board-of-Directors block plastered across five pages** — it lives on one Leadership page; other pages link to it.
- Full acceptance checklist before calling anything "done": `docs/discovery/19_Acceptance_Criteria.md`.

## Client Alignment — Check Before You Build These Specific Pages

Do not write final copy for **About/Our Story**, **Leadership & Board**, or **Financials & Transparency** until the user confirms these are resolved (full list: `docs/discovery/20_Client_Input_Required.md`):
1. The site's old "established in 1995" claim conflicts with the 2015 IRS tax-exempt ruling year, and there's an unconfirmed possible link to a predecessor entity called "Sigma Omega Foundation." Do not publish either claim without explicit sign-off.
2. Board roster/titles — the old site and the most recent Form 990 disagreed on two points.
3. Board bios/headshots, service-area definition, Building Pledge project details, and quantified program stats are all still pending.

If the user hasn't provided this yet, build those three pages with clearly labeled placeholder sections and move on to everything else — don't block the whole project on it.

## Recommended Build Order

Follow the phases in `docs/discovery/MASTER_BUILD_SPECIFICATION.md`, Section 20: project scaffold + design system → Home/About/Programs/Contact with confirmed content → Donate (embedded) + Pledge + Get Involved → News & Events hub → QA against the acceptance checklist → launch.

## Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npm run typecheck`

## When You're Unsure

If a design, content, or technical decision isn't covered in `docs/discovery/`, or a client-input item is still open, stop and ask the user rather than guessing — especially for anything that would present a fact about SOC Alliance as true.
