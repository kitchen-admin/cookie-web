/**
 * Single source of truth for page sections and navbar links.
 * Add a new section here, then create its component and add it to page.tsx.
 */

export type SectionId = "hero" | "features";

export interface SectionMeta {
  /** Anchor id for URL hash and scroll targets (e.g. #hero). */
  id: SectionId;
  /** Label shown in the navbar when showInNav is true. */
  navLabel: string;
  /** When false, the section exists but has no nav link. */
  showInNav: boolean;
}

export const SECTIONS: SectionMeta[] = [
  { id: "hero", navLabel: "Home", showInNav: false },
  { id: "features", navLabel: "Features", showInNav: true },
];

export const NAV_SECTIONS = SECTIONS.filter((section) => section.showInNav);
