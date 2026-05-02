"use client"

import { useEffect, useState } from "react"

export function HeroOverlay() {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const vh = window.innerHeight
      // Overlay fully fades in within the first viewport-height of scroll (0 → 100vh)
      const progress = Math.max(0, Math.min(1, window.scrollY / vh))
      setOpacity(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="absolute inset-0 z-20 bg-black/60 backdrop-blur-lg"
      style={{ opacity }}
      aria-hidden="true"
    />
  )
}
