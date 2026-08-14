"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "motion/react";

import {
  FloatingCard,
  type FloatingCardProps,
} from "@/components/sections/floating-card";
import { HeroRecipeBubble } from "@/components/sections/hero-recipe-bubble";
import { SiteImage } from "@/components/ui/site-image";
import {
  HERO_BUBBLE_HOLD_MS,
  HERO_BUBBLE_MERGE_MS,
  HERO_IMAGE_REVEAL_MS,
  HERO_RECIPE_APPEAR_MS,
  HERO_RECIPE_FLY_OFF_MS,
  HERO_RECIPE_HOLD_MS,
  HERO_RECIPE_OVERLAP_MS,
} from "@/config/hero-load-sequence";
import {
  HERO_MOBILE_SCAN_INGREDIENT_COUNT,
  HERO_SCAN_LOOPS,
} from "@/config/hero-scan-loops";
import {
  heroBubbleMergeFocalClassName,
  heroInteractionBoxClassName,
  heroInteractionPhaseFillClassName,
  heroRecipeAnchorClassName,
  heroStageFridgeBandClassName,
  heroStageFridgeClassName,
  heroStageFridgeViewportClassName,
  heroStageScanFrameClassName,
} from "@/config/layout";
import { siteImages } from "@/config/site-images";
import { cn } from "@/lib/utils";

/** One sweep duration (seconds). Scan keeps looping at this pace. */
const SWEEP_DURATION = 1.3;

/** Vertical range for the scan bar within the fridge frame (percent). */
const SCAN_TOP = "12%";
const SCAN_BOTTOM = "88%";

/** Tiny gap so the two cards on one swipe don’t pop at the same instant. */
const PAIR_STAGGER_MS = 100;

/** Matches Tailwind `md` — phones are anything narrower than 768px. */
const PHONE_MEDIA = "(max-width: 767px)";

function isPhoneViewport() {
  return window.matchMedia(PHONE_MEDIA).matches;
}

