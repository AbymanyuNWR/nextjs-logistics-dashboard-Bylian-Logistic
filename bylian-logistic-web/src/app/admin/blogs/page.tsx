"use client";

import { useState } from "react";
import { 
  BookOpen, Plus, Edit, Trash2, X, PlusCircle, 
  Search, Check, Save, User, Calendar, Tag
} from "lucide-react";
import { useAdminState } from "@/context/AdminStateContext";
import { Blog } from "@/data/blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminBlogsCMS() {
  const { blogs, saveBlog, deleteBlog, currentAdmin } = useAdminState();
  const [searchQuery, setSearchQuery] = useState("");
  
  // CMS Drawer Form States
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    slug: "",
    image: "",
    category: "Industry News",
    excerpt: "",
    content: "",
    author: "",
    publishedAt: ""
  });

  const handleOpenEdit = (b: Blog) => {
    setSelectedBlog(b);
    setIsCreating(false);
    setFormData({
      id: b.id,
      title: b.title,
      slug: b.slug,
      image: b.image,
      category: b.category,
      excerpt: b.excerpt,
      content: b.content,
      author: b.author,
      publishedAt: b.publishedAt
    });
  };

  const handleOpenCreate = () => {
    setSelectedBlog(null);
    setIsCreating(true);
    setFormData({
      id: `blg-${Date.now()}`,
      title: "",
      slug: "",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=800",
      category: "Industry News",
      excerpt: "",
      content: "<p>Write your detailed article body paragraphs here...</p>",
      author: currentAdmin?.name || "Bylian Editor",
      publishedAt: new Date().toISOString().substring(0, 10)
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
      alert("Please fill in all required fields.");
      return;
    }

    const compiledBlog: Blog = {
      id: formData.id,
      title: formData.title,
      slug: formData.slug.toLowerCase().trim().replace(/\s+/g, "-"),
      image: formData.image,
      category: formData.category,
      excerpt: formData.excerpt,
      content: formData.content,
      author: formData.author || "Bylian Editor",
      publishedAt: formData.publishedAt || new Date().toISOString().substring(0, 10),
      readTime: `${Math.max(1, Math.ceil(formData.content.split(/\s+/).length / 200))} min read`
    };

    saveBlog(compiledBlog);
    
    // Close Drawer
    setSelectedBlog(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you absolutely sure you want to delete this article? It will be removed from the public website!")) {
      deleteBlog(id);
    }
  };

  const filteredBlogs = blogs.filter((b) => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-slate-100 relative">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Articles & News CMS</h2>
          <p className="text-xs text-slate-400">Write, edit, and publish logistics blogs and company updates.</p>
        </div>
        <Button 
          onClick={handleOpenCreate}
          className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold self-start sm:self-auto rounded-xl h-11"
        >
          <Plus size={16} className="mr-1.5" /> Write Article
        </Button>
      </div>

      {/* Searches */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
        
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Database Split: {filteredBlogs.length} articles published</span>
        </div>

        <div className="relative w-full md:w-80">
          <Input
            type="text"
            placeholder="Search article titles, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-brand-accent focus-visible:border-transparent"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
        </div>

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((b) => (
          <div key={b.id} className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden flex flex-col justify-between group">
            
            {/* Image */}
            <div className="relative h-44 overflow-hidden bg-slate-900">
              <img 
                src={b.image} 
                alt={b.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="bg-brand-accent/25 border border-brand-accent/40 text-brand-accent text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {b.category}
                </span>
                <h4 className="font-heading font-bold text-sm text-white mt-1.5 leading-snug">{b.title}</h4>
              </div>
            </div>

            {/* details preview */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                {b.excerpt}
              </p>
              
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold border-t border-slate-850 pt-4">
                <div className="flex items-center"><User size={10} className="mr-1.5 text-brand-accent" /> {b.author}</div>
                <div className="flex items-center"><Calendar size={10} className="mr-1.5 text-brand-accent" /> {b.publishedAt}</div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="p-4 border-t border-slate-900 bg-slate-950 flex gap-2 shrink-0">
              <Button
                onClick={() => handleOpenEdit(b)}
                variant="outline"
                className="flex-1 h-9 border-slate-800 hover:bg-slate-900 text-slate-350 hover:text-white text-xs font-bold"
              >
                <Edit size={12} className="mr-1" /> Edit
              </Button>
              <Button
                onClick={() => handleDelete(b.id)}
                className="bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-950/30 px-3 hover:text-red-300"
              >
                <Trash2 size={12} />
              </Button>
            </div>

          </div>
        ))}
      </div>

      {/* CMS DRAWER EDITOR SLIDEOUT OVERLAY */}
      {(selectedBlog || isCreating) && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop closer */}
          <div 
            onClick={() => { setSelectedBlog(null); setIsCreating(false); }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          ></div>
          
          {/* Drawer Body Panel */}
          <form 
            onSubmit={handleFormSubmit}
            className="relative w-full max-w-2xl bg-slate-950 border-l border-slate-800 h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 text-slate-100"
          >
            
            {/* Header */}
            <div className="h-20 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900/40">
              <div className="flex items-center space-x-3">
                <BookOpen className="text-brand-accent" size={20} />
                <div>
                  <h3 className="font-heading font-bold text-white leading-none">
                    {isCreating ? "Draft New Article" : "Edit News Article"}
                  </h3>
                  <span className="text-[10px] text-slate-500 mt-1 block">CMS news layout editor</span>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => { setSelectedBlog(null); setIsCreating(false); }}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable inputs */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800 text-xs">
              
              {/* Titles & Slugs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Article Title *</label>
                  <Input
                    type="text"
                    placeholder="e.g. Navigating Logistics in 2026"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                    className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">URL Route Slug *</label>
                  <Input
                    type="text"
                    placeholder="e.g. navigating-logistics-in-2026"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                    required
                  />
                </div>
              </div>

              {/* Cover Image & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Cover Unsplash URL</label>
                  <Input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Category Section</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full h-11 bg-slate-900 border border-slate-800 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent px-3 text-white"
                  >
                    <option value="Industry News">Industry News</option>
                    <option value="Company Update">Company Update</option>
                    <option value="Expert Guide">Expert Guide</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
              </div>

              {/* Author & Published Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Author Name</label>
                  <Input
                    type="text"
                    placeholder="e.g. Diana Putri"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Publish Date</label>
                  <Input
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                    className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Excerpt Abstract Summary (Short) *</label>
                <textarea
                  placeholder="Provide a quick 2-sentence excerpt summary of the article..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full h-16 p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent resize-y text-slate-100 text-xs"
                  required
                ></textarea>
              </div>

              {/* Content body paragraph editor */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Article Body Content (Supports HTML paragraphs) *</label>
                <textarea
                  placeholder="<p>Write your detailed body paragraph here...</p>"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full h-44 p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent resize-y text-slate-100 text-xs font-mono"
                  required
                ></textarea>
                <p className="text-[10px] text-slate-500 mt-1">Note: You can write standard text wrapped in &lt;p&gt; tags. &lt;h3&gt; tags will serve as section headers.</p>
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="p-6 border-t border-slate-800 flex gap-3 shrink-0 bg-slate-900/40">
              <Button 
                type="button"
                onClick={() => { setSelectedBlog(null); setIsCreating(false); }}
                variant="outline" 
                className="flex-1 h-12 border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="flex-1 h-12 bg-brand-accent text-white hover:bg-brand-accent-hover font-bold flex items-center justify-center gap-1.5"
              >
                <Save size={14} /> Publish Changes
              </Button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
