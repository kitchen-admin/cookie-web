/** Max width (px) for default section content (hero, etc.). */
export const SECTION_CONTENT_MAX_PX = 800;

/** Max width (px) for wide sections (problem, how-it-works, etc.). */
export const WIDE_SECTION_CONTENT_MAX_PX = 1280;

/** Tailwind classes: centered column capped at 800px with horizontal padding. */
export const sectionContentClassName =
  "mx-auto w-full min-w-0 max-w-[800px] px-6";

/** Overrides default max width for wide section inner content. */
export const wideSectionContentClassName = "max-w-[1280px]";

/** Problem section: horizontal page padding (Figma 80px at md+). */
export const problemSectionPaddingClassName = "px-6 md:px-20";

/** Problem card image height (Figma 400px). */
export const PROBLEM_CARD_IMAGE_HEIGHT_PX = 400;

/** Problem card grid gap (Figma 80px between cards). */
export const problemCardGridGapClassName = "gap-20";

/** How-it-works: gap between copy column and interaction (Figma 40px). */
export const howItWorksColumnGapClassName = "gap-10";

/** How-it-works: top margin on fridge column only at lg+ (80px). */
export const howItWorksFridgeColumnMarginTopClassName = "lg:mt-20";

/** Recipes section: phone mockup intrinsic size. */
export const RECIPES_PHONE_WIDTH_PX = 400;
export const RECIPES_PHONE_HEIGHT_PX = 727;

/** Horizontal gap from phone edge to top-row recipe cards. */
export const RECIPES_CARD_TOP_ROW_GAP_FROM_PHONE_PX = 56;

/** Horizontal gap from phone edge to bottom-row recipe cards. */
export const RECIPES_CARD_BOTTOM_ROW_GAP_FROM_PHONE_PX = 40;

/** Vertical gap between top and bottom recipe card rows. */
export const RECIPES_CARD_ROW_GAP_PX = 40;

/**
 * Recipes section: top padding only — `pb-0` lets the phone mockup bleed to the
 * section bottom without extra whitespace below the device frame.
 */
export const recipesSectionPaddingClassName = "pt-14 pb-0";

/** Phone mockup frame — top + sides only (Figma has no bottom bezel). */
export const recipesPhoneBorderDesktopClassName =
  "border-t-10 border-x-10 border-b-0 border-(--primitive-base-black)";

export const recipesPhoneBorderMobileClassName =
  "border-t-8 border-x-8 border-b-0 border-(--primitive-base-black)";

/** FAQ accordion max width (Figma 720px). */
export const FAQ_CONTENT_MAX_PX = 720;

export const faqSectionContentClassName = "max-w-[720px]";

/** Hero foreground image intrinsic size (hero_fg.png). */
export const HERO_FG_WIDTH_PX = 2880;
export const HERO_FG_HEIGHT_PX = 1200;

/** Floating nav: offset from viewport top (navbar `top-6`). */
export const NAV_FLOAT_TOP_PX = 24;

/** Floating nav bar height (navbar `h-[60px]`). */
export const NAV_HEIGHT_PX = 60;

/** Horizontal gap between navbar links (How it Works, About Us, Download App). */
export const NAV_BUTTON_GAP_PX = 16;

export const navButtonGapClassName = "gap-[16px]";

/** Shared typography for section h2 headers (40px via --type-size-section-header). */
export const sectionHeaderClassName =
  "type-section-header-medium tracking-figma-tighter text-(--text-primary-black)";

/** Max width (px) for hero headline + subtext + waitlist form. */
export const HERO_MESSAGE_MAX_PX = 960;

export const heroMessageMaxClassName = "max-w-[960px]";

/** Gap between nav bottom edge and where hero content begins. */
export const HERO_GAP_BELOW_NAV_PX = 172;

/** Hero content padding-top: 24 + 60 + 172 = 256px (nav float + nav height + gap). */
export const heroContentPaddingTopClassName = "pt-[256px]";

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

export const heroInteractionBoxClassName =
  "relative h-[400px] w-[560px] max-w-full shrink-0 overflow-hidden";

/** How-it-works: same viewport as hero interaction, overflow visible for full sequence. */
export const howItWorksInteractionBoxClassName =
  "relative h-[400px] w-[560px] max-w-full shrink-0 overflow-visible";

/** Fills the 560×400 viewport edge-to-edge (no inner padding). */
export const heroInteractionPhaseFillClassName = "absolute inset-0";

/** Recipe finale: vertically centered, group pinned to the right edge of 560×400. */
export const heroInteractionRecipeVCenterClassName =
  "absolute inset-0 flex w-full items-center justify-end";

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
