"use client";

import { motion } from "motion/react";

import { HeroRecipeCard } from "@/components/sections/hero-recipe-card";
import { Section } from "@/components/sections/section";
import { SiteImage } from "@/components/ui/site-image";
import { RECIPES_SHOWCASE } from "@/config/hero-recipes";
import {
  RECIPES_PHONE_HEIGHT_PX,
  RECIPES_PHONE_WIDTH_PX,
  recipesPhoneBorderDesktopClassName,
  recipesPhoneBorderMobileClassName,
  recipesPhoneMobileSizeClassName,
  recipesSectionPaddingClassName,
  sectionHeaderClassName,
  wideSectionContentClassName,
} from "@/config/layout";
import { recipesShowcaseCardStyle } from "@/config/recipes-showcase-layout";
import { siteImages } from "@/config/site-images";
import { cn } from "@/lib/utils";

export function Recipes() {
  return (
    <Section
      id="recipes"
      reveal={false}
      className={cn(
        "bg-(--primitive-base-white)",
        recipesSectionPaddingClassName
      )}
      contentClassName={cn(wideSectionContentClassName, "px-6")}
    >
      <div className="flex w-full flex-col items-center gap-14 max-md:gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className={sectionHeaderClassName}>
            Full fridge. Zero ideas. We get it.
          </h2>
          <p className="type-display-xs-medium text-text-brand-primary">
            Before you open Swiggy again, ask Cookie!
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[1204px]">
          {/* Desktop: phone center + floating cards */}
          <div className="relative hidden min-h-[727px] lg:block">
            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
              <SiteImage
                src={siteImages.recipesPhoneMockup}
                alt="Cookie app on a phone showing recipe suggestions"
                width={RECIPES_PHONE_WIDTH_PX}
                height={RECIPES_PHONE_HEIGHT_PX}
                className={cn(
                  "rounded-t-[56px] object-cover object-top",
                  recipesPhoneBorderDesktopClassName
                )}
                placeholderClassName="rounded-t-[56px] bg-(--primitive-brand-100)"
                style={{
                  width: RECIPES_PHONE_WIDTH_PX,
                  height: RECIPES_PHONE_HEIGHT_PX,
                }}
              />
            </div>

            {RECIPES_SHOWCASE.map((recipe, index) => (
              <motion.div
                key={`${recipe.title}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="absolute z-20"
                style={recipesShowcaseCardStyle(recipe.placement)}
              >
                <HeroRecipeCard recipe={recipe} visible index={index} />
              </motion.div>
            ))}
          </div>

          {/* Mobile / tablet: stacked layout */}
          <div className="flex flex-col items-center lg:hidden">
            <SiteImage
              src={siteImages.recipesPhoneMockup}
              alt="Cookie app on a phone showing recipe suggestions"
              width={RECIPES_PHONE_WIDTH_PX}
              height={RECIPES_PHONE_HEIGHT_PX}
              className={cn(
                "aspect-[400/727] w-full max-w-[320px] rounded-t-[40px] object-cover object-top",
                recipesPhoneMobileSizeClassName,
                recipesPhoneBorderMobileClassName
              )}
              placeholderClassName="rounded-t-[40px] bg-(--primitive-brand-100)"
            />
            <div
              className="flex w-full flex-col max-md:hidden"
              style={{
                marginTop: 24,
                gap: 16,
              }}
            >
              {[0, 1].map((row) => (
                <div key={row} className="flex w-full flex-col gap-4">
                  {RECIPES_SHOWCASE.slice(row * 2, row * 2 + 2).map(
                    (recipe, index) => (
                      <HeroRecipeCard
                        key={`${recipe.title}-mobile-${row * 2 + index}`}
                        recipe={recipe}
                        visible
                        index={row * 2 + index}
                        className="mx-auto"
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
