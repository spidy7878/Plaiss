'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Camera } from 'lucide-react'
import type { Product } from '@/lib/product-types'
import { toTitleCase, toSlug } from '@/lib/product-types'
import { ImageSearchModal } from '@/components/ImageSearchModal'

export function HeroSearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Fetch all products once
  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data: Product[]) => setAllProducts(data))
      .catch(() => {})
  }, [])

  // Derive filtered results from query (no effect needed)
  const q = query.toLowerCase()
  const catSlugs = Array.from(new Set(allProducts.map((p) => p.category)))
  const filteredCategories = query.trim()
    ? catSlugs
        .filter((c) => toTitleCase(c).toLowerCase().includes(q))
        .slice(0, 3)
    : []
  const filteredResults = query.trim()
    ? allProducts.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 5)
    : []
  const shouldShowDropdown =
    query.trim() !== '' &&
    (filteredCategories.length > 0 || filteredResults.length > 0)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // If matches a category, go to category page
    const q = query.toLowerCase()
    const catSlugs = Array.from(new Set(allProducts.map((p) => p.category)))
    const matchedCat = catSlugs.find(
      (c) => toTitleCase(c).toLowerCase() === q || c === q
    )
    if (matchedCat) {
      router.push(`/${matchedCat}`)
      setQuery('')
      setDropdownOpen(false)
      return
    }

    // If matches a product, go to product page
    const matchedProduct = allProducts.find((p) => p.name.toLowerCase() === q)
    if (matchedProduct) {
      router.push(`/${matchedProduct.category}/${toSlug(matchedProduct.name)}`)
      setQuery('')
      setDropdownOpen(false)
      return
    }

    // Otherwise go to all-products with search
    router.push(`/all-products?search=${encodeURIComponent(query.trim())}`)
    setQuery('')
    setDropdownOpen(false)
  }

  const navigateToProduct = useCallback(
    (product: Product) => {
      router.push(`/${product.category}/${toSlug(product.name)}`)
      setQuery('')
      setDropdownOpen(false)
    },
    [router]
  )

  const navigateToCategory = useCallback(
    (slug: string) => {
      router.push(`/${slug}`)
      setQuery('')
      setDropdownOpen(false)
    },
    [router]
  )

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative w-full max-w-135 mx-auto pointer-events-auto"
      >
        <form onSubmit={handleSubmit} className="relative">
          {/* Search icon */}
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setDropdownOpen(true)
            }}
            onFocus={() => query.trim() && setDropdownOpen(true)}
            placeholder="Search or Upload Image"
            className="w-full h-12 pl-12 pr-14 rounded-full bg-white text-black text-sm placeholder:text-black/40 outline-none shadow-lg border border-black/5 focus:border-black/20 transition-colors"
          />

          {/* Camera button */}
          <button
            type="button"
            onClick={() => setImageModalOpen(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            aria-label="Search by image"
          >
            <Camera className="w-5 h-5 text-black/50" />
          </button>
        </form>

        {/* Dropdown */}
        {shouldShowDropdown && dropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden z-50">
            {/* Category results */}
            {filteredCategories.length > 0 && (
              <div className="px-4 pt-3 pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-1.5">
                  Categories
                </p>
                {filteredCategories.map((slug) => (
                  <button
                    key={slug}
                    onClick={() => navigateToCategory(slug)}
                    className="w-full text-left px-3 py-2 text-sm text-black hover:bg-black/5 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Search className="w-3.5 h-3.5 text-black/30" />
                    {toTitleCase(slug)}
                  </button>
                ))}
              </div>
            )}

            {/* Product results */}
            {filteredResults.length > 0 && (
              <div className="px-4 pt-2 pb-3">
                {filteredCategories.length > 0 && (
                  <div className="border-t border-black/10 mb-2" />
                )}
                <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-1.5">
                  Products
                </p>
                {filteredResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => navigateToProduct(product)}
                    className="w-full text-left px-3 py-2 text-sm text-black hover:bg-black/5 rounded-lg transition-colors flex items-center gap-3"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 rounded object-cover border border-black/10"
                    />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-black/40">
                        {toTitleCase(product.category)} · £
                        {product.price.toLocaleString('en-GB')}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Search Modal */}
      <ImageSearchModal
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        products={allProducts}
      />
    </>
  )
}
