import Image from "next/image";
import Link from "next/link";
import { footerLegal, primaryNav } from "@/lib/navigation";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SocialIcon } from "@/components/icons/SocialIcons";
import { telHref, type SiteSettings } from "@/lib/cms/settings";
import { socialName, type SocialLink } from "@/lib/cms/social";

export function SiteFooter({ settings, socialLinks }: { settings: SiteSettings; socialLinks: SocialLink[] }) {
  const ORG = {
    name: settings.org_name,
    fullName: settings.org_full_name,
    address: settings.contact_address,
    phone: settings.contact_phone,
    phoneHref: telHref(settings.contact_phone),
    fax: settings.contact_fax,
    email: settings.contact_email,
    ein: settings.org_ein,
  };
  const navSections = primaryNav.filter((item) => item.children);
  const quickLinks = primaryNav.filter((item) => !item.children && item.href !== "/");

  return (
    <footer
      className="relative bg-text bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/community-work.png')" }}
    >
      <div aria-hidden className="absolute inset-0 bg-text/97" />
      <div className="relative mx-auto max-w-(--container-content) px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Image
                src="/soc-logo-mark-white.png"
                alt="SOC Alliance logo"
                width={764}
                height={446}
                className="h-9 w-auto"
              />
              <p className="text-lg font-bold text-white">{ORG.name}</p>
            </div>
            <p className="mt-1 text-sm text-white/60">{ORG.fullName}</p>

            <address className="mt-4 not-italic text-sm text-white/60">
              <p>{ORG.address}</p>
              <p className="mt-1">
                <a href={ORG.phoneHref} className="hover:text-secondary">
                  {ORG.phone}
                </a>
              </p>
              <p className="mt-1">
                <a href={`mailto:${ORG.email}`} className="hover:text-secondary">
                  {ORG.email}
                </a>
              </p>
              {ORG.fax && <p className="mt-1">Fax: {ORG.fax}</p>}
            </address>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ORG.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-secondary underline underline-offset-2"
            >
              Get directions
            </a>

            {socialLinks.length > 0 && (
              <ul className="mt-6 flex flex-col gap-2" aria-label="Social media">
                {socialLinks.map((link) => (
                  <li key={link.id ?? link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-secondary"
                    >
                      <SocialIcon platform={link.platform} className="h-5 w-5" />
                      {socialName(link)}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-5">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-white/80 hover:text-secondary">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {navSections.map((section) => (
              <nav key={section.href} aria-label={section.label}>
                <p className="text-sm font-semibold text-white">{section.label}</p>
                <ul className="mt-3 flex flex-col gap-2">
                  <li>
                    <Link href={section.href} className="text-sm text-white/60 hover:text-secondary">
                      Overview
                    </Link>
                  </li>
                  {section.children?.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className="text-sm text-white/60 hover:text-secondary">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
        </div>

        <div className="mt-12 border-t border-white/15 pt-6">
          <p className="max-w-md text-sm text-white/60">
            Get occasional updates on programs, events, and ways to help.
          </p>
          <div className="mt-3 max-w-md">
            <NewsletterForm idPrefix="footer" dark />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {ORG.fullName} is a 501(c)(3) public charity, EIN {ORG.ein}. Donations are tax-deductible
            to the extent allowed by law.
          </p>
          <div className="flex items-center gap-4">
            {footerLegal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-secondary">
                {link.label}
              </Link>
            ))}
            <span>
              &copy; {new Date().getFullYear()} {ORG.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
