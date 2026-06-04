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
  /** Hero: open fridge (360×360) */
  fridge: "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/fridge.png",
  /** Floating cards: ingredient thumbnails (40×40) */
  carrot: "",
  berry: "",
  broccoli: "",
  mushroom: "",
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
