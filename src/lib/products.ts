import fs from 'fs/promises'
import path from 'path'

// Re-export shared types & utilities so server code can import from one place
export type { Product, Category } from './product-types'
export { toTitleCase, toSlug } from './product-types'

import type { Product, Category } from './product-types'
import { toTitleCase, toSlug } from './product-types'

// ─── Data access (server-side only) ──────────────────────────────────────────
const DATA_PATH = path.join(process.cwd(), 'data', 'products.json')

/**
 * Read all products from the JSON data file.
 * This runs on the server at build/request time.
 */
export async function getAllProducts(): Promise<Product[]> {
  const raw = await fs.readFile(DATA_PATH, 'utf-8')
  return JSON.parse(raw)
}

/**
 * Get a single product by its category slug and product name slug.
 */
export async function getProductBySlug(
  categorySlug: string,
  productSlug: string
): Promise<Product | undefined> {
  const products = await getAllProducts()
  return products.find(
    (p) =>
      p.category === categorySlug &&
      toSlug(p.name) === productSlug.toLowerCase()
  )
}

/**
 * Get related products in the same category, excluding the given product.
 */
export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  const products = await getAllProducts()
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}

/**
 * Get all unique category slugs derived from products.
 */
export async function getAllCategories(): Promise<Category[]> {
  const products = await getAllProducts()
  const slugSet = new Set(products.map((p) => p.category))
  return [
    { label: 'All Products', slug: 'all-products' },
    ...Array.from(slugSet).map((slug) => ({
      label: toTitleCase(slug),
      slug,
    })),
  ]
}
