import { Header } from '@/components/header'
import { HeroSection } from '@/features/home/hero-section'
import { CategoriesSection } from '@/features/home/categories-section'
import { GetItAllSection } from '@/features/home/get-it-all-section'
import { EngineSection } from '@/features/home/engine-section'
import { PartnersSection } from '@/features/home/partners-section'
import { FollowUsSection } from '@/features/home/follow-us-section'
import { FooterSection } from '@/features/home/footer-section'

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <GetItAllSection />
      <EngineSection />
      <PartnersSection />
      <FollowUsSection />
      <FooterSection />
    </main>
  )
}
