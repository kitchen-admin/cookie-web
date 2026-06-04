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
  "You can totally cook these tonight. Easy picks from what’s already in your kitchen.";

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
