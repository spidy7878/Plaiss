import { Header } from '@/components/header'
import { FooterSection } from '@/features/home/footer-section'
import { CategoryClient } from '@/features/category/category-client'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />
      <CategoryClient key={category} category={category} />
      <FooterSection />
    </main>
  )
}
