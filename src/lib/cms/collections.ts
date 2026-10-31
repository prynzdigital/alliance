import { EVENT_PILLARS } from "@/lib/events";
import { SOCIAL_PLATFORMS } from "./social";

// Declarative definition of every editable list in the admin. The admin's
// list/create/edit screens AND the server-side save/delete actions are both
// driven from this config, so a field only has to be described once. Table and
// column names here are constants — user input never reaches SQL identifiers.

/** "file" is a PDF document (upload, or a /path or https:// link). */
export type FieldType = "text" | "textarea" | "date" | "url" | "image" | "file" | "select" | "checkbox" | "number";

export type CollectionField = {
  /** Database column. */
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  default?: string | number | boolean;
};

export type CollectionDef = {
  slug: string;
  table: string;
  title: string;
  singular: string;
  description: string;
  orderBy: string;
  /** Column shown as the row title in the list. */
  titleColumn: string;
  /** Extra columns shown as small text under the title in the list. */
  subtitleColumns: string[];
  imageColumn?: string;
  fields: CollectionField[];
  /** Public pages to note as affected, shown on the edit screen. */
  appearsOn: string;
};

const sortOrderField: CollectionField = {
  name: "sort_order",
  label: "Display order",
  type: "number",
  default: 0,
  help: "Lower numbers appear first.",
};

const publishedField: CollectionField = {
  name: "published",
  label: "Published (visible on the website)",
  type: "checkbox",
  default: true,
};

