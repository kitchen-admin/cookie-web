"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { motion } from "motion/react";

import { ImessageBubble } from "@/components/ui/imessage-bubble";
import { SiteImage } from "@/components/ui/site-image";
import { HERO_BUBBLE_MERGE_MS } from "@/config/hero-load-sequence";
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
  /** After scan: sit on the left, or fly to the recipe spot and dissolve. */
  layoutPhase?: "scattered" | "merging";
  /** Invisible point on the fridge — cards travel here, then fade. */
  mergeAnchorRef?: RefObject<HTMLElement | null>;
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
  mergeAnchorRef,
}: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mergeTo, setMergeTo] = useState<{ x: number; y: number } | null>(
    null
  );
  const isScattered = layoutPhase === "scattered";
  const isMerging = layoutPhase === "merging";
  const mergeMs = HERO_BUBBLE_MERGE_MS / 1000;

  useLayoutEffect(() => {
    if (!isMerging) {
      setMergeTo(null);
      return;
    }

    const card = cardRef.current?.getBoundingClientRect();
    const anchor = mergeAnchorRef?.current?.getBoundingClientRect();
    if (!card || !anchor) return;

    // Move this card’s center to the recipe meeting point on the fridge.
    setMergeTo({
      x: anchor.left - (card.left + card.width / 2),
      y: anchor.top - (card.top + card.height / 2),
    });
  }, [isMerging, mergeAnchorRef]);

  return (
    <motion.div
      ref={cardRef}
      className={cn("absolute z-30", positionClassName, className)}
      initial={{ opacity: 0, scale: 0.94, filter: "blur(0px)" }}
      animate={
        isScattered
          ? {
              opacity: visible ? 1 : 0,
              scale: visible ? 1 : 0.94,
              x: 0,
              y: 0,
              filter: "blur(0px)",
            }
          : mergeTo
            ? {
                x: mergeTo.x,
                y: mergeTo.y,
                opacity: 0,
                scale: 0.88,
                filter: "blur(8px)",
              }
            : {
                x: 0,
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
              }
      }
      transition={{
        duration: isScattered ? 0.35 : mergeMs,
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
        className="max-w-50 max-md:w-[clamp(8.25rem,52vw,12.5rem)] max-md:max-w-[85%]"
      >
        <ImessageBubble>
          <div
            className={cn(
              "flex items-center gap-2 bg-(--primitive-base-white) px-3 py-2",
              "max-md:gap-[clamp(0.35rem,1.8vw,0.5rem)] max-md:px-[clamp(0.5rem,2.2vw,0.75rem)] max-md:py-[clamp(0.3rem,1.4vw,0.45rem)]"
            )}
          >
            <SiteImage
              src={imageUrl}
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full max-md:size-[clamp(1.75rem,8.5vw,2.5rem)]"
              placeholderClassName="rounded-full"
            />
            <p className="type-body-sm-regular max-md:text-[12px] max-md:leading-4 text-left text-(--text-primary-black)">
              <span className="type-body-sm-semibold max-md:text-[12px] max-md:leading-4">
                {name}
              </span>{" "}
              will be{" "}
              <span className="type-body-sm-medium max-md:text-[12px] max-md:leading-4 text-text-brand-primary">
                going bad in {days} days
              </span>
            </p>
          </div>
        </ImessageBubble>
      </motion.div>
    </motion.div>
  );
}
