"use client";

import { useId, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Sent iMessage shape (tail on the bottom-right).
 * Path is the Messages “my message” Bezier from the SwiftUI recreation
 * (Gerry915 gist): rounded body + hooked tail, not a triangle pointer.
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

type ImessageBubbleProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** Clips children into a sent iMessage bubble. Scales to whatever size you give it. */
export function ImessageBubble({
  children,
  className,
  style,
}: ImessageBubbleProps) {
  const clipId = useId().replace(/:/g, "");
  const clip = {
    clipPath: `url(#${clipId})`,
    WebkitClipPath: `url(#${clipId})`,
  };

  return (
    <div className={cn("relative", className)} style={style}>
      <svg
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 size-0 overflow-visible"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={imessageSentPath(200, 64)} />
          </clipPath>
        </defs>
      </svg>
      <div className="size-full" style={clip}>
        {children}
      </div>
    </div>
  );
}
