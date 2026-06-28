"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useIdleReveal } from "@/lib/useIdleReveal"

export function HeroOverlay() {
  const [scrollOpacity, setScrollOpacity] = useState(0)
  const idleRevealed = useIdleReveal(7000)

  useEffect(() => {
    function handleScroll() {
      const vh = window.innerHeight
      const progress = Math.max(0, Math.min(1, window.scrollY / vh))
      setScrollOpacity(progress)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // When idle-revealed, show at 0.85 opacity. Once user scrolls,
  // scroll-driven value (0→1 over first viewport) takes over.
  const targetOpacity = Math.max(scrollOpacity, idleRevealed ? 0.85 : 0)

  return (
    <motion.div
      className="absolute inset-0 z-20 bg-black/60 backdrop-blur-lg"
      animate={{ opacity: targetOpacity }}
      // Smooth 0.9s fade when idle-triggered; instant when scroll-driven
      transition={{ duration: idleRevealed && scrollOpacity === 0 ? 0.9 : 0 }}
      aria-hidden="true"
    />
  )
}
