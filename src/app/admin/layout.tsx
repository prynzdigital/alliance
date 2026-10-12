import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · SOC Alliance Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-full flex-1 bg-[#f4f5fb]">{children}</div>;
}
