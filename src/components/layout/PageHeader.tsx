import { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";

export function PageHeader({
  title,
  description,
  breadcrumbs,
  children,
}: {
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="hero-mesh">
      <div className="mx-auto max-w-(--container-content) px-6 py-12 md:py-16">
        <Breadcrumbs items={breadcrumbs} variant="light" />
        <h1 className="mt-3 text-white">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-white/85">{description}</p>}
        {children}
      </div>
    </section>
  );
}
