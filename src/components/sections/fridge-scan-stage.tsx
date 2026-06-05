"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "motion/react";

import {
  HeroCookingBeat,
  HeroRecipeRow,
} from "@/components/sections/hero-cooking-presentation";
import {
  heroBubbleMergeFocalClassName,
  heroInteractionBoxClassName,
  heroInteractionPhaseFillClassName,
  heroStageFridgeBandClassName,
  heroStageFridgeClassName,
  heroStageFridgeViewportClassName,
  heroStageScanFrameClassName,
} from "@/config/layout";
import {
  FloatingCard,
  type FloatingCardProps,
} from "@/components/sections/floating-card";
import { SiteImage } from "@/components/ui/site-image";
import {
  HERO_COOKING_BEAT_MS,
  HERO_IMAGE_REVEAL_MS,
} from "@/config/hero-load-sequence";
import { siteImages } from "@/config/site-images";
import { cn } from "@/lib/utils";

/** One sweep duration (seconds). */
const SWEEP_DURATION = 1.15;

/** Vertical range for the scan bar within the fridge frame (percent). */
const SCAN_TOP = "12%";
const SCAN_BOTTOM = "88%";

const FRIDGE_COLLAPSE_MS = 550;
const BUBBLE_MERGE_MS = 550;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

type HeroStagePhase =
  | "idle"
  | "scanning"
  | "collapsingFridge"
  | "mergingBubbles"
  | "cooking"
  | "recipes";

export type IngredientBubbleConfig = Omit<
  FloatingCardProps,
  "delay" | "visible" | "layoutPhase"
>;

/** Original hero positions; reveal order follows scan sweeps. */
const INGREDIENT_BUBBLES: IngredientBubbleConfig[] = [
  {
    name: "Broccoli",
    days: 4,
    imageUrl: siteImages.broccoli,
    side: "left",
    positionClassName: "left-[7%] top-[27%] max-md:left-0 max-md:top-[20%]",
  },
  {
    name: "Mushroom",
    days: 4,
    imageUrl: siteImages.mushroom,
    side: "left",
    positionClassName: "left-0 top-[56%] max-md:hidden",
  },
  {
    name: "Carrots",
    days: 2,
    imageUrl: siteImages.carrot,
    side: "right",
    positionClassName: "right-[0%] top-[3%] max-md:right-0 max-md:top-[8%]",
  },
  {
    name: "Mixed berry",
    days: 2,
    imageUrl: siteImages.berry,
    side: "right",
    positionClassName: "right-[0%] top-[54%] max-md:right-0 max-md:top-[48%]",
  },
];

type FridgeScanStageProps = {
  showFridge: boolean;
  startScan: boolean;
};

function bubbleLayoutPhase(
  phase: HeroStagePhase
): FloatingCardProps["layoutPhase"] {
  if (phase === "mergingBubbles") return "merging";
  return "scattered";
}

const BUBBLE_VISIBLE_PHASES: HeroStagePhase[] = [
  "scanning",
  "collapsingFridge",
  "mergingBubbles",
];

/**
 * Hero visual: scan → fridge shrinks away → bubbles merge & hide →
 * Cookie mascot + copy → recipe cards.
 */
