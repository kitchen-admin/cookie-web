"use client";

import {
  ChefHat,
  Heart,
  Hourglass,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

import type { HeroRecipe, HeroRecipeDiet } from "@/config/hero-recipes";
import {
  HERO_RECIPE_CARD_REVEAL_S,
  HERO_RECIPE_CARD_STAGGER_MS,
} from "@/config/hero-load-sequence";
import { SiteImage } from "@/components/ui/site-image";
import { cn } from "@/lib/utils";

type HeroRecipeCardProps = {
  recipe: HeroRecipe;
  visible: boolean;
  /** Left → right: 0 = first card, 1 = second (tiny delay only). */
  index: number;
  className?: string;
};

function DietBadge({
  diet,
  className,
}: {
  diet: HeroRecipeDiet;
  className?: string;
}) {
  const isVeg = diet === "veg";

  return (
    <div
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-[6px] border-[1.5px] bg-(--primitive-base-white)",
        isVeg
          ? "border-(--primitive-success-600)"
          : "border-(--primitive-danger-600)",
        className
      )}
      aria-hidden
    >
      {isVeg ? (
        <span className="size-2 rounded-full bg-(--primitive-success-600)" />
      ) : (
        <span
          className="size-0 border-x-[4px] border-b-[7px] border-x-transparent border-b-(--primitive-danger-600)"
          style={{ marginTop: 1 }}
        />
      )}
    </div>
  );
}

function MetaPill({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-full bg-(--primitive-black-20) px-2 py-0.5 backdrop-blur-[20px]">
      <Icon
        className="size-4 shrink-0 text-(--primitive-white-90)"
        strokeWidth={2}
        aria-hidden
      />
      <span className="type-body-sm-medium whitespace-nowrap text-(--text-primary-white)">
        {label}
      </span>
    </div>
  );
}

/**
 * Recipe card from Figma (Cookie App · node 843:9961): 280px wide, 200px image,
 * glass meta pills, overlapping title footer.
 */
export function HeroRecipeCard({
  recipe,
  visible,
  index,
  className,
}: HeroRecipeCardProps) {
  const showHeaderBadge = recipe.showHeaderDietBadge ?? true;

  return (
    <motion.article
      initial={{ opacity: 0, y: 4 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 4,
      }}
      transition={{
        duration: HERO_RECIPE_CARD_REVEAL_S,
        delay: visible ? (index * HERO_RECIPE_CARD_STAGGER_MS) / 1000 : 0,
        ease: "easeInOut",
      }}
      className={cn(
        "flex w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl bg-(--primitive-base-white)",
        !visible && "pointer-events-none",
        className
      )}
      aria-hidden={!visible}
    >
      {/* Image + overlay meta */}
      <div className="relative -mb-5 flex h-[200px] shrink-0 flex-col gap-2 overflow-hidden rounded-2xl p-3">
        <SiteImage
          src={recipe.imageUrl}
          alt=""
          width={280}
          height={200}
          className="absolute inset-0 size-full object-cover"
          placeholderClassName="absolute inset-0 size-full rounded-2xl"
        />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <DietBadge
              diet={recipe.diet}
              className={cn(!showHeaderBadge && "pointer-events-none opacity-0")}
            />
            <button
              type="button"
              className="flex size-6 shrink-0 items-center justify-center rounded-full backdrop-blur-[2px]"
              aria-label="Save recipe"
            >
              <Heart
                className="size-6 text-(--primitive-white-90)"
                strokeWidth={1.75}
              />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <DietBadge diet={recipe.diet} />
            <MetaPill icon={Users} label={`x${recipe.servings}`} />
            <MetaPill icon={ChefHat} label={recipe.difficulty} />
            <MetaPill icon={Hourglass} label={recipe.cookTime} />
          </div>
        </div>
      </div>

      {/* Title footer — overlaps image per Figma */}
      <div className="relative z-10 flex items-center rounded-b-2xl border-2 border-t-0 border-(--primitive-black-8) px-4 pb-3 pt-8">
        <h3 className="type-body-md-medium min-w-0 flex-1 text-left text-(--text-primary-black)">
          {recipe.title}
        </h3>
      </div>
    </motion.article>
  );
}
