"use client";

import { useSyncExternalStore } from "react";

import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const BOTTOM_BLUR_CLASS =
  "pointer-events-none fixed inset-x-0 bottom-0 z-40 h-14 md:h-20";

/** Samsung / Android Chrome struggles with stacked masked backdrop-filters. */
function isAndroidChrome() {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent) && /Chrome/i.test(navigator.userAgent);
}

function subscribeAndroidChrome(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

function getAndroidChromeSnapshot() {
  return isAndroidChrome();
}

function getAndroidChromeServerSnapshot() {
  return false;
}

function useAndroidChrome() {
  return useSyncExternalStore(
    subscribeAndroidChrome,
    getAndroidChromeSnapshot,
    getAndroidChromeServerSnapshot
  );
}

/**
 * Single-layer blur + gradient for Android Chrome (reliable on Samsung devices).
 * iPhone Safari keeps the full progressive stack unchanged.
 */
function SimpleBottomBlur() {
  return (
    <div className={BOTTOM_BLUR_CLASS} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          WebkitBackdropFilter: "blur(12px)",
          backdropFilter: "blur(12px)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,1) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,1) 100%)",
        }}
      />
    </div>
  );
}

/**
 * Fixed progressive blur at the bottom of the viewport (all pages).
 * Heights: 56px (phone) → 80px (md+). Sits above page content, below the navbar.
 */
export function ViewportBottomBlur() {
  const androidChrome = useAndroidChrome();

  if (androidChrome) {
    return <SimpleBottomBlur />;
  }

  return (
    <ProgressiveBlur className={BOTTOM_BLUR_CLASS} position="bottom" />
  );
}
