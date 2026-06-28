import { useEffect, useState } from "react"

/**
 * Returns true if the user hasn't scrolled within `delayMs` milliseconds
 * of mounting. Once the user scrolls (before the timer fires), stays false
 * forever — the auto-reveal is skipped and normal scroll logic takes over.
 */
export function useIdleReveal(delayMs: number): boolean {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    let hasScrolled = false

    const onScroll = () => { hasScrolled = true }
    window.addEventListener("scroll", onScroll, { passive: true })

    const timer = setTimeout(() => {
      if (!hasScrolled) setRevealed(true)
    }, delayMs)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
  }, [delayMs])

  return revealed
}
