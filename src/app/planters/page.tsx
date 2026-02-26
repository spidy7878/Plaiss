import { Header } from '@/components/header'
import { FooterSection } from '@/features/home/footer-section'
import { PlantersHeroSection } from '@/features/planters/planters-hero-section'
import { PlantersGridSection } from '@/features/planters/planters-grid-section'

export default function PlantersPage() {
  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Header />
      <PlantersHeroSection />
      <PlantersGridSection />
      <FooterSection />
    </main>
  )
}
