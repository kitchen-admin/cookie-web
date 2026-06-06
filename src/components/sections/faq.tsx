"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { Section } from "@/components/sections/section";
import { FAQ_DEFAULT_OPEN_INDEX, FAQ_ITEMS } from "@/config/faq-items";
import { faqSectionContentClassName, sectionHeaderClassName } from "@/config/layout";
import { cn } from "@/lib/utils";

const PANEL_OPEN_DURATION_S = 0.32;
const PANEL_CLOSE_DURATION_S = 0.26;
/** Pull answer panel up under the question card (covers border + removes visible gap). */
const ANSWER_PANEL_OVERLAP_PX = 28;
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
        className="relative z-2 flex w-full items-center gap-2 rounded-2xl border-2 border-(--primitive-black-8) bg-(--primitive-base-white) p-4 text-left transition-colors"
      >
        <ChevronRight
          className={cn(
            "size-6 shrink-0 text-(--text-primary-black) transition-transform duration-300 ease-out",
            isOpen && "rotate-90"
          )}
          aria-hidden
        />
        <span className="type-body-xl-medium text-(--text-primary-black)">
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
              "relative z-1 rounded-b-2xl bg-(--primitive-brand-100) pl-12 pr-4 pb-3",
              ANSWER_PANEL_TOP_PADDING_CLASS
            )}
          >
            <p className="type-body-lg-regular text-text-brand-primary">
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
      className="bg-(--primitive-brand-25) py-14 [overflow-anchor:none]"
      contentClassName={cn(faqSectionContentClassName, "px-6")}
    >
      <div className="flex w-full flex-col items-center gap-10">
        <h2 className={cn(sectionHeaderClassName, "text-center")}>
          Got questions?
          <br />
          Here&apos;s the answers.
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
