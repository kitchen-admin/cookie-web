"use client";

import Link from "next/link";

import { AppStoreBadges } from "@/components/app-store-badges";
import { SectionWave } from "@/components/section-wave";
import { SocialLinks } from "@/components/social-links";
import {
  FOOTER_COPYRIGHT,
  FOOTER_HEADING,
  FOOTER_NAV_LINKS,
} from "@/config/footer-links";
import { sectionWaveOverlapClassName } from "@/config/layout";
import { handleHashNavClick } from "@/lib/hash-nav";
import { cn } from "@/lib/utils";

export function Footer() {
  const [headingLine1, headingLine2] = FOOTER_HEADING.split("\n");

  return (
    <footer
      className={cn(
        "relative z-20 w-full [overflow-anchor:none] text-(--text-on-maroon)",
        sectionWaveOverlapClassName
      )}
    >
      <SectionWave fill="var(--surface-footer)" />
      <div className="-mt-px bg-(--surface-footer)">
        <div className="mx-auto flex min-h-[380px] w-full max-w-[1280px] flex-col justify-end px-6 pb-10 pt-12 md:px-20">
          <div className="flex w-full flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="flex max-w-[534px] flex-col gap-2 max-md:mx-auto max-md:items-center max-md:text-center">
              <h2 className="type-display-footer text-center text-(--text-on-maroon) md:text-left">
                {headingLine1}
                <br />
                {headingLine2}
              </h2>
              <AppStoreBadges className="mt-2 justify-center md:justify-start" />
              <p className="type-body-sm-regular mt-2 text-(--text-on-maroon)">
                {FOOTER_COPYRIGHT}
              </p>
            </div>

            <div className="flex w-full max-w-[144px] flex-col items-center gap-4 max-md:mx-auto md:items-end">
              <nav className="flex w-full flex-col items-center gap-4 md:items-end">
                {FOOTER_NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(event) => handleHashNavClick(event, link.href)}
                    className="type-body-md-semibold w-full text-center text-(--text-on-maroon) md:text-right"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <SocialLinks className="justify-center md:justify-end" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
