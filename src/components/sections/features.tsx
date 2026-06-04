"use client";

import { Section } from "@/components/sections/section";
import { BlurFade } from "@/components/ui/blur-fade";
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
    <div className="relative size-[280px] overflow-hidden rounded-[40px]">
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

export function Features() {
  return (
    <Section
      id="features"
      className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6 py-14 md:px-[120px] md:py-14"
    >
      <BlurFade inView>
        <h2 className="type-display-2xl-bold tracking-figma-tighter text-(--text-primary-black)">
          The health companion
          <br />
          that actually{" "}
          <AuroraText colors={BRAND_AURORA_COLORS} className="type-display-2xl-bold">
            gets
          </AuroraText>{" "}
          you.
        </h2>
      </BlurFade>

      <div className="grid justify-items-center gap-10 md:grid-cols-3 md:gap-20">
        {FEATURES.map((feature, index) => (
          <BlurFade key={feature.title} delay={0.1 + index * 0.1} inView>
            <MagicCard
              className="flex w-full max-w-[280px] flex-col gap-4 rounded-[40px] border-0 bg-transparent p-0"
              gradientFrom="var(--primitive-brand-300)"
              gradientTo="var(--primitive-brand-500)"
              gradientColor="var(--primitive-brand-100)"
              gradientOpacity={0.4}
            >
              <FeatureIllustration variant={feature.variant} />
              <div className="flex flex-col gap-0.5 text-center md:text-left">
                <h3 className="type-body-lg-semibold text-(--text-primary-black)">
                  {feature.title}
                </h3>
                <p className="type-body-sm-regular text-(--text-tertiary-black)">
                  {feature.description}
                </p>
              </div>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
