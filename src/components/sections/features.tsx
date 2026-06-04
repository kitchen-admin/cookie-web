"use client";

import { motion } from "motion/react";

import { Section } from "@/components/sections/section";
import { featuresSectionContentClassName } from "@/config/layout";
import { AuroraText } from "@/components/ui/aurora-text";
import { MagicCard } from "@/components/ui/magic-card";

const BRAND_AURORA_COLORS = [
  "var(--primitive-brand-300)",
  "var(--primitive-brand-500)",
  "var(--primitive-brand-700)",
  "var(--primitive-brand-400)",
];

const FEATURES = [
  {
    title: "Cook what you already have",
    description:
      "Scan your pantry and get recipes from your real ingredients.",
    variant: "pantry" as const,
  },
  {
    title: "Escape boring lunch",
    description:
      "Get quick ideas that feel new, not like yesterday's fallback.",
    variant: "lunch" as const,
  },
  {
    title: "Use food before it expires",
    description:
      "Cookie reminds you what needs attention and turns it into meals.",
    variant: "expires" as const,
  },
];

function FeatureIllustration({ variant }: { variant: "pantry" | "lunch" | "expires" }) {
  return (
    <div className="relative size-[240px] overflow-hidden rounded-[40px]">
      <div className="absolute inset-0 bg-(--primitive-brand-50) blur-sm" />
      {variant === "pantry" ? (
        <div className="relative size-full">
          <div className="absolute left-6 top-6 h-[76px] w-[84px] rounded-3xl bg-(--primitive-base-white)" />
          <div className="absolute -left-16 top-[170px] h-[76px] w-[174px] rounded-3xl bg-(--primitive-base-white)" />
          <div className="absolute left-[166px] top-[132px] h-[76px] w-[134px] rounded-3xl bg-(--primitive-base-white)" />
        </div>
      ) : (
        <div className="absolute left-[38px] top-[53px] h-[262px] w-[196px] rounded-3xl bg-(--primitive-base-white)" />
      )}
    </div>
  );
}

/** Gentle scroll reveal: each card slides in from the left, staggered left → right. */
function FeatureCardReveal({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.14,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="shrink-0"
    >
      {children}
    </motion.div>
  );
}

export function Features() {
  return (
    <Section
      id="features"
      reveal={false}
      className="bg-(--primitive-base-white) py-14"
      contentClassName={featuresSectionContentClassName}
    >
      <div className="relative flex min-h-[520px] w-full flex-col">
        <h2 className="type-display-2xl-bold self-start text-left tracking-figma-tighter text-(--text-primary-black)">
          The health companion
          <br />
          that actually{" "}
          <AuroraText
            colors={BRAND_AURORA_COLORS}
            className="type-display-2xl-bold"
          >
            gets
          </AuroraText>{" "}
          you.
        </h2>

        <div className="mt-auto flex w-full justify-end overflow-visible pt-10">
          <div className="flex max-w-full flex-row flex-nowrap items-end justify-end gap-4 overflow-x-auto overflow-y-visible pb-1 md:gap-10">
            {FEATURES.map((feature, index) => (
              <FeatureCardReveal key={feature.title} index={index}>
                <MagicCard
                  className="flex w-[240px] flex-col gap-4 rounded-[40px] border-0 bg-transparent p-0"
                  gradientFrom="var(--primitive-brand-300)"
                  gradientTo="var(--primitive-brand-500)"
                  gradientColor="var(--primitive-brand-100)"
                  gradientOpacity={0.4}
                >
                  <FeatureIllustration variant={feature.variant} />
                  <div className="flex flex-col gap-0.5 text-left">
                    <h3 className="type-body-lg-semibold text-(--text-primary-black)">
                      {feature.title}
                    </h3>
                    <p className="type-body-sm-regular text-(--text-tertiary-black)">
                      {feature.description}
                    </p>
                  </div>
                </MagicCard>
              </FeatureCardReveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
