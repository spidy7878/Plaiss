import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import type { Product } from '@/lib/products'
import { toTitleCase } from '@/lib/products'

const DATA_PATH = path.join(process.cwd(), 'data', 'products.json')

// ─── GET /api/categories ─────────────────────────────────────────────────────
// Returns all unique categories derived from products data
export async function GET() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8')
    const products: Product[] = JSON.parse(raw)

    const slugSet = new Set(products.map((p) => p.category))
    const categories = [
      { label: 'All Products', slug: 'all-products' },
      ...Array.from(slugSet).map((slug) => ({
        label: toTitleCase(slug),
        slug,
      })),
    ]

    return NextResponse.json(categories)
  } catch {
    return NextResponse.json(
      { error: 'Failed to read categories' },
      { status: 500 }
    )
  }
}
