// Social media links, managed in the admin under Website Content → Social Media.

export const SOCIAL_PLATFORMS = [
  "Facebook",
  "Instagram",
  "LinkedIn",
  "X (Twitter)",
  "YouTube",
  "TikTok",
  "Threads",
  "Other",
] as const;

export type SocialLink = {
  id?: number;
  platform: string;
  /** Display name; only needed for "Other" (e.g. "Nextdoor"). */
  label: string | null;
  url: string;
};

/** What visitors see next to the icon, e.g. "Facebook" or a custom label for "Other". */
export function socialName(link: SocialLink): string {
  return link.label?.trim() || (link.platform === "Other" ? "Website" : link.platform);
}

// The links that were live before social media moved into the admin.
export const defaultSocialLinks: SocialLink[] = [
  { platform: "Facebook", label: null, url: "https://www.facebook.com/socommunityalliance" },
  {
    platform: "LinkedIn",
    label: null,
    url: "https://www.linkedin.com/company/strengthening-our-community-alliance/",
  },
];
