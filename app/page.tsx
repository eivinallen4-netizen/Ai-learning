// NOTE: Landing page composition that stitches together all marketing sections.
import Footer from '@/components/Footer'
import PageScribbles from '@/components/PageScribbles'
import {
  BeforeAfterSection,
  ComparisonTableSection,
  FaqSection,
  FeatureBreakdownSection,
  FinalCtaSection,
  HeroSection,
  HowItWorksSection,
  PassiveActiveSection,
  ProblemSection,
  RetentionDashboardSection,
  SocialProofSection,
  WhoItsForSection,
} from '@/components/sections'
import { Separator } from '@/components/ui/separator'

// NOTE: `Home` encapsulates reusable logic for this module.
export default function Home() {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      <PageScribbles preset='marketing' />
      <main className='relative z-10'>
        <HeroSection />
        <Separator className='mx-auto max-w-6xl' />
        <ProblemSection />
        <PassiveActiveSection />
        <HowItWorksSection />
        <FeatureBreakdownSection />
        
        <RetentionDashboardSection />
        <BeforeAfterSection />
        <SocialProofSection />
        <ComparisonTableSection />
        <WhoItsForSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  )
}
