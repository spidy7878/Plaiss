import { Header } from '@/components/header'
import { AboutHeroSection } from '@/features/about/about-hero-section'
import AnimatedParagraph from '@/components/AnimatedParagraph'
import { FooterSection } from '@/features/home/footer-section'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Header />
      <AboutHeroSection />
      <AnimatedParagraph />
      <FooterSection />
    </main>
  )
}
