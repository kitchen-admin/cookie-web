import type { MouseEvent } from "react";

/**
 * In-page hash links (#hero, #faq) should scroll without using html { scroll-smooth }.
 * That global style makes a refresh animate from the top down to a saved position.
 */
export function handleHashNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void
) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    onNavigate?.();
    return;
  }

  const hash = href.slice(hashIndex);
  if (hash.length < 2) {
    onNavigate?.();
    return;
  }

  const target = document.getElementById(hash.slice(1));
  if (!target) {
    onNavigate?.();
    return;
  }

  event.preventDefault();

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
  window.history.pushState(null, "", hash);
  onNavigate?.();
}
