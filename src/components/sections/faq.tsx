"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { Section } from "@/components/sections/section";
import { FAQ_DEFAULT_OPEN_INDEX, FAQ_ITEMS } from "@/config/faq-items";
import {
  faqSectionContentClassName,
  sectionHeaderClassName,
  sectionVerticalPaddingClassName,
} from "@/config/layout";
import { cn } from "@/lib/utils";

const PANEL_OPEN_DURATION_S = 0.32;
const PANEL_CLOSE_DURATION_S = 0.26;
/** Pull answer panel up under the question card (covers border + removes visible gap). */
const ANSWER_PANEL_OVERLAP_PX = 28;
/** Inner padding on each FAQ question button. */
const FAQ_QUESTION_PADDING_PX = 12;
/** Pill shape — fully round ends on the FAQ question button. */
const FAQ_QUESTION_RADIUS_PX = 9999;
/** Extra space above answer copy after overlap with question card. */
const ANSWER_PANEL_TOP_PADDING_CLASS = "pt-10";

const panelVariants = {
  open: {
    gridTemplateRows: "1fr",
    marginTop: `-${ANSWER_PANEL_OVERLAP_PX}px`,
    transition: { duration: PANEL_OPEN_DURATION_S, ease: "easeOut" as const },
  },
  closed: {
    gridTemplateRows: "0fr",
    marginTop: "0px",
    transition: { duration: PANEL_CLOSE_DURATION_S, ease: "easeIn" as const },
  },
};

const panelContentVariants = {
  open: {
    opacity: 1,
    transition: {
      duration: PANEL_OPEN_DURATION_S * 0.6,
      ease: "easeOut" as const,
      delay: PANEL_OPEN_DURATION_S * 0.15,
    },
  },
  closed: {
    opacity: 0,
    transition: { duration: PANEL_CLOSE_DURATION_S * 0.5, ease: "easeIn" as const },
  },
};

function FaqAccordionItem({
  itemId,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  itemId: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const questionId = `faq-question-${itemId}`;
  const answerPanelId = `faq-answer-${itemId}`;

  return (
    <div className="flex w-full flex-col [overflow-anchor:none]">
      <button
        id={questionId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerPanelId}
        className="relative z-2 flex w-full items-start gap-2 bg-(--primitive-base-white) text-left transition-colors"
        style={{
          padding: FAQ_QUESTION_PADDING_PX,
          borderRadius: FAQ_QUESTION_RADIUS_PX,
        }}
      >
        {/* Match body-md line-height (24px) so the icon centers on the first line only. */}
        <span className="flex h-6 shrink-0 items-center" aria-hidden>
          <ChevronRight
            className={cn(
              "size-5 text-(--text-primary-black) transition-transform duration-300 ease-out",
              isOpen && "rotate-90"
            )}
          />
        </span>
        <span className="type-body-md-medium text-(--text-primary-black)">
          {question}
        </span>
      </button>

      {/* Grid row animates height downward; overlap lives inside the clip, not on the button. */}
      <motion.div
        id={answerPanelId}
        role="region"
        aria-labelledby={questionId}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={panelVariants}
        className="grid"
        aria-hidden={!isOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            variants={panelContentVariants}
            className={cn(
              "relative z-1 rounded-b-2xl bg-(--surface-faq-panel) pl-12 pr-4 pb-3 max-md:pl-11.5",
              ANSWER_PANEL_TOP_PADDING_CLASS
            )}
          >
            <p className="type-body-md-regular text-(--text-primary-black)">
              {answer}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState(FAQ_DEFAULT_OPEN_INDEX);

  return (
    <Section
      id="faq"
      reveal={false}
      className={cn(
        "bg-(--surface-hero-gradient-end) [overflow-anchor:none]",
        sectionVerticalPaddingClassName
      )}
      waveFill="var(--surface-hero-gradient-end)"
      contentClassName={cn(faqSectionContentClassName, "px-6")}
    >
      <div className="flex w-full flex-col items-center gap-10">
        <h2 className={cn(sectionHeaderClassName, "text-center")}>
          Got questions?
        </h2>

        <div className="flex w-full flex-col gap-6 [overflow-anchor:none]">
          {FAQ_ITEMS.map((item, index) => (
            <FaqAccordionItem
              key={item.question}
              itemId={String(index)}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) =>
                  current === index ? -1 : index
                )
              }
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
