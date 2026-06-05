"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { sectionContentClassName } from "@/config/layout";
import type { SectionId } from "@/config/sections";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: SectionId;
  className?: string;
  /** Full-bleed layer behind the content column (e.g. hero background image). */
  background?: React.ReactNode;
  /** Full-bleed layer above background, below content (e.g. hero counter foreground). */
  foreground?: React.ReactNode;
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
  background,
  foreground,
  contentClassName,
  children,
  reveal = true,
}: SectionProps) {
  const hasOverlayLayers = background || foreground;

  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      {background}
      {foreground}
      <div
        className={cn(
          sectionContentClassName,
          hasOverlayLayers && "relative z-10",
          contentClassName
        )}
      >
        {reveal ? <BlurFade inView>{children}</BlurFade> : children}
      </div>
    </section>
  );
}
