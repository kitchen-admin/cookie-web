/**
 * Hero finale recipe card dimensions (scaled from Figma node 843:9961).
 * Base design: 280×200px image area; multiply by `HERO_RECIPE_CARD_SCALE`.
 */

export const HERO_RECIPE_CARD_SCALE = 0.8;

const s = (value: number) => Math.round(value * HERO_RECIPE_CARD_SCALE);

/** Card shell */
export const HERO_RECIPE_CARD_WIDTH_PX = s(280);
export const HERO_RECIPE_CARD_IMAGE_HEIGHT_PX = s(200);
export const HERO_RECIPE_CARD_GAP_PX = s(29);
export const HERO_RECIPE_CARD_RADIUS_PX = s(16);

/** Image block */
export const HERO_RECIPE_CARD_IMAGE_PADDING_PX = s(12);
export const HERO_RECIPE_CARD_IMAGE_OVERLAP_PX = s(20);

/** Diet badge */
export const HERO_RECIPE_CARD_DIET_BADGE_PX = s(20);
export const HERO_RECIPE_CARD_DIET_BADGE_RADIUS_PX = s(6);
export const HERO_RECIPE_CARD_DIET_DOT_PX = s(8);

/** Save button + heart */
export const HERO_RECIPE_CARD_SAVE_BUTTON_PX = s(24);
export const HERO_RECIPE_CARD_HEART_ICON_PX = s(24);

/** Meta pills row */
export const HERO_RECIPE_CARD_META_GAP_PX = s(10);
export const HERO_RECIPE_CARD_META_ICON_PX = s(16);
export const HERO_RECIPE_CARD_META_PADDING_X_PX = s(8);

/** Title footer */
export const HERO_RECIPE_CARD_FOOTER_PADDING_X_PX = s(16);
export const HERO_RECIPE_CARD_FOOTER_PADDING_BOTTOM_PX = s(12);
export const HERO_RECIPE_CARD_FOOTER_PADDING_TOP_PX = s(32);
export const HERO_RECIPE_CARD_FOOTER_BORDER_PX = s(2);

/** Two cards + gap (hero stage width when right-aligned). */
export const HERO_RECIPE_ROW_WIDTH_PX =
  HERO_RECIPE_CARD_WIDTH_PX * 2 + HERO_RECIPE_CARD_GAP_PX;
