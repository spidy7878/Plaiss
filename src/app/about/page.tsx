import { Header } from '@/components/header'
import { HeroSection } from '@/features/home/hero-section'
import AnimatedParagraph from '@/components/AnimatedParagraph'
import { FooterSection } from '@/features/home/footer-section'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Header />
      <HeroSection />
      <AnimatedParagraph />
      <FooterSection />
    </main>
  )
}
