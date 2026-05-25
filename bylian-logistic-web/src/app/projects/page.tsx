"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAdminState } from "@/context/AdminStateContext";

export default function ProjectsPage() {
  const { projects } = useAdminState();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Land Transport", "Sea Freight", "Warehouse", "Express"];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    return project.category.includes(activeFilter);
  });

  return (
    <>
      <PageHeader 
        title="Projects & Case Studies" 
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Projects" }
        ]} 
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary mb-6">Our Success Stories</h2>
            <p className="text-brand-text-muted text-lg">Discover how we've helped businesses across various industries solve their complex logistics challenges.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                  activeFilter === filter 
                    ? "bg-brand-primary text-white shadow-md scale-105" 
                    : "bg-brand-bg-light text-brand-text-muted hover:bg-brand-accent hover:text-white"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-brand-bg-light rounded-3xl">
              <h3 className="text-2xl font-heading font-bold text-brand-primary mb-2">No projects found</h3>
              <p className="text-brand-text-muted">No case studies match the selected filter.</p>
              <Button className="mt-6" onClick={() => setActiveFilter("All")}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden group border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/50 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {project.category[0]}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-heading font-bold text-white mb-2 leading-tight group-hover:text-brand-accent transition-colors">
                        <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                      </h3>
                      <div className="flex items-center text-white/80 text-sm space-x-4 mb-4">
                        <span>{project.details.client}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                        <span>{project.details.location}</span>
                      </div>
                      <p className="text-white/60 text-sm line-clamp-2 mb-4">{project.challenge}</p>
                      <Button variant="link" className="p-0 h-auto font-bold text-white group-hover:text-brand-accent" asChild>
                        <Link href={`/projects/${project.slug}`}>
                          View Case Study <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-brand-bg-light border-t border-brand-border">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6">Have a challenging logistics project?</h2>
          <p className="text-brand-text-muted max-w-2xl mx-auto mb-8">Our team of experts is ready to analyze your requirements and provide a tailored logistics solution.</p>
          <Button size="lg" className="bg-brand-accent hover:bg-brand-accent-hover text-white" asChild>
            <Link href="/contact">Talk to an Expert</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
