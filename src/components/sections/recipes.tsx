"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { AppStoreBadges } from "@/components/app-store-badges";
import { PhoneFrame } from "@/components/phone-frame";
import { HeroRecipeCard } from "@/components/sections/hero-recipe-card";
import { Section } from "@/components/sections/section";
import { RECIPES_SHOWCASE } from "@/config/hero-recipes";
import {
  HERO_RECIPE_CARD_IMAGE_HEIGHT_PX,
  HERO_RECIPE_CARD_WIDTH_PX,
} from "@/config/hero-recipe-card-layout";
import {
  RECIPES_CARD_AUTO_ADVANCE_MS,
  RECIPES_CARD_COMPACT_BELOW_PX,
  RECIPES_CARD_INSET_PX,
  RECIPES_CARD_SCALE_FAR,
  RECIPES_CARD_SCALE_NEAR,
  RECIPES_CARD_SHARP_DISTANCE,
  RECIPES_CARD_WIDTH_PX,
  RECIPES_PHONE_BEZEL_DESKTOP_PX,
  RECIPES_PHONE_BEZEL_PX,
  RECIPES_PHONE_HEIGHT_PX,
  RECIPES_PHONE_WIDTH_PX,
  recipesCardTrackTopClassName,
  recipesSectionPaddingClassName,
  sectionHeaderClassName,
  wideSectionContentClassName,
} from "@/config/layout";
import { siteImages } from "@/config/site-images";
import { cn } from "@/lib/utils";

const CARD_GAP_PX = 24;
const SLIDE_DURATION_S = 0.8;
const CARD_COUNT = RECIPES_SHOWCASE.length;
/** Always keep this many cards to the left of the phone. */
const LEFT_BUFFER = 2;
/** Three copies: we start in the middle so the left buffer never runs out. */
const LOOP_COPIES = 3;
const LOOPED_RECIPES = Array.from({ length: LOOP_COPIES }, () => RECIPES_SHOWCASE).flat();
/** Middle copy, with 2 cards already on the left (3rd recipe in the phone). */
const START_INDEX = CARD_COUNT + LEFT_BUFFER;
/** When we reach the last copy, jump back one copy (same picture, instant). */
const LOOP_JUMP_AT = CARD_COUNT * 2;

