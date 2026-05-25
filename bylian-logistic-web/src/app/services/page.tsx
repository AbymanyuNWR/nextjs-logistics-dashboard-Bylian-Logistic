"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAdminState } from "@/context/AdminStateContext";

export default function ServicesPage() {
  const { services } = useAdminState();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Domestic", "International", "Storage", "Express"];

  const filteredServices = services.filter((service) => {
    if (activeFilter === "All") return true;
    return service.category.includes(activeFilter);
  });

  return (
    <>
      <PageHeader 
        title="Our Logistics Services" 
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services" }
        ]} 
      />

      {/* Service Grid Section */}
      <section className="py-24 bg-brand-bg-light">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary">Explore Our Solutions</h2>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold transition-colors",
                    activeFilter === filter 
                      ? "bg-brand-accent text-white" 
                      : "bg-white text-brand-text-muted border border-brand-border hover:border-brand-accent hover:text-brand-accent"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-brand-border">
              <h3 className="text-2xl font-heading font-bold text-brand-primary mb-2">No services found</h3>
              <p className="text-brand-text-muted">Try selecting a different filter.</p>
              <Button className="mt-6" onClick={() => setActiveFilter("All")}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <Card key={service.id} className="overflow-hidden group border-none shadow-lg hover:-translate-y-2 transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-heading font-bold">{service.title}</h3>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.category.map((cat, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-wider font-bold bg-brand-bg-light text-brand-primary px-2 py-1 rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <p className="text-brand-text-muted mb-6 line-clamp-2">
                      {service.shortDescription}
                    </p>
                    <div className="space-y-2 mb-6">
                      {service.benefits.slice(0, 2).map((benefit, i) => (
                        <div key={i} className="flex items-start space-x-2 text-sm text-brand-primary">
                          <Check size={16} className="text-brand-accent shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="link" className="p-0 h-auto font-bold text-brand-primary group-hover:text-brand-accent" asChild>
                      <Link href={`/services/${service.slug}`}>
                        View Service <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Comparison Section */}
      <section className="py-24 bg-white border-t border-brand-border">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary mb-4">Service Comparison</h2>
            <p className="text-brand-text-muted max-w-2xl mx-auto">Compare our services to find the best logistics solution for your specific business needs.</p>
          </div>
          
          <div className="hidden md:block overflow-x-auto rounded-xl border border-brand-border shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-brand-primary text-white">
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Service</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Best For</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Speed</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-brand-text-dark">
                <tr className="hover:bg-brand-bg-light transition-colors">
                  <td className="p-4 font-bold">Land Freight</td>
                  <td className="p-4">Domestic business delivery</td>
                  <td className="p-4">Medium-Fast</td>
                  <td className="p-4">Local & intercity</td>
                </tr>
                <tr className="hover:bg-brand-bg-light transition-colors">
                  <td className="p-4 font-bold">Maritime Freight</td>
                  <td className="p-4">Large cargo import/export</td>
                  <td className="p-4">Medium</td>
                  <td className="p-4">International port</td>
                </tr>
                <tr className="hover:bg-brand-bg-light transition-colors">
                  <td className="p-4 font-bold">Train Freight</td>
                  <td className="p-4">Bulk industrial cargo</td>
                  <td className="p-4">Medium</td>
                  <td className="p-4">Long-distance domestic</td>
                </tr>
                <tr className="hover:bg-brand-bg-light transition-colors">
                  <td className="p-4 font-bold">Air Cargo Support</td>
                  <td className="p-4">Urgent shipment</td>
                  <td className="p-4 font-bold text-brand-accent">Fast</td>
                  <td className="p-4">Domestic & international</td>
                </tr>
                <tr className="hover:bg-brand-bg-light transition-colors">
                  <td className="p-4 font-bold">Warehousing</td>
                  <td className="p-4">Storage & inventory</td>
                  <td className="p-4">Flexible</td>
                  <td className="p-4">Warehouse network</td>
                </tr>
                <tr className="hover:bg-brand-bg-light transition-colors">
                  <td className="p-4 font-bold">Last Mile Delivery</td>
                  <td className="p-4">Final delivery</td>
                  <td className="p-4 font-bold text-brand-accent">Fast</td>
                  <td className="p-4">City & regional</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile version of comparison */}
          <div className="md:hidden space-y-4">
            {[
              { service: "Land Freight", bestFor: "Domestic business delivery", speed: "Medium-Fast", coverage: "Local & intercity" },
              { service: "Maritime Freight", bestFor: "Large cargo import/export", speed: "Medium", coverage: "International port" },
              { service: "Train Freight", bestFor: "Bulk industrial cargo", speed: "Medium", coverage: "Long-distance domestic" },
              { service: "Air Cargo Support", bestFor: "Urgent shipment", speed: "Fast", coverage: "Domestic & international" },
              { service: "Warehousing", bestFor: "Storage & inventory", speed: "Flexible", coverage: "Warehouse network" },
              { service: "Last Mile Delivery", bestFor: "Final delivery", speed: "Fast", coverage: "City & regional" }
            ].map((item, i) => (
              <div key={i} className="border border-brand-border rounded-xl p-4 bg-white shadow-sm">
                <h4 className="font-bold text-brand-primary text-lg mb-2">{item.service}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-brand-text-muted">Best For:</div><div className="font-medium">{item.bestFor}</div>
                  <div className="text-brand-text-muted">Speed:</div><div className="font-medium text-brand-accent">{item.speed}</div>
                  <div className="text-brand-text-muted">Coverage:</div><div className="font-medium">{item.coverage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Summary & CTA */}
      <section className="py-24 bg-brand-primary text-center">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Ready to move your goods?</h2>
          <p className="text-xl text-white/80 mb-10">Our streamlined process ensures your cargo is handled professionally from pickup to final delivery. Get a customized quote for your business today.</p>
          <Button size="lg" className="bg-brand-accent text-white hover:bg-white hover:text-brand-primary" asChild>
            <Link href="/request-quote">Request A Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
