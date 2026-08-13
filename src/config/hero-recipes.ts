import type { RecipesShowcasePlacement } from "@/config/recipes-showcase-layout";
import { siteImages } from "@/config/site-images";

export type HeroRecipeDiet = "veg" | "non-veg";

export type HeroRecipe = {
  title: string;
  /** Recipe photo — empty uses brand placeholder until Blob URL is set. */
  imageUrl: string;
  servings: number;
  difficulty: string;
  cookTime: string;
  diet: HeroRecipeDiet;
  /** Top-left diet badge on the image (hidden on some Figma variants). */
  showHeaderDietBadge?: boolean;
};

/** Shown above hero recipe cards when suggestions appear. */
export const HERO_RECIPE_SUGGESTION_MESSAGE =
  "You can totally cook these tonight. Easy picks from what's already in your kitchen.";

/** Mock recipes — titles and meta match Figma node 843:9961. */
export const HERO_RECIPES: HeroRecipe[] = [
  {
    title: "Thai basil tofu/paneer with jasmine rice",
    imageUrl: siteImages.heroRecipeThaiBasil,
    servings: 3,
    difficulty: "Easy",
    cookTime: "15 mins",
    diet: "non-veg",
    showHeaderDietBadge: false,
  },
  {
    title: "Paneer steak with pepper sauce & garlic beans.",
    imageUrl: siteImages.heroRecipePaneerSteak,
    servings: 3,
    difficulty: "Easy",
    cookTime: "15 mins",
    diet: "veg",
    showHeaderDietBadge: true,
  },
];

/** Floating recipe cards around the phone mockup. */
export const RECIPES_SHOWCASE: (HeroRecipe & {
  placement: RecipesShowcasePlacement;
})[] = [
  {
    title: "Chicken Banh Mi",
    imageUrl: siteImages.recipeChickenBanhMi,
    servings: 2,
    difficulty: "Easy",
    cookTime: "20 mins",
    diet: "non-veg",
    showHeaderDietBadge: false,
    placement: "top-left",
  },
  {
    title: "Masala omelette waffles",
    imageUrl: siteImages.recipeMasalaOmeletteWaffles,
    servings: 2,
    difficulty: "Easy",
    cookTime: "15 mins",
    diet: "veg",
    showHeaderDietBadge: true,
    placement: "top-right",
  },
  {
    title: "Broccoli rava idli",
    imageUrl: siteImages.recipeBroccoliRavaIdli,
    servings: 3,
    difficulty: "Easy",
    cookTime: "25 mins",
    diet: "veg",
    showHeaderDietBadge: true,
    placement: "bottom-left",
  },
  {
    title: "Spinach & broad bean shakshuka",
    imageUrl: siteImages.recipeSpinachBroadBeanShakshuka,
    servings: 2,
    difficulty: "Easy",
    cookTime: "20 mins",
    diet: "non-veg",
    showHeaderDietBadge: false,
    placement: "bottom-right",
  },
];
