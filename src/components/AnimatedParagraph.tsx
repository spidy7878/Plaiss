'use client'

import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'

export default function AnimatedParagraph() {
  const text = `Plaiss is a next-generation online furniture brand that blends beautiful design with powerful technology to transform the way people shop for their homes. Beyond offering a curated collection of modern, functional, and timeless furniture pieces, Plaiss features its own intelligent AI engine that makes decision-making effortless. Simply upload a picture of your room, and the platform will automatically visualize the items in your cart placed directly into your space in real time. This immersive experience helps customers see scale, style, and harmony before purchasing, eliminating guesswork and bringing confidence to every design choice. With Plaiss, furnishing your home becomes intuitive, personalized, and remarkably smart.`

  const cardRef = useRef<HTMLDivElement | null>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  // Mouse-based tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = (x / rect.width) * 2 - 1 // -1 .. 1
    const py = (y / rect.height) * 2 - 1 // -1 .. 1
    // rotateY (horizontal) and rotateX (vertical) with subtle strength
    const ry = px * 6
    const rx = -py * 6
    setTilt({ rx, ry })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 })
  }

  // Gentle idle float animation timeline for decorative shapes
  // (use inline keyframes in `animate` and provide `transition` separately)

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div
          className="relative mx-auto"
          style={{ perspective: 1200 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Decorative floating 3D shapes */}
          <motion.div
            className="absolute -left-6 -top-6 w-20 h-20 rounded-2xl bg-lime-300/80 blur-[3px]"
            animate={{ y: [-6, 6, -6], rotate: [0, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
            style={{ transformStyle: 'preserve-3d' }}
          />
          <motion.div
            className="absolute -right-8 -top-4 w-16 h-16 rounded-lg bg-black/5"
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
            style={{ transformStyle: 'preserve-3d' }}
          />

          {/* Floating paragraph (no card) — text itself tilts for stronger 3D feel */}
          <motion.div
            ref={cardRef}
            className="relative p-8 md:p-12 text-center mx-auto max-w-3xl"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          >
            <div className="transform-gpu">
              <p
                className="text-gray-900 text-lg md:text-xl leading-relaxed"
                style={{ textShadow: '0 18px 40px rgba(15,23,42,0.06)' }}
              >
                {text}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
