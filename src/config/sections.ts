/**
 * Single source of truth for page sections and navbar links.
 * Add a new section here, wire its component in `landing-sections.tsx`.
 */

export type SectionId =
  | "hero"
  | "problem"
  | "how-it-works"
  | "recipes"
  | "faq";

export interface SectionMeta {
  /** Anchor id for URL hash and scroll targets (e.g. #how-it-works). */
  id: SectionId;
  /** Label shown in the navbar when showInNav is true. */
  navLabel: string;
  /** When false, the section exists but has no nav link. */
  showInNav: boolean;
}

export const SECTIONS: SectionMeta[] = [
  { id: "hero", navLabel: "Hero", showInNav: false },
  /** Figma nav "About Us" — problem / brand story block. */
  { id: "problem", navLabel: "About Us", showInNav: true },
  { id: "how-it-works", navLabel: "How it works", showInNav: true },
  { id: "recipes", navLabel: "Recipes", showInNav: false },
  { id: "faq", navLabel: "FAQ", showInNav: false },
];

export const NAV_SECTIONS = SECTIONS.filter((section) => section.showInNav);
