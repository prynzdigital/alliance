import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Local-dev stand-in database (see src/lib/server/db.ts); ships WASM files
  // that must be loaded from node_modules rather than bundled.
  serverExternalPackages: ["@electric-sql/pglite"],
  images: {
    // Photos uploaded through the admin are stored in Vercel Blob.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  experimental: {
    serverActions: {
      // Admin image uploads go through Server Actions (4 MB max per image,
      // plus multipart overhead).
      bodySizeLimit: "5mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/about/leadership-board",
        destination: "/about/our-story#leadership",
        permanent: true,
      },
      {
        source: "/donate/give",
        destination: "/donate",
        permanent: true,
      },
      {
        source: "/get-involved/volunteer",
        destination: "/get-involved#volunteer",
        permanent: true,
      },
      {
        source: "/get-involved/careers",
        destination: "/get-involved#careers",
        permanent: true,
      },
      {
        source: "/get-involved/partner-with-us",
        destination: "/get-involved#partner-with-us",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
