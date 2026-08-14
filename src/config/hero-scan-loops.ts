import type { FloatingCardProps } from "@/components/sections/floating-card";
import type { HeroRecipe } from "@/config/hero-recipes";
import { siteImages } from "@/config/site-images";

/** One floating “going bad” card around the fridge. */
export type IngredientBubbleConfig = Omit<
  FloatingCardProps,
  "delay" | "visible" | "layoutPhase"
>;

/**
 * All four messages sit on the left of the fridge, top to bottom.
 * Phones only show the first three, spaced a little more openly.
 * Swipe down finds the top pair; swipe up finds the rest.
 */
const BUBBLE_SLOTS = {
  left1: {
    side: "left" as const,
    positionClassName:
      "right-[392px] top-[4%] max-md:right-auto max-md:left-[2%] max-md:top-[8%]",
  },
  left2: {
    side: "left" as const,
    positionClassName:
      "right-[392px] top-[28%] max-md:right-auto max-md:left-[2%] max-md:top-[36%]",
  },
  left3: {
    side: "left" as const,
    positionClassName:
      "right-[392px] top-[52%] max-md:right-auto max-md:left-[2%] max-md:top-[64%]",
  },
  left4: {
    side: "left" as const,
    positionClassName:
      "right-[392px] top-[76%] max-md:right-auto max-md:left-[2%] max-md:top-[72%]",
  },
};

/** Phones only pop this many “going bad” cards per scan. Desktop still uses all four. */
export const HERO_MOBILE_SCAN_INGREDIENT_COUNT = 3;

export type HeroScanLoop = {
  /** Four “going bad” ingredients for this scan. */
  ingredients: IngredientBubbleConfig[];
  /** The one recipe those ingredients become. */
  recipe: HeroRecipe;
};

function bubble(
  name: string,
  days: number,
  imageUrl: string,
  slot: keyof typeof BUBBLE_SLOTS
): IngredientBubbleConfig {
  return {
    name,
    days,
    imageUrl,
    ...BUBBLE_SLOTS[slot],
  };
}

/**
 * Hero fridge story: scan → 4 ingredients → one recipe → fly off → next loop.
 * Swap a dish here; the animation reads this list in order and then restarts.
 */
export const HERO_SCAN_LOOPS: HeroScanLoop[] = [
  {
    ingredients: [
      bubble("Chicken", 3, siteImages.ingredientChicken, "left1"),
      bubble("Baguette", 3, siteImages.ingredientBaguette, "left2"),
      bubble("Carrot", 2, siteImages.ingredientCarrot, "left3"),
      bubble("Cabbage", 4, siteImages.ingredientCabbage, "left4"),
    ],
    recipe: {
      title: "Chicken Banh Mi",
      imageUrl: siteImages.recipeChickenBanhMi,
      servings: 2,
      difficulty: "Easy",
      cookTime: "20 mins",
      diet: "non-veg",
      showHeaderDietBadge: false,
    },
  },
  {
    ingredients: [
      bubble("Egg", 3, siteImages.ingredientEgg, "left1"),
      bubble("Broccoli", 4, siteImages.ingredientBroccoli, "left2"),
      bubble("Bell pepper", 2, siteImages.ingredientBellPepper, "left3"),
      bubble("Onions", 4, siteImages.ingredientOnions, "left4"),
    ],
    recipe: {
      title: "Masala omelette waffles",
      imageUrl: siteImages.recipeMasalaOmeletteWaffles,
      servings: 2,
      difficulty: "Easy",
      cookTime: "15 mins",
      diet: "veg",
      showHeaderDietBadge: true,
    },
  },
  {
    ingredients: [
      bubble("Broccoli", 4, siteImages.ingredientBroccoli, "left1"),
      bubble("Cabbage", 3, siteImages.ingredientCabbage, "left2"),
      bubble("Carrot", 2, siteImages.ingredientCarrot, "left3"),
      bubble("Onions", 3, siteImages.ingredientOnions, "left4"),
    ],
    recipe: {
      title: "Broccoli rava idli",
      imageUrl: siteImages.recipeBroccoliRavaIdli,
      servings: 3,
      difficulty: "Easy",
      cookTime: "25 mins",
      diet: "veg",
      showHeaderDietBadge: true,
    },
  },
];
