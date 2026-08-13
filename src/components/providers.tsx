"use client";

import { ThemeProvider } from "next-themes";

import { HeroLoadSequenceProvider } from "@/components/hero-load-sequence-provider";
import { ScrollReset } from "@/components/scroll-reset";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme="light"
      disableTransitionOnChange
    >
      <ScrollReset />
      <HeroLoadSequenceProvider>{children}</HeroLoadSequenceProvider>
    </ThemeProvider>
  );
}
