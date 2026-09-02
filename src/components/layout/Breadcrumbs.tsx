import Link from "next/link";

export type Crumb = { label: string; href?: string };

// Required on all pages nested more than one level deep per
// docs/discovery/11_Design_System.md. `variant="light"` is for use on dark/
// photo backgrounds (e.g. PageHeader) — same structure, lighter text.
export function Breadcrumbs({ items, variant = "dark" }: { items: Crumb[]; variant?: "dark" | "light" }) {
  const isLight = variant === "light";
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${isLight ? "text-white/70" : "text-text-muted"}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden="true" className={isLight ? "text-white/40" : "text-text-muted/60"}>
                /
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className={isLight ? "hover:text-white" : "hover:text-primary"}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={isLight ? "text-white" : "text-text"}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
