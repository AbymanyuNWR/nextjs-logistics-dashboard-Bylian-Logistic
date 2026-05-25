"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useAdminState } from "@/context/AdminStateContext";

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { services } = useAdminState();
  const service = services.find(s => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <>
      <PageHeader 
        title={service.title} 
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title }
        ]} 
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div className="rounded-3xl overflow-hidden aspect-[16/9]">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>
              
              <div>
                <h2 className="text-3xl font-heading font-bold text-brand-primary mb-4">Service Overview</h2>
                <p className="text-lg text-brand-text-muted leading-relaxed">{service.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-brand-bg-light p-8 rounded-3xl border border-brand-border">
                  <h3 className="text-xl font-heading font-bold text-brand-primary mb-6">Key Benefits</h3>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle2 size={20} className="text-brand-accent shrink-0 mt-0.5" />
                        <span className="text-brand-text-dark font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-brand-bg-light p-8 rounded-3xl border border-brand-border">
                  <h3 className="text-xl font-heading font-bold text-brand-primary mb-6">What is Included</h3>
                  <ul className="space-y-4">
                    {service.included.map((item, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle2 size={20} className="text-brand-accent shrink-0 mt-0.5" />
                        <span className="text-brand-text-dark font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-heading font-bold text-brand-primary mb-6">How It Works</h3>
                <div className="space-y-6">
                  {service.steps.map((step, i) => (
                    <div key={i} className="flex items-center space-x-6 p-6 border border-brand-border rounded-2xl bg-white shadow-sm hover:border-brand-accent transition-colors">
                      <div className="w-12 h-12 rounded-full bg-brand-bg-light text-brand-accent flex items-center justify-center font-heading font-bold text-xl shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-lg font-medium text-brand-primary">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-heading font-bold text-brand-primary mb-6">Frequently Asked Questions</h3>
                <Accordion items={service.faqs.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-brand-primary rounded-3xl p-8 text-white shadow-xl sticky top-32">
                <h3 className="text-2xl font-heading font-bold mb-4">Need this service?</h3>
                <p className="text-white/80 mb-8">Get a customized quote for your {service.title.toLowerCase()} needs today.</p>
                <Button size="lg" className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white" asChild>
                  <Link href={`/request-quote?service=${service.slug}`}>Request This Service</Link>
                </Button>
                <div className="mt-6 text-center border-t border-white/20 pt-6">
                  <p className="text-sm text-white/60 mb-2">Or talk to an expert</p>
                  <a href="tel:+6281234567890" className="text-xl font-bold hover:text-brand-accent transition-colors">+62 812 3456 7890</a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-brand-primary mb-4">Related Services</h3>
                <div className="space-y-4">
                  {relatedServices.map(s => (
                    <Link key={s.id} href={`/services/${s.slug}`} className="flex items-center space-x-4 p-4 border border-brand-border rounded-xl hover:bg-brand-bg-light transition-colors group">
                      <img src={s.image} alt={s.title} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{s.title}</h4>
                        <span className="text-sm flex items-center text-brand-text-muted mt-1 group-hover:text-brand-accent transition-colors">
                          View details <ArrowRight size={14} className="ml-1" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
