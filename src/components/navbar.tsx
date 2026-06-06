"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";

import { DownloadAppLink } from "@/components/download-app-link";
import {
  NAVBAR_CONTENT_FADE_S,
  NAVBAR_PILL_EXPAND_S,
} from "@/config/hero-load-sequence";
import { navButtonGapClassName, navLogoHeightClassName } from "@/config/layout";
import { NAV_SECTIONS } from "@/config/sections";
import { siteImages } from "@/config/site-images";
import { cn } from "@/lib/utils";

const NAV_LINK_CLASS =
  "type-body-sm-medium shrink-0 rounded-full border-2 border-(--primitive-black-4) px-4 py-2 text-(--text-primary-black) transition-colors hover:bg-(--primitive-black-4)";

function handleHashNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void
) {
  if (!href.startsWith("#") || href.length < 2) return;

  const target = document.getElementById(href.slice(1));
  if (!target) return;

  event.preventDefault();

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
  window.history.pushState(null, "", href);
  onNavigate?.();
}

function NavSectionLinks({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <div className={className}>
      {NAV_SECTIONS.map((section) => (
        <Link
          key={section.id}
          href={`#${section.id}`}
          onClick={(event) =>
            handleHashNavClick(event, `#${section.id}`, onNavigate)
          }
          className={NAV_LINK_CLASS}
        >
          {section.navLabel}
        </Link>
      ))}
    </div>
  );
}

/** Desktop bar + mobile menu: How it works → About Us → Download App. */
function NavActions({
  className,
  onNavigate,
  showDownload = true,
}: {
  className?: string;
  onNavigate?: () => void;
  showDownload?: boolean;
}) {
  return (
    <div className={cn("flex items-center", className)}>
      <NavSectionLinks
        className={cn("flex items-center", navButtonGapClassName)}
        onNavigate={onNavigate}
      />
      {/* Extra space before the solid CTA so gaps look even to the eye. */}
      {showDownload ? (
        <DownloadAppLink className="ms-5" onNavigate={onNavigate} />
      ) : null}
    </div>
  );
}

export function Navbar() {
  const [showContent, setShowContent] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-x-0 top-6 z-50 flex flex-col items-center px-4"
    >
      <motion.nav
        initial={{ width: 60 }}
        animate={{ width: "100%" }}
        transition={{
          duration: NAVBAR_PILL_EXPAND_S,
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={() => setShowContent(true)}
        className={cn(
          "mx-auto flex h-[60px] w-full max-w-[800px] min-w-0 items-center overflow-hidden rounded-full bg-(--primitive-base-white)/80 px-2 shadow-lg backdrop-blur-md sm:px-3",
          showContent ? "justify-between" : "justify-center"
        )}
      >
        <motion.div
          initial={false}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: NAVBAR_CONTENT_FADE_S, ease: "easeOut" }}
          className={cn(
            "flex w-full min-w-0 items-center justify-between gap-2",
            !showContent && "pointer-events-none"
          )}
          aria-hidden={!showContent}
        >
          <Link href="/" className="flex min-w-0 shrink items-center">
            <Image
              src={siteImages.logoLight}
              alt="Cookie"
              width={180}
              height={36}
              priority
              className={cn(
                "w-auto object-contain object-left",
                navLogoHeightClassName
              )}
            />
          </Link>

          <NavActions className="hidden sm:flex" />

          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-(--text-primary-black) transition-colors hover:bg-(--primitive-black-4) sm:hidden"
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
        </motion.div>
      </motion.nav>

      {showContent && mobileOpen ? (
        <nav
          id="mobile-nav-menu"
          className="mx-auto mt-2 w-full max-w-[800px] rounded-2xl border-2 border-(--primitive-black-8) bg-(--primitive-base-white)/95 p-3 shadow-lg backdrop-blur-md sm:hidden"
        >
          <div className="flex flex-col gap-1">
            <NavSectionLinks
              className="flex flex-col gap-1"
              onNavigate={closeMobileMenu}
            />
            <DownloadAppLink
              className="justify-center"
              onNavigate={closeMobileMenu}
            />
          </div>
        </nav>
      ) : null}
    </motion.header>
  );
}
