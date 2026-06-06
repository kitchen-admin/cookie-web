"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

import { HeroRecipeCard } from "@/components/sections/hero-recipe-card";
import {
  HERO_RECIPES,
  HERO_RECIPE_SUGGESTION_MESSAGE,
} from "@/config/hero-recipes";
import {
  HERO_RECIPE_CARD_REVEAL_S,
  HERO_RECIPE_SUGGESTION_CARDS_DELAY_MS,
  HERO_RECIPE_SUGGESTION_MESSAGE_DELAY_MS,
} from "@/config/hero-load-sequence";
import {
  HERO_RECIPE_CARD_GAP_PX,
  HERO_RECIPE_ROW_WIDTH_PX,
} from "@/config/hero-recipe-card-layout";
import {
  HERO_RECIPE_CARDS_MESSAGE_ALIGN_OFFSET_PX,
  heroInteractionRecipeVCenterClassName,
  heroInteractionRecipeVStartClassName,
  heroRecipeSuggestionAboveCardsClassName,
  heroRecipeSuggestionLogoGapClassName,
} from "@/config/layout";
import { siteImages } from "@/config/site-images";
import { cn } from "@/lib/utils";

const REVEAL_EASE = "easeInOut" as const;

/**
 * Cookie copy in the fridge animation — visually 14px on mobile.
 * The How it Works wrapper scales to 72%; we pre-size text so it lands at 14px after scale.
 */
const MOBILE_COOKIE_MESSAGE_CLASS =
  "max-md:!text-[calc(0.875rem/var(--hiw-mobile-scale,1))] max-md:!leading-[calc(1.25rem/var(--hiw-mobile-scale,1))]";

/** Width of logo + message + cards block when right-aligned in the 560px box. */
const HERO_RECIPE_FINALE_GROUP_WIDTH_PX =
  HERO_RECIPE_ROW_WIDTH_PX + HERO_RECIPE_CARDS_MESSAGE_ALIGN_OFFSET_PX;

/** 1 = logo, 2 = message, 3 = recipe cards */
type RecipeFinaleStep = 0 | 1 | 2 | 3;

/** Logo + “Cookie is cooking” — center stage during cooking beat. */
export function HeroCookingBeat({
  showLogo,
  showCopy,
}: {
  showLogo: boolean;
  showCopy: boolean;
}) {
  if (!showLogo && !showCopy) return null;

  return (
    <div className="flex w-max flex-col items-center gap-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{
          opacity: showLogo ? 1 : 0,
          scale: showLogo ? 1 : 0.85,
          height: showLogo ? "auto" : 0,
        }}
        transition={{ duration: 0.4, ease: REVEAL_EASE }}
        className="overflow-hidden"
        aria-hidden={!showLogo}
      >
        <motion.div
          animate={showLogo ? { scale: [1, 1.04, 1] } : { scale: 0.85 }}
          transition={
            showLogo
              ? { duration: 1.6, repeat: Infinity, ease: REVEAL_EASE }
              : { duration: 0.4, ease: REVEAL_EASE }
          }
        >
          <Image
            src={siteImages.logoMascot}
            alt="Cookie"
            width={96}
            height={96}
            className="size-20 object-contain md:size-24"
            priority
          />
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: showCopy ? 1 : 0,
          y: showCopy ? 0 : 8,
        }}
        transition={{ duration: 0.35, ease: REVEAL_EASE }}
        className={cn(
          "type-body-lg-medium whitespace-nowrap text-(--text-primary-black)",
          MOBILE_COOKIE_MESSAGE_CLASS,
          "max-md:font-medium"
        )}
        aria-hidden={!showCopy}
      >
        Cookie is cooking
      </motion.p>
    </div>
  );
}

function HeroRecipeSuggestionLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: HERO_RECIPE_CARD_REVEAL_S, ease: REVEAL_EASE }}
      className="size-10 shrink-0"
    >
      <Image
        src={siteImages.logoMascot}
        alt="Cookie"
        width={40}
        height={40}
        className="size-10 object-contain"
      />
    </motion.div>
  );
}

function HeroRecipeSuggestionMessage({
  visible = true,
  constrainWidth = false,
}: {
  visible?: boolean;
  constrainWidth?: boolean;
}) {
  if (!visible) return null;

  return (
    <motion.p
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: HERO_RECIPE_CARD_REVEAL_S, ease: REVEAL_EASE }}
      className={cn(
        "type-body-md-regular min-w-0 flex-1 text-(--text-primary-black)",
        MOBILE_COOKIE_MESSAGE_CLASS,
        constrainWidth && "wrap-break-word"
      )}
    >
      {HERO_RECIPE_SUGGESTION_MESSAGE}
    </motion.p>
  );
}

