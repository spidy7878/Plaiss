'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface GlassyModalProps {
  open: boolean
  onClose: () => void
  onBack?: () => void
}

export const GlassyModal: React.FC<GlassyModalProps> = ({
  open,
  onClose,
  onBack,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [mounted] = useState(() => typeof window !== 'undefined')

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on ESC
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  // Click outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center backdrop-blur-xl bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={handleOverlayClick}
        >
          {/* Close Button — top-right, attractive */}
          <button
            className="fixed top-6 right-8 w-11 h-11 flex items-center justify-center rounded-full bg-black text-white text-2xl font-bold shadow-lg hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-200"
            onClick={onClose}
            aria-label="Close"
            type="button"
            style={{ lineHeight: 1 }}
          >
            &times;
          </button>

          {/* Back Button (optional) */}
          {onBack && (
            <button
              className="fixed top-6 left-8 w-11 h-11 flex items-center justify-center rounded-full border border-white/30 bg-white/10 hover:bg-white/25 text-white text-xl transition-all duration-200 backdrop-blur-sm"
              onClick={onBack}
              aria-label="Back"
              type="button"
            >
              &#8592;
            </button>
          )}

          {/* Buttons */}
          <motion.div
            className="flex flex-col gap-5 w-full max-w-xs px-4"
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
            <button className="w-full py-4 rounded-full bg-black text-white text-sm font-semibold tracking-wide hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg">
              Join as Individual
            </button>
            <button className="w-full py-4 rounded-full bg-black text-white text-sm font-semibold tracking-wide hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg">
              Partner With Us
            </button>
            <button className="w-full py-4 rounded-full bg-black text-white text-sm font-semibold tracking-wide hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg">
              Join as Interior Designer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
