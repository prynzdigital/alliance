import Image from "next/image";
import type { ReactNode } from "react";

// Full-screen frosted card over a dimmed community photo — the sign-in look
// borrowed from the e-cleanpro admin, in SOC Alliance colors.
export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <Image src="/community-work.png" alt="" fill priority sizes="100vw" className="object-cover" aria-hidden />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-text/95 via-text/90 to-primary/80" />
      <div className="relative w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <Image src="/soc-logo-mark-white.png" alt="SOC Alliance" width={764} height={446} className="h-10 w-auto" priority />
        <h1 className="mt-6 text-2xl font-extrabold text-white">{title}</h1>
        <p className="mt-1 mb-6 text-sm text-white/65">{subtitle}</p>
        {children}
      </div>
    </main>
  );
}
