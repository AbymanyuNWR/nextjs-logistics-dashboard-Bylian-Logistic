import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/services";

export function ServicesPreviewSection() {
  return (
    <section className="py-24 bg-brand-bg-light">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white border border-brand-border rounded-full px-4 py-1.5 mb-6">
              <span className="text-brand-accent text-sm font-bold tracking-wide uppercase">Our Solutions</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-primary leading-tight">
              Wide Variety of <span className="text-brand-accent">Logistics Services</span>
            </h2>
          </div>
          <Button size="lg" variant="outline" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service) => (
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
                <p className="text-brand-text-muted mb-6 line-clamp-2">
                  {service.shortDescription}
                </p>
                <Button variant="link" className="p-0 h-auto font-bold text-brand-primary group-hover:text-brand-accent" asChild>
                  <Link href={`/services/${service.slug}`}>
                    Read More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
