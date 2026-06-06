"use client";

import { Section } from "@/components/sections/section";
import { SiteImage } from "@/components/ui/site-image";
import {
  PROBLEM_CARD_IMAGE_HEIGHT_PX,
  problemCardGridGapClassName,
  problemSectionPaddingClassName,
  sectionHeaderClassName,
  wideSectionContentClassName,
} from "@/config/layout";
import { PROBLEM_CARDS } from "@/config/problem-cards";
import { cn } from "@/lib/utils";

export function Problem() {
  return (
    <Section
      id="problem"
      reveal={false}
      className="bg-(--primitive-base-white) py-14"
      contentClassName={cn(
        wideSectionContentClassName,
        problemSectionPaddingClassName
      )}
    >
      <div className="flex w-full flex-col items-center gap-14">
        <h2 className={cn(sectionHeaderClassName, "max-w-[1113px] text-center")}>
          The problem is not food.{" "}
          <span className="text-text-brand-primary">It is deciding.</span>
        </h2>

        <div
          className={cn(
            "grid w-full grid-cols-1 md:grid-cols-3",
            problemCardGridGapClassName
          )}
        >
          {PROBLEM_CARDS.map((card) => (
            <article
              key={card.title}
              className="flex flex-col items-center gap-6 text-center"
            >
              <SiteImage
                src={card.imageUrl}
                alt=""
                width={373}
                height={PROBLEM_CARD_IMAGE_HEIGHT_PX}
                className="w-full rounded-[40px] object-cover"
                placeholderClassName="w-full rounded-[40px] bg-(--primitive-brand-50) blur-sm"
                style={{ height: PROBLEM_CARD_IMAGE_HEIGHT_PX }}
              />
              <div className="flex flex-col gap-0.5">
                <h3 className="type-display-xs-semibold text-(--text-primary-black)">
                  {card.title}
                </h3>
                <p className="type-body-lg-regular text-(--text-tertiary-black)">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
