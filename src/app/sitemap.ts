import type { MetadataRoute } from "next";
import { footerLegal, primaryNav } from "@/lib/navigation";

const SITE_URL = "https://socalliance.org";

// Public pages that aren't reachable from primaryNav or footerLegal. Add any
// new (site) route here if it doesn't get a nav entry.
const unlistedPages: string[] = [];

// Every public page under src/app/(site), derived from the nav so a new nav
// entry lands in the sitemap automatically. Anchors are stripped and
// duplicates dropped (several nav items point at sections of one page). The
// mentoring/violence-prevention page must stay in here — see CLAUDE.md.
export default function sitemap(): MetadataRoute.Sitemap {
  const hrefs = [
    ...primaryNav.flatMap((section) => [section.href, ...(section.children ?? []).map((c) => c.href)]),
    ...footerLegal.map((link) => link.href),
    ...unlistedPages,
  ];
  const paths = [...new Set(hrefs.map((href) => href.split("#")[0]))];

  return paths.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    changeFrequency: path === "/news-events" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/privacy-policy" ? 0.3 : 0.7,
  }));
}
