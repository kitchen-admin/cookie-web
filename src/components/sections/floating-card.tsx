"use client";

import { motion } from "motion/react";

import { NumberTicker } from "@/components/ui/number-ticker";
import { SiteImage } from "@/components/ui/site-image";
import { heroBubbleMergePositionClassName } from "@/config/layout";
import { cn } from "@/lib/utils";

export type FloatingCardProps = {
  name: string;
  days: number;
  imageUrl?: string;
  delay?: number;
  className?: string;
  /** Cards on the left: square bottom-right corner (toward fridge). */
  side?: "left" | "right";
  /** Tailwind position classes for placement around the fridge mock */
  positionClassName?: string;
  /** Controlled by fridge scan animation; when false, card stays hidden. */
  visible?: boolean;
  /** After scan: scattered around fridge, or merging to center while fading out. */
  layoutPhase?: "scattered" | "merging";
};

export function FloatingCard({
  name,
  days,
  imageUrl,
  delay = 0,
  className,
  side,
  positionClassName,
  visible = true,
  layoutPhase = "scattered",
}: FloatingCardProps) {
  const isScattered = layoutPhase === "scattered";
  const isMerging = layoutPhase === "merging";

  return (
    <motion.div
      layout
      className={cn(
        "absolute z-30",
        isScattered && positionClassName,
        isMerging && heroBubbleMergePositionClassName,
        className
      )}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={
        isScattered
          ? {
              opacity: visible ? 1 : 0,
              scale: visible ? 1 : 0.94,
              x: 0,
              y: 0,
            }
          : {
              x: "-50%",
              y: "-50%",
              opacity: 0,
              scale: 0.8,
            }
      }
      transition={{
        duration: isScattered ? 0.35 : 0.55,
        ease: isMerging ? "easeIn" : "easeOut",
      }}
    >
      <motion.div
        animate={visible && isScattered ? { y: [0, -6, 0] } : { y: 0 }}
        transition={
          visible && isScattered
            ? {
                duration: 4 + delay * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : { duration: 0 }
        }
        className={cn(
          "flex max-w-[200px] items-center gap-[8px] rounded-2xl p-2",
          side === "left" && "rounded-br-none",
          side === "right" && "rounded-bl-none",
          "bg-(--primitive-base-white)"
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
        <p className="type-body-sm-regular text-left text-(--text-primary-black)">
          <span className="type-body-sm-semibold">{name}</span> will be{" "}
          <span className="type-body-sm-medium text-text-brand-primary">
            going bad in{" "}
            <NumberTicker
              value={days}
              className="text-text-brand-primary"
            />{" "}
            days
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}
