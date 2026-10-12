import Image from "next/image";
import Link from "next/link";
import { footerLegal, primaryNav } from "@/lib/navigation";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SocialIcon } from "@/components/icons/SocialIcons";
import { telHref, type SiteSettings } from "@/lib/cms/settings";
import { socialName, type SocialLink } from "@/lib/cms/social";

const STATENEXT_URL = "https://www.gostatenext.com/";

function Icon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS = {
  pin: "M12 21s-7-5.6-7-11.2A7 7 0 0 1 19 9.8C19 15.4 12 21 12 21Zm0-8.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z",
  phone:
    "M5 4h3.2l1.6 4-2 1.3a10.5 10.5 0 0 0 4.9 4.9l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  mailOpen: "M3 9.5 12 4l9 5.5V19H3zM3 9.5l9 6 9-6",
  heart: "M12 20.5s-7.5-4.6-9.6-9.4A5.2 5.2 0 0 1 12 6.2a5.2 5.2 0 0 1 9.6 4.9c-2.1 4.8-9.6 9.4-9.6 9.4Z",
  arrowUp: "M12 19V5M6 11l6-6 6 6",
  external: "M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4",
};

export function SiteFooter({ settings, socialLinks }: { settings: SiteSettings; socialLinks: SocialLink[] }) {
  const ORG = {
    name: settings.org_name,
    fullName: settings.org_full_name,
    mission: settings.mission,
    address: settings.contact_address,
    phone: settings.contact_phone,
    phoneHref: telHref(settings.contact_phone),
    fax: settings.contact_fax,
    email: settings.contact_email,
    ein: settings.org_ein,
  };
  const navSections = primaryNav.filter((item) => item.children);
  const quickLinks = primaryNav.filter((item) => !item.children && item.href !== "/");
  const columns = [...navSections, { label: "Explore", href: "", children: quickLinks }];

  return (
    <footer className="relative isolate overflow-hidden bg-text text-white">
      <div aria-hidden className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: [
            "radial-gradient(45% 35% at 0% 0%, color-mix(in srgb, var(--color-primary) 28%, transparent), transparent)",
            "radial-gradient(40% 30% at 100% 10%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent)",
            "radial-gradient(50% 35% at 85% 100%, color-mix(in srgb, var(--color-secondary) 12%, transparent), transparent)",
          ].join(","),
        }}
      />
      <Image
        src="/soc-logo-mark-white.png"
        alt=""
        aria-hidden
        width={764}
        height={446}
        className="pointer-events-none absolute -right-28 bottom-24 -z-10 w-[560px] max-w-none opacity-[0.035]"
      />

      <div className="mx-auto max-w-(--container-content) px-6">
        {/* Newsletter */}
        <div className="relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-10">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[0.07]"
            style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "18px 18px" }}
          />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
            <div className="flex items-start gap-5">
              <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-text shadow-lg shadow-secondary/20 sm:flex">
                <Icon d={ICONS.mailOpen} className="h-7 w-7" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary">Stay Connected</p>
                <h2 className="mt-1.5 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                  Be the first to hear what&rsquo;s next.
                </h2>
                <p className="mt-2 text-sm text-white/70">
                  Get occasional updates on programs, events, and ways to help.
                </p>
              </div>
            </div>
            <NewsletterForm idPrefix="footer" dark buttonVariant="secondary" />
          </div>
        </div>

        {/* Brand + sitemap */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/soc-logo-mark-white.png"
                alt=""
                width={764}
                height={446}
                className="h-11 w-auto"
              />
              <span>
                <span className="block text-xl font-extrabold leading-tight text-white">{ORG.name}</span>
                <span className="block text-xs text-white/60">{ORG.fullName}</span>
              </span>
            </Link>

            {ORG.mission && (
              <p className="mt-6 max-w-sm border-l-2 border-secondary pl-4 text-sm italic leading-relaxed text-white/75">
                {ORG.mission}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-text shadow-lg shadow-secondary/20 transition hover:-translate-y-0.5 hover:bg-secondary-dark"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d={ICONS.heart} />
                </svg>
                Donate
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
              >
                Get Involved
              </Link>
            </div>

            {socialLinks.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="Social media">
                {socialLinks.map((link) => (
                  <li key={link.id ?? link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`SOC Alliance on ${socialName(link)} (opens in a new tab)`}
                      title={socialName(link)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary hover:text-text"
                    >
                      <SocialIcon platform={link.platform} className="h-4.5 w-4.5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8 xl:grid-cols-5">
            {columns.map((section) => (
              <nav key={section.label} aria-label={`${section.label} (footer)`}>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary">
                  <span aria-hidden className="h-px w-4 bg-secondary" />
                  {section.label}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {section.href && (
                    <li>
                      <FooterLink href={section.href}>Overview</FooterLink>
                    </li>
                  )}
                  {section.children?.map((child) => (
                    <li key={child.href}>
                      <FooterLink href={child.href}>{child.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Contact */}
        <address className="mt-14 grid gap-4 not-italic md:grid-cols-2 lg:grid-cols-3">
          <ContactCard icon={ICONS.pin} label="Visit">
            <p className="text-white/85">{ORG.address}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ORG.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-secondary underline-offset-2 hover:underline"
            >
              Get directions
              <Icon d={ICONS.external} className="h-3.5 w-3.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </ContactCard>
          <ContactCard icon={ICONS.phone} label="Call">
            <a href={ORG.phoneHref} className="font-semibold text-white/90 hover:text-secondary">
              {ORG.phone}
            </a>
            {ORG.fax && <p className="mt-1 text-xs text-white/60">Fax: {ORG.fax}</p>}
          </ContactCard>
          <ContactCard icon={ICONS.mail} label="Email" className="md:col-span-2 lg:col-span-1">
            <a href={`mailto:${ORG.email}`} className="font-semibold [overflow-wrap:anywhere] text-white/90 hover:text-secondary">
              {ORG.email}
            </a>
          </ContactCard>
        </address>

        {/* Legal + credit */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 py-7 text-xs text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-1">
            <p>
              &copy; {new Date().getFullYear()} {ORG.fullName}. All rights reserved.
            </p>
            <p>
              A 501(c)(3) public charity, EIN {ORG.ein}. Donations are tax-deductible to the extent allowed
              by law.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {footerLegal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-secondary">
                {link.label}
              </Link>
            ))}
            <span aria-hidden className="hidden h-3 w-px bg-white/20 sm:block" />
            <p>
              Digital Excellence, Powered by{" "}
              <a
                href={STATENEXT_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 font-semibold text-secondary underline-offset-2 hover:underline"
              >
                StateNext Labs
                <Icon d={ICONS.external} className="h-3 w-3" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </p>
            <a
              href="#main-content"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary hover:text-text"
            >
              <Icon d={ICONS.arrowUp} className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center text-sm text-white/70 transition-colors hover:text-white">
      <span
        aria-hidden
        className="mr-0 h-px w-0 bg-secondary transition-all duration-200 group-hover:mr-2 group-hover:w-3"
      />
      {children}
    </Link>
  );
}

function ContactCard({
  icon,
  label,
  className = "",
  children,
}: {
  icon: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm transition-colors hover:border-white/20 hover:bg-white/[0.06] ${className}`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
        <Icon d={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/60">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
