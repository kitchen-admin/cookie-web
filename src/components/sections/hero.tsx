"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { AppStoreBadges } from "@/components/app-store-badges";
import { useHeroLoadSequence } from "@/components/hero-load-sequence-provider";
import { FridgeScanStage } from "@/components/sections/fridge-scan-stage";
import { Section } from "@/components/sections/section";
import { HERO_CONTENT_REVEAL_MS } from "@/config/hero-load-sequence";
import {
  heroCopyPaddingTopClassName,
  heroDesktopStageClassName,
  heroFridgeClusterClassName,
  heroMobileStageClipClassName,
  heroMobileStageInnerClassName,
  heroSectionMinHeightClassName,
  heroStageFridgeViewportClassName,
} from "@/config/layout";
import { siteImages } from "@/config/site-images";
import { cn } from "@/lib/utils";

export function Hero() {
  const { showHeroContent } = useHeroLoadSequence();

  return (
    <Section
      id="hero"
      reveal={false}
      className={cn(
        "relative mt-0 flex flex-col overflow-x-hidden overflow-y-visible bg-linear-to-b from-white to-(--surface-hero-gradient-end) pt-0 scroll-mt-0 max-md:overflow-hidden max-md:pb-4",
        heroSectionMinHeightClassName
      )}
      contentClassName={cn(
        "flex min-h-full flex-1 flex-col px-6 pb-10 md:px-20 lg:max-w-[1280px] lg:pb-14",
        "max-md:h-full max-md:min-h-0 max-md:pb-0",
        heroCopyPaddingTopClassName
      )}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: showHeroContent ? 1 : 0,
          y: showHeroContent ? 0 : 12,
        }}
        transition={{
          duration: HERO_CONTENT_REVEAL_MS / 1000,
          ease: "easeOut",
        }}
        className={cn(
          "flex w-full flex-col items-center gap-10",
          // Phones: copy on top, leftover space is the fridge stage.
          "max-md:h-full max-md:min-h-0 max-md:flex-1 max-md:justify-start max-md:gap-3",
          heroDesktopStageClassName
        )}
        aria-hidden={!showHeroContent}
      >
        {/* Top-left: headline, subtext, store badges (Figma Frame 7). */}
        <div className="relative z-20 flex w-full max-w-[507px] shrink-0 flex-col items-start gap-2 text-left max-md:items-center max-md:text-center lg:absolute lg:top-0 lg:left-0">
          <h1 className="type-display-hero text-(--text-display)">
            Fridge is full,
            <br />
            mind is empty?
          </h1>
          <p className="type-display-xs-medium text-text-brand-primary">
            Cookie turns the ingredients you already have into meals you
            actually love to eat.
          </p>
          <AppStoreBadges className="mt-2 max-md:mx-auto" />
        </div>

        {/* Bottom-right: fridge scan. Orange L-marks sit on the fridge image corners. */}
        <div className={heroFridgeClusterClassName}>
          {/* Mobile: scale fridge + cards + marks as one unit so they stay locked. */}
          <div className={heroMobileStageClipClassName}>
            <div className={heroMobileStageInnerClassName}>
              <FridgeScanStage
                showFridge={showHeroContent}
                startScan={showHeroContent}
                boxClassName="relative h-[400px] w-full max-w-[808px] overflow-visible max-md:size-full max-md:max-w-none"
              />
              {/* Same square box as the fridge photo — marks sit 8px inside the edges. */}
              <div
                className={cn(
                  heroStageFridgeViewportClassName,
                  "pointer-events-none z-20"
                )}
                aria-hidden
              >
                <Image
                  src={siteImages.scanBracketTr}
                  alt=""
                  width={40}
                  height={40}
                  unoptimized
                  className="absolute top-2 right-2 size-10 origin-center -scale-y-100 rotate-90"
                />
                <Image
                  src={siteImages.scanBracketBl}
                  alt=""
                  width={40}
                  height={40}
                  unoptimized
                  className="absolute bottom-2 left-2 size-10 origin-center -rotate-90 -scale-y-100"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
