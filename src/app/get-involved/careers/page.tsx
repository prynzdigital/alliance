import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";
import { Button } from "@/components/ui/Button";
import { buildMailtoHref } from "@/lib/mailto";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at SOC Alliance, including positions with our Violence Prevention Initiative.",
};

const svpiRoles = [
  "Area Violence Interrupter",
  "Area Field Manager",
  "Case Manager",
  "Victim Services Facilitator",
];

export default function CareersPage() {
  const applyHref = buildMailtoHref(
    "info@socalliance.org",
    "SVPI role inquiry",
    "I'm interested in learning more about open roles with the Strengthening Violence Prevention Initiative.\n\nName:\nRole of interest:\n"
  );

  return (
    <>
      <PageHeader
        title="Careers"
        description="SOC Alliance's Strengthening Violence Prevention Initiative (SVPI) hires across the following role categories, funded in part by the Illinois Department of Human Services."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/get-involved" },
          { label: "Careers" },
        ]}
      />
      <Container className="py-16 md:py-24">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {svpiRoles.map((role) => (
          <li key={role} className="rounded-card border border-black/10 bg-surface p-4 text-text">
            {role}
          </li>
        ))}
      </ul>

      <div className="mt-8 max-w-2xl">
        <PendingNotice>
          <p>Specific current openings, qualifications, and compensation ranges are pending.</p>
        </PendingNotice>
      </div>

      <div className="mt-10 border-t border-black/10 pt-8">
        <Button href={applyHref}>Inquire About a Role</Button>
      </div>
      </Container>
    </>
  );
}
