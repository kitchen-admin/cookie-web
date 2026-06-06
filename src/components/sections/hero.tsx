"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { useHeroLoadSequence } from "@/components/hero-load-sequence-provider";
import { Section } from "@/components/sections/section";
import { WaitlistForm } from "@/components/sections/waitlist-form";
import { HERO_CONTENT_REVEAL_MS } from "@/config/hero-load-sequence";
import {
  HERO_FG_HEIGHT_PX,
  HERO_FG_WIDTH_PX,
  heroContentPaddingTopClassName,
  heroMessageMaxClassName,
} from "@/config/layout";
import { siteImages } from "@/config/site-images";
import { cn } from "@/lib/utils";

/** Shared classes for full-width hero art (no cropping). */
const heroFullWidthImageClassName = "block h-auto w-full max-w-none";
const heroFullWidthImageStyle = { width: "100%", height: "auto" } as const;

export function Hero() {
  const { showHeroContent } = useHeroLoadSequence();

  return (
    <Section
      id="hero"
      reveal={false}
      className="relative mt-0 flex min-h-dvh flex-col overflow-x-hidden overflow-y-visible rounded-b-[48px] bg-(--primitive-brand-25) pb-12 pt-0 scroll-mt-0"
      foreground={
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-5 w-screen max-w-none -translate-x-1/2"
          aria-hidden
        >
          <Image
            src={siteImages.heroFg}
            alt=""
            width={HERO_FG_WIDTH_PX}
            height={HERO_FG_HEIGHT_PX}
            priority
            unoptimized
            sizes="100vw"
            className={heroFullWidthImageClassName}
            style={heroFullWidthImageStyle}
          />
        </div>
      }
      contentClassName={cn(
        "flex min-h-full flex-1 flex-col items-center justify-start pb-12 text-center",
        heroMessageMaxClassName,
        heroContentPaddingTopClassName
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
          "relative flex w-full flex-col items-center gap-6",
          heroMessageMaxClassName
        )}
        aria-hidden={!showHeroContent}
      >
        <div className="flex flex-col gap-3">
          <h1 className="type-display-2xl-medium tracking-figma-tighter text-(--text-primary-black)">
            Home food should feel exciting, not repetitive, stressful, or boring.
          </h1>
          <p className="type-display-xs-medium text-text-brand-primary">
            What if your kitchen knew what to cook?
          </p>
        </div>
        <WaitlistForm className="mx-auto w-full max-w-md" />
      </motion.div>
    </Section>
  );
}
