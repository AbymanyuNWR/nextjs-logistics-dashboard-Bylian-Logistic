"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Search, User } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAdminState } from "@/context/AdminStateContext";

export default function BlogPage() {
  const { blogs } = useAdminState();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Industry News", "Company Update", "Expert Guide", "Technology"];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlog = blogs[0];

  return (
    <>
      <PageHeader 
        title="News & Articles" 
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog" }
        ]} 
      />

      <section className="py-24 bg-brand-bg-light">
        <div className="container mx-auto max-w-7xl px-4">
          
          {/* Featured Blog */}
          {activeCategory === "All" && !searchQuery && featuredBlog && (
            <div className="mb-20">
              <div className="inline-flex items-center space-x-2 bg-white border border-brand-border rounded-full px-4 py-1.5 mb-6">
                <span className="text-brand-accent text-sm font-bold tracking-wide uppercase">Featured Article</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden border border-brand-border shadow-md group">
                <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
                  <img src={featuredBlog.image} alt={featuredBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-brand-accent text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                      {featuredBlog.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-brand-text-muted mb-4 font-medium uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <User size={16} className="text-brand-accent" />
                      <span>{featuredBlog.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} className="text-brand-accent" />
                      <span>{new Date(featuredBlog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brand-primary mb-4 leading-tight group-hover:text-brand-accent transition-colors">
                    <Link href={`/blog/${featuredBlog.slug}`}>{featuredBlog.title}</Link>
                  </h2>
                  <p className="text-lg text-brand-text-muted mb-8 line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>
                  <Button size="lg" asChild className="self-start">
                    <Link href={`/blog/${featuredBlog.slug}`}>
                      Read Article <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold transition-colors",
                    activeCategory === category 
                      ? "bg-brand-accent text-white" 
                      : "bg-white text-brand-text-muted border border-brand-border hover:border-brand-accent hover:text-brand-accent"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="w-full md:w-72 relative">
              <Input 
                type="text" 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white"
              />
              <Search size={18} className="absolute left-4 top-3.5 text-brand-text-muted" />
            </div>
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-brand-border">
              <h3 className="text-2xl font-heading font-bold text-brand-primary mb-2">No articles found</h3>
              <p className="text-brand-text-muted">Try adjusting your search or category filter.</p>
              <Button className="mt-6" onClick={() => {setSearchQuery(""); setActiveCategory("All");}}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden group border border-brand-border shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-brand-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 text-xs text-brand-text-muted mb-4 font-medium uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <User size={14} className="text-brand-accent" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} className="text-brand-accent" />
                        <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-brand-primary mb-3 line-clamp-2 group-hover:text-brand-accent transition-colors">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-brand-text-muted mb-6 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <Button variant="link" className="p-0 h-auto font-bold text-brand-primary group-hover:text-brand-accent" asChild>
                      <Link href={`/blog/${blog.slug}`}>
                        Read More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
