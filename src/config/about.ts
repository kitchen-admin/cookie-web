import { siteImages } from "@/config/site-images";

/** Copy for the About us page (Figma 1562:19832). */
export const ABOUT_COPY = {
  /** Forced two-line headline — see the <br /> in problem.tsx. */
  headlineBefore: "It's not a food problem",
  headlineAccent: "it's a decision problem",
  lead: "Every day, the same question comes back:",
  question: "\u201cWhat should I eat now?\u201d",
  body: "There are endless recipes, plenty of advice, and often food already waiting in the kitchen. The difficult part is choosing something that fits your time, taste, goals, and ingredients.",
  why: "That is why we built Cookie!",
  product:
    "Cookie learns what works for you and helps turn what you already have into a meal you will actually enjoy.",
  closer: "Less searching. Less second-guessing. More cooking.",
} as const;

/**
 * Founder cluster from Figma 1562:19832.
 * Node boxes (frame-relative): Divyanshu x208 y886 368x551, GJ x420 y853
 * 367x551, Chahat x654 y868 418x551. Cluster bounding box: left 208, top 853
 * (GJ), bottom 1437 (Divyanshu) -> 864 x 584.
 *
 * `style` values below are each founder's box as a % of that 864x584
 * bounding box, so the cluster scales as one unit at any width. Array order
 * is back-to-front (Chahat, Divyanshu, GJ) to match Figma paint order — GJ
 * sits in front.
 *
 * `displayName` is what's shown in the handwritten signature (GJ signs as
 * "Krishna"). `linkedinUrl` opens that profile on click; leave it
 * `undefined` for a founder without one yet — the name/photo still greys
 * in and out on hover, it just isn't a link.
 */
export const ABOUT_FOUNDERS = [
  {
    name: "Chahat",
    displayName: "Chahat",
    linkedinUrl: "https://www.linkedin.com/in/chtgupta/" as string | undefined,
    imageUrl: siteImages.founderChahat,
    width: 836,
    height: 1102,
    style: {
      left: "51.620%",
      width: "48.380%",
      bottom: "3.082%",
      height: "94.349%",
      zIndex: 1,
    },
  },
  {
    name: "Divyanshu",
    displayName: "Divyanshu",
    linkedinUrl: "https://www.linkedin.com/in/hexoncode/" as string | undefined,
    imageUrl: siteImages.founderDivyanshu,
    width: 736,
    height: 1102,
    style: {
      left: "0%",
      width: "42.593%",
      bottom: "0%",
      height: "94.349%",
      zIndex: 2,
    },
  },
  {
    name: "GJ",
    displayName: "Krishna",
    linkedinUrl: "https://www.linkedin.com/in/krishnagj/" as string | undefined,
    imageUrl: siteImages.founderGj,
    width: 734,
    height: 1102,
    style: {
      left: "24.537%",
      width: "42.477%",
      bottom: "5.651%",
      height: "94.349%",
      zIndex: 3,
    },
  },
] as const;

/**
 * Left-to-right order for the signature line (how the trio actually stands),
 * which differs from `ABOUT_FOUNDERS`' back-to-front paint order above.
 */
export const ABOUT_FOUNDERS_SIGNATURE_ORDER = [
  "Divyanshu",
  "GJ",
  "Chahat",
] as const;

/** Cluster bounding box aspect ratio (864 x 584, see `ABOUT_FOUNDERS` above). */
export const ABOUT_FOUNDERS_ASPECT = "864/584";

/**
 * How far the cluster sinks under the footer wave, as a % of its own width.
 * Cluster bottom sits 116px below the wave crest; the footer already
 * overlaps upward by `SECTION_WAVE_HEIGHT_PX` (27px), so the extra sink is
 * (116 - 27) / 864 = 10.3%.
 */
export const ABOUT_FOUNDERS_SINK_PERCENT = "10.3%";
