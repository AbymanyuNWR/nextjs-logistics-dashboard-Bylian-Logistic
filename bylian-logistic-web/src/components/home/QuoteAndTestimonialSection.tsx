"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { testimonials } from "@/data/testimonials";

import { useAdminState } from "@/context/AdminStateContext";

export function QuoteAndTestimonialSection() {
  const { addQuote } = useAdminState();
  // Quote Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    destination: "",
    freightType: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.serviceType || !formData.freightType) {
      setFormStatus("error");
      return;
    }
    setFormStatus("loading");
    
    setTimeout(() => {
      addQuote({
        name: formData.name,
        company: "Individual (Homepage Quick)",
        email: formData.email,
        phone: formData.phone || "-",
        serviceType: formData.serviceType,
        freightType: formData.freightType,
        cargoDescription: formData.message || "Homepage quick submission",
        weight: "Not specified",
        volume: "Not specified",
        quantity: "1 Lot",
        pickupAddress: "Not specified",
        destinationAddress: formData.destination || "Not specified",
        preferredPickupDate: new Date().toISOString().substring(0, 10),
        deliveryUrgency: "Standard"
      });
      
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", serviceType: "", destination: "", freightType: "", message: "" });
      
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Testimonial Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-24 bg-brand-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000')] opacity-5 mix-blend-overlay bg-cover bg-center"></div>
      
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Request a Quote Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-heading font-bold text-brand-primary mb-2">Request A Quote</h3>
            <p className="text-brand-text-muted mb-8">Fill out the form below and we will contact you shortly.</p>
            
            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="name" placeholder="Name *" value={formData.name} onChange={handleInputChange} required />
                <Input name="email" type="email" placeholder="Email *" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} />
                <Input name="destination" placeholder="Destination" value={formData.destination} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select name="serviceType" value={formData.serviceType} onChange={handleInputChange} required className="flex h-12 w-full rounded-lg border border-brand-border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary text-brand-text-dark">
                  <option value="" disabled>Service Type *</option>
                  <option value="Land Freight">Land Freight</option>
                  <option value="Maritime Freight">Maritime Freight</option>
                  <option value="Train Freight">Train Freight</option>
                  <option value="Air Cargo Support">Air Cargo Support</option>
                  <option value="Warehousing">Warehousing</option>
                  <option value="Last Mile Delivery">Last Mile Delivery</option>
                </select>
                <select name="freightType" value={formData.freightType} onChange={handleInputChange} required className="flex h-12 w-full rounded-lg border border-brand-border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary text-brand-text-dark">
                  <option value="" disabled>Freight Type *</option>
                  <option value="General Cargo">General Cargo</option>
                  <option value="Fragile Goods">Fragile Goods</option>
                  <option value="Frozen Food">Frozen Food</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <textarea name="message" placeholder="Message" value={formData.message} onChange={handleInputChange} className="flex min-h-[100px] w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary resize-y"></textarea>
              
              {formStatus === "error" && <p className="text-brand-error text-sm font-medium">Please fill in all required fields.</p>}
              {formStatus === "success" && <p className="text-brand-success text-sm font-medium bg-brand-success/10 p-3 rounded-lg">Thank you! Your quote request has been submitted. Our team will contact you soon.</p>}
              
              <Button type="submit" size="lg" className="w-full h-14 text-base" disabled={formStatus === "loading"}>
                {formStatus === "loading" ? "Sending..." : "Get A Quote"}
              </Button>
            </form>
          </div>

          {/* Testimonial Carousel */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 self-start">
              <span className="text-brand-accent text-sm font-bold tracking-wide uppercase">Client Feedback</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-12">
              What our clients say <span className="text-brand-accent">about us</span>
            </h2>

            <div className="relative">
              <Quote size={80} className="absolute -top-6 -left-6 text-white/10 z-0" />
              <div className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-brand-warning fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="flex items-center justify-between border-t border-white/20 pt-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-brand-accent"
                    />
                    <div>
                      <h4 className="text-white font-heading font-bold text-lg">{testimonials[currentIndex].name}</h4>
                      <p className="text-brand-bg-light text-sm">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={prevTestimonial} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-accent transition-colors">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextTestimonial} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-accent transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
