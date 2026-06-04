"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { sectionContentClassName } from "@/config/layout";
import type { SectionId } from "@/config/sections";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: SectionId;
  className?: string;
  /** Extra classes on the inner 800px content column (e.g. flex layout for full-height hero). */
  contentClassName?: string;
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
  contentClassName,
  children,
  reveal = true,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <div className={cn(sectionContentClassName, contentClassName)}>
        {reveal ? <BlurFade inView>{children}</BlurFade> : children}
      </div>
    </section>
  );
}
