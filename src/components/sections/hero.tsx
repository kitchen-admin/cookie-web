"use client";

import { motion } from "motion/react";

import { DotPattern } from "@/components/ui/dot-pattern";
import { useHeroLoadSequence } from "@/components/hero-load-sequence-provider";
import { FridgeScanStage } from "@/components/sections/fridge-scan-stage";
import { Section } from "@/components/sections/section";
import { WaitlistForm } from "@/components/sections/waitlist-form";
import { HERO_CONTENT_REVEAL_MS } from "@/config/hero-load-sequence";
import {
  heroContentPaddingTopClassName,
  heroLeftColumnClassName,
  heroSectionContentClassName,
  heroSideBySideLayoutClassName,
} from "@/config/layout";
import { cn } from "@/lib/utils";

export function Hero() {
  const { showHeroContent, showFridge, startScan } = useHeroLoadSequence();

  return (
    <Section
      id="how-it-works"
      reveal={false}
      className="relative mt-0 flex min-h-dvh flex-col overflow-x-hidden overflow-y-visible rounded-b-[48px] bg-linear-to-b from-(--primitive-brand-25) to-(--primitive-brand-100) pb-12 pt-0 scroll-mt-0"
      contentClassName={cn(
        "flex min-h-full flex-1 flex-col pb-12",
        heroContentPaddingTopClassName,
        heroSectionContentClassName
      )}
    >
      <DotPattern
        className="opacity-30 text-(--primitive-brand-200)"
        width={20}
        height={20}
        cr={1}
      />

      <div
        className={cn(
          "relative flex w-full flex-1 items-center",
          heroSideBySideLayoutClassName
        )}
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
          className={cn(
            "flex w-full min-w-0 flex-col items-start gap-6 text-left lg:max-w-[480px] lg:shrink-0",
            heroLeftColumnClassName
          )}
          aria-hidden={!showHeroContent}
        >
          <div className="flex flex-col gap-2">
            <h1 className="type-display-xl-bold tracking-figma-tighter text-(--text-primary-black)">
              What if your kitchen knew{" "}
              <span className="text-text-brand-primary">what to cook?</span>
            </h1>
            <p className="type-body-lg-regular text-(--text-primary-black)">
              Cookie turns the ingredients you already have into meals you
              actually love to eat.
            </p>
          </div>
          <WaitlistForm className="w-full max-w-md" />
        </motion.div>

        <div className="relative flex shrink-0 items-center overflow-visible">
          <FridgeScanStage showFridge={showFridge} startScan={startScan} />
        </div>
      </div>
    </Section>
  );
}
