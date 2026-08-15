import type { Metadata } from "next";

import { AboutFounders } from "@/components/sections/about-founders";
import { Problem } from "@/components/sections/problem";

export const metadata: Metadata = {
  title: "About us",
  description:
    "It's not a food problem, it's a decision problem. Cookie learns what works for you and helps turn what you already have into a meal you will actually enjoy.",
};

export default function AboutPage() {
  return (
    <main className="mt-0 flex flex-1 flex-col overflow-x-clip bg-(--surface-hero-gradient-end)">
      <Problem />
      <AboutFounders />
    </main>
  );
}
