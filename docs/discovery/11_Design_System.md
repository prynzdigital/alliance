# 11 — Preliminary Design System

This is a starting proposal for the development team, consistent with the direction in `10_Design_Direction.md`. Treat all values below as a strong starting point for client review, not final locked brand values — confirm against any existing SOC Alliance brand assets before implementation (see `17_Client_Questions.md`). All color pairs must be validated for WCAG AA contrast before final sign-off (see `13_Accessibility.md`).

## Typography

**Recommended font family:** a single geometric/humanist sans-serif such as **Inter** (or a comparable open-source alternative — Source Sans 3, Public Sans) for both headings and body copy, loaded via a performant web-font strategy (`font-display: swap`, subset to needed weights). This keeps the system simple, highly legible on mobile, and free to license and self-host, which matters for a lean-budget organization.

| Role | Size (desktop / mobile) | Weight | Notes |
|---|---|---|---|
| H1 | 48px / 32px | 700 (Bold) | Hero headlines, page titles |
| H2 | 34px / 26px | 700 (Bold) | Major section headers |
| H3 | 24px / 20px | 600 (Semibold) | Card titles, subsection headers |
| Body | 17px / 16px | 400 (Regular) | Line height 1.6 for readability |
| Small / Caption | 14px / 13px | 400–500 | Metadata, captions, footnotes |

## Color

| Token | Suggested Value | Usage |
|---|---|---|
| `--color-primary` | `#1E4D3A` (deep community green) | Primary buttons, key brand moments |
| `--color-secondary` | `#C9A227` (warm gold) | Accents, highlights, Mardi Gras/celebratory contexts |
| `--color-accent` | `#B23A2E` (warm terracotta red) | Urgent CTAs (Donate), used sparingly |
| `--color-background` | `#FFFFFF` | Page background |
| `--color-surface` | `#F6F4EF` (warm off-white) | Card backgrounds, section alternation |
| `--color-text` | `#1A1A1A` | Primary body text |
| `--color-text-muted` | `#5A5A5A` | Secondary/meta text |
| `--color-success` | `#2E7D4F` | Form success states |
| `--color-error` | `#B3261E` | Form error states |
| Pillar accent — Scholarship | `#2E5EAA` (blue) | Pillar-specific tinting |
| Pillar accent — Economic Development | `#C9A227` (gold) | Pillar-specific tinting |
| Pillar accent — Community | `#B23A2E` (terracotta) | Pillar-specific tinting |
| Pillar accent — Health | `#1E4D3A` (green) | Pillar-specific tinting |

*(Exact hex values should be finalized once real brand assets or client color preferences are reviewed — see `10_Design_Direction.md`.)*

## Spacing & Layout
- 8px base spacing unit; section vertical padding of 64–96px desktop / 40–56px mobile.
- Max content width ~1200–1280px, with a 24px mobile gutter.
- Border radius: 8px for buttons/inputs, 12–16px for cards.

## Components

| Component | Key states / notes |
|---|---|
| **Navbar** | Sticky on scroll; desktop dropdown for "Our Programs"; mobile drawer with accessible open/close and focus trapping |
| **Footer** | Multi-column: sitemap, contact + map link, social, newsletter signup, EIN/501(c)(3) line |
| **Hero** | Headline, subhead, dual CTA, background image with accessible text-contrast overlay |
| **CTA Banner** | Full-width, single message + button, used for Donate/Volunteer moments mid-page |
| **Button (Primary / Secondary / Ghost)** | Min 44×44px touch target; visible focus ring; disabled state |
| **Pillar Card** | Icon, title, 1–2 sentence description, "Learn More" link; pillar-accent color border/top-bar |
| **Program/Event Card** | Image, title, date (for events), short description, status badge (Upcoming/Past) |
| **Impact Statistic Tile** | Large number, short label, "as of [date]" microcopy to avoid implying real-time/unverified data |
| **Testimonial / Story Card** | Photo, name (with consent), quote or short narrative, linked pillar tag |
| **Leadership Card** | Real photo, name, title, short bio, optional LinkedIn/contact link |
| **News Card** | Category tag (Event/Announcement/Program), title, date, excerpt, thumbnail |
| **Form (generic)** | Labeled fields (visible `<label>`, not placeholder-only), inline validation, clear success/error states, honeypot/spam protection |
| **Donation Section** | One-time/monthly toggle, suggested amounts, tax-deductibility/EIN microcopy, security assurance line |
| **Breadcrumbs** | Used on all pages nested more than one level deep (e.g., Our Programs → Scholarship) |
| **Alert / Banner** | Site-wide notice pattern (e.g., "Applications for the 2027 Talent Hunt are now open") — dismissible, non-blocking |
| **Modal** | Used sparingly (e.g., image lightbox for event photos); must trap focus and be closable via Escape/keyboard |
| **Partner Logo Row** | Grayscale-to-color hover treatment, consistent sizing regardless of source logo aspect ratio |
