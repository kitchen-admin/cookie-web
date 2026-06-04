/** Max width (px) for default section content (hero, etc.). */
export const SECTION_CONTENT_MAX_PX = 800;

/** Max width (px) for the features (second) section content column. */
export const FEATURES_CONTENT_MAX_PX = 1280;

/** Tailwind classes: centered column capped at 800px with horizontal padding. */
export const sectionContentClassName =
  "mx-auto w-full min-w-0 max-w-[800px] px-6";

/** Overrides default max width for features section inner content only. */
export const featuresSectionContentClassName = "max-w-[1280px]";

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

/** Space between Cookie logo and suggestion copy (logo left, text right). */
export const HERO_RECIPE_SUGGESTION_LOGO_GAP_PX = 8;

/** Vertical gap between suggestion line and recipe cards. */
export const heroRecipeSuggestionAboveCardsClassName = "gap-4";

/** Horizontal gap between Cookie logo and suggestion copy. */
export const heroRecipeSuggestionLogoGapClassName = "gap-2";

/**
 * Logo sits outside the left edge of the first recipe card; message starts on that edge.
 * `w-10` prevents the absolute wrapper from collapsing to 0 width (invisible logo).
 */
export const heroRecipeSuggestionLogoOffsetClassName =
  "absolute top-1/2 right-full z-10 size-10 w-10 shrink-0 -translate-y-1/2 mr-2";

/** Hero stage height while scanning (matches fridge-scan-stage min-height). */
export const HERO_STAGE_HEIGHT_PX = 410;

/** Vertical focal line for bubble merge (42% of the 410px hero stage band). */
export const heroBubbleMergePositionClassName = "left-1/2 top-[42%]";

/** Centered anchor at the merge point (logo + copy). */
export const heroBubbleMergeFocalClassName =
  `${heroBubbleMergePositionClassName} -translate-x-1/2 -translate-y-1/2`;
