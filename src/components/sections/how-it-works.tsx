"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { useInView } from "motion/react";

import { FridgeScanStage } from "@/components/sections/fridge-scan-stage";
import { Section } from "@/components/sections/section";
import { HOW_IT_WORKS_STEPS } from "@/config/how-it-works-steps";
import {
  HOW_IT_WORKS_MOBILE_STAGE_SCALE,
  howItWorksColumnGapClassName,
  howItWorksFridgeColumnMarginTopClassName,
  howItWorksInteractionBoxClassName,
  howItWorksMobileStageClipClassName,
  howItWorksMobileStageInnerClassName,
  sectionHeaderClassName,
  sectionVerticalPaddingClassName,
  wideSectionContentClassName,
} from "@/config/layout";
import { cn } from "@/lib/utils";

const MOBILE_MD_MEDIA_QUERY = "(max-width: 767px)";

function subscribeMobileMd(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(MOBILE_MD_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getMobileMdSnapshot() {
  return window.matchMedia(MOBILE_MD_MEDIA_QUERY).matches;
}

function getMobileMdServerSnapshot() {
  return false;
}

function useMobileMd() {
  return useSyncExternalStore(
    subscribeMobileMd,
    getMobileMdSnapshot,
    getMobileMdServerSnapshot
  );
}

/** Mobile step badge: 20px circle, 14px semibold number. */
const MOBILE_STEP_NUMBER_CLASS =
  "max-md:!text-[0.875rem] max-md:!leading-[1.25rem] max-md:font-semibold";
/** Mobile step label: 16px regular beside the badge. */
const MOBILE_STEP_LABEL_CLASS =
  "max-md:!text-[1rem] max-md:!leading-[1.5rem] max-md:font-normal";

function StepBadge({ number }: { number: number }) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-(--primitive-brand-100) type-body-xl-medium text-text-brand-primary",
        "max-md:size-5",
        MOBILE_STEP_NUMBER_CLASS
      )}
      aria-hidden
    >
      {number}
    </span>
  );
}

export function HowItWorks() {
  const isMobile = useMobileMd();
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, {
    once: true,
    margin: "-20% 0px",
  });
  /** Mobile: wait until the animation block itself is on screen (not just the heading). */
  const isAnimationInView = useInView(animationRef, {
    once: true,
    amount: 0.45,
  });
  const shouldAnimate = isMobile ? isAnimationInView : isSectionInView;
  const [showFridge, setShowFridge] = useState(false);
  const [startScan, setStartScan] = useState(false);

  useEffect(() => {
    if (!shouldAnimate) return;

    const fridgeTimer = window.setTimeout(() => setShowFridge(true), 200);
    const scanTimer = window.setTimeout(() => setStartScan(true), 700);

    return () => {
      window.clearTimeout(fridgeTimer);
      window.clearTimeout(scanTimer);
    };
  }, [shouldAnimate]);

  return (
    <Section
      id="how-it-works"
      reveal={false}
      className={cn(
        "overflow-visible bg-(--primitive-brand-25)",
        sectionVerticalPaddingClassName
      )}
      contentClassName={cn(
        wideSectionContentClassName,
        "px-6 md:px-20"
      )}
    >
      <div
        ref={sectionRef}
        className={cn(
          "flex w-full flex-col items-start lg:flex-row lg:items-start lg:justify-between",
          howItWorksColumnGapClassName,
          "max-md:gap-4"
        )}
      >
        <div className="flex max-w-[525px] flex-col gap-12 max-md:gap-6">
          <h2 className={sectionHeaderClassName}>
            From &ldquo;what do we cook?&rdquo; to{" "}
            <span className="text-text-brand-primary">
              &ldquo;let&apos;s make this&rdquo;
            </span>
          </h2>

          <ol className="flex flex-col gap-8 max-md:gap-4">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <li key={step.number} className="flex items-center gap-4 max-md:gap-4">
                <StepBadge number={step.number} />
                <span
                  className={cn(
                    "type-display-xs-regular text-(--text-secondary-black)",
                    MOBILE_STEP_LABEL_CLASS
                  )}
                >
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div
          ref={animationRef}
          className={cn(
            "relative flex w-full shrink-0 items-center justify-center overflow-visible lg:w-auto",
            "max-md:overflow-visible",
            howItWorksFridgeColumnMarginTopClassName
          )}
        >
          {/* Mobile: clip + scale; md+ resets to normal desktop layout. */}
          <div
            className={howItWorksMobileStageClipClassName}
            style={
              {
                "--hiw-mobile-scale": HOW_IT_WORKS_MOBILE_STAGE_SCALE,
              } as CSSProperties
            }
          >
            <div className={howItWorksMobileStageInnerClassName}>
              <FridgeScanStage
                showFridge={showFridge}
                startScan={startScan}
                boxClassName={howItWorksInteractionBoxClassName}
                finaleAlign={isMobile ? "center" : "end"}
                allowFinaleOverflow={isMobile}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
