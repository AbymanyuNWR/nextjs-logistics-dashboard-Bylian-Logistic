"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterTrackingCTA() {
  const [trackingId, setTrackingId] = useState("");
  const [trackingError, setTrackingError] = useState("");
  const router = useRouter();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) {
      setTrackingError("Please enter your tracking ID.");
      return;
    }
    setTrackingError("");
    router.push(`/track-shipment?tracking=${trackingId}`);
  };

  return (
    <section className="bg-white border-t border-brand-border">
      <div className="container mx-auto max-w-7xl px-4 py-0 relative">
        {/* We use a negative margin trick to make it pop out over the footer, or just standard padding */}
        <div className="bg-brand-bg-light border border-brand-border rounded-3xl p-8 md:p-12 shadow-sm transform -translate-y-12 mb-[-3rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-brand-primary">
                Track Your Freight
              </h3>
              <p className="text-brand-text-muted">
                Track your goods with our logistics tracking system. Get real-time updates on your shipment status.
              </p>
              <form onSubmit={handleTrackSubmit} className="flex flex-col w-full">
                <div className="flex w-full relative">
                  <Input 
                    type="text" 
                    placeholder="Enter tracking ID (e.g. BYL-2026-001)" 
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="pr-24 h-14 bg-white"
                  />
                  <Button type="submit" className="absolute right-1 top-1 bottom-1 h-12">
                    <Search size={18} className="mr-2" /> Track
                  </Button>
                </div>
                {trackingError && <p className="text-brand-error text-xs mt-2 font-medium">{trackingError}</p>}
              </form>
            </div>
            
            <div className="flex flex-col space-y-4 relative">
               <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-px bg-brand-border hidden md:block"></div>
               <h3 className="text-2xl md:text-3xl font-heading font-bold text-brand-primary">
                Subscribe Newsletter
              </h3>
              <p className="text-brand-text-muted">
                Stay updated with our latest news and offers. (See footer for subscription)
              </p>
              {/* For simplicity we mention the footer, or we could duplicate the form here, but the spec says "Newsletter / Tracking CTA. Buat bar sebelum footer dengan dua fungsi". So let's add the form here too. */}
              <form className="flex w-full relative" onSubmit={(e) => e.preventDefault()}>
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="pr-32 h-14 bg-white disabled:opacity-50"
                    disabled
                  />
                  <Button type="button" className="absolute right-1 top-1 bottom-1 h-12" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
                    Go to Footer
                  </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
