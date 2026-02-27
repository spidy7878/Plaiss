import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { FooterSection } from '@/features/home/footer-section'
import { ProductDetailClient } from '@/features/product/product-detail-client'
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  toSlug,
} from '@/lib/products'

// Dynamic rendering — products are mutable data
export const dynamic = 'force-dynamic'

// ─── Static params for pre-rendering (optional, works for known products) ────
export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({
    category: p.category,
    product: toSlug(p.name),
  }))
}

// ─── SEO metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { category, product: productSlug } = await params
  const product = await getProductBySlug(category, productSlug)

  if (!product) return {}

  return {
    title: `${product.name} – Plaiss`,
    description: product.description,
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { category, product: productSlug } = await params
  const product = await getProductBySlug(category, productSlug)

  if (!product) notFound()

  const relatedProducts = await getRelatedProducts(product, 6)

  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Header />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
      <FooterSection />
    </main>
  )
}
