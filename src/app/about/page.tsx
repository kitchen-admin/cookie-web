import type { Metadata } from "next";

import { Problem } from "@/components/sections/problem";

export const metadata: Metadata = {
  title: "About us",
  description:
    "It's not a food problem but it's a decision problem. Cookie Kitchen helps you turn what you already have into a meal you will actually enjoy.",
};

export default function AboutPage() {
  return (
    <main className="mt-0 flex flex-1 flex-col bg-background pt-24">
      <Problem />
    </main>
  );
}
