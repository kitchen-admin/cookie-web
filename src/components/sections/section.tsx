"use client";

import { SectionWave } from "@/components/section-wave";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  sectionContentClassName,
  sectionWaveOverlapClassName,
} from "@/config/layout";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
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
  /**
   * CSS color for a wavy top edge. Matches this section's fill so the previous
   * section shows through the wave valleys — no white gap.
   */
  waveFill?: string;
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
  waveFill,
}: SectionProps) {
  const hasOverlayLayers = background || foreground;
  const hasWave = Boolean(waveFill);

  const content = reveal ? <BlurFade inView>{children}</BlurFade> : children;

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24",
        hasWave && cn("z-10", sectionWaveOverlapClassName),
        !hasWave && className
      )}
    >
      {hasWave && waveFill ? <SectionWave fill={waveFill} /> : null}
      {background}
      {foreground}
      {hasWave ? (
        <div className={cn(className, "-mt-px")}>
          <div
            className={cn(
              sectionContentClassName,
              hasOverlayLayers && "relative z-10",
              contentClassName
            )}
          >
            {content}
          </div>
        </div>
      ) : (
        <div
          className={cn(
            sectionContentClassName,
            hasOverlayLayers && "relative z-10",
            contentClassName
          )}
        >
          {content}
        </div>
      )}
    </section>
  );
}
