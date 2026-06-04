import Image from "next/image";

import { hasSiteImage } from "@/config/site-images";
import { cn } from "@/lib/utils";

type SiteImageProps = {
  src: string | undefined;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Shown when src is empty (placeholder mode). */
  placeholderClassName?: string;
  priority?: boolean;
};

/**
 * Renders a Vercel Blob (or remote) image when src is set; otherwise a placeholder block.
 */
export function SiteImage({
  src,
  alt,
  width,
  height,
  className,
  placeholderClassName,
  priority = false,
}: SiteImageProps) {
  if (!hasSiteImage(src)) {
    return (
      <div
        className={cn(
          "bg-(--primitive-brand-100)",
          placeholderClassName,
          className
        )}
        style={{ width, height }}
        aria-hidden={alt ? undefined : true}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
