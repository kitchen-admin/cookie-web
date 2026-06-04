/**
 * Single source of truth for page sections and navbar links.
 * Add a new section here, then create its component and add it to page.tsx.
 */

export type SectionId = "how-it-works" | "about-us" | "features";

export interface SectionMeta {
  /** Anchor id for URL hash and scroll targets (e.g. #how-it-works). */
  id: SectionId;
  /** Label shown in the navbar when showInNav is true. */
  navLabel: string;
  /** When false, the section exists but has no nav link. */
  showInNav: boolean;
}

export const SECTIONS: SectionMeta[] = [
  { id: "how-it-works", navLabel: "How it Works", showInNav: true },
  { id: "about-us", navLabel: "About Us", showInNav: true },
  { id: "features", navLabel: "Features", showInNav: false },
];

export const NAV_SECTIONS = SECTIONS.filter((section) => section.showInNav);
