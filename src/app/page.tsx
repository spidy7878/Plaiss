import { Header } from '@/components/header'
import { HeroSection } from '@/features/home/hero-section'
import { CategoriesSection } from '@/features/home/categories-section'
import { GetItAllSection } from '@/features/home/get-it-all-section'
import { EngineSection } from '@/features/home/engine-section'
import { PartnersSection } from '@/features/home/partners-section'
import { TestimonialsSection } from '@/features/home/testimonials-section'

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <GetItAllSection />
      <EngineSection />
      <PartnersSection />
      <TestimonialsSection />
    </main>
  )
}
