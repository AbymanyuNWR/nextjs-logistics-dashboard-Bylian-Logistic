import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/faqs";

export function FaqPreviewSection() {
  // Get 4 top FAQs for the homepage
  const homepageFaqs = faqs.slice(0, 4);

  return (
    <section className="py-24 bg-brand-bg-light">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col items-start space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white border border-brand-border rounded-full px-4 py-1.5">
              <span className="text-brand-accent text-sm font-bold tracking-wide uppercase">General Questions</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-primary leading-tight">
              Frequently asked <span className="text-brand-accent">questions</span>
            </h2>
            <p className="text-lg text-brand-text-muted leading-relaxed">
              Find answers to common questions about our logistics services, pricing, tracking, and more. If you can't find what you're looking for, feel free to contact us.
            </p>
            <div className="pt-4">
              <Button size="lg" asChild>
                <Link href="/faq">View All FAQ</Link>
              </Button>
            </div>
            
            {/* Decorative Image */}
            <div className="mt-8 rounded-3xl overflow-hidden w-full max-w-md hidden lg:block border-4 border-white shadow-xl relative">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" 
                alt="Logistics team reviewing data" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-brand-primary/20"></div>
            </div>
          </div>
          
          <div className="w-full">
            <Accordion items={homepageFaqs} allowMultiple={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
