/** Max width (px) for default section content (hero, etc.). */
export const SECTION_CONTENT_MAX_PX = 800;

/** Max width (px) for the features (second) section content column. */
export const FEATURES_CONTENT_MAX_PX = 1280;

/** Tailwind classes: centered column capped at 800px with horizontal padding. */
export const sectionContentClassName =
  "mx-auto w-full min-w-0 max-w-[800px] px-6";

/** Overrides default max width for features section inner content only. */
export const featuresSectionContentClassName = "max-w-[1280px]";

/** Wider hero column for side-by-side copy + interaction layout. */
export const heroSectionContentClassName = "max-w-[1280px]";

/** Gap between hero left copy and right interaction column. */
export const HERO_SIDE_BY_SIDE_GAP_PX = 40;

export const heroSideBySideGapClassName = "gap-[40px]";

/** Desktop: copy + interaction centered horizontally in the hero section. */
export const heroSideBySideLayoutClassName =
  `flex w-full flex-col items-stretch lg:flex-row lg:items-center lg:justify-center ${heroSideBySideGapClassName}`;

/** Floating nav: offset from viewport top (navbar `top-6`). */
export const NAV_FLOAT_TOP_PX = 24;

/** Floating nav bar height (navbar `h-[60px]`). */
export const NAV_HEIGHT_PX = 60;

/** Horizontal gap between navbar links (How it Works, About Us, Download App). */
export const NAV_BUTTON_GAP_PX = 16;

export const navButtonGapClassName = "gap-[16px]";

/** Gap between nav bottom edge and where hero content begins. */
export const HERO_GAP_BELOW_NAV_PX = 56;

/** Hero content padding-top: 24 + 60 + 56 = 140px (nav float + nav height + gap). */
export const heroContentPaddingTopClassName = "pt-[140px]";

/** Recipe cards sit this far above the hero section bottom edge. */
export const HERO_RECIPE_BOTTOM_OFFSET_PX = 56;

export const heroRecipeBottomOffsetClassName = "bottom-[56px]";

/** Space between suggestion line and recipe cards below. */
export const HERO_RECIPE_SUGGESTION_ABOVE_CARDS_PX = 16;

/** Cookie mascot size in the suggestion row (matches `size-10`). */
export const HERO_RECIPE_SUGGESTION_LOGO_SIZE_PX = 40;

/** Space between Cookie logo and suggestion copy (logo left, text right). */
export const HERO_RECIPE_SUGGESTION_LOGO_GAP_PX = 8;

/** Recipe cards start inline with suggestion message (logo width + gap). */
export const HERO_RECIPE_CARDS_MESSAGE_ALIGN_OFFSET_PX =
  HERO_RECIPE_SUGGESTION_LOGO_SIZE_PX + HERO_RECIPE_SUGGESTION_LOGO_GAP_PX;

/** Vertical gap between suggestion line and recipe cards. */
export const heroRecipeSuggestionAboveCardsClassName = "gap-4";

/** Horizontal gap between Cookie logo and suggestion copy. */
export const heroRecipeSuggestionLogoGapClassName = "gap-2";

/**
 * Fixed viewport for the entire right-hand hero interaction
 * (scan → cook → recipe finale).
 */
export const HERO_INTERACTION_WIDTH_PX = 560;
export const HERO_INTERACTION_HEIGHT_PX = 400;

/** Left copy column matches interaction box height so both sides align visually. */
export const heroLeftColumnClassName = "lg:h-[400px] lg:justify-center";

export const heroInteractionBoxClassName =
  "relative h-[400px] w-[560px] max-w-full shrink-0 overflow-hidden";

/** Fills the 560×400 viewport edge-to-edge (no inner padding). */
export const heroInteractionPhaseFillClassName = "absolute inset-0";

/** Recipe finale: vertically centered, group pinned to the right edge of 560×400. */
export const heroInteractionRecipeVCenterClassName =
  "absolute inset-0 flex w-full items-center justify-end";

/** Hero stage height while scanning (matches interaction box). */
export const HERO_STAGE_HEIGHT_PX = HERO_INTERACTION_HEIGHT_PX;

/** Fridge band — full interaction viewport. */
export const heroStageFridgeBandClassName = "relative size-full";

/** Centered 400×400 zone for fridge image + scan line (inside 560×400 box). */
export const heroStageFridgeViewportClassName =
  "absolute top-1/2 left-1/2 z-0 size-[400px] max-h-full max-w-full -translate-x-1/2 -translate-y-1/2";

export const heroStageFridgeClassName =
  "relative z-0 flex size-full items-center justify-center origin-center";

/** Scan frame — matches the centered fridge viewport. */
export const heroStageScanFrameClassName =
  "pointer-events-none absolute inset-0 z-[5] overflow-hidden rounded-3xl";

/** Bubble merge + cooking beat focal point (42% of the 400px band). */
export const heroBubbleMergePositionClassName = "left-1/2 top-[42%]";

/** Centered anchor at the merge point (logo + copy). */
export const heroBubbleMergeFocalClassName =
  `${heroBubbleMergePositionClassName} -translate-x-1/2 -translate-y-1/2`;
