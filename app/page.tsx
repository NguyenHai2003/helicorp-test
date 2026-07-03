import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { SizeGuide } from '@/components/size-guide'
import { SpecsSection } from '@/components/specs-section'
import { RegistrationForm } from '@/components/registration-form'
import { Footer } from '@/components/footer'
import { FloatingChat } from '@/components/floating-chat'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <SizeGuide />
      <SpecsSection />
      <RegistrationForm />
      <Footer />
      <FloatingChat />
    </main>
  )
}