function HeroRecipeSuggestionBar({
  step,
  fillBox = false,
  constrainWidth = false,
}: {
  step: RecipeFinaleStep;
  fillBox?: boolean;
  constrainWidth?: boolean;
}) {
  if (step < 1) return null;

  return (
    <div
      className={cn(
        "flex min-h-10 items-start text-left",
        fillBox || constrainWidth ? "w-full min-w-0 max-w-full" : "w-max max-w-full",
        heroRecipeSuggestionLogoGapClassName
      )}
    >
      <HeroRecipeSuggestionLogo />
      {step >= 2 ? (
        <HeroRecipeSuggestionMessage
          visible
          constrainWidth={constrainWidth}
        />
      ) : null}
    </div>
  );
}

/**
 * After cooking beat ends: 1) Cookie logo 2) message 3) recipe cards.
 * Mounts only when `active`; steps advance on timers (cleanup never hides steps).
 */
export function HeroRecipeRow({
  active,
  fillBox = false,
  finaleAlign = "end",
}: {
  active: boolean;
  /** Fill the 560×400 interaction viewport. */
  fillBox?: boolean;
  /** Horizontal alignment of the suggestion + cards group inside the stage. */
  finaleAlign?: "start" | "end";
}) {
  if (!active) return null;
  return <HeroRecipeRowSequence fillBox={fillBox} finaleAlign={finaleAlign} />;
}

function HeroRecipeRowSequence({
  fillBox,
  finaleAlign,
}: {
  fillBox: boolean;
  finaleAlign: "start" | "end";
}) {
  const [step, setStep] = useState<RecipeFinaleStep>(1);
  const mountIdRef = useRef(0);

  useEffect(() => {
    const mountId = ++mountIdRef.current;
    const messageAt = HERO_RECIPE_SUGGESTION_MESSAGE_DELAY_MS;
    const cardsAt = messageAt + HERO_RECIPE_SUGGESTION_CARDS_DELAY_MS;

    const messageTimer = window.setTimeout(() => {
      if (mountIdRef.current === mountId) setStep(2);
    }, messageAt);
    const cardsTimer = window.setTimeout(() => {
      if (mountIdRef.current === mountId) setStep(3);
    }, cardsAt);

    return () => {
      window.clearTimeout(messageTimer);
      window.clearTimeout(cardsTimer);
    };
  }, []);

  const finaleFlushStart = fillBox && finaleAlign === "start";

  return (
    <div
      className={cn(
        "pointer-events-none z-20 overflow-hidden",
        fillBox
          ? finaleAlign === "start"
            ? heroInteractionRecipeVStartClassName
            : heroInteractionRecipeVCenterClassName
          : "relative flex w-max max-w-full justify-end overflow-visible"
      )}
    >
      <div
        className={cn(
          "pointer-events-auto flex flex-col items-start overflow-hidden",
          fillBox
            ? cn(
                "h-auto shrink-0 min-w-0",
                finaleFlushStart ? "w-full max-w-full" : "ml-auto"
              )
            : "w-max max-w-full overflow-visible",
          heroRecipeSuggestionAboveCardsClassName
        )}
        style={
          fillBox && !finaleFlushStart
            ? { width: HERO_RECIPE_FINALE_GROUP_WIDTH_PX }
            : undefined
        }
      >
        <HeroRecipeSuggestionBar
          step={step}
          fillBox={fillBox}
          constrainWidth={finaleFlushStart}
        />
        <div
          className={cn(
            "flex flex-nowrap items-start justify-start max-md:snap-x max-md:snap-mandatory md:flex-wrap",
            fillBox ? "overflow-hidden" : "overflow-x-auto overflow-y-visible"
          )}
          style={{
            gap: HERO_RECIPE_CARD_GAP_PX,
            /* Inline with message copy (past logo + gap) — mobile + desktop. */
            marginInlineStart: HERO_RECIPE_CARDS_MESSAGE_ALIGN_OFFSET_PX,
          }}
        >
          {step >= 3
            ? HERO_RECIPES.map((recipe, index) => (
                <HeroRecipeCard
                  key={recipe.title}
                  recipe={recipe}
                  index={index}
                  visible
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
