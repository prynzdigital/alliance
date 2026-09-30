import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
