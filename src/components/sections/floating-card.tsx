"use client";

import { motion } from "motion/react";

import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SiteImage } from "@/components/ui/site-image";
import { cn } from "@/lib/utils";

export type FloatingCardProps = {
  name: string;
  days: number;
  imageUrl?: string;
  delay?: number;
  className?: string;
  /** Tailwind position classes for placement around the fridge mock */
  positionClassName?: string;
};

export function FloatingCard({
  name,
  days,
  imageUrl,
  delay = 0,
  className,
  positionClassName,
}: FloatingCardProps) {
  return (
    <BlurFade delay={delay} inView className={cn("absolute", positionClassName)}>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4 + delay * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "flex max-w-[200px] items-center gap-2 rounded-2xl border border-(--primitive-black-16)",
          "bg-(--primitive-black-4) p-2",
          className
        )}
      >
        <SiteImage
          src={imageUrl}
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full"
          placeholderClassName="rounded-full"
        />
        <p className="type-body-sm-regular text-(--text-primary-black)">
          <span className="type-body-sm-semibold">{name}</span> will be going bad
          in{" "}
          <NumberTicker
            value={days}
            className="text-text-brand-primary"
          />{" "}
          days
        </p>
      </motion.div>
    </BlurFade>
  );
}
