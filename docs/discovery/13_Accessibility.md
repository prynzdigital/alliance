# 13 — Accessibility Requirements

**Standard:** WCAG 2.1 Level AA, as a hard build requirement, not an aspirational goal. This is appropriate both as general best practice and specifically because SOC Alliance serves a broad public community audience, including people in crisis (mentoring/violence-prevention program applicants) who cannot be allowed to hit unnecessary access barriers at the moment they're seeking help.

## Findings From the Current Site (from `03_Current_Website_Audit.md`)
Inconsistent alt text coverage (present and descriptive on some pages, absent on others); generic, non-identifying alt text on what should be individual board-member photos; at least one confirmed heading-hierarchy gap (a page using H3 as its effective top-level heading with no true H1); some interactive elements rendering with no clearly associated label text; and unconfirmed (needs in-browser verification) labeling on form fields. No skip-navigation or landmark structure was evident, though this could not be fully confirmed via automated text-based fetching.

## Accessibility Checklist for Development

### Color & Contrast
- [ ] All text/background color pairs meet WCAG AA contrast ratios (4.5:1 normal text, 3:1 large text/UI components) — validate every token pair in `11_Design_System.md` before implementation.
- [ ] Color is never the sole means of conveying information (e.g., pillar accent colors are paired with icons/labels, not color alone; form errors use icon + text, not just red).

### Keyboard Navigation
- [ ] Every interactive element (links, buttons, form fields, nav dropdowns, modal triggers) is reachable and operable via keyboard alone, in a logical tab order.
- [ ] A visible "Skip to main content" link is present as the first focusable element on every page.
- [ ] No keyboard traps; modals and mobile nav drawers can be closed via Escape and return focus to the triggering element.

### Focus States
- [ ] Every focusable element has a clearly visible focus indicator (not just the browser default suppressed with no replacement) meeting AA contrast requirements.

### Semantic HTML
- [ ] Proper use of `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`/`<article>` landmarks on every page.
- [ ] Exactly one `<h1>` per page; logical, non-skipping heading order (H1 → H2 → H3) — a direct fix to the confirmed current-site gap.
- [ ] Lists use `<ul>`/`<ol>`, tables (if any) use proper `<th>`/scope attributes.

### Forms
- [ ] Every input has a properly associated, visible `<label>` (not placeholder-only text) — directly resolving the unconfirmed/likely gap flagged in the current-site audit.
- [ ] Required fields are indicated both visually and programmatically (`aria-required`); errors are announced to screen readers (`aria-live` region or equivalent) and described in plain language, not just color.
- [ ] Sufficient touch target size (minimum 44×44px) for all form controls and buttons on mobile.

### Images & Media
- [ ] Every meaningful image has specific, descriptive alt text; purely decorative images use `alt=""`.
- [ ] Board/leadership photos are captioned with the actual person's name and role, not a generic scene description — both an accessibility fix and a trust fix (see `03_Current_Website_Audit.md`, Section 6).
- [ ] Any embedded video (if added) includes captions; any audio includes a transcript.

### Link Clarity
- [ ] No vague link text ("click here," "learn more" with no surrounding context readable out of order) — every link is meaningful when read by a screen reader out of page context, or is paired with an `aria-label` that provides that context.

### Navigation & Structure
- [ ] Consistent navigation and footer structure across all pages.
- [ ] Breadcrumbs on nested pages (per `11_Design_System.md`), marked up with proper `BreadcrumbList` semantics.
- [ ] Dropdown/mega-menu navigation is fully keyboard- and screen-reader-operable, not mouse/hover-only.

### Motion
- [ ] All animation (scroll reveals, transitions) respects `prefers-reduced-motion` and disables/simplifies accordingly.
- [ ] No auto-playing video, no content that flashes more than three times per second.

### Screen Reader Considerations
- [ ] Test primary user flows (homepage → donate, homepage → mentoring application, homepage → contact) with a real screen reader (VoiceOver or NVDA) before launch, not only an automated scanner.
- [ ] Dynamic content changes (form success/error messages, mobile nav open/close) are announced appropriately via ARIA live regions.

## Verification Before Launch
1. Automated scan (axe DevTools or WAVE) on every unique page template, with zero critical/serious errors.
2. Manual keyboard-only pass through every primary user journey identified in `04_User_Audience_Analysis.md`.
3. A screen-reader spot-check of the homepage, the Donate flow, and the Mentoring & Life Coaching page specifically, given its sensitive audience.
4. Color-contrast validation of the final, client-approved palette (see `11_Design_System.md`) before implementation, not after.
