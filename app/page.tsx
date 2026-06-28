// Home page — hero is a 300vh pinned scroll section.
// The user scrolls through the hero (video stays fixed) and animations play.
// Only after 300vh does the second section appear.

import { HeroContent } from "@/components/ui/hero-content"
import { HeroOverlay } from "@/components/ui/hero-overlay"
import { HeroVideo } from "@/components/ui/hero-video"
import { IntroSection } from "@/components/ui/intro-section"
import { ThirdSection } from "@/components/ui/third-section"

const HERO_VIDEO_SRC =
  "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/hero_video_2.mp4";

export default function Home() {
  return (
    <main className="relative min-w-0">

      {/*
        Hero wrapper — 300dvh tall (dvh matches window.innerHeight used in JS).
        bg-black keeps the dark background visible even after the sticky releases at 200dvh.
        The inner sticky div (h-dvh) pins the video to the screen while the user
        scrolls through all 300dvh.
      */}
      <div className="relative h-[300dvh] bg-black">
        <div className="sticky top-0 h-dvh w-full overflow-hidden">
          <HeroVideo src={HERO_VIDEO_SRC} />
          <HeroOverlay />
        </div>
      </div>

      {/* Section 2 — fridge scan + ingredient balloons */}
      <IntroSection />

      {/* Section 3 — health companion, same layout with health-focused bubbles */}
      <ThirdSection />

      {/*
        Sticky headline overlay — spans the entire page (hero 300vh + section2 100vh + section3 100vh).
        absolute inset-0 fills main. Inside, sticky top-1/2 keeps the headline
        centered on screen throughout all sections. pointer-events-none lets
        clicks pass through to content behind.
      */}
      <div className="absolute inset-0 pointer-events-none z-40">
        <div className="sticky top-1/2 -translate-y-1/2 px-6 md:px-12 lg:px-20">
          <HeroContent />
        </div>
      </div>

    </main>
  );
}
