"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { NAV_ITEMS } from "@/config/sections";
import { siteImages } from "@/config/site-images";
import { handleHashNavClick } from "@/lib/hash-nav";
import { cn } from "@/lib/utils";

const NAV_LINK_CLASS =
  "type-body-md-semibold shrink-0 px-4 py-2.5 text-(--text-display)";

function NavLinks({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className={className}>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={(event) => handleHashNavClick(event, item.href, onNavigate)}
          className={cn(
            NAV_LINK_CLASS,
            pathname === item.href && "underline underline-offset-4"
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="absolute inset-x-0 top-10 z-50 flex flex-col items-center px-6 md:px-20">
      <nav className="mx-auto flex h-10 w-full max-w-280 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-0.5"
          aria-label="Cookie home"
          onClick={(event) => {
            if (window.location.pathname !== "/") return;
            event.preventDefault();
            window.history.pushState(null, "", "/");
            const prefersReducedMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches;
            window.scrollTo({
              top: 0,
              behavior: prefersReducedMotion ? "auto" : "smooth",
            });
          }}
        >
          <Image
            src={siteImages.logoMark}
            alt="Cookie"
            width={188}
            height={40}
            priority
            className="h-10 w-auto object-contain object-left"
          />
        </Link>

        <NavLinks className="hidden items-center sm:flex" />

        <button
          type="button"
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-(--text-display) sm:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X className="size-5" aria-hidden />
          ) : (
            <Menu className="size-5" aria-hidden />
          )}
        </button>
      </nav>

      {mobileOpen ? (
        <nav
          id="mobile-nav-menu"
          className="mx-auto mt-2 w-full max-w-280 rounded-2xl border-2 border-(--primitive-black-8) bg-(--primitive-base-white)/95 p-3 shadow-lg backdrop-blur-md sm:hidden"
        >
          <NavLinks
            className="flex flex-col gap-1"
            onNavigate={closeMobileMenu}
          />
        </nav>
      ) : null}
    </header>
  );
}
