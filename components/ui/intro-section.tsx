"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const FRIDGE_IMAGE_SRC =
  "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/fridge.png"

const INGREDIENTS = [
  { name: "Fresh Fish",        expires: "Expires in 2 days"  },
  { name: "Fish (door shelf)", expires: "Expires in 3 days"  },
  { name: "Chicken Breast",    expires: "Expires tomorrow"   },
  { name: "Eggs",              expires: "Expires in 14 days" },
  { name: "Lettuce",           expires: "Expires in 4 days"  },
  { name: "Mushrooms",         expires: "Expires in 3 days"  },
  { name: "Zucchini",          expires: "Expires in 5 days"  },
  { name: "Bell Peppers",      expires: "Expires in 7 days"  },
  { name: "Broccoli",          expires: "Expires in 5 days"  },
  { name: "Carrots",           expires: "Expires in 10 days" },
  { name: "Tomatoes",          expires: "Expires in 4 days"  },
  { name: "Red Onion",         expires: "Expires in 21 days" },
  { name: "Garlic",            expires: "Expires in 30 days" },
  { name: "Spice Blend",       expires: "Expires in 90 days" },
]

const FIRST_DELAY_MS  = 2500
const BETWEEN_MS      = 600  // gap after one balloon fades before next appears

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible]           = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  // Reveal section on scroll into view
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Fire first bubble after initial delay
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setCurrentIndex(0), FIRST_DELAY_MS)
    return () => clearTimeout(t)
  }, [visible])

  // After each balloon finishes floating, queue the next ingredient
  const handleAnimationComplete = () => {
    setTimeout(() => {
      setCurrentIndex(i => i === null ? 0 : (i + 1) % INGREDIENTS.length)
    }, BETWEEN_MS)
  }

  const isRight = currentIndex !== null && currentIndex % 2 !== 0

  return (
    <section
      ref={sectionRef}
      className="h-dvh w-full bg-amber-50 flex items-center justify-center md:justify-end px-6 md:px-12 lg:px-20"
      aria-label="Introduction"
    >
      <div
        className={cn(
          "relative transition-all duration-700 ease-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        {/* Image + scanner — overflow-hidden stops beam glow from bleeding out */}
        <div className="relative overflow-hidden">
          <Image
            src={FRIDGE_IMAGE_SRC}
            alt="An open fridge stocked with fresh organic ingredients"
            width={480}
            height={530}
            className="w-[260px] sm:w-[360px] md:w-[480px] object-contain"
            style={{ height: "auto" }}
            priority={false}
          />
          {visible && <div className="fridge-scan-bar" />}
        </div>

        {/* Balloon bubble — floats upward, alternates left / right */}
        <AnimatePresence mode="wait">
          {currentIndex !== null && (
            <motion.div
              key={currentIndex}
              className="absolute top-0 z-10 bg-amber-200 p-3"
              style={{
                // Alternate which side of the image the bubble rises from
                ...(isRight ? { right: "20%" } : { left: "20%" }),
                // Notch corner faces inward toward the image centre
                borderRadius: isRight
                  ? "16px 16px 4px 16px"
                  : "16px 16px 16px 4px",
                // Scale from the bottom so it grows "out of" the image edge
                transformOrigin: "bottom center",
              }}
              // Full float: fades in, drifts up, fades out — like a balloon
              animate={{
                opacity: [0, 1, 1, 0],
                y:       [12, -24, -56, -80],
                // Slight lateral drift — left bubbles lean left, right lean right
                x: isRight ? [0, 6, 10, 12] : [0, -6, -10, -12],
                scale:   [0.8, 1, 1, 0.92],
              }}
              transition={{
                duration: 2.4,
                times: [0, 0.18, 0.72, 1],
                ease: "easeOut",
              }}
              onAnimationComplete={handleAnimationComplete}
            >
              <p className="text-[14px] font-medium leading-tight text-black-90 whitespace-nowrap">
                {INGREDIENTS[currentIndex].name}
              </p>
              <p className="text-[12px] font-normal text-black-50 whitespace-nowrap">
                {INGREDIENTS[currentIndex].expires}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
