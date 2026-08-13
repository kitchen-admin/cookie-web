/**
 * Single source of truth for homepage sections and navbar links.
 * Add a new homepage section here, wire its component in `landing-sections.tsx`.
 */

export type SectionId = "hero" | "recipes" | "faq";

export interface SectionMeta {
  /** Anchor id for URL hash and scroll targets (e.g. #faq). */
  id: SectionId;
  /** Label shown in the navbar when showInNav is true. */
  navLabel: string;
  /** When false, the section exists but has no nav link. */
  showInNav: boolean;
}

export const SECTIONS: SectionMeta[] = [
  { id: "hero", navLabel: "How it works?", showInNav: false },
  { id: "recipes", navLabel: "Recipes", showInNav: false },
  { id: "faq", navLabel: "FAQs", showInNav: true },
];

export type NavHref = {
  label: string;
  href: string;
};

/** Navbar + footer primary links (Figma Launch Website). */
export const NAV_ITEMS: NavHref[] = [
  { label: "FAQs", href: "/#faq" },
  { label: "About us", href: "/about" },
];
