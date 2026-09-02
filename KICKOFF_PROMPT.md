# First Prompt to Paste Into Claude Code

Use this once `CLAUDE.md` and the `docs/discovery/` folder are sitting in your empty project repo, and you've run `claude` inside it.

---

Read CLAUDE.md and docs/discovery/MASTER_BUILD_SPECIFICATION.md in full before doing anything else.

Then scaffold a new Next.js (App Router) + TypeScript + Tailwind CSS project in this repo, configured for Vercel deployment. Set up the Tailwind theme using the design tokens in docs/discovery/11_Design_System.md (colors, typography scale, spacing, border radius). Build the global layout: header/nav (with the sitemap structure from CLAUDE.md), footer, and the base page shell — no page content yet. Use placeholder/lorem content only inside clearly marked TODO comments, never as shipped copy.

Stop after the scaffold and layout are working (`npm run dev` renders a blank-but-styled shell with working nav) and show me what you built before moving on to individual pages.

---

**After that checkpoint**, natural next prompts (one at a time, reviewing each before moving on):
1. "Build the Homepage per docs/discovery/08_Homepage_UX.md, using only content I've confirmed — flag anything still pending."
2. "Build the Our Programs section (pillar landing + four sub-pages) per docs/discovery/07_Recommended_Sitemap.md."
3. "Build the Donate page with an embedded Donorbox widget per docs/discovery/14_Technical_Architecture.md and docs/discovery/15_Conversion_Strategy.md."
4. "Build Contact, Get Involved, and News & Events."
5. "Run through docs/discovery/13_Accessibility.md and docs/discovery/19_Acceptance_Criteria.md and fix anything failing."

Keep each session scoped to one or two pages/features so you can review as you go rather than getting a huge diff at the end.