function bezelPx() {
  return window.matchMedia("(min-width: 1024px)").matches
    ? RECIPES_PHONE_BEZEL_DESKTOP_PX
    : RECIPES_PHONE_BEZEL_PX;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** 340px card, but never wider than the inner screen minus 8px on each side. */
function cardSizeFromPhone(phoneWidth: number, bezel: number) {
  const maxFit = Math.max(
    0,
    Math.round(phoneWidth - bezel * 2 - RECIPES_CARD_INSET_PX * 2)
  );
  const width = Math.min(RECIPES_CARD_WIDTH_PX, maxFit);
  // A bit shorter than a strict width-ratio scale so the card fits the peach band.
  const imageHeight = Math.round(
    HERO_RECIPE_CARD_IMAGE_HEIGHT_PX * (width / HERO_RECIPE_CARD_WIDTH_PX) * 0.88
  );
  return { width, imageHeight };
}

/** Shift the row so recipe `index` sits in the middle of the phone. */
function rowOffset(activeIndex: number, cardWidth: number, trackWidth: number) {
  let left = 0;
  for (let i = 0; i < activeIndex; i += 1) {
    const distance = Math.min(
      Math.abs(i - activeIndex),
      RECIPES_CARD_SHARP_DISTANCE
    );
    left += cardWidth * scaleForDistance(distance) + CARD_GAP_PX;
  }
  return trackWidth / 2 - (left + cardWidth / 2);
}

/** Full size in the phone, one step smaller next door, two steps smaller after that. */
function scaleForDistance(distance: number) {
  if (distance <= 0) return 1;
  if (distance === 1) return RECIPES_CARD_SCALE_NEAR;
  return RECIPES_CARD_SCALE_FAR;
}

/**
 * Only 5 cards stay sharp. Anything further gets a progressive blur
 * until it fades out (distance 3 → 4 → 5+).
 */
function fadeForDistance(distance: number) {
  if (distance <= RECIPES_CARD_SHARP_DISTANCE) {
    return { opacity: 1, blurPx: 0 };
  }
  if (distance === 3) return { opacity: 0.4, blurPx: 8 };
  if (distance === 4) return { opacity: 0.12, blurPx: 16 };
  return { opacity: 0, blurPx: 24 };
}

/** Pulls a scaled card’s unused side space back so the visible gap stays 24px. */
function scaleInset(cardWidth: number, scale: number) {
  return -((cardWidth * (1 - scale)) / 2);
}

export function Recipes() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const [cardWidth, setCardWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [index, setIndex] = useState(START_INDEX);
  const [instant, setInstant] = useState(false);

  // Measure the phone, then size the card to 340px (or smaller on a narrow phone).
  useEffect(() => {
    const phone = phoneRef.current;
    const track = trackRef.current;
    if (!phone || !track) return;

    const update = () => {
      const next = cardSizeFromPhone(phone.offsetWidth, bezelPx());
      setCardWidth(next.width);
      setImageHeight(next.imageHeight);
      setTrackWidth(track.offsetWidth);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(phone);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // Auto-advance: one card at a time, looping forever.
  useEffect(() => {
    if (cardWidth <= 0 || prefersReducedMotion()) return;

    const timer = window.setInterval(() => {
      if (pausedRef.current) return;
      setIndex((current) => current + 1);
    }, RECIPES_CARD_AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [cardWidth]);

  // After a full set slides by, jump back one copy so the loop never ends
  // and two cards stay on the left of the phone.
  useEffect(() => {
    if (index < LOOP_JUMP_AT) return;

    const jump = window.setTimeout(() => {
      setInstant(true);
      setIndex((current) => current - CARD_COUNT);
    }, SLIDE_DURATION_S * 1000);

    return () => window.clearTimeout(jump);
  }, [index]);

  useEffect(() => {
    if (!instant) return;
    const frame = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(frame);
  }, [instant]);

  const x =
    cardWidth > 0 && trackWidth > 0
      ? rowOffset(index, cardWidth, trackWidth)
      : 0;

  return (
    <Section
      id="recipes"
      reveal={false}
      className={cn(
        "overflow-x-clip bg-(--primitive-base-white)",
        recipesSectionPaddingClassName
      )}
      waveFill="var(--primitive-base-white)"
      contentClassName={cn(wideSectionContentClassName, "px-6")}
    >
      <div className="flex w-full flex-col items-center gap-14 max-md:gap-10">
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className={sectionHeaderClassName}>
            Never wonder what to cook again
          </h2>
          <p className="type-display-xs-medium text-text-brand-primary">
            Before you open a food delivery app, ask Cookie!
          </p>
          <AppStoreBadges className="mt-1" />
        </div>

        <div className="relative mx-auto w-full max-w-301">
          <div
            ref={phoneRef}
            className="relative mx-auto w-full max-w-100 max-lg:max-w-80 max-md:max-w-70"
          >
            <PhoneFrame
              src={siteImages.recipesPhoneMockup}
              alt="Cookie app on a phone showing recipe suggestions"
              width={RECIPES_PHONE_WIDTH_PX}
              height={RECIPES_PHONE_HEIGHT_PX}
              className="aspect-400/727 w-full lg:aspect-auto lg:h-181.75"
            >
              {/*
                Overflow stays visible so the row is not clipped into a strip.
                Cards still tuck under the black bezel (z-40) as they pass through.
              */}
              <div
                ref={trackRef}
                className={cn(
                  "absolute left-1/2 z-20 w-screen -translate-x-1/2 overflow-visible",
                  recipesCardTrackTopClassName
                )}
                onMouseEnter={() => {
                  pausedRef.current = true;
                }}
                onMouseLeave={() => {
                  pausedRef.current = false;
                }}
                aria-label="Recipe cards"
                aria-roledescription="carousel"
              >
                {cardWidth > 0 ? (
                  <motion.div
                    className="flex items-center"
                    animate={{ x }}
                    transition={{
                      type: "tween",
                      duration: instant ? 0 : SLIDE_DURATION_S,
                      ease: "easeInOut",
                    }}
                    style={{ gap: CARD_GAP_PX }}
                  >
                    {LOOPED_RECIPES.map((recipe, cardIndex) => {
                      const rawDistance = Math.abs(cardIndex - index);
                      const distance = Math.min(
                        rawDistance,
                        RECIPES_CARD_SHARP_DISTANCE
                      );
                      const scale = scaleForDistance(distance);
                      const fade = fadeForDistance(rawDistance);
                      const inset = scaleInset(cardWidth, scale);
                      const enteringFrame = distance === 0;
                      const fadedOut = fade.opacity === 0;
                      return (
                        <motion.div
                          key={`${recipe.title}-${cardIndex}`}
                          className="origin-center shrink-0"
                          animate={{
                            scale,
                            marginLeft: inset,
                            marginRight: inset,
                            opacity: fade.opacity,
                            filter: `blur(${fade.blurPx}px)`,
                          }}
                          transition={{
                            type: "tween",
                            duration: instant ? 0 : SLIDE_DURATION_S,
                            // Into the phone: easeIn. Out of the phone: easeOut.
                            ease: enteringFrame ? "easeIn" : "easeOut",
                          }}
                          style={{
                            zIndex: enteringFrame ? 2 : 1,
                            pointerEvents: fadedOut ? "none" : "auto",
                          }}
                          aria-hidden={fadedOut}
                        >
                          <HeroRecipeCard
                            recipe={recipe}
                            visible
                            index={0}
                            variant="showcase"
                            compact={cardWidth < RECIPES_CARD_COMPACT_BELOW_PX}
                            width={cardWidth}
                            imageHeight={imageHeight}
                            className="shrink-0"
                          />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : null}
              </div>
            </PhoneFrame>
          </div>
        </div>
      </div>
    </Section>
  );
}
