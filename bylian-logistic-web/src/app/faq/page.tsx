"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAdminState } from "@/context/AdminStateContext";

export default function FaqPage() {
  const { faqs } = useAdminState();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "General", "Services", "Pricing", "Tracking", "International"];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <PageHeader 
        title="Frequently Asked Questions" 
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "FAQ" }
        ]} 
      />

      <section className="py-24 bg-brand-bg-light min-h-[60vh]">
        <div className="container mx-auto max-w-4xl px-4">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-brand-primary mb-4">How can we help you?</h2>
            <p className="text-brand-text-muted text-lg mb-8">Search our knowledge base or browse categories below to find answers to your questions.</p>
            
            <div className="relative max-w-2xl mx-auto mb-12">
              <Input 
                type="text" 
                placeholder="Search for answers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white rounded-full text-lg shadow-sm border-brand-border focus-visible:ring-brand-accent"
              />
              <Search size={24} className="absolute left-4 top-4 text-brand-text-muted" />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-bold transition-all duration-300",
                    activeCategory === category 
                      ? "bg-brand-accent text-white shadow-md scale-105" 
                      : "bg-white text-brand-text-muted border border-brand-border hover:border-brand-accent hover:text-brand-accent"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-brand-border shadow-sm">
              <h3 className="text-2xl font-heading font-bold text-brand-primary mb-2">No results found</h3>
              <p className="text-brand-text-muted mb-6">We couldn't find any FAQs matching your search.</p>
              <Button onClick={() => {setSearchQuery(""); setActiveCategory("All");}}>Clear Search</Button>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-brand-border shadow-sm">
              <Accordion 
                items={filteredFaqs.map(f => ({ id: f.id, question: f.question, answer: f.answer }))} 
                allowMultiple={false} 
              />
            </div>
          )}

        </div>
      </section>

      <section className="py-20 bg-brand-primary text-center border-t border-brand-border">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Still have questions?</h2>
          <p className="text-white/80 text-lg mb-8">If you cannot find the answer to your question in our FAQ, you can always contact us. We will answer to you shortly!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-brand-accent hover:bg-brand-accent-hover text-white" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white hover:text-brand-primary">
              <a href="tel:+6281234567890">Call Support</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
