'use client'

import { useEffect, useRef } from 'react'
import { HeroSearchBar } from '@/components/HeroSearchBar'

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.load()
    video.play().catch(() => {
      // Autoplay blocked by browser — muted should allow it, but fail silently
    })
  }, [])

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[75vh] md:min-h-[82vh] mt-20 lg:mt-27 mx-auto w-[92vw] rounded-2xl">
      {/* Video background (keeps same sizing/cover behavior as previous background image) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        src="/videos/home_video1.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/10 rounded-2xl" />
      <div
        className="relative z-10 flex items-center justify-center text-center w-full h-full"
        style={{ minHeight: '14rem' }}
      >
        <img
          src="images/title.svg"
          alt="Plaiss Logo"
          className="block w-full max-w-[92vw] h-auto drop-shadow-2xl select-none pointer-events-none"
          style={{
            maxHeight: '36rem',
            minHeight: '14rem',
            objectFit: 'contain',
          }}
        />
        <div
          className="absolute left-0 w-full flex flex-col items-center justify-center gap-5 px-4"
          style={{ top: '75%', transform: 'translateY(-50%)' }}
        >
          <p className="text-white text-sm sm:text-base md:text-2xl font-regular tracking-wider pointer-events-none">
            UNIQUE DESIGNS FOR DISTINCTIVE SPACES
          </p>
          <HeroSearchBar />
        </div>
      </div>
    </section>
  )
}
