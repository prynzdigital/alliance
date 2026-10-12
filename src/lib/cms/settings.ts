// Single source of truth for CMS-editable site settings. Every key has a
// baked-in default matching what's currently live, so the site renders
// correctly before the database is provisioned or a value has been edited.
// The admin's Site Content screens are generated from this list.

export type SettingField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "email" | "tel";
  default: string;
  help?: string;
};

export type SettingGroup = {
  slug: string;
  title: string;
  description: string;
  fields: SettingField[];
};

export const SETTING_GROUPS: SettingGroup[] = [
  {
    slug: "organization",
    title: "Organization & Contact",
    description: "Shown in the header, footer, contact page, and search-engine data.",
    fields: [
      { key: "org_name", label: "Short name", type: "text", default: "SOC Alliance" },
      { key: "org_full_name", label: "Full legal name", type: "text", default: "Strengthening Our Community Alliance" },
      { key: "org_ein", label: "EIN", type: "text", default: "36-4047035" },
      { key: "contact_address", label: "Street address", type: "text", default: "6615 S. Kenwood Ave., Chicago, IL 60637" },
      { key: "contact_phone", label: "Phone", type: "tel", default: "773-693-2222" },
      { key: "contact_fax", label: "Fax", type: "tel", default: "888-504-1727" },
      {
        key: "contact_email",
        label: "Public email",
        type: "email",
        default: "info@socalliance.org",
        help: "Also where new form submissions are emailed, once email sending is set up.",
      },
    ],
  },
  {
    slug: "social",
    title: "Social Links",
    description: "Leave a link blank to hide that icon across the site.",
    fields: [
      { key: "social_facebook", label: "Facebook URL", type: "url", default: "https://www.facebook.com/socommunityalliance" },
      {
        key: "social_linkedin",
        label: "LinkedIn URL",
        type: "url",
        default: "https://www.linkedin.com/company/strengthening-our-community-alliance/",
      },
    ],
  },
  {
    slug: "homepage",
    title: "Homepage",
    description: "The Our Impact band and the About the Alliance section.",
    fields: [
      { key: "impact_figure", label: "Impact headline figure", type: "text", default: "$100,000+" },
      {
        key: "impact_caption",
        label: "Impact caption",
        type: "textarea",
        default:
          "in scholarships awarded, cumulatively, through the Omega Mardi Gras Scholarship Fundraiser (as of March 2026)",
      },
      {
        key: "impact_note",
        label: "Impact footnote",
        type: "textarea",
        default:
          "More of our impact story, like students mentored and families supported, is on its way as we confirm the numbers.",
        help: "Leave blank to hide.",
      },
      {
        key: "about_blurb",
        label: "About the Alliance paragraph",
        type: "textarea",
        default:
          "Strengthening Our Community Alliance is a 501(c)(3) organization that provides scholarships and community services to the Woodlawn Community and greater Chicago. The Alliance will utilize our facility in Woodlawn to hold meetings and conduct community service programs, and will also collaborate with the local community on numerous programs.",
      },
    ],
  },
  {
    slug: "about",
    title: "About & Our Story",
    description: "Mission, vision, values, and the Who We Are introduction.",
    fields: [
      { key: "mission", label: "Mission", type: "textarea", default: "The Mission is to uplift and improve the life of the community." },
      {
        key: "vision",
        label: "Vision",
        type: "textarea",
        default: "The Vision is to create a community in which all people thrive and develop to their greatest potential.",
      },
      {
        key: "values",
        label: "Values",
        type: "textarea",
        default:
          "We believe in a four pillar plan to uplift the community: Scholarship, Economic Development, Community, and Health.",
      },
      {
        key: "who_we_are",
        label: "Who We Are (Our Story intro)",
        type: "textarea",
        default:
          "Strengthening Our Community Alliance is a 501(c)(3) organization that provides scholarships and community services to the Woodlawn Community and greater Chicago. The Alliance utilizes its own facility in Woodlawn to hold meetings and conduct community service programs, and collaborates with the local community on numerous programs.",
      },
      {
        key: "board_intro",
        label: "Leadership & Board intro",
        type: "textarea",
        default:
          "SOC Alliance is led entirely by a volunteer Board of Directors — every officer reports $0 compensation.",
      },
    ],
  },
  {
    slug: "donations",
    title: "Donations",
    description: "The embedded Donorbox form on the Donate page.",
    fields: [
      {
        key: "donorbox_embed_url",
        label: "Donorbox embed URL",
        type: "url",
        default: "https://donorbox.org/embed/general-donation-36?default_interval=o",
        help: "Must be a donorbox.org/embed/… link.",
      },
    ],
  },
];

export const ALL_SETTING_FIELDS: SettingField[] = SETTING_GROUPS.flatMap((g) => g.fields);
export const SETTING_KEYS = ALL_SETTING_FIELDS.map((f) => f.key);

export type SiteSettings = Record<string, string>;

export const DEFAULT_SETTINGS: SiteSettings = Object.fromEntries(
  ALL_SETTING_FIELDS.map((f) => [f.key, f.default])
);

/** "773-693-2222" → "tel:+17736932222" (assumes a US number when 10 digits). */
export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`;
}
