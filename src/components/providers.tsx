"use client";

import { HeroLoadSequenceProvider } from "@/components/hero-load-sequence-provider";
import { ScrollReset } from "@/components/scroll-reset";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollReset />
      <HeroLoadSequenceProvider>{children}</HeroLoadSequenceProvider>
    </>
  );
}
