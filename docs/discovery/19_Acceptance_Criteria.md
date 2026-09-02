# 19 — Acceptance Criteria

Measurable criteria the finished website must meet before launch sign-off.

## Responsive Behavior
- [ ] All pages render correctly with no horizontal scroll, overlapping content, or broken layout at all five breakpoints defined in `16_Performance_Strategy.md` (mobile, tablet, laptop, desktop, large desktop).
- [ ] All primary user journeys (donate, apply for a program, contact, volunteer sign-up) are fully completable on a real mobile device.

## Browser Compatibility
- [ ] Site functions correctly on the current and prior major version of Chrome, Safari, Firefox, and Edge, on both desktop and mobile.
- [ ] Graceful degradation (no broken functionality) on slightly older browser versions still in meaningful use.

## Accessibility
- [ ] Zero critical or serious errors on an automated scan (axe DevTools or WAVE) across every unique page template.
- [ ] Full keyboard-only navigation verified across all primary user journeys.
- [ ] Manual screen-reader spot-check completed on the homepage, Donate page, and Mentoring & Life Coaching page.
- [ ] All items in the `13_Accessibility.md` checklist verified complete.

## SEO
- [ ] Every page has a unique title and meta description.
- [ ] Every page has exactly one H1 and a logical heading hierarchy.
- [ ] `sitemap.xml` is auto-generated and includes 100% of live, indexable pages (no orphaned pages, resolving the current site's confirmed gap).
- [ ] 301 redirects verified working for every previously indexed URL.
- [ ] Structured data (`NonprofitOrganization`, `Event`, `BreadcrumbList`) validates with no errors via Google's Rich Results Test or equivalent.
- [ ] Open Graph tags render correctly when a page URL is shared on Facebook.

## Performance
- [ ] Lighthouse mobile performance score meets Core Web Vitals "Good" thresholds (LCP < 2.5s, INP < 200ms, CLS < 0.1) on the homepage, Donate page, and at least one program page.
- [ ] All images served in modern, responsively sized formats with lazy loading below the fold.

## Forms
- [ ] Every form (contact, donation, pledge, program application) submits successfully, shows a clear success state, and shows a clear, specific error state on invalid input.
- [ ] Every form field has a properly associated visible label.
- [ ] Spam protection (honeypot and/or Turnstile-equivalent) verified functional on all public forms.
- [ ] Pledge agreement forms route through the agreed e-signature platform (pending client decision per `17_Client_Questions.md`), not a plain native form.

## Navigation
- [ ] All primary and footer navigation links resolve correctly with no 404s.
- [ ] Mobile navigation drawer is fully keyboard- and screen-reader-operable.
- [ ] Breadcrumbs present and accurate on all pages nested more than one level deep.

## Content
- [ ] No placeholder or Lorem Ipsum text remains anywhere on the live site.
- [ ] No fabricated statistics, testimonials, dates, or claims are present — every factual statement traces to a source confirmed in this document set or supplied directly by the client.
- [ ] No stale, date-passed content (past events framed as upcoming, expired donation categories) is live at launch.
- [ ] All content from `09_Content_Strategy.md`'s migration plan has been accounted for (migrated, rewritten, or deliberately retired).

## Donation Functionality
- [ ] Embedded donation widget renders and functions correctly across all breakpoints and browsers.
- [ ] A real test transaction (per Donorbox's test/sandbox mode, if available, or a real nominal transaction refunded afterward) has been completed successfully before launch.
- [ ] Tax-deductibility/EIN messaging is present and accurate on the Donate page.

## Analytics
- [ ] Analytics implementation verified capturing real traffic and key events (donation clicks, form submissions) before launch.

## CMS
- [ ] At least one designated SOC Alliance staff/volunteer has been trained and has successfully published a test News post and edited a Program page independently, without developer assistance.

## Security
- [ ] Site is served exclusively over HTTPS.
- [ ] No sensitive data (payment info, signatures) is handled or stored directly by the site itself outside of the designated third-party processors (Donorbox, e-signature platform).
- [ ] Dependency/security audit (e.g., `npm audit`) shows no unresolved high/critical vulnerabilities at launch.

## Deployment
- [ ] Site is live on the production domain (socalliance.org) with DNS correctly configured.
- [ ] A documented rollback plan exists in case of a critical post-launch issue.
- [ ] Staging/preview environment remains available for post-launch content and design iteration.
