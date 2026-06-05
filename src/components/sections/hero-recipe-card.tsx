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
  HERO_RECIPE_CARD_DIET_BADGE_PX,
  HERO_RECIPE_CARD_DIET_BADGE_RADIUS_PX,
  HERO_RECIPE_CARD_DIET_DOT_PX,
  HERO_RECIPE_CARD_FOOTER_BORDER_PX,
  HERO_RECIPE_CARD_FOOTER_PADDING_BOTTOM_PX,
  HERO_RECIPE_CARD_FOOTER_PADDING_TOP_PX,
  HERO_RECIPE_CARD_FOOTER_PADDING_X_PX,
  HERO_RECIPE_CARD_HEART_ICON_PX,
  HERO_RECIPE_CARD_IMAGE_HEIGHT_PX,
  HERO_RECIPE_CARD_IMAGE_OVERLAP_PX,
  HERO_RECIPE_CARD_IMAGE_PADDING_PX,
  HERO_RECIPE_CARD_META_GAP_PX,
  HERO_RECIPE_CARD_META_ICON_PX,
  HERO_RECIPE_CARD_META_PADDING_X_PX,
  HERO_RECIPE_CARD_RADIUS_PX,
  HERO_RECIPE_CARD_SAVE_BUTTON_PX,
  HERO_RECIPE_CARD_WIDTH_PX,
} from "@/config/hero-recipe-card-layout";
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
  const badgeBorderPx = Math.max(1, Math.round(1.5 * 0.8));

  return (
    <div
      className={cn("flex shrink-0 items-center justify-center bg-(--primitive-base-white)", className)}
      style={{
        width: HERO_RECIPE_CARD_DIET_BADGE_PX,
        height: HERO_RECIPE_CARD_DIET_BADGE_PX,
        borderRadius: HERO_RECIPE_CARD_DIET_BADGE_RADIUS_PX,
        borderWidth: badgeBorderPx,
        borderStyle: "solid",
        borderColor: isVeg
          ? "var(--primitive-success-600)"
          : "var(--primitive-danger-600)",
      }}
      aria-hidden
    >
      {isVeg ? (
        <span
          className="rounded-full bg-(--primitive-success-600)"
          style={{
            width: HERO_RECIPE_CARD_DIET_DOT_PX,
            height: HERO_RECIPE_CARD_DIET_DOT_PX,
          }}
        />
      ) : (
        <span
          className="size-0 border-x-transparent border-b-(--primitive-danger-600)"
          style={{
            borderLeftWidth: Math.round(4 * 0.8),
            borderRightWidth: Math.round(4 * 0.8),
            borderBottomWidth: Math.round(7 * 0.8),
            marginTop: 1,
          }}
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
    <div
      className="flex shrink-0 items-center gap-1 rounded-full bg-(--primitive-black-20) py-0.5 backdrop-blur-[20px]"
      style={{ paddingInline: HERO_RECIPE_CARD_META_PADDING_X_PX }}
    >
      <Icon
        className="shrink-0 text-(--primitive-white-90)"
        style={{
          width: HERO_RECIPE_CARD_META_ICON_PX,
          height: HERO_RECIPE_CARD_META_ICON_PX,
        }}
        strokeWidth={2}
        aria-hidden
      />
      <span className="type-label-sm-medium whitespace-nowrap text-(--text-primary-white)">
        {label}
      </span>
    </div>
  );
}

/** Scaled recipe card for the hero finale (Figma 843:9961 at 80%). */
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
        "flex shrink-0 flex-col overflow-hidden bg-(--primitive-base-white)",
        !visible && "pointer-events-none",
        className
      )}
      style={{
        width: HERO_RECIPE_CARD_WIDTH_PX,
        borderRadius: HERO_RECIPE_CARD_RADIUS_PX,
      }}
      aria-hidden={!visible}
    >
      {/* Image + overlay meta */}
      <div
        className="relative flex shrink-0 flex-col gap-2 overflow-hidden"
        style={{
          height: HERO_RECIPE_CARD_IMAGE_HEIGHT_PX,
          marginBottom: -HERO_RECIPE_CARD_IMAGE_OVERLAP_PX,
          padding: HERO_RECIPE_CARD_IMAGE_PADDING_PX,
          borderRadius: HERO_RECIPE_CARD_RADIUS_PX,
        }}
      >
        <SiteImage
          src={recipe.imageUrl}
          alt=""
          width={HERO_RECIPE_CARD_WIDTH_PX}
          height={HERO_RECIPE_CARD_IMAGE_HEIGHT_PX}
          className="absolute inset-0 size-full object-cover"
          placeholderClassName="absolute inset-0 size-full rounded-[13px]"
        />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <DietBadge
              diet={recipe.diet}
              className={cn(!showHeaderBadge && "pointer-events-none opacity-0")}
            />
            <button
              type="button"
              className="flex shrink-0 items-center justify-center rounded-full backdrop-blur-[2px]"
              style={{
                width: HERO_RECIPE_CARD_SAVE_BUTTON_PX,
                height: HERO_RECIPE_CARD_SAVE_BUTTON_PX,
              }}
              aria-label="Save recipe"
            >
              <Heart
                className="text-(--primitive-white-90)"
                style={{
                  width: HERO_RECIPE_CARD_HEART_ICON_PX,
                  height: HERO_RECIPE_CARD_HEART_ICON_PX,
                }}
                strokeWidth={1.75}
              />
            </button>
          </div>

          <div
            className="flex flex-wrap items-center"
            style={{ gap: HERO_RECIPE_CARD_META_GAP_PX }}
          >
            <DietBadge diet={recipe.diet} />
            <MetaPill icon={Users} label={`x${recipe.servings}`} />
            <MetaPill icon={ChefHat} label={recipe.difficulty} />
            <MetaPill icon={Hourglass} label={recipe.cookTime} />
          </div>
        </div>
      </div>

      {/* Title footer — overlaps image per Figma */}
      <div
        className="relative z-10 flex items-center border-t-0 border-(--primitive-black-8)"
        style={{
          borderBottomLeftRadius: HERO_RECIPE_CARD_RADIUS_PX,
          borderBottomRightRadius: HERO_RECIPE_CARD_RADIUS_PX,
          borderWidth: HERO_RECIPE_CARD_FOOTER_BORDER_PX,
          borderStyle: "solid",
          paddingInline: HERO_RECIPE_CARD_FOOTER_PADDING_X_PX,
          paddingBottom: HERO_RECIPE_CARD_FOOTER_PADDING_BOTTOM_PX,
          paddingTop: HERO_RECIPE_CARD_FOOTER_PADDING_TOP_PX,
        }}
      >
        <h3 className="type-body-sm-medium min-w-0 flex-1 text-left text-(--text-primary-black)">
          {recipe.title}
        </h3>
      </div>
    </motion.article>
  );
}
