import { HeroSection } from "@/components/home/HeroSection";
import { AboutPreviewSection } from "@/components/home/AboutPreviewSection";
import { StatisticsSection } from "@/components/shared/StatisticsSection";
import { ServicesPreviewSection } from "@/components/home/ServicesPreviewSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { WorkingProcessSection } from "@/components/home/WorkingProcessSection";
import { QuoteAndTestimonialSection } from "@/components/home/QuoteAndTestimonialSection";
import { CaseStudiesPreviewSection } from "@/components/home/CaseStudiesPreviewSection";
import { FaqPreviewSection } from "@/components/home/FaqPreviewSection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { NewsletterTrackingCTA } from "@/components/home/NewsletterTrackingCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      
      {/* 2. Partner Logos Section */}
      <section className="py-12 border-b border-brand-border bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <p className="text-center text-sm font-bold text-brand-text-muted uppercase tracking-wider mb-8">Trusted by global companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['LogisticPro', 'FreightLine', 'TransCargo', 'TruckingHub', 'FastShip', 'GlobalPort'].map((partner, i) => (
              <div key={i} className="text-2xl font-heading font-extrabold text-brand-primary" title="Trusted Partner">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutPreviewSection />
      
      <StatisticsSection />

      <ServicesPreviewSection />
      <WhyChooseUsSection />
      <WorkingProcessSection />
      <QuoteAndTestimonialSection />
      <CaseStudiesPreviewSection />
      <FaqPreviewSection />
      <BlogPreviewSection />
      <NewsletterTrackingCTA />
    </>
  );
}
