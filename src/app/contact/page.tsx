import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
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

function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.25" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <path d="M4.5 4.5h3.2l1.6 4-2 1.5a11 11 0 0 0 5.7 5.7l1.5-2 4 1.6v3.2c0 1-.9 1.8-1.9 1.6C9.9 19.3 4.7 14.1 3 7.4 2.8 6.4 3.6 5.5 4.5 4.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 6.5 8 6 8-6" />
    </svg>
  );
}

function FaxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 8V4h9l3 3v1" />
      <rect x="4" y="8" width="16" height="9" rx="1.5" />
      <path d="M8 17v3h8v-3" />
    </svg>
  );
}

const contactLines = [
  { icon: PinIcon, label: ORG.address, href: undefined },
  { icon: PhoneIcon, label: ORG.phone, href: ORG.phoneHref },
  { icon: MailIcon, label: ORG.email, href: `mailto:${ORG.email}` },
  { icon: FaxIcon, label: `Fax: ${ORG.fax}`, href: undefined },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Have a question, want to volunteer, or need support? Send us a message below, or reach out directly."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image="/chicago.png"
        imageAlt="The Chicago skyline"
      />
      <Container className="py-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Get In Touch" title="Send Us a Message" />
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Visit or Call" title="Reach Us Directly" />
          <address className="mt-6 rounded-card border border-black/10 bg-surface p-6 not-italic">
            <p className="text-sm font-semibold text-text">SOC Alliance</p>
            <ul className="mt-4 flex flex-col gap-3">
              {contactLines.map((line) => {
                const Icon = line.icon;
                const content = (
                  <>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </span>
                    <span className="text-sm text-text-muted">{line.label}</span>
                  </>
                );
                return (
                  <li key={line.label} className="flex items-center gap-3">
                    {line.href ? (
                      <a href={line.href} className="flex items-center gap-3 hover:text-primary [&:hover_span]:text-primary">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </address>

          <div className="mt-6 overflow-hidden rounded-card border border-black/10 shadow-sm">
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
