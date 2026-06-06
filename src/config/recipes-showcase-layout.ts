import type { CSSProperties } from "react";

import {
  HERO_RECIPE_CARD_TOTAL_HEIGHT_PX,
  HERO_RECIPE_CARD_WIDTH_PX,
} from "@/config/hero-recipe-card-layout";
import {
  RECIPES_CARD_BOTTOM_ROW_GAP_FROM_PHONE_PX,
  RECIPES_CARD_ROW_GAP_PX,
  RECIPES_CARD_TOP_ROW_GAP_FROM_PHONE_PX,
  RECIPES_PHONE_HEIGHT_PX,
  RECIPES_PHONE_WIDTH_PX,
} from "@/config/layout";

export type RecipesShowcasePlacement =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

const PHONE_HALF_WIDTH_PX = RECIPES_PHONE_WIDTH_PX / 2;

const ROW_BLOCK_HEIGHT_PX =
  HERO_RECIPE_CARD_TOTAL_HEIGHT_PX * 2 + RECIPES_CARD_ROW_GAP_PX;

const TOP_ROW_TOP_PX = (RECIPES_PHONE_HEIGHT_PX - ROW_BLOCK_HEIGHT_PX) / 2;

/** Bottom row starts exactly 40px below the top row’s bottom edge. */
const BOTTOM_ROW_TOP_PX =
  TOP_ROW_TOP_PX + HERO_RECIPE_CARD_TOTAL_HEIGHT_PX + RECIPES_CARD_ROW_GAP_PX;

/** Absolute position for a floating recipe card around the centered phone mockup. */
export function recipesShowcaseCardStyle(
  placement: RecipesShowcasePlacement
): CSSProperties {
  const cardW = HERO_RECIPE_CARD_WIDTH_PX;

  switch (placement) {
    case "top-left":
      return {
        top: TOP_ROW_TOP_PX,
        left: `calc(50% - ${PHONE_HALF_WIDTH_PX + RECIPES_CARD_TOP_ROW_GAP_FROM_PHONE_PX + cardW}px)`,
      };
    case "top-right":
      return {
        top: TOP_ROW_TOP_PX,
        left: `calc(50% + ${PHONE_HALF_WIDTH_PX + RECIPES_CARD_TOP_ROW_GAP_FROM_PHONE_PX}px)`,
      };
    case "bottom-left":
      return {
        top: BOTTOM_ROW_TOP_PX,
        left: `calc(50% - ${PHONE_HALF_WIDTH_PX + RECIPES_CARD_BOTTOM_ROW_GAP_FROM_PHONE_PX + cardW}px)`,
      };
    case "bottom-right":
      return {
        top: BOTTOM_ROW_TOP_PX,
        left: `calc(50% + ${PHONE_HALF_WIDTH_PX + RECIPES_CARD_BOTTOM_ROW_GAP_FROM_PHONE_PX}px)`,
      };
  }
}
