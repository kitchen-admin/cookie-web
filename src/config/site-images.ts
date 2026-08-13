/**
 * Site image URLs.
 *
 * Local paths under /public, or public HTTPS URLs (Vercel Blob, a CDN, etc.).
 * Leave a value as "" (empty) to show the design placeholder instead.
 */

export const siteImages = {
  /** Hero fridge scan (Figma 1502:4266). */
  fridge: "/hero/fridge.png",
  /** Navbar cookie mark (Figma 1502:4627). */
  logoMark: "/logo/cookie-mark.png",
  /** Navbar COOKIE wordmark (Figma 1502:4629). */
  logoWordmark: "/logo/cookie-wordmark.svg",
  /** Navbar: logo + wordmark fallback (legacy combined asset). */
  logoLight:
    "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/media-kit/logo_light_2.png",
  /** Hero cooking beat: Cookie mascot (after scan). */
  logoMascot:
    "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/media-kit/logo-light-image.png",
  /** Scan corner brackets (Figma 1502:4267 / 1502:4268). */
  scanBracketTr: "/hero/bracket-tr.svg",
  scanBracketBl: "/hero/bracket-bl.svg",
  /** Floating cards: ingredient thumbnails (40×40) */
  carrot:
    "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/ingredients/carrot.png",
  berry:
    "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/ingredients/mixed-berries.png",
  broccoli:
    "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/ingredients/brocoli.png",
  mushroom:
    "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/ingredients/mushroom.png",
  /** Hero recipe: Thai basil tofu/paneer with jasmine rice */
  heroRecipeThaiBasil:
    "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/recipes/lunch_3.png",
  /** Hero recipe: Paneer steak with pepper sauce & garlic beans */
  heroRecipePaneerSteak:
    "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/recipes/lunch_5.png",
  /** Problem / about section card illustrations */
  problemLunchbox: "",
  problemPantry: "",
  problemHealthy: "",
  /** Recipes section: phone mockup (Figma 1502:4293) */
  recipesPhoneMockup: "/recipes/phone-mockup.png",
  /** Recipes section: floating card photos — TEMP placeholders */
  recipeAvocadoToast: "/figma-placeholders/recipes/breakfast-avocado-toast.png",
  recipeSoyaStroganoff: "/figma-placeholders/recipes/lunch-soya-stroganoff.png",
  recipeMushroomBourguignon:
    "/figma-placeholders/recipes/dinner-mushroom-bourguignon.png",
  /** Store badges */
  badgeAppStore: "/badges/app-store.svg",
  badgePlayStore: "/badges/google-play.svg",
  /** Footer wave + maroon fill */
  footerCurve: "/footer/curve.svg",
} as const;

export type SiteImageKey = keyof typeof siteImages;

/** True when a URL is configured (ready for next/image). */
export function hasSiteImage(url: string | undefined): url is string {
  return typeof url === "string" && url.trim().length > 0;
}
