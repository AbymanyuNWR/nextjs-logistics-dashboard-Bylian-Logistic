"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, User, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { useAdminState } from "@/context/AdminStateContext";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { projects } = useAdminState();
  const project = projects.find(p => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects.filter(p => p.id !== project.id && p.category.some(c => project.category.includes(c))).slice(0, 2);

  return (
    <>
      <PageHeader 
        title={project.title} 
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title }
        ]} 
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          
          <div className="rounded-3xl overflow-hidden aspect-[21/9] mb-16 relative">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="flex flex-wrap gap-2">
                 {project.category.map(cat => (
                   <span key={cat} className="bg-brand-accent text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">{cat}</span>
                 ))}
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Sidebar Details */}
            <div className="lg:col-span-1">
              <div className="bg-brand-bg-light rounded-3xl p-8 border border-brand-border sticky top-32">
                <h3 className="text-2xl font-heading font-bold text-brand-primary mb-6">Project Details</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-brand-text-muted mb-1 flex items-center"><User size={16} className="mr-2" /> Client</p>
                    <p className="font-bold text-brand-primary text-lg">{project.details.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-text-muted mb-1 flex items-center"><MapPin size={16} className="mr-2" /> Location</p>
                    <p className="font-bold text-brand-primary text-lg">{project.details.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-text-muted mb-1 flex items-center"><Calendar size={16} className="mr-2" /> Duration</p>
                    <p className="font-bold text-brand-primary text-lg">{project.details.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-text-muted mb-1">Cargo Type</p>
                    <p className="font-bold text-brand-primary text-lg">{project.details.cargoType}</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-brand-border">
                  <h4 className="font-bold text-brand-primary mb-4">Share this project</h4>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" className="w-full">Copy Link</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-heading font-bold text-brand-primary mb-4">The Challenge</h2>
                <p className="text-lg text-brand-text-muted leading-relaxed">{project.challenge}</p>
              </div>

              <div>
                <h2 className="text-3xl font-heading font-bold text-brand-primary mb-4">Our Solution</h2>
                <p className="text-lg text-brand-text-muted leading-relaxed mb-6">{project.solution}</p>
              </div>

              <div>
                <h2 className="text-3xl font-heading font-bold text-brand-primary mb-4">The Result & Impact</h2>
                <div className="flex items-start space-x-4 p-6 bg-brand-bg-light rounded-3xl border border-brand-border shadow-sm">
                  <CheckCircle2 size={32} className="text-brand-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-heading font-bold text-brand-primary mb-2">Project Success Achieved</h4>
                    <p className="text-lg text-brand-text-muted leading-relaxed">{project.result}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-24 bg-brand-bg-light border-t border-brand-border">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-heading font-bold text-brand-primary mb-10">Similar Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map(p => (
                <Link key={p.id} href={`/projects/${p.slug}`} className="group relative h-80 rounded-3xl overflow-hidden shadow-lg block">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">{p.title}</h3>
                    <p className="text-white/80">{p.category.join(", ")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
