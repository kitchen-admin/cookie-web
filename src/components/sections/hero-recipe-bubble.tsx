"use client";

import { useId } from "react";

import { SiteImage } from "@/components/ui/site-image";
import {
  HERO_RECIPE_BUBBLE_HEIGHT_PX,
  HERO_RECIPE_BUBBLE_WIDTH_PX,
} from "@/config/hero-recipe-card-layout";

type HeroRecipeBubbleProps = {
  imageUrl: string;
};

/**
 * Sent iMessage photo shape, sized to this photo.
 * Uses the photo’s own width/height so the tail stays in proportion.
 */
function imessageSentPath(width: number, height: number): string {
  const x = (value: number) => (value / width).toFixed(4);
  const y = (value: number) => (value / height).toFixed(4);

  return [
    `M ${x(width - 20)} ${y(height)}`,
    `L ${x(15)} ${y(height)}`,
    `C ${x(8)} ${y(height)} ${x(0)} ${y(height - 8)} ${x(0)} ${y(height - 15)}`,
    `L ${x(0)} ${y(15)}`,
    `C ${x(0)} ${y(8)} ${x(8)} ${y(0)} ${x(15)} ${y(0)}`,
    `L ${x(width - 20)} ${y(0)}`,
    `C ${x(width - 12)} ${y(0)} ${x(width - 5)} ${y(8)} ${x(width - 5)} ${y(15)}`,
    `L ${x(width - 5)} ${y(height - 12)}`,
    `C ${x(width - 5)} ${y(height - 1)} ${x(width)} ${y(height)} ${x(width)} ${y(height)}`,
    `L ${x(width + 1)} ${y(height)}`,
    `C ${x(width - 4)} ${y(height + 1)} ${x(width - 8)} ${y(height - 1)} ${x(width - 12)} ${y(height - 4)}`,
    `C ${x(width - 15)} ${y(height)} ${x(width - 20)} ${y(height)} ${x(width - 20)} ${y(height)}`,
    "Z",
  ].join(" ");
}

/** Recipe photo clipped like a sent iMessage image. */
export function HeroRecipeBubble({ imageUrl }: HeroRecipeBubbleProps) {
  const clipId = useId().replace(/:/g, "");
  const width = HERO_RECIPE_BUBBLE_WIDTH_PX;
  const height = HERO_RECIPE_BUBBLE_HEIGHT_PX;
  const clip = {
    clipPath: `url(#${clipId})`,
    WebkitClipPath: `url(#${clipId})`,
  };

  return (
    <div className="relative aspect-[192/136] w-[192px] max-md:w-[clamp(6.75rem,40vw,12rem)]">
      <svg
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 size-0 overflow-visible"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={imessageSentPath(width, height)} />
          </clipPath>
        </defs>
      </svg>
      <div className="size-full" style={clip}>
        <SiteImage
          src={imageUrl}
          alt=""
          width={width}
          height={height}
          className="size-full object-cover"
          placeholderClassName="size-full bg-(--primitive-brand-100)"
        />
      </div>
    </div>
  );
}
