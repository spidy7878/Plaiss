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

// ─── GET /api/products/[id] ──────────────────────────────────────────────────
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const products = await readProducts()
    const product = products.find((p) => p.id === Number(id))

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch {
    return NextResponse.json(
      { error: 'Failed to read product' },
      { status: 500 }
    )
  }
}

// ─── PUT /api/products/[id] ──────────────────────────────────────────────────
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const products = await readProducts()
    const index = products.findIndex((p) => p.id === Number(id))

    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const updated: Product = {
      ...products[index],
      name: body.name?.toUpperCase() ?? products[index].name,
      price:
        body.price !== undefined ? Number(body.price) : products[index].price,
      colors: body.colors ?? products[index].colors,
      image: body.image ?? products[index].image,
      isNew: body.isNew !== undefined ? body.isNew : products[index].isNew,
      category: body.category ?? products[index].category,
      description: body.description ?? products[index].description,
    }

    products[index] = updated
    await writeProducts(products)

    return NextResponse.json(updated)
  } catch {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// ─── DELETE /api/products/[id] ───────────────────────────────────────────────
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const products = await readProducts()
    const filtered = products.filter((p) => p.id !== Number(id))

    if (filtered.length === products.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    await writeProducts(filtered)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
