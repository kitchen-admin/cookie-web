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
        "relative mt-0 flex flex-col overflow-x-hidden overflow-y-visible bg-linear-to-b from-white to-(--surface-hero-gradient-end) pt-0 scroll-mt-0 max-md:pb-8",
        heroSectionMinHeightClassName
      )}
      contentClassName={cn(
        "flex min-h-full flex-1 flex-col px-6 pb-10 md:px-20 lg:max-w-[1280px] lg:pb-14",
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
          heroDesktopStageClassName
        )}
        aria-hidden={!showHeroContent}
      >
        {/* Top-left: headline, subtext, store badges (Figma Frame 7). */}
        <div className="flex w-full max-w-[507px] flex-col items-start gap-2 text-left lg:absolute lg:top-0 lg:left-0 lg:z-10">
          <h1 className="type-display-hero text-(--text-display)">
            Fridge is full,
            <br />
            mind is empty?
          </h1>
          <p className="type-display-xs-medium text-text-brand-primary">
            Cookie turns the ingredients you already have into meals you
            actually love to eat.
          </p>
          <AppStoreBadges className="mt-2" />
        </div>

        {/* Bottom-right: fridge scan. L-brackets hug the 400px fridge, not this 808px box. */}
        <div className={heroFridgeClusterClassName}>
          <FridgeScanStage
            showFridge={showHeroContent}
            startScan={showHeroContent}
            stopAfterScan
            boxClassName="relative h-[400px] w-full max-w-[808px] overflow-visible"
          />
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
              className="absolute -top-2 right-0 size-10 origin-center -scale-y-100 rotate-90"
            />
            <Image
              src={siteImages.scanBracketBl}
              alt=""
              width={40}
              height={40}
              unoptimized
              className="absolute -bottom-px -left-1.5 size-10 origin-center -rotate-90 -scale-y-100"
            />
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
