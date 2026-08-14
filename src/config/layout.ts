/** Max width (px) for default section content (hero, etc.). */
export const SECTION_CONTENT_MAX_PX = 800;

/** Max width (px) for wide sections (problem, how-it-works, etc.). */
export const WIDE_SECTION_CONTENT_MAX_PX = 1280;

/** Tailwind classes: centered column capped at 800px with horizontal padding. */
export const sectionContentClassName =
  "mx-auto w-full min-w-0 max-w-[800px] px-6";

/** Overrides default max width for wide section inner content. */
export const wideSectionContentClassName = "max-w-7xl";

/** Non-hero sections: 56px vertical padding desktop, 40px on mobile. */
export const sectionVerticalPaddingClassName = "py-14 max-md:py-10";

/**
 * Height of the Figma footer wave (node 1502:4685, ~26.56px).
 * Sections pull up by this amount so the wave sits on the previous block.
 */
export const SECTION_WAVE_HEIGHT_PX = 27;

export const sectionWaveOverlapClassName = "-mt-[27px]";

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

/** Recipes section: phone mockup intrinsic size (desktop). */
export const RECIPES_PHONE_WIDTH_PX = 400;
export const RECIPES_PHONE_HEIGHT_PX = 727;

/** Recipes section: phone mockup width on mobile only (< 768px). */
export const RECIPES_PHONE_MOBILE_WIDTH_PX = 280;

export const recipesPhoneMobileSizeClassName =
  "max-md:w-full max-md:max-w-70";

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
export const recipesSectionPaddingClassName = "pt-14 pb-0 max-md:pt-10 max-md:pb-0";

/** Phone mockup frame — top + sides only (no bottom bezel; bleeds off the section). */
export const recipesPhoneFrameClassName =
  "rounded-t-[40px] bg-(--primitive-base-black) lg:rounded-t-[56px]";

/** Black bezel drawn on top of the screen so cards can tuck underneath. */
export const recipesPhoneBezelClassName =
  "rounded-t-[40px] border-t-8 border-x-8 border-b-0 border-(--primitive-base-black) lg:rounded-t-[56px] lg:border-t-10 lg:border-x-10";

/** Inner screenshot corners, slightly tighter than the outer shell. */
export const recipesPhoneScreenClassName =
  "rounded-t-[32px] lg:rounded-t-[46px]";

/**
 * Vertical start of the recipe-card track, as a % of the phone height.
 * Sits in the empty “Top choice right now” band on the mock (~15–45% of the
 * screenshot, plus the CSS bezel).
 */
export const recipesCardTrackTopClassName = "top-[16%] translate-y-4";

/** Gap from the inner bezel edge to the recipe card on each side. */
export const RECIPES_CARD_INSET_PX = 8;

/** Recipe card width on the phone mock (capped so it still fits smaller phones). */
export const RECIPES_CARD_WIDTH_PX = 340;

/** Coverflow: 1 step away from the phone, then 2 steps away. */
export const RECIPES_CARD_SCALE_NEAR = 0.9;
export const RECIPES_CARD_SCALE_FAR = 0.7;

/**
 * Cards this many steps from the phone stay fully sharp
 * (2 left + 1 in the frame + 2 right = 5 visible cards).
 */
export const RECIPES_CARD_SHARP_DISTANCE = 2;

/** Below this card width, showcase titles and badges shrink for small phones. */
export const RECIPES_CARD_COMPACT_BELOW_PX = 320;

/** Side bezel thickness — matches `recipesPhoneBezelClassName`. */
export const RECIPES_PHONE_BEZEL_PX = 8;
export const RECIPES_PHONE_BEZEL_DESKTOP_PX = 10;

/** How long a card sits on the phone before the next one slides in. */
export const RECIPES_CARD_AUTO_ADVANCE_MS = 3200;

/** FAQ accordion max width (Figma 720px). */
export const FAQ_CONTENT_MAX_PX = 720;

export const faqSectionContentClassName = "max-w-180";

/**
 * Launch Website hero (Figma 1502:4598) is 740px with a 360px fridge.
 * Our scan fridge is 400px, so the section is 40px taller to keep the same
 * top-left copy / bottom-right fridge offset.
 */
export const HERO_SECTION_MIN_HEIGHT_PX = 780;

export const heroSectionMinHeightClassName =
  "min-h-[780px] max-md:h-dvh max-md:min-h-dvh max-md:max-h-dvh";

/** Copy block top offset from the hero top (Figma Frame 7 y=136). */
export const HERO_COPY_TOP_PX = 136;

export const heroCopyPaddingTopClassName = "pt-32 md:pt-36 lg:pt-[136px]";

/**
 * Desktop stage height: 179px from copy top to fridge top (Figma) + 400px fridge.
 * Copy sits top-left; fridge cluster sits bottom-right.
 */
export const HERO_DESKTOP_STAGE_MIN_HEIGHT_PX = 579;

export const heroDesktopStageClassName =
  "lg:relative lg:block lg:min-h-[579px]";

/** Fridge + ingredient chips cluster (Figma Group 5 is 808×369). */
export const HERO_FRIDGE_CLUSTER_WIDTH_PX = 808;

