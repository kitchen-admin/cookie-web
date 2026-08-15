"use client";

import { Section } from "@/components/sections/section";
import { ABOUT_COPY } from "@/config/about";
import {
  faqSectionContentClassName,
  problemSectionPaddingClassName,
  sectionHeaderClassName,
  wideSectionContentClassName,
} from "@/config/layout";
import { cn } from "@/lib/utils";

export function Problem() {
  return (
    <Section
      id="about"
      reveal={false}
      className={cn(
        "bg-linear-to-b from-white to-(--surface-hero-gradient-end)",
        // Top padding folds in the navbar clearance (previously the page's
        // own pt-24) so the gradient — not a flat color — sits behind the nav.
        "pt-38 pb-8 max-md:pt-34 max-md:pb-4"
      )}
      contentClassName={cn(
        wideSectionContentClassName,
        problemSectionPaddingClassName
      )}
    >
      <div className="mx-auto flex w-full flex-col items-center text-center">
        {/*
          The headline intentionally sits outside the max-w-180 copy column
          below — at 56px Boldnova, each line ("It's not a food problem" /
          "it's a decision problem") needs more room than 720px to stay on
          one line each, so it gets the full wide section width instead.
        */}
        {/*
          Inline font-size beats `sectionHeaderClassName`'s own size rule
          (same specificity, but it's declared later in globals.css) — this
          keeps the Boldnova font/uppercase/line-height from that class
          while shrinking just this line relative to the h2 below it.
        */}
        <h3
          className={sectionHeaderClassName}
          style={{ fontSize: "clamp(1.5rem, 6vw, 2.25rem)" }}
        >
          {ABOUT_COPY.headlineBefore}
        </h3>
        <h2 className={cn(sectionHeaderClassName, "text-text-brand-primary")}>
          {ABOUT_COPY.headlineAccent}
        </h2>

        <div
          className={cn(
            "mt-10 flex w-full flex-col items-center gap-6 max-md:mt-8",
            faqSectionContentClassName
          )}
        >
          <p className="type-body-xl-regular text-(--text-primary-black)">
            {ABOUT_COPY.lead}
          </p>
          <p className="type-display-xs-semibold text-(--text-primary-black)">
            {ABOUT_COPY.question}
          </p>
          <p className="type-body-xl-regular text-(--text-primary-black)">
            {ABOUT_COPY.body}
          </p>
          <p className="type-display-xs-semibold text-(--text-primary-black)">
            {ABOUT_COPY.why}
          </p>
          <p className="type-body-xl-regular text-(--text-primary-black)">
            {ABOUT_COPY.product}
          </p>
          <p className="type-display-xs-semibold text-text-brand-primary">
            {ABOUT_COPY.closer}
          </p>
        </div>
      </div>
    </Section>
  );
}
