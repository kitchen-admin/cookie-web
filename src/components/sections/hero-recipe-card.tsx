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
  /** Defaults to the hero card width. Recipes carousel passes a phone-based size. */
  width?: number;
  /** Defaults to the hero image height. Grow this with `width` to keep the photo ratio. */
  imageHeight?: number;
  /**
   * `showcase` = recipes-section card: no white shell, bigger semibold title,
   * tighter photo + title so the card sits in the phone’s peach band.
   */
  variant?: "hero" | "showcase";
  /** Smaller type and badges when the phone (and card) is narrow. */
  compact?: boolean;
};

/** Equilateral non-veg mark with rounded corners (FSSAI-style triangle). */
function NonVegTriangle({ px }: { px: number }) {
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <polygon
        points="12,4.5 20,18.356 4,18.356"
        fill="var(--primitive-danger-600)"
        stroke="var(--primitive-danger-600)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DietBadge({
  diet,
  className,
  large = false,
}: {
  diet: HeroRecipeDiet;
  className?: string;
  large?: boolean;
}) {
  const isVeg = diet === "veg";
  const k = large ? 1.35 : 1;
  const badgeBorderPx = Math.max(1, Math.round(1.5 * 0.8 * k));

  return (
    <div
      className={cn("flex shrink-0 items-center justify-center bg-(--primitive-base-white)", className)}
      style={{
        width: Math.round(HERO_RECIPE_CARD_DIET_BADGE_PX * k),
        height: Math.round(HERO_RECIPE_CARD_DIET_BADGE_PX * k),
        borderRadius: Math.round(HERO_RECIPE_CARD_DIET_BADGE_RADIUS_PX * k),
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
            width: Math.round(HERO_RECIPE_CARD_DIET_DOT_PX * k),
            height: Math.round(HERO_RECIPE_CARD_DIET_DOT_PX * k),
          }}
        />
      ) : (
        <NonVegTriangle px={Math.round(HERO_RECIPE_CARD_DIET_DOT_PX * k * 1.5)} />
      )}
    </div>
  );
}

function MetaPill({
  icon: Icon,
  label,
  large = false,
}: {
  icon: LucideIcon;
  label: string;
  large?: boolean;
}) {
  const k = large ? 1.35 : 1;
  const iconPx = Math.round(HERO_RECIPE_CARD_META_ICON_PX * k);

  return (
    <div
      className={cn(
        "flex shrink-0 items-center rounded-full bg-(--primitive-black-20) backdrop-blur-[20px]",
        large ? "gap-1.5 py-1" : "gap-1 py-0.5"
      )}
      style={{ paddingInline: Math.round(HERO_RECIPE_CARD_META_PADDING_X_PX * k) }}
    >
      <Icon
        className="shrink-0 text-(--primitive-white-90)"
        style={{
          width: iconPx,
          height: iconPx,
        }}
        strokeWidth={2}
        aria-hidden
      />
      <span
        className={cn(
          "whitespace-nowrap text-(--text-primary-white)",
          large ? "type-label-md-medium" : "type-label-sm-medium"
        )}
      >
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
  width = HERO_RECIPE_CARD_WIDTH_PX,
  imageHeight = HERO_RECIPE_CARD_IMAGE_HEIGHT_PX,
  variant = "hero",
  compact = false,
}: HeroRecipeCardProps) {
  const isShowcase = variant === "showcase";
  const largeMeta = isShowcase && !compact;
  const titleClass = !isShowcase
    ? "type-body-sm-medium"
    : compact
      ? "type-body-sm-semibold"
      : "type-body-lg-semibold";
  const footerPad = compact ? 8 : 12;

  return (
    <motion.article
      initial={isShowcase ? false : { opacity: 0, y: 4 }}
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
        "flex shrink-0 flex-col",
        isShowcase
          ? "bg-transparent"
          : "overflow-hidden bg-(--primitive-base-white)",
        !visible && "pointer-events-none",
        className
      )}
      style={{
        width,
        borderRadius: HERO_RECIPE_CARD_RADIUS_PX,
      }}
      aria-hidden={!visible}
    >
      {/* Image + overlay meta */}
      <div
        className="relative z-20 flex shrink-0 flex-col gap-2 overflow-hidden"
        style={{
          height: imageHeight,
          marginBottom: isShowcase
            ? -HERO_RECIPE_CARD_RADIUS_PX
            : -HERO_RECIPE_CARD_IMAGE_OVERLAP_PX,
          padding: HERO_RECIPE_CARD_IMAGE_PADDING_PX,
          borderRadius: HERO_RECIPE_CARD_RADIUS_PX,
        }}
      >
        <SiteImage
          src={recipe.imageUrl}
          alt=""
          width={width}
          height={imageHeight}
          className="absolute inset-0 size-full object-cover"
          placeholderClassName="absolute inset-0 size-full rounded-[13px]"
        />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-start justify-end">
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
            style={{
              gap: largeMeta
                ? Math.round(HERO_RECIPE_CARD_META_GAP_PX * 1.35)
                : HERO_RECIPE_CARD_META_GAP_PX,
            }}
          >
            <DietBadge diet={recipe.diet} large={largeMeta} />
            <MetaPill
              icon={Users}
              label={`x${recipe.servings}`}
              large={largeMeta}
            />
            <MetaPill
              icon={ChefHat}
              label={recipe.difficulty}
              large={largeMeta}
            />
            <MetaPill
              icon={Hourglass}
              label={recipe.cookTime}
              large={largeMeta}
            />
          </div>
        </div>
      </div>

      {/* Title — hero sits on a white footer; showcase sits in a boxed label. */}
      <div
        className={cn(
          "relative z-0 flex items-center border-(--primitive-black-8)",
          "border-t-0"
        )}
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: HERO_RECIPE_CARD_RADIUS_PX,
          borderBottomRightRadius: HERO_RECIPE_CARD_RADIUS_PX,
          borderWidth: HERO_RECIPE_CARD_FOOTER_BORDER_PX,
          borderTopWidth: 0,
          borderStyle: "solid",
          paddingInline: isShowcase ? footerPad : HERO_RECIPE_CARD_FOOTER_PADDING_X_PX,
          paddingBottom: isShowcase
            ? footerPad
            : HERO_RECIPE_CARD_FOOTER_PADDING_BOTTOM_PX,
          paddingTop: isShowcase
            ? footerPad + HERO_RECIPE_CARD_RADIUS_PX
            : HERO_RECIPE_CARD_FOOTER_PADDING_TOP_PX,
        }}
      >
        <h3
          className={cn(
            "min-w-0 flex-1 text-left text-(--text-primary-black)",
            titleClass
          )}
        >
          {recipe.title}
        </h3>
      </div>
    </motion.article>
  );
}
