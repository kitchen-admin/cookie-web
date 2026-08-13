import Image from "next/image";

import { SOCIAL_LINKS } from "@/config/footer-links";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
};

/** Footer social icons (24px, 12px gap). */
export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className="flex size-6 items-center justify-center"
        >
          <Image
            src={link.iconSrc}
            alt=""
            width={24}
            height={24}
            unoptimized
            className="size-full object-contain"
          />
        </a>
      ))}
    </div>
  );
}