function useIsPhone() {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(PHONE_MEDIA);
    const update = () => setIsPhone(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isPhone;
}

function detectCountForViewport(total: number) {
  return isPhoneViewport()
    ? Math.min(HERO_MOBILE_SCAN_INGREDIENT_COUNT, total)
    : total;
}

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

type SweepDir = "down" | "up";

type HeroStagePhase =
  | "idle"
  | "scanning"
  | "mergingBubbles"
  | "showingRecipe"
  | "flyingOff";

type FridgeScanStageProps = {
  showFridge: boolean;
  startScan: boolean;
  /** Override the 560×400 stage shell. */
  boxClassName?: string;
};

function bubbleLayoutPhase(
  phase: HeroStagePhase
): FloatingCardProps["layoutPhase"] {
  if (phase === "mergingBubbles" || phase === "showingRecipe") {
    return "merging";
  }
  return "scattered";
}

/**
 * Hero visual: scan never stops. Each swipe down finds the top two
 * ingredients. Swipe up finds the rest (two on desktop, one on phones).
 * Those become a recipe, it flies off, and the next set starts with no pause.
 */
export function FridgeScanStage({
  showFridge,
  startScan,
  boxClassName = heroInteractionBoxClassName,
}: FridgeScanStageProps) {
  const isPhone = useIsPhone();
  const barControls = useAnimation();
  const mergeAnchorRef = useRef<HTMLDivElement>(null);
  const scanStartedRef = useRef(false);
  const sweepWaitersRef = useRef<Array<(dir: SweepDir) => void>>([]);
  const acceptDetectionsRef = useRef(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [phase, setPhase] = useState<HeroStagePhase>("idle");
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    HERO_SCAN_LOOPS[0].ingredients.map(() => false)
  );

  const loop = HERO_SCAN_LOOPS[loopIndex] ?? HERO_SCAN_LOOPS[0];
  const ingredients = isPhone
    ? loop.ingredients.slice(0, HERO_MOBILE_SCAN_INGREDIENT_COUNT)
    : loop.ingredients;
  const showBubbles =
    phase === "scanning" ||
    phase === "mergingBubbles" ||
    phase === "showingRecipe";
  const showRecipeCard =
    phase === "showingRecipe" || phase === "flyingOff";
  const bubblePhase = bubbleLayoutPhase(phase);

  function notifySweep(dir: SweepDir) {
    if (!acceptDetectionsRef.current) return;
    const waiter = sweepWaitersRef.current.shift();
    if (waiter) waiter(dir);
  }

  function waitForSweep() {
    return new Promise<SweepDir>((resolve) => {
      sweepWaitersRef.current.push(resolve);
    });
  }

  async function waitForDir(wanted: SweepDir, isCancelled: () => boolean) {
    while (!isCancelled()) {
      const dir = await waitForSweep();
      if (dir === wanted) return;
    }
  }

  function resetRevealed(count: number) {
    setRevealed(Array.from({ length: count }, () => false));
  }

  function revealAt(index: number) {
    setRevealed((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }

  async function revealPair(first: number, second: number) {
    revealAt(first);
    await sleep(PAIR_STAGGER_MS);
    revealAt(second);
  }

  // Scan line never stops — it keeps sweeping while recipes are made.
  useEffect(() => {
    if (!startScan) return;

    let cancelled = false;

    async function sweepForever() {
      await barControls.set({ top: SCAN_TOP, opacity: 1 });

      while (!cancelled) {
        const downSweep = barControls.start({
          top: SCAN_BOTTOM,
          opacity: 1,
          transition: { duration: SWEEP_DURATION, ease: "easeInOut" },
        });
        // Mid-swipe: the line is crossing the fridge, so detect now.
        await sleep((SWEEP_DURATION * 1000) / 2);
        if (cancelled) return;
        notifySweep("down");
        await downSweep;
        if (cancelled) return;

        const upSweep = barControls.start({
          top: SCAN_TOP,
          opacity: 1,
          transition: { duration: SWEEP_DURATION, ease: "easeInOut" },
        });
        await sleep((SWEEP_DURATION * 1000) / 2);
        if (cancelled) return;
        notifySweep("up");
        await upSweep;
      }
    }

    void sweepForever();

    return () => {
      cancelled = true;
      barControls.stop();
    };
  }, [startScan, barControls]);

  useEffect(() => {
    if (!startScan || scanStartedRef.current) return;
    scanStartedRef.current = true;

    let cancelled = false;

    async function runLoops() {
      let index = 0;
      let isFirstLoop = true;

      while (!cancelled) {
        const current = HERO_SCAN_LOOPS[index];
        const detectCount = detectCountForViewport(current.ingredients.length);
        setLoopIndex(index);
        resetRevealed(detectCount);
        setPhase("scanning");
        sweepWaitersRef.current = [];
        acceptDetectionsRef.current = true;

        if (isFirstLoop) {
          // First loop: wait for the down swipe so the scan “finds” the cards.
          await waitForDir("down", () => cancelled);
          if (cancelled) return;
        }

        await revealPair(0, 1);
        if (cancelled) return;

        // Rest of the set: next swipe (up on the first loop, whichever comes
        // next after that so we don’t sit on an empty fridge).
        if (isFirstLoop) {
          await waitForDir("up", () => cancelled);
        } else {
          await waitForSweep();
        }
        if (cancelled) return;
        if (detectCount <= 3) {
          revealAt(2);
        } else {
          await revealPair(2, 3);
        }
        if (cancelled) return;
        isFirstLoop = false;

        // Stop listening so leftover swipes can’t dump the next set.
        acceptDetectionsRef.current = false;

        // Cards are out. Let them sit, then merge into the recipe.
        await sleep(HERO_BUBBLE_HOLD_MS);
        if (cancelled) return;

        setPhase("mergingBubbles");
        await sleep(HERO_RECIPE_OVERLAP_MS);
        if (cancelled) return;

        setPhase("showingRecipe");
        await sleep(
          HERO_BUBBLE_MERGE_MS -
            HERO_RECIPE_OVERLAP_MS +
            HERO_RECIPE_APPEAR_MS +
            HERO_RECIPE_HOLD_MS
        );
        if (cancelled) return;

        setPhase("flyingOff");
        await sleep(HERO_RECIPE_FLY_OFF_MS);
        if (cancelled) return;

        index = (index + 1) % HERO_SCAN_LOOPS.length;
      }
    }

    void runLoops();

    return () => {
      cancelled = true;
      acceptDetectionsRef.current = false;
      sweepWaitersRef.current.splice(0).forEach((resolve) => {
        resolve("down");
      });
    };
  }, [startScan]);

  return (
    <div className={boxClassName}>
      <div className={heroInteractionPhaseFillClassName}>
        <div className={heroStageFridgeBandClassName}>
          <div className={heroStageFridgeViewportClassName}>
            {showFridge ? (
              <motion.div
                initial={false}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: HERO_IMAGE_REVEAL_MS / 1000,
                  ease: "easeInOut",
                }}
                className={heroStageFridgeClassName}
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
            ) : null}

            {startScan ? (
              <div className={heroStageScanFrameClassName}>
                <motion.div
                  initial={{ top: SCAN_TOP, opacity: 1 }}
                  animate={barControls}
                  className="absolute right-0 left-0"
                  aria-hidden
                >
                  <div className="h-0.5 bg-(--primitive-brand-500)/45 shadow-[0_0_8px_rgba(255,68,5,0.35)]" />
                  <div className="h-5 bg-linear-to-b from-(--primitive-brand-500)/18 via-(--primitive-brand-500)/8 to-transparent" />
                </motion.div>
              </div>
            ) : null}
          </div>

          <div
            ref={mergeAnchorRef}
            className={cn(
              "pointer-events-none absolute z-0 h-px w-px",
              heroRecipeAnchorClassName
            )}
            aria-hidden
          />

          {startScan && showBubbles
            ? ingredients.map((bubble, index) =>
                revealed[index] ? (
                  <FloatingCard
                    key={`${loop.recipe.title}-${bubble.name}`}
                    {...bubble}
                    visible
                    layoutPhase={bubblePhase}
                    mergeAnchorRef={mergeAnchorRef}
                  />
                ) : null
              )
            : null}

          {showRecipeCard ? (
            <motion.div
              className={cn(
                "pointer-events-none absolute z-40",
                heroBubbleMergeFocalClassName
              )}
              initial={{ opacity: 0, filter: "blur(0px)" }}
              animate={
                phase === "flyingOff"
                  ? { opacity: 0, filter: "blur(8px)" }
                  : { opacity: 1, filter: "blur(0px)" }
              }
              transition={{
                duration:
                  phase === "flyingOff"
                    ? HERO_RECIPE_FLY_OFF_MS / 1000
                    : HERO_RECIPE_APPEAR_MS / 1000,
                ease: "easeIn",
              }}
            >
              <HeroRecipeBubble imageUrl={loop.recipe.imageUrl} />
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
