import Link from "next/link";
import { ArrowRight, CheckCircle2, PhoneCall, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8ed7c663b0?auto=format&fit=crop&q=80&w=2000" 
          alt="Cargo ship at international port" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-primary/80 bg-gradient-to-r from-brand-primary/95 to-brand-primary/70"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-10">
        <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
      <div className="container mx-auto max-w-7xl px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
              <span className="text-white text-sm font-semibold tracking-wide uppercase">Logistics & Transport Solution</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Welcome To Bylian <span className="text-brand-accent">Logistic</span> Transport Services
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              We provide reliable, secure, and efficient logistics solutions for businesses that need fast transportation, cargo delivery, warehousing, and global freight services.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Button size="lg" className="group" asChild>
                <Link href="/about">
                  Discover More
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white hover:text-brand-primary" asChild>
                <Link href="/request-quote">Get A Quote</Link>
              </Button>
              <Link href="/track-shipment" className="text-white font-medium hover:text-brand-accent underline underline-offset-4 decoration-white/30 transition-all text-sm ml-2 hidden sm:block">
                Track Shipment
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative h-full min-h-[400px] animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <div className="absolute right-0 bottom-[-50px] w-full max-w-[600px] z-20">
              <img 
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800" 
                alt="Logistics truck delivering cargo packages" 
                className="rounded-2xl shadow-2xl border-4 border-white/10"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center space-x-4">
                <div className="w-14 h-14 bg-brand-bg-light text-brand-accent rounded-full flex items-center justify-center">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <p className="font-heading font-bold text-2xl text-brand-primary leading-none">100%</p>
                  <p className="text-sm font-medium text-brand-text-muted mt-1">Safe Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
