import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TopBar } from "@/components/layout/TopBar";
import { getEvents, getSettings, getSocialLinks } from "@/lib/cms/content";
import { getUpcomingEvents } from "@/lib/events";

// Re-render public pages at least hourly so anything date-derived (an event
// flipping from Upcoming to Past) updates without a redeploy. Admin edits
// refresh the affected pages immediately on save.
export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, events, socialLinks] = await Promise.all([getSettings(), getEvents(), getSocialLinks()]);
  const [nextEvent] = getUpcomingEvents(events);

  // Verified organization facts for search engines — see
  // docs/discovery/12_SEO_Strategy.md. Values come from Site Content settings.
  const [street, ...rest] = settings.contact_address.split(",");
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: settings.org_full_name,
    alternateName: settings.org_name,
    url: "https://socalliance.org",
    logo: "https://socalliance.org/soc-logo-mark.png",
    email: settings.contact_email,
    telephone: `+1-${settings.contact_phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: street?.trim(),
      addressLocality: rest[0]?.trim(),
      addressRegion: rest[1]?.trim().split(" ")[0],
      postalCode: rest[1]?.trim().split(" ")[1],
      addressCountry: "US",
    },
    sameAs: socialLinks.map((link) => link.url),
    nonprofitStatus: { "@type": "NonprofitType", nonprofitStatus: "Nonprofit501c3" },
    taxID: settings.org_ein,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
      />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <TopBar nextEvent={nextEvent} ein={settings.org_ein} />
      <SiteHeader phone={settings.contact_phone} />
      <main id="main-content" className="flex-1 pt-[7.25rem]">
        {children}
      </main>
      <SiteFooter settings={settings} socialLinks={socialLinks} />
    </>
  );
}
