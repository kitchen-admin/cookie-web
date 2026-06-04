"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  HERO_CONTENT_REVEAL_MS,
  HERO_IMAGE_REVEAL_MS,
  NAVBAR_COMPLETE_MS,
} from "@/config/hero-load-sequence";

export type HeroLoadPhase =
  | "navbar"
  | "heroContent"
  | "heroImage"
  | "scanning"
  | "complete";

type HeroLoadSequenceContextValue = {
  phase: HeroLoadPhase;
  showHeroContent: boolean;
  showFridge: boolean;
  startScan: boolean;
};

const HeroLoadSequenceContext =
  createContext<HeroLoadSequenceContextValue | null>(null);

/**
 * First-visit load order: navbar → hero copy → fridge image → scan → bubbles.
 */
export function HeroLoadSequenceProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<HeroLoadPhase>("navbar");

  useEffect(() => {
    const heroContentAt = NAVBAR_COMPLETE_MS;
    const heroImageAt = heroContentAt + HERO_CONTENT_REVEAL_MS;
    const scanningAt = heroImageAt + HERO_IMAGE_REVEAL_MS;

    const tHeroContent = window.setTimeout(
      () => setPhase("heroContent"),
      heroContentAt
    );
    const tHeroImage = window.setTimeout(
      () => setPhase("heroImage"),
      heroImageAt
    );
    const tScanning = window.setTimeout(
      () => setPhase("scanning"),
      scanningAt
    );

    return () => {
      window.clearTimeout(tHeroContent);
      window.clearTimeout(tHeroImage);
      window.clearTimeout(tScanning);
    };
  }, []);

  const value = useMemo<HeroLoadSequenceContextValue>(() => {
    const showHeroContent =
      phase === "heroContent" ||
      phase === "heroImage" ||
      phase === "scanning" ||
      phase === "complete";

    const showFridge =
      phase === "heroImage" ||
      phase === "scanning" ||
      phase === "complete";

    const startScan = phase === "scanning" || phase === "complete";

    return { phase, showHeroContent, showFridge, startScan };
  }, [phase]);

  return (
    <HeroLoadSequenceContext.Provider value={value}>
      {children}
    </HeroLoadSequenceContext.Provider>
  );
}

export function useHeroLoadSequence() {
  const context = useContext(HeroLoadSequenceContext);
  if (!context) {
    throw new Error(
      "useHeroLoadSequence must be used within HeroLoadSequenceProvider"
    );
  }
  return context;
}
