"use client";

import { useState } from "react";

import { SiteImage } from "@/components/ui/site-image";
import {
  ABOUT_FOUNDERS,
  ABOUT_FOUNDERS_ASPECT,
  ABOUT_FOUNDERS_SIGNATURE_ORDER,
  ABOUT_FOUNDERS_SINK_PERCENT,
} from "@/config/about";
import { cn } from "@/lib/utils";

type Founder = (typeof ABOUT_FOUNDERS)[number];

/** Shared hover handlers so a name and its photo light up together. */
type HoverProps = {
  isActive: boolean;
  onHover: (name: string | null) => void;
};

/**
 * Custom bezier curves so hovering in and out feel like two different
 * motions rather than Tailwind's stock `ease-in`/`ease-out` (which are
 * fairly abrupt): a snappy deceleration on the way in, a slower, gentler
 * acceleration settling back to grey on the way out.
 */
const EASE_OUT = "ease-[cubic-bezier(0.16,1,0.3,1)]"; // hover in
const EASE_IN = "ease-[cubic-bezier(0.7,0,0.84,0)]"; // hover out

/**
 * Founder cluster at the bottom of About us (Figma 1562:19832): a
 * handwritten signature above three overlapping chef cutouts, sunk into the
 * footer wave so it looks like they're standing behind it.
 *
 * Everyone starts greyscale. Hovering (or focusing) a name lights up that
 * name *and* its photo together, and vice versa — they share one `hovered`
 * state instead of relying on DOM adjacency. Founders with a `linkedinUrl`
 * open that profile in a new tab; the rest are just decorative for now.
 */
export function AboutFounders() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative z-0 flex w-full flex-col items-center">
      <p className="font-script text-3xl text-(--text-primary-black) max-md:text-2xl">
        {ABOUT_FOUNDERS_SIGNATURE_ORDER.map((name, index) => {
          const founder = ABOUT_FOUNDERS.find((f) => f.name === name);
          if (!founder) return null;

          const isLast = index === ABOUT_FOUNDERS_SIGNATURE_ORDER.length - 1;
          const separator = index === 0 ? "" : isLast ? " & " : ", ";

          return (
            <span key={founder.name}>
              {separator}
              <FounderName
                founder={founder}
                isActive={hovered === founder.name}
                onHover={setHovered}
              />
            </span>
          );
        })}
      </p>

      <div
        className="relative mt-2 w-full max-w-216"
        style={{
          aspectRatio: ABOUT_FOUNDERS_ASPECT,
          marginBottom: `-${ABOUT_FOUNDERS_SINK_PERCENT}`,
        }}
      >
        {ABOUT_FOUNDERS.map((founder) => (
          <FounderPhoto
            key={founder.name}
            founder={founder}
            isActive={hovered === founder.name}
            onHover={setHovered}
          />
        ))}
      </div>
    </div>
  );
}

function FounderName({
  founder,
  isActive,
  onHover,
}: { founder: Founder } & HoverProps) {
  const className = cn(
    "transition-colors duration-[500ms]",
    isActive
      ? cn("text-text-brand-primary duration-[350ms]", EASE_OUT)
      : cn("text-(--text-primary-black)", EASE_IN)
  );
  const handlers = {
    onMouseEnter: () => onHover(founder.name),
    onMouseLeave: () => onHover(null),
    onFocus: () => onHover(founder.name),
    onBlur: () => onHover(null),
  };

  if (founder.linkedinUrl) {
    return (
      <a
        href={founder.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...handlers}
      >
        {founder.displayName}
      </a>
    );
  }

  return (
    <span className={className} {...handlers}>
      {founder.displayName}
    </span>
  );
}

function FounderPhoto({
  founder,
  isActive,
  onHover,
}: { founder: Founder } & HoverProps) {
  const imageClassName = cn(
    // origin-bottom keeps growth anchored where the photo visually sits
    // (object-bottom) instead of the box's center, so scale-up reads as a
    // clean lift rather than the photo also bulging downward.
    "h-full w-full origin-bottom object-contain object-bottom transform-gpu will-change-transform",
    "transition-[filter,transform] duration-[500ms]",
    isActive
      ? cn("-translate-y-2 scale-105 grayscale-0 duration-[350ms]", EASE_OUT)
      : cn("translate-y-0 scale-100 grayscale", EASE_IN)
  );
  const handlers = {
    onMouseEnter: () => onHover(founder.name),
    onMouseLeave: () => onHover(null),
  };

  const image = (
    <SiteImage
      src={founder.imageUrl}
      alt={
        founder.linkedinUrl ? `${founder.displayName} on LinkedIn` : ""
      }
      width={founder.width}
      height={founder.height}
      className={imageClassName}
    />
  );

  if (founder.linkedinUrl) {
    return (
      <a
        href={founder.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${founder.displayName} on LinkedIn`}
        className="absolute block"
        style={founder.style}
        {...handlers}
      >
        {image}
      </a>
    );
  }

  return (
    <div
      className="absolute block"
      style={founder.style}
      aria-hidden
      {...handlers}
    >
      {image}
    </div>
  );
}
