'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Minus, Plus, X, SlidersHorizontal } from 'lucide-react'
import type { Product, Category } from '@/lib/product-types'
import { toSlug } from '@/lib/product-types'

type SortOption = 'recommended' | 'price-low-high' | 'price-high-low' | 'newest'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SORT_LABELS: Record<SortOption, string> = {
  recommended: 'Recommended',
  'price-low-high': 'Price: Low to High',
  'price-high-low': 'Price: High to Low',
  newest: 'Newest',
}

function toTitleCase(slug: string) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

// ─── Dual Range Slider ────────────────────────────────────────────────────────
function DualRangeSlider({
  min,
  max,
  minVal,
  maxVal,
  onChange,
}: {
  min: number
  max: number
  minVal: number
  maxVal: number
  onChange: (range: [number, number]) => void
}) {
  const minPercent = ((minVal - min) / (max - min)) * 100
  const maxPercent = ((maxVal - min) / (max - min)) * 100

  return (
    <div className="relative h-5 flex items-center w-full">
      {/* Track background */}
      <div className="absolute w-full h-0.75 rounded bg-gray-200">
        {/* Active fill */}
        <div
          className="absolute h-full bg-black rounded"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
      </div>
      {/* Min thumb input */}
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        className="price-range-input"
        onChange={(e) => {
          const value = Math.min(Number(e.target.value), maxVal - 1)
          onChange([value, maxVal])
        }}
      />
      {/* Max thumb input */}
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        className="price-range-input"
        onChange={(e) => {
          const value = Math.max(Number(e.target.value), minVal + 1)
          onChange([minVal, value])
        }}
      />
    </div>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const href = `/${product.category}/${toSlug(product.name)}`
  return (
    <Link
      href={href}
      className="flex flex-col bg-white border border-black group cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full aspect-4/4.5 bg-[#f0eeeb] overflow-hidden">
        {product.isNew && (
          <span className="absolute top-3 left-3 z-10 bg-[#d4f000] text-black text-xs font-semibold px-3 py-1 rounded-full border border-black/10">
            NEW
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {/* Info */}
      <div className="py-5 px-4 flex flex-col gap-1.5">
        <p className="text-sm font-semibold tracking-widest uppercase text-black">
          {product.name}
        </p>
        <p className="text-sm text-black/70">
          £{product.price.toLocaleString('en-GB')}.00
        </p>
        {/* Color swatches */}
        <div className="flex items-center gap-1.5 mt-1">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="w-5 h-5 rounded-sm border border-black/20 inline-block"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function CategoryClient({
  category,
  products: allProducts,
  categories: BROWSE_CATEGORIES,
}: {
  category: string
  products: Product[]
  categories: Category[]
}) {
  const categoryProducts = useMemo(
    () =>
      category === 'all-products'
        ? allProducts
        : allProducts.filter((p) => p.category === category),
    [category, allProducts]
  )

  // Price bounds for this category
  const priceMin = useMemo(
    () => Math.min(...categoryProducts.map((p) => p.price)),
    [categoryProducts]
  )
  const priceMax = useMemo(
    () => Math.max(...categoryProducts.map((p) => p.price)),
    [categoryProducts]
  )

  // ── State ──
  const [priceRange, setPriceRange] = useState<[number, number]>([
    priceMin,
    priceMax,
  ])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('recommended')
  const [colorExpanded, setColorExpanded] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)
  const mobileSortRef = useRef<HTMLDivElement>(null)

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        sortRef.current &&
        !sortRef.current.contains(target) &&
        mobileSortRef.current &&
        !mobileSortRef.current.contains(target)
      ) {
        setSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // All unique colors in this category
  const allColors = useMemo(() => {
    const map = new Map<string, string>()
    categoryProducts.forEach((p) =>
      p.colors.forEach((c) => map.set(c.hex, c.name))
    )
    return Array.from(map.entries()).map(([hex, name]) => ({ hex, name }))
  }, [categoryProducts])

  // ── Filtering & sorting ──
  const filtered = useMemo(() => {
    let result = categoryProducts.filter(
      (p) =>
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        (selectedColors.length === 0 ||
          p.colors.some((c) => selectedColors.includes(c.hex)))
    )
    if (sortBy === 'price-low-high')
      result = [...result].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high-low')
      result = [...result].sort((a, b) => b.price - a.price)
    if (sortBy === 'newest')
      result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    return result
  }, [categoryProducts, priceRange, selectedColors, sortBy])

  const displayName = toTitleCase(category)

  const toggleColor = (hex: string) =>
    setSelectedColors((prev) =>
      prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex]
    )

  const clearFilters = () => {
    setPriceRange([priceMin, priceMax])
    setSelectedColors([])
  }

  const hasFilters =
    priceRange[0] !== priceMin ||
    priceRange[1] !== priceMax ||
    selectedColors.length > 0

  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-12 min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-black/50 mb-3 sm:mb-4">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronDown className="w-3 h-3 -rotate-90 text-black/40" />
        <span className="text-black">{displayName}</span>
      </nav>

      {/* Page title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-black mb-5 sm:mb-8">
        {displayName}
      </h1>

      {/* Mobile filter/sort bar */}
      <div className="flex md:hidden items-center justify-between mb-4 border-y border-black/10 py-3">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-black"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter &amp; Browse
          {hasFilters && (
            <span className="ml-1 w-2 h-2 rounded-full bg-black inline-block" />
          )}
        </button>
        <div ref={mobileSortRef} className="relative">
          <button
            onClick={() => setSortOpen((v) => !v)}
            className="flex items-center gap-1.5 text-sm text-black"
          >
            Sort: {SORT_LABELS[sortBy]}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-black/10 shadow-lg rounded z-50 min-w-44 py-1">
              {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSortBy(opt)
                    setSortOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-black/5 ${
                    sortBy === opt ? 'font-medium text-black' : 'text-black/70'
                  }`}
                >
                  {SORT_LABELS[opt]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl px-6 pt-6 pb-10 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-base font-medium text-black">
                Filter &amp; Browse
              </p>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-black" />
              </button>
            </div>

            <p className="text-sm font-medium text-black mb-3">Browse by</p>
            <div className="w-full h-px bg-black/10 mb-4" />
            <ul className="flex flex-col gap-3 mb-8">
              {BROWSE_CATEGORIES.map((cat) => {
                const isActive = cat.slug === category
                return (
                  <li key={cat.slug}>
                    <Link
                      href={`/${cat.slug}`}
                      onClick={() => setMobileFilterOpen(false)}
                      className={`text-sm transition-colors ${
                        isActive
                          ? 'text-[#7a8c3a] font-medium'
                          : 'text-black/70'
                      }`}
                    >
                      {cat.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <p className="text-sm font-medium text-black mb-3">Filter by</p>
            <div className="w-full h-px bg-black/10 mb-4" />
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-black/50 hover:text-black mb-3 transition-colors"
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            )}

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-black">Price</span>
              </div>
              <DualRangeSlider
                min={priceMin}
                max={priceMax}
                minVal={priceRange[0]}
                maxVal={priceRange[1]}
                onChange={setPriceRange}
              />
              <div className="flex justify-between mt-3 text-xs text-black/60">
                <span>£{priceRange[0].toLocaleString('en-GB')}</span>
                <span>£{priceRange[1].toLocaleString('en-GB')}</span>
              </div>
            </div>

            <div className="w-full h-px bg-black/10 mb-4" />
            <div>
              <p className="text-sm text-black mb-3">Color</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {allColors.map((c) => {
                  const isSelected = selectedColors.includes(c.hex)
                  return (
                    <button
                      key={c.hex}
                      title={c.name}
                      onClick={() => toggleColor(c.hex)}
                      className={`w-8 h-8 rounded-sm border-2 transition-all ${
                        isSelected
                          ? 'border-black scale-110'
                          : 'border-black/20'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  )
                })}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="mt-8 w-full bg-black text-white py-3 rounded-full text-sm font-semibold"
            >
              Show {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-6 lg:gap-10 items-start">
        {/* ── Sidebar ── */}
        <aside className="hidden md:flex flex-col w-48 lg:w-52 shrink-0 sticky top-24 self-start gap-0">
          {/* Browse by */}
          <p className="text-sm font-medium text-black mb-3">Browse by</p>
          <div className="w-full h-px bg-black/10 mb-4" />
          <ul className="flex flex-col gap-3 mb-8">
            {BROWSE_CATEGORIES.map((cat) => {
              const isActive = cat.slug === category
              return (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className={`text-sm transition-colors ${
                      isActive
                        ? 'text-[#7a8c3a] font-medium'
                        : 'text-black/70 hover:text-black'
                    }`}
                  >
                    {cat.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Filter by */}
          <p className="text-sm font-medium text-black mb-3">Filter by</p>
          <div className="w-full h-px bg-black/10 mb-4" />

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-black/50 hover:text-black mb-3 transition-colors"
            >
              <X className="w-3 h-3" />
              Clear filters
            </button>
          )}

          {/* Price filter */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-black">Price</span>
              <Minus className="w-4 h-4 text-black/50" />
            </div>

            <DualRangeSlider
              min={priceMin}
              max={priceMax}
              minVal={priceRange[0]}
              maxVal={priceRange[1]}
              onChange={setPriceRange}
            />

            <div className="flex justify-between mt-3 text-xs text-black/60">
              <span>£{priceRange[0].toLocaleString('en-GB')}</span>
              <span>£{priceRange[1].toLocaleString('en-GB')}</span>
            </div>
          </div>

          <div className="w-full h-px bg-black/10 mb-4" />

          {/* Color filter */}
          <div>
            <button
              onClick={() => setColorExpanded((v) => !v)}
              className="flex items-center justify-between w-full mb-3"
            >
              <span className="text-sm text-black">Color</span>
              {colorExpanded ? (
                <Minus className="w-4 h-4 text-black/50" />
              ) : (
                <Plus className="w-4 h-4 text-black/50" />
              )}
            </button>

            {colorExpanded && (
              <div className="flex flex-wrap gap-2 mt-1">
                {allColors.map((c) => {
                  const isSelected = selectedColors.includes(c.hex)
                  return (
                    <button
                      key={c.hex}
                      title={c.name}
                      onClick={() => toggleColor(c.hex)}
                      className={`w-7 h-7 rounded-sm border-2 transition-all ${
                        isSelected
                          ? 'border-black scale-110'
                          : 'border-black/20 hover:border-black/50'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  )
                })}
              </div>
            )}
          </div>

          <div className="w-full h-px bg-black/10 mt-4" />
        </aside>

        {/* ── Main ── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar – desktop only */}
          <div className="hidden md:flex items-center justify-between mb-6">
            <p className="text-sm text-black/50">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>

            {/* Sort dropdown */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 text-sm text-black font-normal"
              >
                Sort by: {SORT_LABELS[sortBy]}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-black/10 shadow-lg rounded z-50 min-w-48 py-1">
                  {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt)
                        setSortOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-black/5 ${
                        sortBy === opt
                          ? 'font-medium text-black'
                          : 'text-black/70'
                      }`}
                    >
                      {SORT_LABELS[opt]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-black/40">
              <p className="text-lg">No products match your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-sm underline hover:text-black transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
