import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import type { Product } from '@/lib/products'

const DATA_PATH = path.join(process.cwd(), 'data', 'products.json')

async function readProducts(): Promise<Product[]> {
  const raw = await fs.readFile(DATA_PATH, 'utf-8')
  return JSON.parse(raw)
}

async function writeProducts(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2), 'utf-8')
}

// ─── GET /api/products ────────────────────────────────────────────────────────
// Optional query params: ?category=sofas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let products = await readProducts()

    if (category && category !== 'all-products') {
      products = products.filter((p) => p.category === category)
    }

    return NextResponse.json(products)
  } catch {
    return NextResponse.json(
      { error: 'Failed to read products' },
      { status: 500 }
    )
  }
}

// ─── POST /api/products ───────────────────────────────────────────────────────
// Body: Omit<Product, 'id'> (id is auto-generated)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const products = await readProducts()

    // Validate required fields
    const required = ['name', 'price', 'category', 'image'] as const
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const newProduct: Product = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name: body.name.toUpperCase(),
      price: Number(body.price),
      colors: body.colors || [{ hex: '#9E9E9E', name: 'Gray' }],
      image: body.image,
      isNew: body.isNew ?? false,
      category: body.category,
      description:
        body.description ||
        "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
    }

    products.push(newProduct)
    await writeProducts(products)

    return NextResponse.json(newProduct, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
