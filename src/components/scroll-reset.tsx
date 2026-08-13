"use client";

import { useEffect } from "react";

/**
 * Stops the browser from restoring a mid-page scroll (or chasing the footer
 * as images load) so a refresh of "/" starts at the top.
 * Hash URLs like /#faq still jump to that section.
 */
export function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
