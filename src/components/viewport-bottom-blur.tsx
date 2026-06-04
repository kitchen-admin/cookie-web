"use client";

import { ProgressiveBlur } from "@/components/ui/progressive-blur";

/**
 * Fixed progressive blur at the bottom of the viewport (all pages).
 * Heights: 32px (phone) → 80px (md+, small laptop & 1080p).
 */
export function ViewportBottomBlur() {
  return (
    <ProgressiveBlur
      className="fixed inset-x-0 bottom-0 z-40 h-[32px] md:h-[80px]"
      position="bottom"
    />
  );
}
