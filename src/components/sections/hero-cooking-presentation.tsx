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
  HERO_RECIPE_CARD_STAGGER_MS,
  HERO_RECIPE_SUGGESTION_LOGO_DELAY_MS,
  HERO_RECIPE_SUGGESTION_MESSAGE_DELAY_MS,
} from "@/config/hero-load-sequence";
import {
  heroRecipeBottomOffsetClassName,
  heroRecipeSuggestionAboveCardsClassName,
  heroRecipeSuggestionLogoOffsetClassName,
} from "@/config/layout";
import { siteImages } from "@/config/site-images";
import { cn } from "@/lib/utils";

const REVEAL_EASE = "easeInOut" as const;

/** Ms until both recipe card entrances finish. */
function recipeCardsDoneMs() {
  return (
    (HERO_RECIPES.length - 1) * HERO_RECIPE_CARD_STAGGER_MS +
    HERO_RECIPE_CARD_REVEAL_S * 1000
  );
}

/** 1 = cards, 2 = suggestion logo, 3 = suggestion message */
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
        className="type-body-lg-medium whitespace-nowrap text-(--text-primary-black)"
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
      className={heroRecipeSuggestionLogoOffsetClassName}
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

function HeroRecipeSuggestionMessage({ visible = true }: { visible?: boolean }) {
  if (!visible) return null;

  return (
    <motion.p
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: HERO_RECIPE_CARD_REVEAL_S, ease: REVEAL_EASE }}
      className="type-body-md-regular text-(--text-primary-black)"
    >
      {HERO_RECIPE_SUGGESTION_MESSAGE}
    </motion.p>
  );
}

function HeroRecipeSuggestionBar({ step }: { step: RecipeFinaleStep }) {
  if (step < 2) return null;

  return (
    <div className="relative flex min-h-10 w-full max-w-[min(100vw-2rem,36rem)] items-center overflow-visible text-left">
      <HeroRecipeSuggestionLogo />
      {step >= 3 ? <HeroRecipeSuggestionMessage visible /> : null}
    </div>
  );
}

/**
 * After cooking beat ends: 1) recipe cards 2) small Cookie logo 3) message.
 * Mounts only when `active`; steps advance on timers (cleanup never hides steps).
 */
export function HeroRecipeRow({ active }: { active: boolean }) {
  if (!active) return null;
  return <HeroRecipeRowSequence />;
}

function HeroRecipeRowSequence() {
  const [step, setStep] = useState<RecipeFinaleStep>(1);
  const mountIdRef = useRef(0);

  useEffect(() => {
    const mountId = ++mountIdRef.current;
    const logoAt =
      recipeCardsDoneMs() + HERO_RECIPE_SUGGESTION_LOGO_DELAY_MS;
    const messageAt =
      logoAt + HERO_RECIPE_SUGGESTION_MESSAGE_DELAY_MS;

    const logoTimer = window.setTimeout(() => {
      if (mountIdRef.current === mountId) setStep(2);
    }, logoAt);
    const messageTimer = window.setTimeout(() => {
      if (mountIdRef.current === mountId) setStep(3);
    }, messageAt);

    return () => {
      window.clearTimeout(logoTimer);
      window.clearTimeout(messageTimer);
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 z-20 flex justify-center overflow-visible px-4",
        heroRecipeBottomOffsetClassName
      )}
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto flex w-max max-w-full flex-col items-start overflow-visible",
          heroRecipeSuggestionAboveCardsClassName
        )}
      >
        <HeroRecipeSuggestionBar step={step} />
        <div className="flex flex-nowrap items-start justify-start gap-[29px] overflow-x-auto overflow-y-visible max-md:snap-x max-md:snap-mandatory md:flex-wrap md:justify-center">
          {step >= 1
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
