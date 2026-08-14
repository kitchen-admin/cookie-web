import Image from "next/image";

import { SOCIAL_LINKS } from "@/config/footer-links";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
};

/** Footer social icons — 20px. */
export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-5", className)}>
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className="flex size-5 items-center justify-center"
        >
          <Image
            src={link.iconSrc}
            alt=""
            width={20}
            height={20}
            unoptimized
            className="size-full object-contain"
          />
        </a>
      ))}
    </div>
  );
}
