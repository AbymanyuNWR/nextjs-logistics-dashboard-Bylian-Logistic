"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Calculator, CheckCircle2, Package, Send } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminState } from "@/context/AdminStateContext";

function RequestQuoteForm() {
  const { addQuote } = useAdminState();
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    serviceType: "",
    freightType: "",
    origin: "",
    destination: "",
    weight: "",
    dimensions: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [generatedId, setGeneratedId] = useState("");

  useEffect(() => {
    // Map slug to readable service name if possible
    const serviceMap: Record<string, string> = {
      "land-freight": "Land Freight",
      "maritime-freight": "Maritime Freight",
      "train-freight": "Train Freight",
      "air-cargo-support": "Air Cargo Support",
      "warehousing": "Warehousing",
      "last-mile-delivery": "Last Mile Delivery"
    };

    if (initialService && serviceMap[initialService]) {
      setFormData(prev => ({ ...prev, serviceType: serviceMap[initialService] }));
    }
  }, [initialService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.serviceType || !formData.freightType) {
      setFormStatus("error");
      return;
    }
    setFormStatus("loading");
    
    setTimeout(() => {
      const quoteId = addQuote({
        name: formData.name,
        company: formData.company || "Individual",
        email: formData.email,
        phone: formData.phone || "-",
        serviceType: formData.serviceType,
        freightType: formData.freightType,
        cargoDescription: formData.message || "No description provided",
        weight: formData.weight || "Not specified",
        volume: formData.dimensions || "Not specified",
        quantity: "1 Lot",
        pickupAddress: formData.origin || "Not specified",
        destinationAddress: formData.destination || "Not specified",
        preferredPickupDate: new Date().toISOString().substring(0, 10),
        deliveryUrgency: "Standard"
      });
      
      setGeneratedId(quoteId);
      setFormStatus("success");
      setFormData({ 
        name: "", company: "", email: "", phone: "", serviceType: "", 
        freightType: "", origin: "", destination: "", weight: "", dimensions: "", message: "" 
      });
      
      setTimeout(() => setFormStatus("idle"), 12000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (formStatus === "success") {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-lg border border-brand-border text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-brand-success/10 text-brand-success rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-heading font-bold text-brand-primary mb-2">Quote Request Received!</h3>
        <p className="text-brand-accent font-mono font-bold text-lg mb-6 bg-brand-accent/10 border border-brand-accent/20 py-2.5 px-4 rounded-xl inline-block">Quote ID: {generatedId}</p>
        <p className="text-brand-text-muted text-lg mb-8 leading-relaxed">
          Thank you for requesting a quote. Our logistics experts are reviewing your requirements and will contact you via email or phone within 1 business day with a customized solution.
        </p>
        <Button onClick={() => setFormStatus("idle")} size="lg">Request Another Quote</Button>
      </div>
    );
  }

  // Instant Quote Estimator Logic
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [priceBreakdown, setPriceBreakdown] = useState({
    baseRate: 0,
    weightRate: 0,
    handlingFee: 0,
    distanceFee: 0,
  });

  useEffect(() => {
    // Parse weight value (strip non-numeric characters)
    const rawWeight = parseFloat(formData.weight.replace(/[^0-9.]/g, ""));
    const weightVal = isNaN(rawWeight) ? 0 : rawWeight;

    // Base Rates & Rate per Kg
    let base = 0;
    let ratePerKg = 0;
    switch (formData.serviceType) {
      case "Land Freight":
        base = 650000;
        ratePerKg = 3500;
        break;
      case "Maritime Freight":
        base = 2500000;
        ratePerKg = 1500;
        break;
      case "Train Freight":
        base = 900000;
        ratePerKg = 2500;
        break;
      case "Air Cargo Support":
        base = 4500000;
        ratePerKg = 28000;
        break;
      case "Warehousing":
        base = 400000;
        ratePerKg = 1000;
        break;
      case "Last Mile Delivery":
        base = 75000;
        ratePerKg = 5000;
        break;
      default:
        base = 0;
        ratePerKg = 0;
    }

    if (base === 0) {
      setEstimatedPrice(null);
      return;
    }

    const weightCost = weightVal * ratePerKg;

    // Freight Type handling surcharge percentage
    let surchargePct = 0;
    switch (formData.freightType) {
      case "Fragile Goods":
        surchargePct = 0.20;
        break;
      case "Frozen Food":
        surchargePct = 0.35;
        break;
      case "Electronics":
        surchargePct = 0.15;
        break;
      case "Medicine":
        surchargePct = 0.25;
        break;
      default:
        surchargePct = 0;
    }

    const baseAndWeight = base + weightCost;
    const handling = baseAndWeight * surchargePct;

    // Simulated Distance calculation based on route names
    let distanceCost = 0;
    if (formData.origin && formData.destination) {
      const lenSum = formData.origin.length + formData.destination.length;
      distanceCost = lenSum * 15000;
    }

    const total = baseAndWeight + handling + distanceCost;
    setPriceBreakdown({
      baseRate: base,
      weightRate: weightCost,
      handlingFee: handling,
      distanceFee: distanceCost
    });
    setEstimatedPrice(total);
  }, [formData.serviceType, formData.freightType, formData.weight, formData.origin, formData.destination]);

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* Left Column: Form */}
      <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-brand-border">
        <div className="mb-8 flex items-center space-x-4 border-b border-brand-border pb-6">
          <div className="w-12 h-12 bg-brand-bg-light text-brand-accent rounded-xl flex items-center justify-center">
            <Calculator size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-heading font-bold text-brand-primary">Calculate Your Cost</h3>
            <p className="text-brand-text-muted text-sm font-medium">Provide details below for an accurate quote.</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Personal Details */}
          <div>
            <h4 className="text-base font-bold text-brand-primary mb-4 flex items-center uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs mr-3 font-mono">1</span>
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name="name" placeholder="Full Name *" value={formData.name} onChange={handleInputChange} required className="h-12" />
              <Input name="company" placeholder="Company Name" value={formData.company} onChange={handleInputChange} className="h-12" />
              <Input name="email" type="email" placeholder="Email Address *" value={formData.email} onChange={handleInputChange} required className="h-12" />
              <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="h-12" />
            </div>
          </div>

          {/* Shipment Details */}
          <div>
            <h4 className="text-base font-bold text-brand-primary mb-4 flex items-center uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs mr-3 font-mono">2</span>
              Shipment Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <select name="serviceType" value={formData.serviceType} onChange={handleInputChange} required className="flex h-12 w-full rounded-lg border border-brand-border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary text-brand-text-dark font-medium">
                <option value="" disabled>Select Service Type *</option>
                <option value="Land Freight">Land Freight</option>
                <option value="Maritime Freight">Maritime Freight</option>
                <option value="Train Freight">Train Freight</option>
                <option value="Air Cargo Support">Air Cargo Support</option>
                <option value="Warehousing">Warehousing</option>
                <option value="Last Mile Delivery">Last Mile Delivery</option>
              </select>
              <select name="freightType" value={formData.freightType} onChange={handleInputChange} required className="flex h-12 w-full rounded-lg border border-brand-border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary text-brand-text-dark font-medium">
                <option value="" disabled>Select Freight Type *</option>
                <option value="General Cargo">General Cargo</option>
                <option value="Fragile Goods">Fragile Goods</option>
                <option value="Frozen Food">Frozen Food</option>
                <option value="Electronics">Electronics</option>
                <option value="Medicine">Medicine</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input name="origin" placeholder="City of Origin / Pickup Location" value={formData.origin} onChange={handleInputChange} className="h-12" />
              <Input name="destination" placeholder="Destination City" value={formData.destination} onChange={handleInputChange} className="h-12" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name="weight" placeholder="Total Weight (e.g. 500 kg)" value={formData.weight} onChange={handleInputChange} className="h-12" />
              <Input name="dimensions" placeholder="Dimensions (L x W x H in cm)" value={formData.dimensions} onChange={handleInputChange} className="h-12" />
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h4 className="text-base font-bold text-brand-primary mb-4 flex items-center uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs mr-3 font-mono">3</span>
              Additional Information
            </h4>
            <textarea 
              name="message" 
              placeholder="Please provide any additional details, special handling requirements, or questions..." 
              value={formData.message} 
              onChange={handleInputChange} 
              className="flex min-h-[120px] w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent resize-y"
            ></textarea>
          </div>
          
          {formStatus === "error" && <p className="text-brand-error text-sm font-medium">Please fill in all required fields marked with (*).</p>}
          
          <Button type="submit" size="lg" className="w-full h-14 text-base mt-4" disabled={formStatus === "loading"}>
            {formStatus === "loading" ? "Submitting Request..." : (
              <>Submit Quote Request <Send size={18} className="ml-2" /></>
            )}
          </Button>
        </form>
      </div>

      {/* Right Column: Floating Instant Price Estimator Widget */}
      <div className="lg:col-span-1 bg-slate-950 p-8 rounded-3xl border border-slate-850 shadow-xl text-white sticky top-24 relative overflow-hidden">
        {/* Decorative Sonar Radar details */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full filter blur-[50px] pointer-events-none"></div>

        <div className="relative z-10">
          <h4 className="text-lg font-heading font-bold text-white flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse shrink-0"></span>
            Instant Cost Estimator
          </h4>
          <p className="text-xs text-slate-400 mb-6 font-medium leading-relaxed">Live cost simulation based on active inputs.</p>

          {estimatedPrice !== null ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              
              {/* Massive Total Price Display */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-1">Estimated Cargo Cost</span>
                <h3 className="text-3xl font-extrabold text-brand-accent tracking-tight">{formatIDR(estimatedPrice)}</h3>
              </div>

              {/* Price Breakdown List */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-sm font-semibold border-b border-slate-900 pb-2.5">
                  <span className="text-slate-400">Base Freight Rate</span>
                  <span className="text-white">{formatIDR(priceBreakdown.baseRate)}</span>
                </div>
                
                {priceBreakdown.weightRate > 0 && (
                  <div className="flex justify-between items-center text-sm font-semibold border-b border-slate-900 pb-2.5">
                    <span className="text-slate-400">Weight Surcharge</span>
                    <span className="text-white">{formatIDR(priceBreakdown.weightRate)}</span>
                  </div>
                )}

                {priceBreakdown.handlingFee > 0 && (
                  <div className="flex justify-between items-center text-sm font-semibold border-b border-slate-900 pb-2.5">
                    <span className="text-slate-400">Special Handling ({formData.freightType.split(" ")[0]})</span>
                    <span className="text-brand-accent font-bold">+{formatIDR(priceBreakdown.handlingFee)}</span>
                  </div>
                )}

                {priceBreakdown.distanceFee > 0 && (
                  <div className="flex justify-between items-center text-sm font-semibold border-b border-slate-900 pb-2.5">
                    <span className="text-slate-400">Transit Distance Charge</span>
                    <span className="text-white">{formatIDR(priceBreakdown.distanceFee)}</span>
                  </div>
                )}
              </div>

              {/* Live Info details */}
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-850/50 text-[11px] text-slate-500 leading-relaxed font-semibold">
                * Note: This is an instant simulation estimate. The official formal quote will be evaluated and finalized by our support desk after request submission.
              </div>

            </div>
          ) : (
            <div className="h-48 bg-slate-900/40 rounded-2xl border border-slate-850 flex flex-col items-center justify-center p-6 text-center text-slate-500 border-dashed animate-pulse">
              <Calculator size={36} className="text-slate-600 mb-3" />
              <p className="text-xs font-bold leading-normal">Please select a Service Type to view instant cost estimate breakdowns.</p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default function RequestQuotePage() {
  return (
    <>
      <PageHeader 
        title="Request A Quote" 
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Request Quote" }
        ]} 
      />

      <section className="py-24 bg-brand-bg-light">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-primary mb-6">
              Get a Customized Logistics Plan
            </h2>
            <p className="text-lg text-brand-text-muted max-w-3xl mx-auto">
              Every business has unique logistics needs. Fill out the form below with your shipment details, and our experts will design a tailored, cost-effective solution for you.
            </p>
          </div>

          <Suspense fallback={<div className="h-96 flex items-center justify-center"><p>Loading form...</p></div>}>
            <RequestQuoteForm />
          </Suspense>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-brand-border text-center">
              <div className="w-12 h-12 mx-auto bg-brand-bg-light text-brand-accent rounded-full flex items-center justify-center mb-4">
                <Package size={20} />
              </div>
              <h4 className="font-bold text-brand-primary mb-2">Transparent Pricing</h4>
              <p className="text-sm text-brand-text-muted">No hidden fees. We provide clear, comprehensive quotes.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-brand-border text-center">
              <div className="w-12 h-12 mx-auto bg-brand-bg-light text-brand-accent rounded-full flex items-center justify-center mb-4">
                <Send size={20} />
              </div>
              <h4 className="font-bold text-brand-primary mb-2">Fast Response</h4>
              <p className="text-sm text-brand-text-muted">Our team will get back to you within 24 hours guaranteed.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-brand-border text-center">
              <div className="w-12 h-12 mx-auto bg-brand-bg-light text-brand-accent rounded-full flex items-center justify-center mb-4">
                <Calculator size={20} />
              </div>
              <h4 className="font-bold text-brand-primary mb-2">Flexible Options</h4>
              <p className="text-sm text-brand-text-muted">We offer various routes and methods to fit your budget.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
