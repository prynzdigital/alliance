import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with SOC Alliance.",
};

const ORG = {
  address: "6615 S. Kenwood Ave., Chicago, IL 60637",
  phone: "773-693-2222",
  phoneHref: "tel:+17736932222",
  fax: "888-504-1727",
  email: "info@socalliance.org",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Have a question, want to volunteer, or need support? Send us a message below, or reach out directly."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <Container className="py-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <ContactForm />
        </div>

        <div>
          <address className="not-italic text-text">
            <p className="font-semibold">SOC Alliance</p>
            <p className="mt-1 text-text-muted">{ORG.address}</p>
            <p className="mt-3">
              <a href={ORG.phoneHref} className="text-primary hover:underline">
                {ORG.phone}
              </a>
            </p>
            <p className="mt-1">
              <a href={`mailto:${ORG.email}`} className="text-primary hover:underline">
                {ORG.email}
              </a>
            </p>
            <p className="mt-1 text-text-muted">Fax: {ORG.fax}</p>
          </address>

          <div className="mt-6 overflow-hidden rounded-card border border-black/10">
            <iframe
              title="Map showing SOC Alliance's location at 6615 S. Kenwood Ave., Chicago, IL"
              src={`https://www.google.com/maps?q=${encodeURIComponent(ORG.address)}&output=embed`}
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      </Container>
    </>
  );
}
