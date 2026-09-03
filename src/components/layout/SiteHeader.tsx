"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav } from "@/lib/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Only the homepage has a full-bleed hero to show through — every other
  // page needs a readable solid header from the first pixel of scroll.
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer on Escape and trap focus while it's open.
  useEffect(() => {
    if (!mobileOpen) return;

    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusable?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-9 z-40 h-20 border-b backdrop-blur-[2px] transition-colors duration-300 ${
        transparent
          ? "border-white/30 bg-gradient-to-b from-black/40 via-black/15 to-transparent"
          : "border-slate-200 bg-slate-50/80 shadow-md supports-[backdrop-filter]:bg-slate-50/70"
      }`}
    >
      <div className="mx-auto flex h-full max-w-(--container-content) items-center justify-between gap-4 px-6 py-2">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={transparent ? "/soc-logo-mark-white.png" : "/soc-logo-mark.png"}
            alt="SOC Alliance logo"
            width={764}
            height={446}
            priority
            className="h-7 w-auto sm:h-8"
          />
          <span className="flex flex-col justify-center leading-tight">
            <span
              aria-hidden="true"
              className={`block text-sm font-bold uppercase sm:text-base ${
                transparent ? "text-white" : "text-primary"
              }`}
              style={{ textAlign: "justify", textAlignLast: "justify" }}
            >
              A L L I A N C E
            </span>
            <span className="sr-only">Alliance</span>
            <span
              className={`whitespace-nowrap text-[9px] font-semibold uppercase tracking-wide sm:text-[10px] ${
                transparent ? "text-white/75" : "text-text-muted"
              }`}
            >
              Support Our Community
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setOpenDesktopMenu(item.label)}
              onMouseLeave={() => item.children && setOpenDesktopMenu(null)}
            >
              {item.children ? (
                <>
                  <button
                    type="button"
                    className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      transparent ? "text-white hover:text-white/70" : "text-text hover:text-primary"
                    }`}
                    aria-expanded={openDesktopMenu === item.label}
                    onClick={() =>
                      setOpenDesktopMenu((cur) => (cur === item.label ? null : item.label))
                    }
                  >
                    {item.label}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {openDesktopMenu === item.label && (
                    <ul className="dropdown-in absolute left-0 top-full min-w-56 rounded-card border border-black/5 bg-background py-2 shadow-lg">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 text-sm text-text transition-colors hover:bg-surface hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    transparent ? "text-white hover:text-white/70" : "text-text hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="tel:+17736932222"
            className={`hidden items-center gap-2.5 xl:flex ${transparent ? "text-white" : "text-text"}`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                transparent ? "bg-white/15" : "bg-surface"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                <path d="M4.5 4.5h3.2l1.6 4-2 1.5a11 11 0 0 0 5.7 5.7l1.5-2 4 1.6v3.2c0 1-.9 1.8-1.9 1.6C9.9 19.3 4.7 14.1 3 7.4 2.8 6.4 3.6 5.5 4.5 4.5Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className={`block text-[11px] font-medium ${transparent ? "text-white/70" : "text-text-muted"}`}>
                Contact Us
              </span>
              <span className="block text-sm font-bold">773-693-2222</span>
            </span>
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-md lg:hidden ${
              transparent ? "text-white" : "text-text"
            }`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="border-t border-black/5 bg-background lg:hidden"
        >
          <nav aria-label="Primary mobile" className="mx-auto max-w-(--container-content) px-6 py-4">
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-3 text-base font-semibold uppercase tracking-wide text-text"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mb-2 ml-3 flex flex-col gap-1 border-l border-black/10 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-md px-2 py-2 text-sm text-text-muted"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
