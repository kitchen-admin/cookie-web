import type { ComponentType } from "react";

import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Recipes } from "@/components/sections/recipes";
import { SECTIONS, type SectionId } from "@/config/sections";

const SECTION_COMPONENTS: Record<SectionId, ComponentType> = {
  hero: Hero,
  recipes: Recipes,
  faq: Faq,
};

/** Landing page sections in registry order (matches `SECTIONS`). */
export function LandingSections() {
  return (
    <>
      {SECTIONS.map(({ id }) => {
        const SectionComponent = SECTION_COMPONENTS[id];
        return <SectionComponent key={id} />;
      })}
    </>
  );
}
