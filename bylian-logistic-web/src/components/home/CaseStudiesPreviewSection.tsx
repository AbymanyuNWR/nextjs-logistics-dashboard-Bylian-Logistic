import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/data/projects";

export function CaseStudiesPreviewSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <div className="inline-flex items-center space-x-2 bg-brand-bg-light border border-brand-border rounded-full px-4 py-1.5 mb-6">
              <span className="text-brand-accent text-sm font-bold tracking-wide uppercase">Latest Projects</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-primary leading-tight">
              Our successful <span className="text-brand-accent">case studies</span>
            </h2>
          </div>
          <Button size="lg" variant="outline" asChild className="hidden md:inline-flex">
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 4).map((project) => (
            <Card key={project.id} className="overflow-hidden group border-none shadow-lg">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-brand-primary/60 group-hover:bg-brand-primary/40 transition-colors duration-500"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-brand-accent text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                    {project.category[0]}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">{project.title}</h3>
                  <div className="flex items-center text-white/80 text-sm space-x-4">
                    <span>{project.details.client}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                    <span>{project.details.location}</span>
                  </div>
                </div>
                <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-brand-accent text-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ArrowRight size={24} />
                  </div>
                </Link>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center md:hidden">
          <Button size="lg" variant="outline" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
