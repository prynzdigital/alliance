"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { logoutAction } from "@/app/admin/actions/auth";
import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronIcon,
  CloseIcon,
  DashboardIcon,
  ExternalIcon,
  HandshakeIcon,
  ImageIcon,
  InboxIcon,
  LogIcon,
  MenuIcon,
  ShieldIcon,
  SlidersIcon,
  StoryIcon,
  UserIcon,
  UsersIcon,
} from "./icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type NavLink = { href: string; label: string; icon?: Icon; badge?: number; exact?: boolean };
type NavGroup = { label: string; icon: Icon; links: NavLink[] };

function isActive(pathname: string, link: NavLink) {
  return link.exact ? pathname === link.href : pathname === link.href || pathname.startsWith(`${link.href}/`);
}

export function AdminShell({
  user,
  newSubmissions,
  settingGroups,
  children,
}: {
  user: { username: string; role: "Owner" | "Admin" };
  newSubmissions: number;
  settingGroups: { slug: string; title: string }[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const groups: NavGroup[] = [
    {
      label: "Website Content",
      icon: CalendarIcon,
      links: [
        { href: "/admin/events", label: "Events & News", icon: CalendarIcon },
        { href: "/admin/stories", label: "Community Stories", icon: StoryIcon },
        { href: "/admin/board", label: "Leadership & Board", icon: UsersIcon },
        { href: "/admin/partners", label: "Partners", icon: HandshakeIcon },
        { href: "/admin/careers", label: "Careers", icon: BriefcaseIcon },
      ],
    },
    {
      label: "Site Settings",
      icon: SlidersIcon,
      links: settingGroups.map((g) => ({ href: `/admin/site-content/${g.slug}`, label: g.title })),
    },
  ];

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((g) => [g.label, true]))
  );

  // Close the mobile drawer whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (active: boolean, nested = false) =>
    `flex w-full items-center gap-3 rounded-lg px-3 ${nested ? "py-2 pl-11 text-[13px]" : "py-2.5 text-sm"} font-semibold transition-colors ${
      active
        ? nested
          ? "bg-white/10 text-secondary"
          : "bg-white/12 text-white"
        : "text-white/70 hover:bg-white/6 hover:text-white"
    }`;

  const topLinks: NavLink[] = [
    { href: "/admin", label: "Dashboard", icon: DashboardIcon, exact: true },
    { href: "/admin/inbox", label: "Inbox", icon: InboxIcon, badge: newSubmissions },
  ];
  const bottomLinks: NavLink[] = [
    { href: "/admin/media", label: "Media Library", icon: ImageIcon },
    ...(user.role === "Owner"
      ? [
          { href: "/admin/team", label: "Team & Access", icon: ShieldIcon },
          { href: "/admin/audit-log", label: "Activity Log", icon: LogIcon },
        ]
      : []),
  ];

  const renderLink = (link: NavLink) => {
    const active = isActive(pathname, link);
    const Icon = link.icon;
    return (
      <Link key={link.href} href={link.href} className={linkClass(active)} aria-current={active ? "page" : undefined}>
        {Icon && <Icon className="h-[18px] w-[18px]" />}
        <span className="flex-1">{link.label}</span>
        {link.badge ? (
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-bold text-text">{link.badge}</span>
        ) : null}
      </Link>
    );
  };

  const sidebar = (
    <div className="flex h-full flex-col bg-text text-white">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <Image src="/soc-logo-mark-white.png" alt="" width={764} height={446} className="h-7 w-auto" />
        <div className="leading-tight">
          <p className="text-sm font-extrabold" style={{ fontFamily: "var(--font-heading)" }}>
            SOC Alliance
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary">Admin</p>
        </div>
      </div>

      <nav aria-label="Admin" className="flex-1 overflow-y-auto px-3 py-4">
        <div className="flex flex-col gap-1">{topLinks.map(renderLink)}</div>

        {groups.map((group) => {
          const GroupIcon = group.icon;
          const isOpen = expanded[group.label];
          const groupId = `nav-${group.label.replace(/\W+/g, "-").toLowerCase()}`;
          return (
            <div key={group.label} className="mt-4">
              <button
                type="button"
                onClick={() => setExpanded((s) => ({ ...s, [group.label]: !s[group.label] }))}
                aria-expanded={isOpen}
                aria-controls={groupId}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-white/45 hover:text-white/80"
              >
                <GroupIcon className="h-4 w-4" />
                <span className="flex-1 text-left">{group.label}</span>
                <ChevronIcon className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-90" : ""}`} />
              </button>
              <div id={groupId} hidden={!isOpen} className="mt-1 flex flex-col gap-0.5">
                {group.links.map((link) => {
                  const active = isActive(pathname, link);
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={Icon ? linkClass(active) : linkClass(active, true)}
                    >
                      {Icon && <Icon className="h-[18px] w-[18px]" />}
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-4">{bottomLinks.map(renderLink)}</div>
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <Link href="/admin/account" className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/6">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-extrabold text-text">
            {user.username.slice(0, 1).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-sm font-bold">{user.username}</span>
            <span className="block text-[11px] text-white/55">{user.role} · My account</span>
          </span>
          <UserIcon className="h-4 w-4 text-white/50" />
        </Link>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 px-3 py-2 text-xs font-bold text-white/85 hover:bg-white/10"
          >
            View site <ExternalIcon className="h-3.5 w-3.5" />
          </a>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white/20"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block">{sidebar}</aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 bg-text px-4 py-3 text-white lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-md p-1.5 hover:bg-white/10"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
          <span className="text-sm font-extrabold" style={{ fontFamily: "var(--font-heading)" }}>
            SOC Alliance Admin
          </span>
        </header>
        <main id="admin-main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
