"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// Color targets
const WHITE     = { r: 255, g: 255, b: 255 }
const AMBER_900 = { r: 120, g: 53,  b: 15  }

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t)
}

// Returns 0→1 progress between two scroll positions (expressed as vh multipliers)
function scrollProgress(scrollY: number, startMult: number, endMult: number, vh: number) {
  return Math.max(0, Math.min(1, (scrollY - startMult * vh) / ((endMult - startMult) * vh)))
}

export function HeroContent() {
  const [headlineOpacity, setHeadlineOpacity] = useState(0)
  const [colorProgress, setColorProgress]     = useState(0)
  const [taglineVisible, setTaglineVisible]   = useState(false)

  useEffect(() => {
    function handleScroll() {
      const vh = window.innerHeight
      const scrollY = window.scrollY

      // ── Within hero (0 → 300vh) ──────────────────────────────────────────
      // Headline fades in during 30vh → 120vh (user scrolls through first screen)
      setHeadlineOpacity(scrollProgress(scrollY, 0.3, 1.2, vh))

      // ── Transition into section 2 (scrollY 2.0 → 2.8 × vh) ──────────────────
      // The amber section enters the viewport from scrollY = 200dvh (its top
      // hits the viewport bottom) and is fully in view at scrollY = 300dvh (max).
      // Color transitions white → amber-900 across this window.
      setColorProgress(scrollProgress(scrollY, 2.0, 2.8, vh))

      // Tagline appears once the amber section is mostly filling the screen
      setTaglineVisible(scrollY > vh * 2.85)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const r = lerp(WHITE.r, AMBER_900.r, colorProgress)
  const g = lerp(WHITE.g, AMBER_900.g, colorProgress)
  const b = lerp(WHITE.b, AMBER_900.b, colorProgress)

  return (
    <div style={{ opacity: headlineOpacity }}>
      {/* Headline — white during hero, transitions to amber-900 in section 2 */}
      <p
        className="text-7xl font-extrabold leading-none tracking-tight whitespace-nowrap"
        style={{ color: `rgb(${r}, ${g}, ${b})` }}
      >
        <span className="block">What if your</span>
        <span className="block">kitchen can think?</span>
      </p>

      {/* Tagline — appears 16px below once user is settled in section 2 */}
      <p
        className={cn(
          "mt-4 text-2xl font-normal whitespace-nowrap text-black-50",
          "transition-opacity duration-700 ease-out",
          taglineVisible ? "opacity-100" : "opacity-0"
        )}
      >
        Stop ordering in. Your fridge has a 3-course meal hiding.
      </p>
    </div>
  )
}
