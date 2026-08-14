import type { ReactNode } from "react";

import { SiteImage } from "@/components/ui/site-image";
import {
  recipesPhoneBezelClassName,
  recipesPhoneFrameClassName,
  recipesPhoneScreenClassName,
} from "@/config/layout";
import { cn } from "@/lib/utils";

type PhoneFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Sits on the screenshot and tucks under the black bezel (recipe cards). */
  children?: ReactNode;
};

/**
 * Black phone shell we draw with CSS (not baked into the screenshot).
 * Layer order: screenshot (back) → children → bezel (front).
 * Overflow stays visible so cards can slide out past the phone.
 */
export function PhoneFrame({
  src,
  alt,
  width,
  height,
  className,
  children,
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-visible",
        recipesPhoneFrameClassName,
        className
      )}
    >
      {/* App screenshot — behind the scrolling cards. */}
      <div className="pointer-events-none absolute inset-x-2 top-2 bottom-0 z-0 overflow-hidden lg:inset-x-2.5 lg:top-2.5">
        <SiteImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "size-full object-cover object-top",
            recipesPhoneScreenClassName
          )}
          placeholderClassName={recipesPhoneScreenClassName}
        />
      </div>

      {children}

      {/* Hardware nubs. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[18%] -left-0.75 z-40 h-4 w-0.75 rounded-l-sm bg-neutral-800"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[26%] -left-0.75 z-40 h-8 w-0.75 rounded-l-sm bg-neutral-800"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[38%] -left-0.75 z-40 h-8 w-0.75 rounded-l-sm bg-neutral-800"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[28%] -right-0.75 z-40 h-12 w-0.75 rounded-r-sm bg-neutral-800"
      />

      {/* Bezel ring on top so cards slide under the black frame. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-40",
          recipesPhoneBezelClassName
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1.5 left-1/2 z-50 h-0.75 w-14 -translate-x-1/2 rounded-full bg-neutral-700"
      />
    </div>
  );
}
