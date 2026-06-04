"use client";

import { ThemeProvider } from "next-themes";

import { HeroLoadSequenceProvider } from "@/components/hero-load-sequence-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme="light"
      disableTransitionOnChange
    >
      <HeroLoadSequenceProvider>{children}</HeroLoadSequenceProvider>
    </ThemeProvider>
  );
}