export function FridgeScanStage({ showFridge, startScan }: FridgeScanStageProps) {
  const barControls = useAnimation();
  const scanStartedRef = useRef(false);
  const [phase, setPhase] = useState<HeroStagePhase>("idle");
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    INGREDIENT_BUBBLES.map(() => false)
  );
  const [showScanBar, setShowScanBar] = useState(true);

  const fridgeShrunk =
    phase === "collapsingFridge" ||
    phase === "mergingBubbles" ||
    phase === "cooking" ||
    phase === "recipes";

  const showCooking = phase === "cooking";
  const showRecipes = phase === "recipes";
  const showBubbles = BUBBLE_VISIBLE_PHASES.includes(phase);
  const bubblePhase = bubbleLayoutPhase(phase);

  useEffect(() => {
    if (!startScan || scanStartedRef.current) return;
    scanStartedRef.current = true;

    let cancelled = false;

    async function runSequence() {
      setPhase("scanning");
      await barControls.set({ top: SCAN_TOP, opacity: 1 });

      for (let i = 0; i < INGREDIENT_BUBBLES.length; i++) {
        const targetY = i % 2 === 0 ? SCAN_BOTTOM : SCAN_TOP;

        await barControls.start({
          top: targetY,
          opacity: 1,
          transition: { duration: SWEEP_DURATION, ease: "easeInOut" },
        });

        if (cancelled) return;

        setRevealed((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }

      if (cancelled) return;

      await barControls.start({
        opacity: 0,
        transition: { duration: 0.35, ease: "easeOut" },
      });
      setShowScanBar(false);

      setPhase("collapsingFridge");
      await sleep(FRIDGE_COLLAPSE_MS);
      if (cancelled) return;

      setPhase("mergingBubbles");
      await sleep(BUBBLE_MERGE_MS);
      if (cancelled) return;

      setPhase("cooking");
      await sleep(HERO_COOKING_BEAT_MS);
      if (cancelled) return;

      setPhase("recipes");
    }

    void runSequence();

    return () => {
      cancelled = true;
    };
  }, [startScan, barControls]);

  const fridgeOnScreen = showFridge && !fridgeShrunk;

  return (
    <div className={heroInteractionBoxClassName}>
      {/* Scan → cook — lives inside the same 560×400 box as the recipe finale. */}
      {!showRecipes ? (
      <div className={heroInteractionPhaseFillClassName}>
      <div className={heroStageFridgeBandClassName}>
      <div className={heroStageFridgeViewportClassName}>
      {/* Fridge image — shrinks to zero after scan */}
      {(showFridge || fridgeShrunk) && (
        <motion.div
          initial={false}
          animate={{
            opacity: fridgeOnScreen ? 1 : 0,
            scale: fridgeOnScreen ? 1 : 0,
            y: 0,
          }}
          transition={{
            duration: fridgeShrunk
              ? FRIDGE_COLLAPSE_MS / 1000
              : HERO_IMAGE_REVEAL_MS / 1000,
            ease: "easeInOut",
          }}
          className={heroStageFridgeClassName}
          aria-hidden={!fridgeOnScreen}
        >
          <SiteImage
            src={siteImages.fridge}
            alt="Open refrigerator filled with fresh ingredients"
            width={400}
            height={400}
            priority
            className="max-h-full w-auto max-w-full rounded-3xl object-contain"
            style={{ width: "auto", height: "auto", maxHeight: "100%" }}
            placeholderClassName="size-full rounded-3xl"
          />
        </motion.div>
      )}

      {/* Scan bar — sweeps the centered fridge viewport */}
      {startScan && showScanBar ? (
        <div className={heroStageScanFrameClassName}>
          <motion.div
            initial={{ top: SCAN_TOP, opacity: 1 }}
            animate={barControls}
            className="absolute right-0 left-0"
            aria-hidden
          >
            <div className="h-[2px] bg-(--primitive-brand-500)/45 shadow-[0_0_8px_rgba(255,68,5,0.35)]" />
            <div className="h-5 bg-linear-to-b from-(--primitive-brand-500)/18 via-(--primitive-brand-500)/8 to-transparent" />
          </motion.div>
        </div>
      ) : null}
      </div>

      {/* Ingredient bubbles */}
      {startScan && showBubbles
        ? INGREDIENT_BUBBLES.map((bubble, index) => (
            <FloatingCard
              key={bubble.name}
              {...bubble}
              visible={revealed[index]}
              layoutPhase={bubblePhase}
            />
          ))
        : null}

      {/* Logo + copy at bubble merge focal point (42% of stage band) */}
      {showCooking ? (
        <div
          className={cn(
            "pointer-events-none absolute z-20",
            heroBubbleMergeFocalClassName
          )}
        >
          <HeroCookingBeat showLogo showCopy />
        </div>
      ) : null}
      </div>
      </div>
      ) : null}

      <HeroRecipeRow active={showRecipes} fillBox />
    </div>
  );
}
