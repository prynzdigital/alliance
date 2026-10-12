import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Bold, tight-tracking display face for headings only — matches the
// reference build's typographic character (body text stays on Inter).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
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

// Shared shell only — the public site's header/footer live in (site)/layout.tsx
// and the admin dashboard has its own chrome under /admin.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-text">{children}</body>
    </html>
  );
}
