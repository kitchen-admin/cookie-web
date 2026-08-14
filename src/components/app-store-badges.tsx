import Image from "next/image";

import {
  APP_STORE_BADGE_ALT,
  APP_STORE_URL,
  PLAY_STORE_BADGE_ALT,
  PLAY_STORE_URL,
} from "@/config/app-store-links";
import { siteImages } from "@/config/site-images";
import { cn } from "@/lib/utils";

type AppStoreBadgesProps = {
  className?: string;
};

/** App Store + Google Play badge pair (Figma 271×52). */
export function AppStoreBadges({ className }: AppStoreBadgesProps) {
  return (
    <div
      className={cn(
        "flex h-auto min-h-[52px] w-auto max-w-full flex-wrap items-center justify-center gap-3 md:justify-start md:gap-4",
        className
      )}
    >
      <a
        href={APP_STORE_URL}
        target={APP_STORE_URL.startsWith("http") ? "_blank" : undefined}
        rel={APP_STORE_URL.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={APP_STORE_BADGE_ALT}
      >
        <Image
          src={siteImages.badgeAppStore}
          alt={APP_STORE_BADGE_ALT}
          width={120}
          height={40}
          unoptimized
          className="h-10 w-[120px] shrink-0"
        />
      </a>
      <a
        href={PLAY_STORE_URL}
        target={PLAY_STORE_URL.startsWith("http") ? "_blank" : undefined}
        rel={PLAY_STORE_URL.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={PLAY_STORE_BADGE_ALT}
      >
        <Image
          src={siteImages.badgePlayStore}
          alt={PLAY_STORE_BADGE_ALT}
          width={135}
          height={40}
          unoptimized
          className="h-10 w-[135px] shrink-0"
        />
      </a>
    </div>
  );
}
