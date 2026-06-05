"use client";

/**
 * STAGED — not mounted anywhere yet.
 *
 * Right-column hero interaction: fridge scan → cooking beat → recipe finale.
 * Wire this into the second section ("How it Works") when ready.
 *
 * Depends on `HeroLoadSequenceProvider` for `showFridge` / `startScan` timing.
 */

import { useHeroLoadSequence } from "@/components/hero-load-sequence-provider";
import { FridgeScanStage } from "@/components/sections/fridge-scan-stage";

export function HowItWorksInteraction() {
  const { showFridge, startScan } = useHeroLoadSequence();

  return (
    <div className="relative flex shrink-0 items-center overflow-visible">
      <FridgeScanStage showFridge={showFridge} startScan={startScan} />
    </div>
  );
}
