"use client"

import { useRef } from "react"

interface HeroVideoProps {
  src: string
}

export function HeroVideo({ src }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  function handleTimeUpdate() {
    const video = videoRef.current
    if (!video) return
    // Pause and freeze at exactly 13 seconds
    if (video.currentTime >= 13) {
      video.pause()
    }
  }

  return (
    <video
      ref={videoRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      autoPlay
      muted
      playsInline
      preload="metadata"
      aria-hidden
      onTimeUpdate={handleTimeUpdate}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
