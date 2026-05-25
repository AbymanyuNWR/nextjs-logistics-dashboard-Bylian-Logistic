import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHeader({ title, breadcrumb }: { title: string, breadcrumb: {label: string, href?: string}[] }) {
  return (
    <section className="relative pt-32 pb-24 bg-brand-primary overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed7c663b0?auto=format&fit=crop&q=80&w=2000')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
      <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">{title}</h1>
        <div className="flex items-center justify-center space-x-2 text-white/80 font-medium">
          {breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center">
              {item.href ? (
                <Link href={item.href} className="hover:text-brand-accent transition-colors">{item.label}</Link>
              ) : (
                <span className="text-brand-accent">{item.label}</span>
              )}
              {index < breadcrumb.length - 1 && (
                <ChevronRight size={16} className="mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
