"use client";

import { motion } from "motion/react";

import { AuroraText } from "@/components/ui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { useHeroLoadSequence } from "@/components/hero-load-sequence-provider";
import { FridgeScanStage } from "@/components/sections/fridge-scan-stage";
import { Section } from "@/components/sections/section";
import { WaitlistForm } from "@/components/sections/waitlist-form";
import { HERO_CONTENT_REVEAL_MS } from "@/config/hero-load-sequence";
import { heroContentPaddingTopClassName } from "@/config/layout";

const BRAND_AURORA_COLORS = [
  "var(--primitive-brand-300)",
  "var(--primitive-brand-500)",
  "var(--primitive-brand-700)",
  "var(--primitive-brand-400)",
];

export function Hero() {
  const { showHeroContent, showFridge, startScan } = useHeroLoadSequence();

  return (
    <Section
      id="how-it-works"
      reveal={false}
      className="relative mt-0 flex min-h-dvh flex-col overflow-x-hidden overflow-y-visible rounded-b-[48px] bg-linear-to-b from-(--primitive-brand-25) to-(--primitive-brand-100) pb-12 pt-0 scroll-mt-0"
      contentClassName="flex min-h-full flex-1 flex-col"
    >
      <DotPattern
        className="opacity-30 text-(--primitive-brand-200)"
        width={20}
        height={20}
        cr={1}
      />

      <div
        className={`relative flex w-full flex-1 flex-col items-center justify-start gap-8 text-center ${heroContentPaddingTopClassName}`}
      >
        <motion.div
          initial={false}
          animate={{
            opacity: showHeroContent ? 1 : 0,
            y: showHeroContent ? 0 : 12,
            filter: showHeroContent ? "blur(0px)" : "blur(6px)",
          }}
          transition={{
            duration: HERO_CONTENT_REVEAL_MS / 1000,
            ease: "easeOut",
          }}
          className="flex w-full flex-col items-center gap-6 pt-0"
          aria-hidden={!showHeroContent}
        >
          <div className="flex flex-col gap-2">
            <h1 className="type-display-xl-bold tracking-figma-tighter text-(--text-primary-black)">
              What if your kitchen knew
              <br />
              <AuroraText colors={BRAND_AURORA_COLORS} className="type-display-xl-bold">
                what to cook?
              </AuroraText>
            </h1>
            <p className="type-body-lg-regular text-(--text-primary-black)">
              Cookie turns the ingredients you already have
              <br />
              into meals you actually love to eat.
            </p>
          </div>
          <WaitlistForm />
        </motion.div>

        <div className="relative flex min-h-0 w-full flex-1 overflow-visible">
          <FridgeScanStage showFridge={showFridge} startScan={startScan} />
        </div>
      </div>
    </Section>
  );
}
