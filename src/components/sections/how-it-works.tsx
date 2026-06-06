"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

import { FridgeScanStage } from "@/components/sections/fridge-scan-stage";
import { Section } from "@/components/sections/section";
import { HOW_IT_WORKS_STEPS } from "@/config/how-it-works-steps";
import {
  howItWorksColumnGapClassName,
  howItWorksFridgeColumnMarginTopClassName,
  howItWorksInteractionBoxClassName,
  sectionHeaderClassName,
  wideSectionContentClassName,
} from "@/config/layout";
import { cn } from "@/lib/utils";

function StepBadge({ number }: { number: number }) {
  return (
    <span
      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--primitive-brand-100) type-body-xl-medium text-text-brand-primary"
      aria-hidden
    >
      {number}
    </span>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20% 0px" });
  const [showFridge, setShowFridge] = useState(false);
  const [startScan, setStartScan] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const fridgeTimer = window.setTimeout(() => setShowFridge(true), 200);
    const scanTimer = window.setTimeout(() => setStartScan(true), 700);

    return () => {
      window.clearTimeout(fridgeTimer);
      window.clearTimeout(scanTimer);
    };
  }, [isInView]);

  return (
    <Section
      id="how-it-works"
      reveal={false}
      className="overflow-visible bg-(--primitive-brand-25) py-14"
      contentClassName={cn(
        wideSectionContentClassName,
        "px-6 md:px-20"
      )}
    >
      <div
        ref={sectionRef}
        className={cn(
          "flex w-full flex-col items-start lg:flex-row lg:items-start lg:justify-between",
          howItWorksColumnGapClassName
        )}
      >
        <div className="flex max-w-[525px] flex-col gap-12">
          <h2 className={sectionHeaderClassName}>
            From &ldquo;what do we cook?&rdquo; to{" "}
            <span className="text-text-brand-primary">
              &ldquo;let&apos;s make this&rdquo;
            </span>
          </h2>

          <ol className="flex flex-col gap-8">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <li key={step.number} className="flex items-center gap-4">
                <StepBadge number={step.number} />
                <span className="type-display-xs-regular text-(--text-secondary-black)">
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div
          className={cn(
            "relative flex w-full shrink-0 items-center justify-center overflow-visible lg:w-auto",
            howItWorksFridgeColumnMarginTopClassName
          )}
        >
          <FridgeScanStage
            showFridge={showFridge}
            startScan={startScan}
            boxClassName={howItWorksInteractionBoxClassName}
          />
        </div>
      </div>
    </Section>
  );
}
