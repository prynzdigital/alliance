import "server-only";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { databaseMode, sql } from "@/lib/server/db";
import { defaultEvents, PILLAR_IMAGE, PILLAR_NEON, type EventPillar, type SocEvent } from "@/lib/events";
import {
  defaultBoard,
  defaultCareerRoles,
  defaultPartners,
  defaultStories,
  type BoardMember,
  type CareerRole,
  type CommunityStory,
  type Partner,
} from "./defaults";
import { DEFAULT_SETTINGS, SETTING_KEYS, type SiteSettings } from "./settings";

// Every public read of CMS content goes through here. Results are cached
// (tag "cms") and refreshed whenever an admin saves a change, plus at least
// hourly so date-derived statuses never go stale. If the database is missing
// or unreachable, the built-in defaults are served instead of an empty page.
export const CMS_TAG = "cms";

function cmsQuery<T>(key: string, load: () => Promise<T>, fallback: T): () => Promise<T> {
  const cachedLoad = unstable_cache(load, ["cms", key], { tags: [CMS_TAG], revalidate: 3600 });
  return cache(async () => {
    if (databaseMode() === "none") return fallback;
    try {
      return await cachedLoad();
    } catch (err) {
      console.error(`CMS read "${key}" failed, serving built-in defaults:`, err);
      return fallback;
    }
  });
}

const PILLARS = Object.keys(PILLAR_NEON) as EventPillar[];

type EventRow = {
  id: number;
  title: string;
  date: string;
  location: string | null;
  description: string;
  link_href: string;
  link_label: string;
  image_url: string | null;
  image_alt: string | null;
  pillar: string;
};

export function rowToEvent(row: EventRow): SocEvent {
  const pillar = (PILLARS.includes(row.pillar as EventPillar) ? row.pillar : "general") as EventPillar;
  const fallbackImage = PILLAR_IMAGE[pillar];
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    location: row.location || undefined,
    description: row.description,
    href: row.link_href || "/news-events",
    cta: row.link_label || "Learn More",
    image: row.image_url || fallbackImage.src,
    imageAlt: row.image_url ? row.image_alt || row.title : fallbackImage.alt,
    pillar,
    color: PILLAR_NEON[pillar],
  };
}

export const getEvents = cmsQuery(
  "events",
  async () => {
    const rows = await sql<EventRow>`
      SELECT id, title, event_date::text AS date, location, description, link_href, link_label,
             image_url, image_alt, pillar
      FROM events WHERE published = true
      ORDER BY event_date DESC, id DESC
    `;
    return rows.map(rowToEvent);
  },
  defaultEvents
);

export const getSettings = cmsQuery(
  "settings",
  async (): Promise<SiteSettings> => {
    const rows = await sql<{ key: string; value: string }>`SELECT key, value FROM settings`;
    const merged: SiteSettings = { ...DEFAULT_SETTINGS };
    for (const row of rows) if (SETTING_KEYS.includes(row.key)) merged[row.key] = row.value;
    return merged;
  },
  DEFAULT_SETTINGS
);

export const getBoard = cmsQuery(
  "board",
  async (): Promise<BoardMember[]> => {
    const rows = await sql<{ id: number; name: string; title: string; member_group: string; photo_url: string | null; bio: string | null }>`
      SELECT id, name, title, member_group, photo_url, bio FROM board_members
      WHERE published = true
      ORDER BY CASE member_group WHEN 'Officer' THEN 0 ELSE 1 END, sort_order ASC, id ASC
    `;
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      title: r.title,
      group: r.member_group === "Officer" ? "Officer" : "Director",
      photo: r.photo_url,
      bio: r.bio,
    }));
  },
  defaultBoard
);

export const getPartners = cmsQuery(
  "partners",
  async (): Promise<Partner[]> =>
    sql<Partner>`SELECT id, name, url FROM partners WHERE published = true ORDER BY sort_order ASC, id ASC`,
  defaultPartners
);

export const getCareerRoles = cmsQuery(
  "careers",
  async (): Promise<CareerRole[]> =>
    sql<CareerRole>`SELECT id, title, description FROM career_roles WHERE published = true ORDER BY sort_order ASC, id ASC`,
  defaultCareerRoles
);

export const getStories = cmsQuery(
  "stories",
  async (): Promise<CommunityStory[]> => {
    const rows = await sql<{
      id: number;
      title: string;
      date_location: string | null;
      body: string;
      image_url: string | null;
      image_alt: string | null;
      link_href: string | null;
    }>`
      SELECT id, title, date_location, body, image_url, image_alt, link_href FROM stories
      WHERE published = true ORDER BY sort_order ASC, id ASC
    `;
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      dateLocation: r.date_location,
      body: r.body,
      image: r.image_url,
      imageAlt: r.image_alt,
      href: r.link_href,
    }));
  },
  defaultStories
);
