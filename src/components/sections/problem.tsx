"use client";

import { Section } from "@/components/sections/section";
import { ABOUT_COPY } from "@/config/about";
import {
  faqSectionContentClassName,
  problemSectionPaddingClassName,
  sectionHeaderClassName,
  sectionVerticalPaddingClassName,
  wideSectionContentClassName,
} from "@/config/layout";
import { cn } from "@/lib/utils";

export function Problem() {
  return (
    <Section
      id="about"
      reveal={false}
      className={cn("bg-(--primitive-base-white)", sectionVerticalPaddingClassName)}
      waveFill="var(--primitive-base-white)"
      contentClassName={cn(
        wideSectionContentClassName,
        problemSectionPaddingClassName
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full flex-col items-center text-center",
          faqSectionContentClassName
        )}
      >
        <h2 className={sectionHeaderClassName}>
          {ABOUT_COPY.headlineBefore}
          <span className="text-text-brand-primary">
            {ABOUT_COPY.headlineAccent}
          </span>
        </h2>

        <div className="mt-10 flex flex-col items-center gap-6 max-md:mt-8">
          <p className="type-body-lg-regular text-(--text-tertiary-black)">
            {ABOUT_COPY.lead}
          </p>
          <p className="type-display-xs-semibold text-(--text-primary-black)">
            {ABOUT_COPY.question}
          </p>
          <p className="type-body-lg-regular text-(--text-tertiary-black)">
            {ABOUT_COPY.body}
          </p>
          <p className="type-display-xs-semibold text-(--text-primary-black)">
            {ABOUT_COPY.why}
          </p>
          <p className="type-body-lg-regular text-(--text-tertiary-black)">
            {ABOUT_COPY.product}
          </p>
          <p className="type-display-xs-medium text-text-brand-primary">
            {ABOUT_COPY.closer}
          </p>
        </div>
      </div>
    </Section>
  );
}
