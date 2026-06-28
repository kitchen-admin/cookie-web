"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useIdleReveal } from "@/lib/useIdleReveal"

const WHITE     = { r: 255, g: 255, b: 255 }
const AMBER_900 = { r: 120, g: 53,  b: 15  }

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t)
}

function scrollProgress(scrollY: number, startMult: number, endMult: number, vh: number) {
  return Math.max(0, Math.min(1, (scrollY - startMult * vh) / ((endMult - startMult) * vh)))
}

export function HeroContent() {
  const [headlineOpacity, setHeadlineOpacity]             = useState(0)
  const [colorProgress, setColorProgress]                 = useState(0)
  const [taglineVisible, setTaglineVisible]               = useState(false)
  const [section3TaglineVisible, setSection3TaglineVisible] = useState(false)
  const [headline1Opacity, setHeadline1Opacity]           = useState(1)
  const [headline2Opacity, setHeadline2Opacity]           = useState(0)

  // True once the user has been idle (no scroll) for 7 seconds
  const idleRevealed = useIdleReveal(7000)

  useEffect(() => {
    function handleScroll() {
      const vh = window.innerHeight
      const scrollY = window.scrollY

      setHeadlineOpacity(scrollProgress(scrollY, 0.3, 1.2, vh))
      setColorProgress(scrollProgress(scrollY, 2.0, 2.8, vh))
      setTaglineVisible(scrollY > vh * 2.85 && scrollY < vh * 3.05)

      const fade1Out = scrollProgress(scrollY, 3.1, 3.45, vh)
      setHeadline1Opacity(1 - fade1Out)

      const fade2In = scrollProgress(scrollY, 3.4, 3.8, vh)
      setHeadline2Opacity(fade2In)

      setSection3TaglineVisible(scrollY > vh * 3.75)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const r = lerp(WHITE.r, AMBER_900.r, colorProgress)
  const g = lerp(WHITE.g, AMBER_900.g, colorProgress)
  const b = lerp(WHITE.b, AMBER_900.b, colorProgress)
  const textColor = `rgb(${r}, ${g}, ${b})`

  // Idle-reveal overrides scroll opacity — stays at ≥1 until user actually scrolls past
  const wrapperOpacity = Math.max(headlineOpacity, idleRevealed ? 1 : 0)

  return (
    <motion.div
      animate={{ opacity: wrapperOpacity }}
      // Smooth 0.9s fade when idle-triggered; instant when user is scrolling
      transition={{ duration: idleRevealed && headlineOpacity === 0 ? 0.9 : 0 }}
    >

      <div className="relative">
        {/* Headline 1 — fades out entering section 3 */}
        <p
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight"
          style={{ color: textColor, opacity: headline1Opacity }}
        >
          <span className="block">What if your</span>
          <span className="block">kitchen can think?</span>
        </p>

        {/* Headline 2 — fades in in section 3 */}
        <p
          className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight"
          style={{ color: textColor, opacity: headline2Opacity }}
        >
          <span className="block">Health companion</span>
          <span className="block">that actually</span>
          <span className="block">gets you.</span>
        </p>
      </div>

      {/* Section 2 tagline */}
      <p
        className={cn(
          "mt-4 text-base sm:text-lg md:text-2xl font-normal text-black-50",
          "transition-opacity duration-700 ease-out",
          taglineVisible ? "opacity-100" : "opacity-0"
        )}
      >
        Stop ordering in. Your fridge has<br className="sm:hidden" /> a 3-course meal hiding.
      </p>

      {/* Section 3 tagline */}
      <p
        className={cn(
          "mt-12 text-base sm:text-lg md:text-2xl font-normal text-black-50",
          "transition-opacity duration-700 ease-out",
          section3TaglineVisible ? "opacity-100" : "opacity-0"
        )}
      >
        Every meal you see here? Made from<br />what&apos;s already in your kitchen.
      </p>
    </motion.div>
  )
}