export const heroFridgeClusterClassName =
  "relative w-full max-w-[808px] shrink-0 lg:absolute lg:right-0 lg:bottom-0 max-md:mt-auto max-md:flex max-md:min-h-0 max-md:w-full max-md:max-w-none max-md:flex-1 max-md:flex-col max-md:justify-end";

/** Hero foreground image intrinsic size (hero_fg.png). */
export const HERO_FG_WIDTH_PX = 2880;
export const HERO_FG_HEIGHT_PX = 1200;

/** Hero foreground: slight zoom on mobile only (< 768px), anchored at bottom. */
export const heroFgMobileZoomClassName =
  "max-md:origin-bottom max-md:scale-[1.5]";

/** Floating nav: offset from viewport top (navbar `top-6`). */
export const NAV_FLOAT_TOP_PX = 24;

/** Floating nav bar height (navbar `h-[60px]`). */
export const NAV_HEIGHT_PX = 60;

/** Navbar logo display height (all screen sizes). */
export const NAV_LOGO_HEIGHT_PX = 36;

export const navLogoHeightClassName = "h-9";

/** Horizontal gap between navbar links (How it Works, About Us, Download App). */
export const NAV_BUTTON_GAP_PX = 16;

export const navButtonGapClassName = "gap-[16px]";

/** Shared typography for section h2 headers (Boldnova 56px). */
export const sectionHeaderClassName =
  "type-display-section text-(--text-display)";

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

/**
 * Phones: a square fridge sits at the bottom of the leftover hero space.
 * The recipe photo appears in the middle of that fridge square.
 */
export const heroMobileStageClipClassName =
  "max-md:relative max-md:mx-auto max-md:aspect-square max-md:w-full max-md:max-h-full max-md:overflow-visible md:contents";

export const heroMobileStageInnerClassName =
  "relative max-md:size-full md:h-auto md:w-auto";

/** Mobile-only scale on the fridge animation wrapper (text inside compensates via --hiw-mobile-scale). */
export const HOW_IT_WORKS_MOBILE_STAGE_SCALE = 0.72;

/**
 * Mobile clip: full column width, height = scaled stage.
 * Inner width uses calc(100%/0.72) so after scale it always fills the clip.
 */
export const howItWorksMobileStageClipClassName =
  "max-md:relative max-md:mx-auto max-md:h-[calc(400px*0.72)] max-md:w-full max-md:max-w-[calc(560px*0.72)] md:contents";

/** Inner stage scaled from top-center; width shrinks on narrow viewports. */
export const howItWorksMobileStageInnerClassName =
  "max-md:absolute max-md:top-0 max-md:left-1/2 max-md:h-[400px] max-md:w-[calc(100%/0.72)] max-md:max-w-[560px] max-md:-translate-x-1/2 max-md:origin-top max-md:scale-[0.72] md:static md:h-auto md:w-auto md:translate-x-0 md:scale-100";

/** Fills the 560×400 viewport edge-to-edge (no inner padding). */
export const heroInteractionPhaseFillClassName = "absolute inset-0";

/** Recipe finale: vertically centered, group pinned to the right edge of 560×400. */
export const heroInteractionRecipeVCenterClassName =
  "absolute inset-0 flex w-full items-center justify-end";

/** Recipe finale: vertically centered, group flush to the left edge of 560×400. */
export const heroInteractionRecipeVStartClassName =
  "absolute inset-0 flex w-full items-center justify-start";

/** Recipe finale: vertically + horizontally centered (how-it-works mobile). */
export const heroInteractionRecipeCenterClassName =
  "absolute inset-0 flex w-full items-center justify-center";

/** Fridge band — full interaction viewport. */
export const heroStageFridgeBandClassName = "relative size-full";

/** Fridge photo + scan line — full square on phones, 400px on the right from md up. */
export const heroStageFridgeViewportClassName =
  "absolute top-0 right-0 z-0 aspect-square w-full max-md:inset-0 max-md:size-full md:top-1/2 md:w-[400px] md:max-w-full md:-translate-y-1/2";

export const heroStageFridgeClassName =
  "relative z-0 flex size-full items-center justify-center origin-center";

/** Scan frame — matches the centered fridge viewport. */
export const heroStageScanFrameClassName =
  "pointer-events-none absolute inset-0 z-[5] overflow-hidden rounded-3xl";

/**
 * Meeting point for the ingredient cards.
 * Desktop: 12px into the fridge, centered on the 400px fridge.
 * Phone: dead center of the fridge square.
 */
export const heroRecipeAnchorClassName =
  "-translate-x-1/2 max-md:top-1/2 max-md:left-1/2 max-md:-translate-y-1/2 md:left-[calc(100%-200px)] md:top-0 md:translate-y-[12px]";

/**
 * Recipe photo.
 * Desktop: overlaps the fridge top by 12px.
 * Phone: centered on the fridge image.
 */
export const heroBubbleMergeFocalClassName =
  "-translate-x-1/2 max-md:top-1/2 max-md:left-1/2 max-md:-translate-y-1/2 md:left-[calc(100%-200px)] md:top-0 md:-translate-y-[calc(100%-12px)]";
