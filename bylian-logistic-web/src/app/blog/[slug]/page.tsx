"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Search, Tag } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { useAdminState } from "@/context/AdminStateContext";

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { blogs } = useAdminState();
  const blog = blogs.find(b => b.slug === resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const recentBlogs = blogs.filter(b => b.id !== blog.id).slice(0, 3);
  const categories = ["Industry News", "Company Update", "Expert Guide", "Technology"];
  const tags = ["Logistics", "Freight", "Cargo", "Warehouse", "Supply Chain", "Delivery"];

  return (
    <>
      <PageHeader 
        title="Blog Details" 
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Details" }
        ]} 
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl overflow-hidden aspect-[16/9] mb-8">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-brand-text-muted mb-6 font-medium uppercase tracking-wider border-b border-brand-border pb-6">
                <div className="flex items-center space-x-2">
                  <User size={18} className="text-brand-accent" />
                  <span>By {blog.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={18} className="text-brand-accent" />
                  <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Tag size={18} className="text-brand-accent" />
                  <span className="text-brand-accent font-bold">{blog.category}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-primary leading-tight mb-8">
                {blog.title}
              </h1>

              {/* Render content as HTML since it's stored as HTML string in data */}
              <div 
                className="prose prose-lg max-w-none text-brand-text-muted prose-headings:font-heading prose-headings:font-bold prose-headings:text-brand-primary prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              <div className="mt-12 pt-8 border-t border-brand-border flex flex-wrap gap-2 items-center">
                <span className="font-bold text-brand-primary mr-4">Tags:</span>
                {["Logistics", blog.category.split(" ")[0]].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-brand-bg-light border border-brand-border rounded-full text-xs font-bold uppercase tracking-wider text-brand-text-muted">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-12">
                <Link href="/blog" className="inline-flex items-center text-brand-primary font-bold hover:text-brand-accent transition-colors">
                  <ArrowLeft size={18} className="mr-2" /> Back to all articles
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-12">
              
              {/* Search Widget */}
              <div className="bg-brand-bg-light p-8 rounded-3xl border border-brand-border">
                <h3 className="text-xl font-heading font-bold text-brand-primary mb-6">Search</h3>
                <div className="relative">
                  <input type="text" placeholder="Search..." className="w-full h-12 px-4 pr-12 rounded-lg border border-brand-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                  <button className="absolute right-2 top-2 bottom-2 w-8 h-8 flex items-center justify-center bg-brand-accent text-white rounded">
                    <Search size={14} />
                  </button>
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-brand-bg-light p-8 rounded-3xl border border-brand-border">
                <h3 className="text-xl font-heading font-bold text-brand-primary mb-6">Categories</h3>
                <ul className="space-y-3">
                  {categories.map(cat => (
                    <li key={cat}>
                      <Link href={`/blog?category=${cat}`} className="flex items-center justify-between text-brand-text-muted hover:text-brand-accent transition-colors font-medium">
                        <span>{cat}</span>
                        <ChevronRightIcon />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts Widget */}
              <div className="bg-brand-bg-light p-8 rounded-3xl border border-brand-border">
                <h3 className="text-xl font-heading font-bold text-brand-primary mb-6">Recent Posts</h3>
                <div className="space-y-6">
                  {recentBlogs.map(rb => (
                    <div key={rb.id} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                        <img src={rb.image} alt={rb.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <p className="text-xs text-brand-accent font-bold uppercase tracking-wider mb-1">
                          {new Date(rb.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <h4 className="font-bold text-brand-primary text-sm leading-snug group-hover:text-brand-accent transition-colors line-clamp-2">
                          <Link href={`/blog/${rb.slug}`}>{rb.title}</Link>
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Widget */}
              <div className="bg-brand-bg-light p-8 rounded-3xl border border-brand-border">
                <h3 className="text-xl font-heading font-bold text-brand-primary mb-6">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Link key={tag} href={`/blog?tag=${tag}`} className="px-3 py-1.5 bg-white border border-brand-border hover:border-brand-accent hover:text-brand-accent transition-colors rounded-full text-xs font-bold uppercase tracking-wider text-brand-text-muted">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}

// Inline component to avoid import
function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}
