"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe2, PackageSearch, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const reasons = [
  {
    icon: Globe2,
    title: "Global Logistics Operation",
    description: "We operate across major international ports and trade routes to ensure your cargo reaches anywhere in the world."
  },
  {
    icon: PackageSearch,
    title: "Modern Warehousing Technique",
    description: "Our state-of-the-art warehouses are equipped with advanced inventory management systems for secure storage."
  },
  {
    icon: Truck,
    title: "International Transportation",
    description: "We provide seamless intermodal transportation combining sea, air, and land freight for maximum efficiency."
  }
];

export function WhyChooseUsSection() {
  const [activeReason, setActiveReason] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start space-y-6">
            <div className="inline-flex items-center space-x-2 bg-brand-bg-light border border-brand-border rounded-full px-4 py-1.5">
              <span className="text-brand-accent text-sm font-bold tracking-wide uppercase">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-primary leading-tight">
              Why we are considered the <span className="text-brand-accent">best in business</span>
            </h2>
            <div className="flex flex-col w-full mt-8 space-y-4">
              {reasons.map((reason, i) => {
                const Icon = reason.icon;
                const isActive = activeReason === i;
                return (
                  <div 
                    key={i} 
                    className="flex flex-col group cursor-pointer border-b border-brand-border pb-4 last:border-0"
                    onClick={() => setActiveReason(isActive ? null : i)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors",
                        isActive ? "bg-brand-accent text-white" : "bg-brand-bg-light text-brand-primary group-hover:bg-brand-accent group-hover:text-white"
                      )}>
                        <Icon size={24} />
                      </div>
                      <h3 className={cn(
                        "text-xl font-heading font-bold transition-colors",
                        isActive ? "text-brand-accent" : "text-brand-primary"
                      )}>
                        {reason.title}
                      </h3>
                    </div>
                    <div className={cn(
                      "overflow-hidden transition-all duration-300 pl-16",
                      isActive ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
                    )}>
                      <p className="text-brand-text-muted">{reason.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/about">Explore Company</Link>
            </Button>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800" 
              alt="Containers at port" 
              className="rounded-3xl shadow-2xl object-cover w-full aspect-[4/5] lg:aspect-square"
            />
            {/* Safety CTA Banner inline */}
            <div className="absolute -left-8 md:-left-16 bottom-10 bg-brand-primary p-6 md:p-8 rounded-3xl shadow-2xl flex items-center space-x-6 max-w-sm">
              <div>
                <p className="text-white font-heading font-bold text-lg leading-snug mb-4">We ensure safe transportation & delivery</p>
                <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white hover:text-brand-primary" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
