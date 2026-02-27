import { Header } from '@/components/header'
import { FooterSection } from '@/features/home/footer-section'
import { CategoryClient } from '@/features/category/category-client'
import { getAllProducts, getAllCategories } from '@/lib/products'

// Dynamic rendering — products are mutable data
export const dynamic = 'force-dynamic'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const [allProducts, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ])

  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Header />
      <CategoryClient
        key={category}
        category={category}
        products={allProducts}
        categories={categories}
      />
      <FooterSection />
    </main>
  )
}
