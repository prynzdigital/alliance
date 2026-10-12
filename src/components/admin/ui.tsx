import Link from "next/link";
import type { ReactNode } from "react";

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60",
  gold: "inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-text shadow-sm transition hover:bg-secondary-dark disabled:opacity-60",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-text transition hover:border-primary/40 hover:text-primary",
  danger:
    "inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100",
  small:
    "inline-flex items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-text transition hover:border-primary/40 hover:text-primary",
};

export const field = {
  label: "block text-sm font-semibold text-text",
  input:
    "mt-1.5 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-text shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-red-500",
  help: "mt-1 text-xs text-text-muted",
  error: "mt-1 text-xs font-semibold text-red-700",
};

export function AdminPageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  eyebrow?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <div className="mb-2 text-xs font-bold uppercase tracking-widest text-secondary-dark">{eyebrow}</div>}
        <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className = "",
  padded = true,
}: {
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section className={`rounded-2xl border border-black/5 bg-white shadow-sm ${className}`}>
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-black/5 px-5 py-4">
          <h2 className="text-base font-bold text-text">{title}</h2>
          {action}
        </div>
      )}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </section>
  );
}

const tones = {
  gray: "bg-black/5 text-text-muted",
  green: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/15",
  gold: "bg-secondary/20 text-[#7a5a12] ring-1 ring-secondary/40",
  blue: "bg-primary/10 text-primary ring-1 ring-primary/20",
  red: "bg-red-50 text-red-700 ring-1 ring-red-600/15",
  teal: "bg-accent/10 text-accent ring-1 ring-accent/20",
};

export function Badge({ tone = "gray", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function StatCard({
  label,
  value,
  hint,
  href,
  accent = "primary",
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  href?: string;
  accent?: "primary" | "gold" | "teal" | "navy";
}) {
  const bar = { primary: "bg-primary", gold: "bg-secondary", teal: "bg-accent", navy: "bg-text" }[accent];
  const body = (
    <>
      <span className={`absolute inset-y-0 left-0 w-1 rounded-l-2xl ${bar}`} aria-hidden />
      <p className="text-xs font-bold uppercase tracking-widest text-text-muted">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-text" style={{ fontFamily: "var(--font-heading)" }}>
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
    </>
  );
  const cls = "relative block overflow-hidden rounded-2xl border border-black/5 bg-white p-5 pl-6 shadow-sm";
  return href ? (
    <Link href={href} className={`${cls} transition hover:-translate-y-0.5 hover:shadow-md`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-12 text-center">
      <p className="font-bold text-text">{title}</p>
      {children && <div className="mt-2 text-sm text-text-muted">{children}</div>}
    </div>
  );
}

export function Flash({ tone = "success", children }: { tone?: "success" | "error" | "info"; children: ReactNode }) {
  const styles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-800",
    info: "border-primary/20 bg-primary/5 text-text",
  }[tone];
  return (
    <div role="status" className={`mb-6 rounded-xl border px-4 py-3 text-sm font-medium ${styles}`}>
      {children}
    </div>
  );
}

export function formatDateTime(value: string | Date | null | undefined): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-US", {
    timeZone: "America/Chicago",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function timeAgo(value: string | Date): string {
  const seconds = Math.round((Date.now() - new Date(value).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return formatDateTime(value);
}
