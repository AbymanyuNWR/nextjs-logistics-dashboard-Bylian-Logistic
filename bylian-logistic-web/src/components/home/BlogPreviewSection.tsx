import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogs } from "@/data/blogs";

export function BlogPreviewSection() {
  const latestBlogs = blogs.slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-brand-bg-light border border-brand-border rounded-full px-4 py-1.5 mb-6">
              <span className="text-brand-accent text-sm font-bold tracking-wide uppercase">News & Updates</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-primary leading-tight">
              Latest from our <span className="text-brand-accent">blog</span>
            </h2>
          </div>
          <Button size="lg" variant="outline" asChild>
            <Link href="/blog">View All Blogs</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
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
      </div>
    </section>
  );
}
