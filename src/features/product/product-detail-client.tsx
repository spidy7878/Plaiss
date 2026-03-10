'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Minus, Plus, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '@/lib/product-types'
import { toTitleCase, toSlug } from '@/lib/product-types'

// ─── Social icons (inline SVGs) ───────────────────────────────────────────────
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.854L.054 23.447a.5.5 0 0 0 .614.614l5.593-1.48A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.523-5.198-1.432l-.373-.22-3.32.878.878-3.32-.22-.373A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// ─── Accordion Item ────────────────────────────────────────────────────────────
function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-t border-black/15">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span className="text-sm font-semibold tracking-widest uppercase text-black">
          {title}
        </span>
        {open ? (
          <Minus className="w-4 h-4 text-black shrink-0" />
        ) : (
          <Plus className="w-4 h-4 text-black shrink-0" />
        )}
      </button>
      {open && (
        <div className="pb-4 text-sm text-black/65 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}

// ─── Related Product Card ──────────────────────────────────────────────────────
function RelatedProductCard({ product }: { product: Product }) {
  const href = `/${product.category}/${toSlug(product.name)}`
  return (
    <Link
      href={href}
      className="flex flex-col bg-white border border-black group cursor-pointer w-full"
    >
      <div className="relative w-full aspect-square bg-[#f0eeeb] overflow-hidden">
        {product.isNew && (
          <span className="absolute top-2 left-2 z-10 bg-[#d4f000] text-black text-xs font-semibold px-2.5 py-0.5 rounded-full border border-black/10">
            BEST SELLER
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="px-4 py-4 flex flex-col gap-1">
        <p className="text-sm font-semibold tracking-widest uppercase text-black">
          {product.name}
        </p>
        <p className="text-sm text-black/60">
          £{product.price.toLocaleString('en-GB')}.00
        </p>
      </div>
    </Link>
  )
}

// ─── Related Products Carousel ─────────────────────────────────────────────────
function RelatedProductsCarousel({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  function updateScrollState() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
  }

  // Initialize scroll state on mount
  useEffect(() => {
    const timer = setTimeout(() => updateScrollState(), 100)
    return () => clearTimeout(timer)
  }, [])

  function scroll(direction: 'left' | 'right') {
    const el = scrollRef.current
    if (!el) return
    // Scroll by one card width + gap
    const cardWidth = 280
    const gap = 16
    const scrollAmount = cardWidth + gap
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
    // Update state after animation
    setTimeout(() => updateScrollState(), 400)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Cards row (hidden scrollbar, clipped overflow) */}
      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-4 overflow-x-auto no-scrollbar"
        >
          {products.map((p) => (
            <div key={p.id} className="shrink-0 w-60 sm:w-65 md:w-70">
              <RelatedProductCard product={p} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow controls – below the cards */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Previous products"
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
            canScrollLeft
              ? 'border-black text-black hover:bg-black hover:text-white cursor-pointer'
              : 'border-black/15 text-black/20 cursor-default'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Next products"
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
            canScrollRight
              ? 'border-black text-black hover:bg-black hover:text-white cursor-pointer'
              : 'border-black/15 text-black/20 cursor-default'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// ─── Main Client Component ─────────────────────────────────────────────────────
export function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product
  relatedProducts: Product[]
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].hex)
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)

  const categoryLabel = toTitleCase(product.category)

  return (
    <>
      {/* ── Breadcrumb ── */}
      <div className="w-full max-w-350 mx-auto px-4 sm:px-6 md:px-12 py-20 flex items-center gap-1.5 text-xs text-black/50">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          href={`/${product.category}`}
          className="hover:text-black transition-colors"
        >
          {categoryLabel}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black font-medium">{product.name}</span>
      </div>

      {/* ── Product section ── */}
      <section className="w-full max-w-350 mx-auto px-4 sm:px-6 md:px-12 pt-0 pb-6 md:pt-0 md:pb-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-14 lg:gap-20">
          {/* Left – Image */}
          <div className="w-full md:w-[55%] flex flex-col gap-3">
            <div className="w-full aspect-square bg-[#f0eeeb] overflow-hidden border border-black">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail strip */}
            <div className="flex gap-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f0eeeb] overflow-hidden border-2 border-black cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right – Details */}
          <div className="w-full md:flex-1 flex flex-col">
            {/* Name */}
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-widest uppercase text-black mb-3">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-lg text-black mb-5">
              £{product.price.toLocaleString('en-GB')}.00
            </p>

            {/* Description */}
            <p className="text-sm text-black/65 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color */}
            <div className="mb-5">
              <p className="text-sm font-medium text-black mb-2.5">Color</p>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.hex}
                    title={c.name}
                    onClick={() => setSelectedColor(c.hex)}
                    className={`w-8 h-8 rounded-sm border-2 transition-all ${
                      selectedColor === c.hex
                        ? 'border-black scale-110'
                        : 'border-black/25 hover:border-black/60'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-7">
              <p className="text-sm font-medium text-black mb-2.5">Quantity</p>
              <div className="flex items-center border border-black/25 w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-black hover:bg-black/5 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 py-2 text-sm font-medium text-black min-w-10 text-center select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-black hover:bg-black/5 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTA Button and Like - Centered Row */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <button className="bg-black text-white px-6 md:px-8 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-lime-300 hover:text-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg">
                Go To Seller&apos;s Site
              </button>
              <button
                onClick={() => setWishlisted((v) => !v)}
                aria-label="Add to wishlist"
                className="w-12 h-12 border border-black/25 rounded-full flex items-center justify-center hover:border-black transition-colors shrink-0"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    wishlisted ? 'fill-black text-black' : 'text-black/60'
                  }`}
                />
              </button>
            </div>

            {/* Accordions */}
            <div>
              <AccordionItem title="Product Info" defaultOpen>
                <p>
                  I&apos;m a product detail. I&apos;m a great place to add more
                  information about your product such as sizing, material, care
                  and cleaning instructions. This is also a great space to write
                  what makes this product special and how your customers can
                  benefit from this item.
                </p>
              </AccordionItem>
              <AccordionItem title="Return &amp; Refund Policy">
                <p>
                  We accept returns within 30 days of delivery. Items must be
                  unused, in original packaging, and in the same condition you
                  received them. Contact our support team to initiate a return.
                </p>
              </AccordionItem>
              <AccordionItem title="Shipping Info">
                <p>
                  Free standard shipping on orders over £5,000. Express delivery
                  available at checkout. Estimated delivery: 5–7 business days.
                </p>
              </AccordionItem>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-black/10">
              <button
                aria-label="Share on WhatsApp"
                className="text-black/50 hover:text-black transition-colors"
              >
                <WhatsAppIcon />
              </button>
              <button
                aria-label="Share on Facebook"
                className="text-black/50 hover:text-black transition-colors"
              >
                <FacebookIcon />
              </button>
              <button
                aria-label="Share on Pinterest"
                className="text-black/50 hover:text-black transition-colors"
              >
                <PinterestIcon />
              </button>
              <button
                aria-label="Share on X"
                className="text-black/50 hover:text-black transition-colors"
              >
                <XIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── You Might Also Like ── */}
      {relatedProducts.length > 0 && (
        <section className="w-full max-w-350 mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-wide text-black mb-8">
            <span className="font-bold uppercase">You</span>{' '}
            <span className="uppercase">might also like</span>
          </h2>

          {/* Scrollable row with arrow navigation */}
          <RelatedProductsCarousel products={relatedProducts} />
        </section>
      )}
    </>
  )
}
