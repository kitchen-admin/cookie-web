"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { NAVBAR_COMPLETE_MS } from "@/config/hero-load-sequence";

type HeroLoadSequenceContextValue = {
  showHeroContent: boolean;
};

const HeroLoadSequenceContext =
  createContext<HeroLoadSequenceContextValue | null>(null);

/** First-visit load order: navbar entrance → hero copy reveal. */
export function HeroLoadSequenceProvider({ children }: { children: ReactNode }) {
  const [showHeroContent, setShowHeroContent] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setShowHeroContent(true),
      NAVBAR_COMPLETE_MS
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const value = useMemo(
    () => ({ showHeroContent }),
    [showHeroContent]
  );

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
