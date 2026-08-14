"use client";

import { motion } from "motion/react";

import { AppStoreBadges } from "@/components/app-store-badges";
import { HeroRecipeCard } from "@/components/sections/hero-recipe-card";
import { Section } from "@/components/sections/section";
import { SiteImage } from "@/components/ui/site-image";
import { RECIPES_SHOWCASE } from "@/config/hero-recipes";
import {
  RECIPES_PHONE_HEIGHT_PX,
  RECIPES_PHONE_WIDTH_PX,
  recipesPhoneBorderDesktopClassName,
  recipesPhoneBorderMobileClassName,
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
      waveFill="var(--primitive-base-white)"
      contentClassName={cn(wideSectionContentClassName, "px-6")}
    >
      <div className="flex w-full flex-col items-center gap-14 max-md:gap-10">
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className={sectionHeaderClassName}>
            What’s in there is dinner
          </h2>
          <p className="type-display-xs-medium text-text-brand-primary">
            Before you open Swiggy again, ask Cookie!
          </p>
          <AppStoreBadges className="mt-1" />
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

          {/* Phone / tablet: cards scroll behind the phone. Swipe anywhere. */}
          <div className="relative w-full lg:hidden">
            <div
              className={cn(
                "absolute top-[42%] left-1/2 z-10 flex w-screen -translate-x-1/2 -translate-y-1/2 gap-4 overflow-x-auto px-4",
                "snap-x snap-mandatory overscroll-x-contain",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              )}
              aria-label="Recipe cards"
            >
              {RECIPES_SHOWCASE.map((recipe, index) => (
                <HeroRecipeCard
                  key={`${recipe.title}-mobile-${index}`}
                  recipe={recipe}
                  visible
                  index={index}
                  className="snap-start shrink-0"
                />
              ))}
            </div>

            <div className="pointer-events-none relative z-20 mx-auto w-full max-w-[320px] max-md:max-w-[280px]">
              <SiteImage
                src={siteImages.recipesPhoneMockup}
                alt="Cookie app on a phone showing recipe suggestions"
                width={RECIPES_PHONE_WIDTH_PX}
                height={RECIPES_PHONE_HEIGHT_PX}
                className={cn(
                  "aspect-[400/727] w-full rounded-t-[40px] object-cover object-top",
                  recipesPhoneBorderMobileClassName
                )}
                placeholderClassName="rounded-t-[40px] bg-(--primitive-brand-100)"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
