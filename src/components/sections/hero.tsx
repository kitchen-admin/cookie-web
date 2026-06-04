"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { AuroraText } from "@/components/ui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";

import { SiteImage } from "@/components/ui/site-image";
import { siteImages } from "@/config/site-images";
import { FloatingCard } from "@/components/sections/floating-card";
import { Section } from "@/components/sections/section";
import { WaitlistForm } from "@/components/sections/waitlist-form";

const BRAND_AURORA_COLORS = [
  "var(--primitive-brand-300)",
  "var(--primitive-brand-500)",
  "var(--primitive-brand-700)",
  "var(--primitive-brand-400)",
];

export function Hero() {
  return (
    <Section
      id="hero"
      reveal={false}
      className="relative overflow-hidden rounded-b-[48px] bg-(--primitive-brand-25) px-6 pb-16 pt-8 md:px-12"
    >
      <DotPattern
        className="opacity-30 text-(--primitive-brand-200)"
        width={20}
        height={20}
        cr={1}
      />

      <div className="relative mx-auto flex max-w-[808px] flex-col items-center gap-[72px]">
        <BlurFade delay={0.1} inView className="flex w-full max-w-[640px] flex-col items-center gap-6 text-center">
          <div className="flex flex-col gap-2">
            <h1 className="type-display-xl-bold tracking-figma-tighter text-(--text-primary-black)">
              What if your kitchen knew{" "}
              <AuroraText colors={BRAND_AURORA_COLORS} className="type-display-xl-bold">
                what to cook?
              </AuroraText>
            </h1>
            <p className="type-body-lg-regular text-(--text-primary-black)">
              Cookie turns the ingredients you already have into meals you
              actually love to eat.
            </p>
          </div>
          <WaitlistForm />
        </BlurFade>

        <BlurFade delay={0.35} inView className="relative h-[369px] w-full max-w-[808px]">
          <SiteImage
            src={siteImages.fridge}
            alt="Open refrigerator filled with fresh ingredients"
            width={360}
            height={360}
            priority
            className="absolute left-1/2 top-0 size-[360px] -translate-x-1/2 translate-y-2 rounded-3xl"
            placeholderClassName="rounded-3xl"
          />

          <FloatingCard
            name="Broccoli"
            days={4}
            imageUrl={siteImages.broccoli}
            delay={0.5}
            positionClassName="left-[7%] top-[27%] max-md:left-0 max-md:top-[20%]"
          />
          <FloatingCard
            name="Mushroom"
            days={4}
            imageUrl={siteImages.mushroom}
            delay={0.65}
            positionClassName="left-0 top-[56%] max-md:hidden"
          />
          <FloatingCard
            name="Carrots"
            days={2}
            imageUrl={siteImages.carrot}
            delay={0.55}
            positionClassName="right-[0%] top-[3%] max-md:right-0 max-md:top-[8%]"
          />
          <FloatingCard
            name="Mixed berry"
            days={2}
            imageUrl={siteImages.berry}
            delay={0.7}
            positionClassName="right-[0%] top-[54%] max-md:right-0 max-md:top-[48%]"
          />
        </BlurFade>
      </div>
    </Section>
  );
}
