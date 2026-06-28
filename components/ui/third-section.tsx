"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// ── Recipe data ──────────────────────────────────────────────────────────────
const RECIPES = [
  {
    name: "Turkish Eggs with Chilli Butter",
    time: "15 min",
    difficulty: "Medium",
    calories: 420, carbs: 12, fat: 28,
    badge: "High Protein",
    image: "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/recipes/breakfast_02_turkish_eggs_with_hung_curd_chilli_butter_herbs.jpg",
  },
  {
    name: "Mushroom Bourguignon & Mash",
    time: "45 min",
    difficulty: "Medium",
    calories: 580, carbs: 62, fat: 18,
    badge: "Rich in Fibre",
    image: "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/dinner_01_mushroom_bourguignon_with_buttery_mashed_potatoes.jpg",
  },
  {
    name: "Raw Mango Aam Panna",
    time: "10 min",
    difficulty: "Easy",
    calories: 95, carbs: 24, fat: 0,
    badge: "Immunity Booster",
    image: "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/drink_01_raw_mango_aam_panna_raw_mango_aam_panna_with_mint_roasted_cumin.jpg",
  },
  {
    name: "Watermelon Cucumber Coconut Salad",
    time: "10 min",
    difficulty: "Easy",
    calories: 180, carbs: 28, fat: 6,
    badge: "Hydrating & Light",
    image: "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/salad_02_watermelon_cucumber_coconut_salad_watermelon_cucumber_coconut_salad.jpg",
  },
]

// Container: 440px wide. Center card: 280px, base left = (440-280)/2 = 80px.
// Slot offsets (x translate from the base-centered position):
//   center:  x=0,    scale=1,    opacity=1    → fills center
//   left:    x=-270, scale=0.82, opacity=0.65 → peeks ~65px on left
//   right:   x=+270, scale=0.82, opacity=0.80 → peeks ~65px on right
//   farther: x=±540, opacity=0               → off-screen, invisible
function getCardProps(offset: number) {
  if (offset === 0)  return { x: 0,    scale: 1,    opacity: 1,    zIndex: 10 }
  if (offset === -1) return { x: -270, scale: 0.82, opacity: 0.65, zIndex: 5  }
  if (offset === 1)  return { x: 270,  scale: 0.82, opacity: 0.80, zIndex: 5  }
  return               { x: offset < 0 ? -540 : 540, scale: 0.7, opacity: 0, zIndex: 0 }
}

function getOffset(cardIndex: number, active: number, total: number) {
  const raw = ((cardIndex - active) % total + total) % total
  return raw > total / 2 ? raw - total : raw
}

// ── Carousel ─────────────────────────────────────────────────────────────────
function RecipeCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % RECIPES.length), 3200)
    return () => clearInterval(t)
  }, [])

  return (
    // Outer wrapper scales the whole carousel down on small screens
    <div className="scale-[0.62] sm:scale-[0.80] md:scale-100 origin-center">
    <div
      className="relative w-[440px] h-[360px]"
      style={{ clipPath: "inset(-60px 0 -60px 0)" }}
    >
      {RECIPES.map((recipe, i) => {
        const offset = getOffset(i, active, RECIPES.length)
        const { x, scale, opacity, zIndex } = getCardProps(offset)

        return (
          <motion.div
            key={i}
            className="absolute top-0 w-[280px] h-[340px]"
            style={{ left: 80, zIndex }}
            animate={{ x, scale, opacity }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Health badge — springs in only when this card is the hero */}
            <AnimatePresence>
              {offset === 0 && (
                <motion.div
                  key="badge"
                  className="absolute -top-3 left-4 z-30 flex items-center rounded-full bg-amber-400 px-3 py-1.5 shadow-md"
                  initial={{ opacity: 0, scale: 0.7, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 20, delay: 0.15 } }}
                  exit={{ opacity: 0, scale: 0.8, y: 4, transition: { duration: 0.2 } }}
                >
                  <span className="text-[13px] font-semibold tracking-wide text-amber-950 whitespace-nowrap uppercase">
                    {recipe.badge}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inner div clips the photo to rounded corners without clipping the badge */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl cursor-default select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={recipe.image}
              alt={recipe.name}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark gradient overlay so text stays readable */}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

            {/* Recipe name + chips + macros — bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2.5">

              {/* Recipe name */}
              <p className="text-[22px] font-bold leading-snug text-white">
                {recipe.name}
              </p>

              {/* Time + difficulty chips */}
              <div className="flex gap-2 flex-wrap">
                <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-white">
                  {recipe.time}
                </span>
                <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-white">
                  {recipe.difficulty}
                </span>
              </div>

              {/* Macro chips */}
              <div className="flex gap-2 flex-wrap">
                <span className="rounded-full bg-amber-400/80 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-black">
                  {recipe.calories} cal
                </span>
                <span className="rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-white">
                  {recipe.carbs}g carbs
                </span>
                <span className="rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-white">
                  {recipe.fat}g fat
                </span>
              </div>

            </div>

          </div> {/* end inner overflow-hidden */}
          </motion.div>
        )
      })}

      {/* Left edge fade — fades peeking card into the section background */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-20 z-20"
        style={{ background: "linear-gradient(to right, #fffbeb 0%, transparent 100%)" }}
      />
      {/* Right edge fade */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-20 z-20"
        style={{ background: "linear-gradient(to left, #fffbeb 0%, transparent 100%)" }}
      />
    </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function ThirdSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

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

  return (
    <section
      ref={sectionRef}
      className="h-dvh w-full bg-amber-50 flex items-center justify-center md:justify-end px-6 md:px-12 lg:px-20"
      aria-label="Recipe carousel"
    >
      <div
        className={cn(
          "transition-all duration-700 ease-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <RecipeCarousel />
      </div>
    </section>
  )
}
