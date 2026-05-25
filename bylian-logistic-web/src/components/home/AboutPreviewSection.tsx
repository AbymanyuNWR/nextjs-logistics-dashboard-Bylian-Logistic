import Link from "next/link";
import { CheckCircle2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutPreviewSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8ed7c663b0?auto=format&fit=crop&q=80&w=800" 
                alt="Warehouse worker handling packages safely" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 bg-brand-accent text-white p-8 rounded-3xl z-20 shadow-xl hidden md:block hover:-translate-y-2 transition-transform duration-300">
              <p className="text-5xl font-heading font-bold mb-2">20+</p>
              <p className="text-lg font-medium leading-snug">Years of Experience in Logistics</p>
            </div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[radial-gradient(circle,#003F49_2px,transparent_2px)] [background-size:16px_16px] opacity-10 z-0"></div>
          </div>
          <div className="flex flex-col items-start space-y-6">
            <div className="inline-flex items-center space-x-2 bg-brand-bg-light border border-brand-border rounded-full px-4 py-1.5">
              <span className="text-brand-accent text-sm font-bold tracking-wide uppercase">About Company</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-primary leading-tight">
              We’ll keep your items <span className="text-brand-accent">damage free</span>
            </h2>
            <p className="text-lg text-brand-text-muted leading-relaxed">
              Bylian Logistic Transport Services is a professional logistics company providing integrated transportation, warehousing, cargo, freight, and distribution solutions. We help businesses move goods safely, efficiently, and on schedule.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4">
              {[
                "Freight Forwarding", "Road Transportation", 
                "Warehouse Storage", "Cargo Handling", 
                "Last Mile Delivery", "Global Shipping Support"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-brand-bg-light text-brand-accent flex items-center justify-center shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="font-semibold text-brand-text-dark">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-brand-border w-full">
              <Button size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-brand-bg-light flex items-center justify-center text-brand-accent">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <p className="text-sm text-brand-text-muted font-medium">Need Help?</p>
                  <a href="tel:+6281234567890" className="text-lg font-bold text-brand-primary hover:text-brand-accent transition-colors">+62 812 3456 7890</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
