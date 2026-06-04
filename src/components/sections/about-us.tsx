"use client";

import { Section } from "@/components/sections/section";

export function AboutUs() {
  return (
    <Section
      id="about-us"
      className="bg-(--primitive-base-white) py-14"
    >
      <div className="flex flex-col gap-4 text-left">
        <h2 className="type-display-2xl-bold tracking-figma-tighter text-(--text-primary-black)">
          About Us
        </h2>
        <p className="type-body-lg-regular max-w-[36rem] text-(--text-primary-black)">
          Cookie Kitchen helps you cook with what you already have — less waste,
          less guesswork, and meals you actually want to eat.
        </p>
      </div>
    </Section>
  );
}
