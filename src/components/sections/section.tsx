"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import type { SectionId } from "@/config/sections";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: SectionId;
  className?: string;
  children: React.ReactNode;
  /** Scroll-triggered fade via BlurFade. Set false when the section has its own animation. */
  reveal?: boolean;
}

/**
 * Shared wrapper for every page section: anchor id, scroll offset for the floating nav,
 * and optional scroll-reveal animation.
 */
export function Section({
  id,
  className,
  children,
  reveal = true,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      {reveal ? <BlurFade inView>{children}</BlurFade> : children}
    </section>
  );
}
