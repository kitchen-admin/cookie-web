import type { Metadata } from "next";

import { Problem } from "@/components/sections/problem";

export const metadata: Metadata = {
  title: "About us — Cookie",
  description:
    "The problem is not food. It is deciding. Cookie helps you turn what you have into meals you love.",
};

export default function AboutPage() {
  return (
    <main className="mt-0 flex flex-1 flex-col bg-background pt-24">
      <Problem />
    </main>
  );
}
