/**
 * Copy and timing for /downloads — a short “taking you to the store”
 * page that picks App Store, Play Store, or the homepage from the
 * visitor’s device, then shows manual links if the redirect is blocked.
 */
export const DOWNLOADS_COPY = {
  lead: "Taking you to the right place...",
  fallbackLead: "If you aren't redirected automatically:",
  websiteLabel: "Website",
} as const;

/** Wait this long so the spinner can paint before we leave. */
export const DOWNLOADS_REDIRECT_DELAY_MS = 300;

/** Show the manual store / website links if we’re still here. */
export const DOWNLOADS_FALLBACK_DELAY_MS = 3000;
