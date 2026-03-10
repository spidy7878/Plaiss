'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, X, Image as ImageIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Product } from '@/lib/product-types'
import { toTitleCase, toSlug } from '@/lib/product-types'

interface ImageSearchModalProps {
  open: boolean
  onClose: () => void
  products: Product[]
}

export const ImageSearchModal: React.FC<ImageSearchModalProps> = ({
  open,
  onClose,
  products,
}) => {
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mounted] = useState(() => typeof window !== 'undefined')
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [searching, setSearching] = useState(false)
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleClose = useCallback(() => {
    setPreview(null)
    setDragActive(false)
    setSearching(false)
    setMatchedProducts([])
    setHasSearched(false)
    onClose()
  }, [onClose])

  // Prevent background scroll
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
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, handleClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) handleClose()
  }

  /**
   * Analyze an uploaded image by extracting dominant colors,
   * then match against product color swatches.
   */
  const analyzeAndMatch = useCallback(
    (file: File) => {
      setSearching(true)
      setHasSearched(false)
      setMatchedProducts([])

      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        setPreview(dataUrl)

        // Create an image to extract colors
        const img = new window.Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            setSearching(false)
            setHasSearched(true)
            return
          }

          // Sample at a smaller size for performance
          const sampleSize = 50
          canvas.width = sampleSize
          canvas.height = sampleSize
          ctx.drawImage(img, 0, 0, sampleSize, sampleSize)
          const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize)
          const pixels = imageData.data

          // Collect dominant colors (simple average + clustering approach)
          const colorBuckets: {
            r: number
            g: number
            b: number
            count: number
          }[] = []

          for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i]
            const g = pixels[i + 1]
            const b = pixels[i + 2]

            // Skip very dark or very light pixels
            if (r + g + b < 30 || r + g + b > 720) continue

            // Find nearest bucket
            let found = false
            for (const bucket of colorBuckets) {
              const dr = Math.abs(bucket.r / bucket.count - r)
              const dg = Math.abs(bucket.g / bucket.count - g)
              const db = Math.abs(bucket.b / bucket.count - b)
              if (dr + dg + db < 80) {
                bucket.r += r
                bucket.g += g
                bucket.b += b
                bucket.count++
                found = true
                break
              }
            }
            if (!found) {
              colorBuckets.push({ r, g, b, count: 1 })
            }
          }

          // Get top dominant colors
          const dominantColors = colorBuckets
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
            .map((b) => ({
              r: Math.round(b.r / b.count),
              g: Math.round(b.g / b.count),
              b: Math.round(b.b / b.count),
            }))

          // Convert hex color to RGB
          function hexToRgb(hex: string) {
            const h = hex.replace('#', '')
            return {
              r: parseInt(h.substring(0, 2), 16),
              g: parseInt(h.substring(2, 4), 16),
              b: parseInt(h.substring(4, 6), 16),
            }
          }

          // Compute color distance
          function colorDistance(
            c1: { r: number; g: number; b: number },
            c2: { r: number; g: number; b: number }
          ) {
            return Math.sqrt(
              (c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2
            )
          }

          // Score each product by color similarity
          const scored = products.map((product) => {
            let bestScore = Infinity
            for (const color of product.colors) {
              const productColor = hexToRgb(color.hex)
              for (const domColor of dominantColors) {
                const dist = colorDistance(productColor, domColor)
                if (dist < bestScore) bestScore = dist
              }
            }
            return { product, score: bestScore }
          })

          // Sort by best match and take top results
          scored.sort((a, b) => a.score - b.score)
          const matches = scored.slice(0, 6).map((s) => s.product)

          // Simulate a brief delay for UX
          setTimeout(() => {
            setMatchedProducts(matches)
            setSearching(false)
            setHasSearched(true)
          }, 800)
        }
        img.src = dataUrl
      }
      reader.readAsDataURL(file)
    },
    [products]
  )

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      analyzeAndMatch(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      analyzeAndMatch(file)
    }
  }

  const navigateToProduct = (product: Product) => {
    router.push(`/${product.category}/${toSlug(product.name)}`)
    handleClose()
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-9999 flex items-center justify-center backdrop-blur-xl bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={handleOverlayClick}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-[90vw] max-w-4xl max-h-[85vh] overflow-y-auto"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 28,
              delay: 0.05,
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-black/60" />
            </button>

            {/* Two-column layout: left content, right image */}
            <div className="flex flex-col md:flex-row">
              {/* Left column – all content */}
              <div className="flex-1 px-6 pt-8 pb-8">
                {/* Header */}
                <div className="flex flex-col items-center mb-5">
                  <img
                    src="/images/logo3.png"
                    alt="Plaiss"
                    className="h-10 mb-4 select-none pointer-events-none"
                  />
                  <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                    Snap and search
                  </h2>
                  <p className="text-sm text-black/50 mt-1 text-center">
                    Take or select a photo to search
                    <br />
                    across our furniture collection
                  </p>
                </div>

                {/* Upload area (no preview yet) */}
                {!preview && (
                  <>
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center transition-all cursor-pointer ${
                        dragActive
                          ? 'border-black bg-black/5'
                          : 'border-black/20 hover:border-black/40 bg-black/2'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="w-10 h-10 text-black/20 mb-3" />
                      <p className="text-sm text-black/40">
                        Drag and drop an image here, or
                      </p>
                    </div>

                    <div className="flex justify-center mt-5">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-black/80 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
                      >
                        <Camera className="w-4 h-4" />
                        Upload a photo
                      </button>
                    </div>

                    <p className="text-center text-xs text-black/35 mt-3">
                      Only .png, .jpeg, .gif images
                      <br />
                      will be accepted (max size 10MB)
                    </p>
                  </>
                )}

                {/* Preview + Results */}
                {preview && (
                  <div className="mt-4">
                    {/* Image preview */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <img
                          src={preview}
                          alt="Uploaded"
                          className="max-h-44 rounded-xl border border-black/10 object-contain"
                        />
                        <button
                          onClick={() => {
                            setPreview(null)
                            setMatchedProducts([])
                            setHasSearched(false)
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs hover:bg-black/70 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Searching state */}
                    {searching && (
                      <div className="flex flex-col items-center py-8">
                        <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        <p className="text-sm text-black/50 mt-3">
                          Analyzing image…
                        </p>
                      </div>
                    )}

                    {/* Results */}
                    {hasSearched && !searching && (
                      <div>
                        {matchedProducts.length > 0 ? (
                          <>
                            <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">
                              Similar products found
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {matchedProducts.map((product) => (
                                <button
                                  key={product.id}
                                  onClick={() => navigateToProduct(product)}
                                  className="group flex flex-col bg-white border border-black/10 rounded-xl overflow-hidden hover:border-black/30 hover:shadow-md transition-all text-left"
                                >
                                  <div className="aspect-square bg-[#f0eeeb] overflow-hidden">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                  </div>
                                  <div className="px-3 py-2">
                                    <p className="text-xs font-semibold tracking-wide uppercase text-black truncate">
                                      {product.name}
                                    </p>
                                    <p className="text-[11px] text-black/40">
                                      {toTitleCase(product.category)} · £
                                      {product.price.toLocaleString('en-GB')}
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-sm text-black/50">
                              No matching products found. Try another image.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/gif"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Right column – promo image */}
              {!preview && (
                <div className="hidden md:flex flex-1 items-center justify-center p-6">
                  <img
                    src="/images/image-searchbar.jpg"
                    alt="Search by image"
                    className="w-full max-w-xs rounded-xl object-contain select-none pointer-events-none"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
