'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function EngineSection() {
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
    setEmailModalOpen(false)
  }

  return (
    <section className="relative w-full min-h-[110vh] overflow-hidden flex items-center justify-center rounded-3xl">
      {/* Background Video — always present */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover rounded-3xl"
      >
        <source
          src="/videos/Video Ad for AI _ SaaS Product _ Doks.AI.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Blurry Overlay + Content — hidden after submission */}
      <AnimatePresence>
        {!submitted && (
          <motion.div
            className="absolute inset-0 bg-[#0b1120]/80 backdrop-blur-sm rounded-3xl"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!submitted && (
          <motion.div
            className="relative z-10 flex flex-col items-center text-center px-6 py-24"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-none mb-10">
              The Plaiss Engine
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed mb-2">
              The most Advance Engine to make your home designing process
              efficient is now on its way –
            </p>
            <p className="text-base md:text-lg font-bold text-white mb-10">
              Spring 2027
            </p>

            {/* Glowing Button */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-green-500/40 rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              <button
                className="relative bg-white text-gray-900 px-10 py-3.5 rounded-full text-base font-medium hover:bg-white/90 transition-colors duration-200 cursor-pointer"
                onClick={() => setEmailModalOpen(true)}
              >
                View Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Modal Overlay (portal-less, inside section) */}
      <AnimatePresence>
        {emailModalOpen && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl backdrop-blur-xl bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setEmailModalOpen(false)
            }}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-8 w-11 h-11 flex items-center justify-center rounded-full bg-lime-300 text-black text-2xl font-bold shadow-lg hover:bg-black hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
              onClick={() => setEmailModalOpen(false)}
              aria-label="Close"
              type="button"
              style={{ lineHeight: 1 }}
            >
              &times;
            </button>

            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full max-w-xs px-4"
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 26,
                delay: 0.05,
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                placeholder="Enter your email"
                className="w-full px-5 py-4 rounded-full bg-white/90 text-black text-sm font-medium placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-lime-300 transition"
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-xs text-center -mt-2">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-lime-300 text-black text-sm font-semibold tracking-wide hover:bg-black hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
              >
                Submit
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
