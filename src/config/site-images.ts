/**
 * Site image URLs.
 *
 * Paste each image URL directly between the quotes below.
 * Use any public HTTPS URL (Vercel Blob, a CDN, etc.).
 * Leave a value as "" (empty) to show the design placeholder instead.
 *
 * Example:
 *   fridge: "https://example.com/hero/fridge.png",
 */

export const siteImages = {
  /** Hero section background (kitchen wall illustration, 1080×600). */
  heroBg:
    "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/website/hero/hero_bg.png",
  /**
   * Hero section foreground (counter + ingredients, 2880×1200).
   * Bump `v` when the Blob file is replaced (cache bust for Next.js + CDN).
   */
  heroFg:
    "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/website/hero/hero_fg.png?v=2",
  /** Navbar: logo + wordmark (display at 40px height) */
  logoLight:
    "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/media-kit/logo_light_2.png",
  /** Hero cooking beat: Cookie mascot (after scan). */
  logoMascot:
    "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/media-kit/logo-light-image.png",
  /** Hero: open fridge (400×400) */
  fridge: "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/fridge.png",
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
  /** Feature section illustrations (optional, 280×280 areas) */
  featurePantry: "",
  featureLunch: "",
  featureExpires: "",
} as const;

export type SiteImageKey = keyof typeof siteImages;

/** True when a URL is configured (ready for next/image). */
export function hasSiteImage(url: string | undefined): url is string {
  return typeof url === "string" && url.trim().length > 0;
}