export const COLLECTIONS: CollectionDef[] = [
  {
    slug: "events",
    table: "events",
    title: "Events & News",
    singular: "Event / News Post",
    description:
      "Upcoming events and news posts. Status (Upcoming / Past) is worked out from the date automatically.",
    orderBy: "event_date DESC, id DESC",
    titleColumn: "title",
    subtitleColumns: ["event_date", "location"],
    imageColumn: "image_url",
    appearsOn: "Homepage carousels, the announcement bar, News & Events, and the Mardi Gras page",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "event_date", label: "Date", type: "date", required: true },
      { name: "location", label: "Location", type: "text", help: "Leave blank if not yet announced." },
      { name: "description", label: "Short description", type: "textarea", required: true },
      { name: "pillar", label: "Pillar / theme", type: "select", options: EVENT_PILLARS, default: "general" },
      {
        name: "image_url",
        label: "Image or flyer",
        type: "image",
        help: "If left empty, the pillar's photo is used.",
      },
      {
        name: "image_alt",
        label: "Image description (alt text)",
        type: "text",
        help: "Describe the image for people using screen readers.",
      },
      {
        name: "link_href",
        label: "Link",
        type: "text",
        default: "/news-events",
        help: "Where the card's button goes, e.g. /donate/mardi-gras-fundraiser or a full https:// link.",
      },
      { name: "link_label", label: "Button label", type: "text", default: "Learn More" },
      publishedField,
    ],
  },
  {
    slug: "stories",
    table: "stories",
    title: "Community Stories",
    singular: "Story",
    description: "The photo stories in the homepage's Stories From Our Community section.",
    orderBy: "sort_order ASC, id ASC",
    titleColumn: "title",
    subtitleColumns: ["date_location"],
    imageColumn: "image_url",
    appearsOn: "Homepage",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "date_location", label: "Date & place line", type: "text", placeholder: "August 20, 2025 · Fuller Park Fieldhouse, Chicago" },
      { name: "body", label: "Story text", type: "textarea", required: true },
      { name: "image_url", label: "Photo", type: "image" },
      { name: "image_alt", label: "Photo description (alt text)", type: "text" },
      { name: "link_href", label: "Learn More link", type: "text", placeholder: "/programs/community" },
      sortOrderField,
      publishedField,
    ],
  },
  {
    slug: "newsletters",
    table: "newsletters",
    title: "Newsletters",
    singular: "Newsletter Issue",
    description:
      "Newsletter issues (PDFs). The issue at the top of the list is featured on News & Events and linked from the footer.",
    orderBy: "sort_order ASC, id DESC",
    titleColumn: "title",
    subtitleColumns: ["issue_label"],
    imageColumn: "cover_url",
    appearsOn: "News & Events and the footer",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, placeholder: "Fall 2026 Newsletter" },
      { name: "issue_label", label: "Issue", type: "text", required: true, placeholder: "Fall 2026" },
      { name: "summary", label: "Short summary", type: "textarea", help: "One or two sentences about this issue." },
      {
        name: "highlights",
        label: "In this issue",
        type: "textarea",
        help: "One item per line, e.g. “A Message from the Board Chair”.",
      },
      { name: "pdf_url", label: "Newsletter PDF", type: "file", required: true },
      {
        name: "cover_url",
        label: "Cover image",
        type: "image",
        help: "A picture of the first page works best (portrait).",
      },
      { name: "cover_alt", label: "Cover description (alt text)", type: "text" },
      { ...sortOrderField, help: "Lower numbers appear first. New issues with the same number appear first." },
      publishedField,
    ],
  },
  {
    slug: "board",
    table: "board_members",
    title: "Leadership & Board",
    singular: "Board Member",
    description: "The roster on the Our Story page. Officers are listed before Directors.",
    orderBy: "CASE member_group WHEN 'Officer' THEN 0 ELSE 1 END, sort_order ASC, id ASC",
    titleColumn: "name",
    subtitleColumns: ["title", "member_group"],
    imageColumn: "photo_url",
    appearsOn: "About → Our Story",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true, placeholder: "Board Chair" },
      {
        name: "member_group",
        label: "Group",
        type: "select",
        options: [
          { value: "Officer", label: "Officer" },
          { value: "Director", label: "Director" },
        ],
        default: "Director",
      },
      { name: "photo_url", label: "Headshot", type: "image", help: "A square photo works best." },
      { name: "bio", label: "Short bio", type: "textarea", help: "Optional." },
      sortOrderField,
      publishedField,
    ],
  },
  {
    slug: "partners",
    table: "partners",
    title: "Partners",
    singular: "Partner",
    description: "Organizations listed in the homepage's Our Partners band.",
    orderBy: "sort_order ASC, id ASC",
    titleColumn: "name",
    subtitleColumns: ["url"],
    appearsOn: "Homepage",
    fields: [
      { name: "name", label: "Organization name", type: "text", required: true },
      { name: "url", label: "Website", type: "url", help: "Optional. Makes the name a link." },
      sortOrderField,
      publishedField,
    ],
  },
  {
    slug: "social",
    table: "social_links",
    title: "Social Media",
    singular: "Social Link",
    description: "Social media profiles. Each one gets an icon in the footer and on the homepage banner.",
    orderBy: "sort_order ASC, id ASC",
    titleColumn: "platform",
    subtitleColumns: ["label", "url"],
    appearsOn: "Footer, homepage banner, and search-engine data",
    fields: [
      {
        name: "platform",
        label: "Platform",
        type: "select",
        required: true,
        options: SOCIAL_PLATFORMS.map((p) => ({ value: p, label: p })),
        default: "Facebook",
      },
      {
        name: "url",
        label: "Profile link",
        type: "url",
        required: true,
        placeholder: "https://www.instagram.com/…",
      },
      {
        name: "label",
        label: "Display name",
        type: "text",
        help: "Only needed for “Other” (e.g. Nextdoor). Leave blank to use the platform name.",
      },
      sortOrderField,
      publishedField,
    ],
  },
  {
    slug: "careers",
    table: "career_roles",
    title: "Careers",
    singular: "Role",
    description: "Role categories listed in the Careers section of Get Involved.",
    orderBy: "sort_order ASC, id ASC",
    titleColumn: "title",
    subtitleColumns: ["description"],
    appearsOn: "Get Involved → Careers",
    fields: [
      { name: "title", label: "Role title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", help: "Optional." },
      sortOrderField,
      publishedField,
    ],
  },
];

export function getCollection(slug: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

/** SELECT list for a collection; dates come back as plain YYYY-MM-DD strings. */
export function selectColumns(def: CollectionDef): string {
  const cols = def.fields.map((f) => (f.type === "date" ? `${f.name}::text AS ${f.name}` : f.name));
  return ["id", ...cols, "updated_at"].join(", ");
}
