"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import type { MouseEvent } from "react";

import { cn } from "@/lib/utils";

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

export function DownloadAppLink({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="#download"
      onClick={(event) => handleHashNavClick(event, "#download", onNavigate)}
      className={cn(
        "type-body-sm-bold flex shrink-0 items-center gap-2 rounded-full bg-(--primitive-black-90) px-4 py-2 text-(--primitive-base-white) transition-opacity hover:opacity-90",
        className
      )}
    >
      <Download className="size-[18px]" aria-hidden />
      Download App
    </Link>
  );
}
