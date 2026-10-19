import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { WhyChoose } from '@/components/why-choose'
import { IdealFor } from '@/components/ideal-for'
import { About } from '@/components/about'
import { HowToUse } from '@/components/how-to-use'
import { ProductGuide } from '@/components/product-guide'
import { Comparison } from '@/components/comparison'
import { Certifications } from '@/components/certifications'
import { EnquiryForm } from '@/components/enquiry-form'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main id="main" className="relative min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <WhyChoose />
      <IdealFor />
      <About />
      <HowToUse />
      <ProductGuide />
      <Comparison />
      <Certifications />
      <EnquiryForm />
      <SiteFooter />
    </main>
  )
}
