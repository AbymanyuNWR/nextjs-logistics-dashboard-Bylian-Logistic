"use client";

import { useState } from "react";
import { Package, Truck, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Receive Packages",
    icon: Package,
    description: "Our team receives and checks your packages to ensure every shipment is ready for safe transportation."
  },
  {
    id: 2,
    title: "Transport Packages",
    icon: Truck,
    description: "We transport your goods using reliable vehicles and optimized routes to maintain delivery efficiency."
  },
  {
    id: 3,
    title: "Deliver Packages",
    icon: CheckCircle,
    description: "Packages are delivered safely to the final destination with proper tracking and delivery confirmation."
  }
];

export function WorkingProcessSection() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-24 bg-brand-bg-light">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-white border border-brand-border rounded-full px-4 py-1.5 mb-6">
            <span className="text-brand-accent text-sm font-bold tracking-wide uppercase">Working Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-primary leading-tight">
            How we <span className="text-brand-accent">operate</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center justify-between relative">
          {/* Animated line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-brand-border z-0">
             <div className="absolute top-0 left-0 h-full bg-brand-accent transition-all duration-500" style={{ width: `${((activeStep - 1) / 2) * 100}%` }}></div>
          </div>

          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <div 
                key={step.id} 
                className="relative z-10 flex flex-col items-center text-center cursor-pointer group w-full lg:w-1/3"
                onClick={() => setActiveStep(step.id)}
              >
                <div className={cn(
                  "w-24 h-24 rounded-full flex items-center justify-center border-4 transition-all duration-300 mb-6 relative bg-white",
                  isActive ? "border-brand-accent text-brand-accent shadow-xl scale-110" : "border-brand-border text-brand-primary group-hover:border-brand-accent/50 group-hover:text-brand-accent/80"
                )}>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm">
                    0{step.id}
                  </div>
                  <Icon size={40} />
                </div>
                <h3 className={cn(
                  "text-2xl font-heading font-bold mb-4 transition-colors",
                  isActive ? "text-brand-accent" : "text-brand-primary"
                )}>{step.title}</h3>
                <div className={cn(
                  "overflow-hidden transition-all duration-500",
                  isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0 lg:max-h-40 lg:opacity-100"
                )}>
                  <p className={cn(
                    "text-brand-text-muted px-4",
                    !isActive && "lg:opacity-50"
                  )}>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
