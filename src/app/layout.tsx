import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://socalliance.org"),
  title: {
    default: "SOC Alliance — Strengthening Our Community Alliance",
    template: "%s | SOC Alliance",
  },
  description:
    "SOC Alliance is a Chicago South Side nonprofit uplifting the Woodlawn/Fuller Park community through scholarship, economic development, community, and health programs.",
};

// Verified facts only (address/phone/email/EIN/social links are already
// published elsewhere on the site) — see docs/discovery/12_SEO_Strategy.md
// for the structured-data requirement this satisfies.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Strengthening Our Community Alliance",
  alternateName: "SOC Alliance",
  url: "https://socalliance.org",
  logo: "https://socalliance.org/soc-logo-mark.png",
  email: "info@socalliance.org",
  telephone: "+1-773-693-2222",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6615 S. Kenwood Ave.",
    addressLocality: "Chicago",
    addressRegion: "IL",
    postalCode: "60637",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.facebook.com/socommunityalliance",
    "https://www.linkedin.com/company/strengthening-our-community-alliance/",
  ],
  nonprofitStatus: {
    "@type": "NonprofitType",
    nonprofitStatus: "Nonprofit501c3",
  },
  taxID: "36-4047035",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1 pt-24">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
