/** Navbar entrance: header fade → pill expand → nav content fade. */
export const NAVBAR_HEADER_FADE_S = 0.25;
export const NAVBAR_PILL_EXPAND_S = 0.65;
export const NAVBAR_CONTENT_FADE_S = 0.3;

/** Milliseconds until navbar entrance is finished (hero content starts next). */
export const NAVBAR_COMPLETE_MS = Math.round(
  (NAVBAR_HEADER_FADE_S + NAVBAR_PILL_EXPAND_S + NAVBAR_CONTENT_FADE_S) *
    1000
);

/** Hero headline + waitlist fade-in duration. */
export const HERO_CONTENT_REVEAL_MS = 400;

/** Fridge image fade-in duration before scan starts. */
export const HERO_IMAGE_REVEAL_MS = 400;

/** Logo + “Cookie is cooking” visible before recipe cards. */
export const HERO_COOKING_BEAT_MS = 1200;

/** Tiny offset before card 2 starts (card 1 leads by a fraction of a second). */
export const HERO_RECIPE_CARD_STAGGER_MS = 90;

/** Recipe card fade + rise duration (seconds). */
export const HERO_RECIPE_CARD_REVEAL_S = 0.5;

/** Recipe finale: logo → message → cards. Delays between each step. */
export const HERO_RECIPE_SUGGESTION_MESSAGE_DELAY_MS = 180;
export const HERO_RECIPE_SUGGESTION_CARDS_DELAY_MS = 120;
