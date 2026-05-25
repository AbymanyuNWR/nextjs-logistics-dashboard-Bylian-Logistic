"use client";

import { useState } from "react";
import { 
  FolderGit2, Plus, Edit, Trash2, X, PlusCircle, 
  Search, Check, Save, User, MapPin, Clock, Package
} from "lucide-react";
import { useAdminState } from "@/context/AdminStateContext";
import { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminProjectsCMS() {
  const { projects, saveProject, deleteProject } = useAdminState();
  const [searchQuery, setSearchQuery] = useState("");
  
  // CMS Drawer Form States
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    slug: "",
    image: "",
    category: "",
    excerpt: "",
    overview: "",
    challenge: "",
    solution: "",
    result: "",
    client: "",
    location: "",
    duration: "",
    cargoType: ""
  });

  const handleOpenEdit = (p: Project) => {
    setSelectedProject(p);
    setIsCreating(false);
    setFormData({
      id: p.id,
      title: p.title,
      slug: p.slug,
      image: p.image,
      category: p.category.join(", "),
      excerpt: p.excerpt,
      overview: p.overview,
      challenge: p.challenge,
      solution: p.solution,
      result: p.result,
      client: p.details.client,
      location: p.details.location,
      duration: p.details.duration,
      cargoType: p.details.cargoType
    });
  };

  const handleOpenCreate = () => {
    setSelectedProject(null);
    setIsCreating(true);
    setFormData({
      id: `prj-${Date.now()}`,
      title: "",
      slug: "",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
      category: "Land Freight, Heavy Cargo",
      excerpt: "",
      overview: "",
      challenge: "",
      solution: "",
      result: "",
      client: "",
      location: "",
      duration: "",
      cargoType: ""
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.challenge || !formData.solution || !formData.result) {
      alert("Please fill in all required fields.");
      return;
    }

    const compiledProject: Project = {
      id: formData.id,
      title: formData.title,
      slug: formData.slug.toLowerCase().trim().replace(/\s+/g, "-"),
      image: formData.image,
      category: formData.category.split(",").map(c => c.trim()).filter(Boolean),
      excerpt: formData.excerpt || formData.challenge.slice(0, 100) + "...",
      overview: formData.overview || formData.challenge,
      challenge: formData.challenge,
      solution: formData.solution,
      result: formData.result,
      details: {
        client: formData.client || "Corporate Client",
        location: formData.location || "Indonesia",
        duration: formData.duration || "1 Shipment",
        cargoType: formData.cargoType || "General Cargo"
      }
    };

    saveProject(compiledProject);
    
    // Close Drawer
    setSelectedProject(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you absolutely sure you want to delete this case study? It will be removed from the public website!")) {
      deleteProject(id);
    }
  };

  const filteredProjects = projects.filter((p) => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.details.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-slate-100 relative">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Case Studies CMS</h2>
          <p className="text-xs text-slate-400">Add, edit, or remove successful project cases from the portfolio.</p>
        </div>
        <Button 
          onClick={handleOpenCreate}
          className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold self-start sm:self-auto rounded-xl h-11"
        >
          <Plus size={16} className="mr-1.5" /> Publish Case Study
        </Button>
      </div>

      {/* Searches */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
        
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Database Split: {filteredProjects.length} case studies</span>
        </div>

        <div className="relative w-full md:w-80">
          <Input
            type="text"
            placeholder="Search titles, clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-brand-accent focus-visible:border-transparent"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
        </div>

      </div>

      {/* Case studies list cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p) => (
          <div key={p.id} className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden flex flex-col justify-between group">
            
            {/* Cover image */}
            <div className="relative h-48 overflow-hidden bg-slate-900">
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="bg-brand-accent/25 border border-brand-accent/40 text-brand-accent text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {p.details.client}
                </span>
                <h4 className="font-heading font-bold text-base text-white mt-1 leading-snug">{p.title}</h4>
              </div>
            </div>

            {/* details preview */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                {p.excerpt}
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-bold border-t border-slate-850 pt-4">
                <div className="flex items-center"><MapPin size={10} className="mr-1.5 text-brand-accent" /> {p.details.location}</div>
                <div className="flex items-center"><Package size={10} className="mr-1.5 text-brand-accent" /> {p.details.cargoType}</div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="p-4 border-t border-slate-900 bg-slate-950 flex gap-2 shrink-0">
              <Button
                onClick={() => handleOpenEdit(p)}
                variant="outline"
                className="flex-1 h-9 border-slate-800 hover:bg-slate-900 text-slate-350 hover:text-white text-xs font-bold"
              >
                <Edit size={12} className="mr-1" /> Edit
              </Button>
              <Button
                onClick={() => handleDelete(p.id)}
                className="bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-950/30 px-3 hover:text-red-300"
              >
                <Trash2 size={12} />
              </Button>
            </div>

          </div>
        ))}
      </div>

      {/* CMS DRAWER EDITOR SLIDEOUT OVERLAY */}
      {(selectedProject || isCreating) && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop closer */}
          <div 
            onClick={() => { setSelectedProject(null); setIsCreating(false); }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          ></div>
          
          {/* Drawer Body Panel */}
          <form 
            onSubmit={handleFormSubmit}
            className="relative w-full max-w-xl bg-slate-950 border-l border-slate-800 h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 text-slate-100"
          >
            
            {/* Header */}
            <div className="h-20 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900/40">
              <div className="flex items-center space-x-3">
                <FolderGit2 className="text-brand-accent" size={20} />
                <div>
                  <h3 className="font-heading font-bold text-white leading-none">
                    {isCreating ? "Publish Case Study" : "Edit Case Study details"}
                  </h3>
                  <span className="text-[10px] text-slate-500 mt-1 block">CMS dynamic project publisher</span>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => { setSelectedProject(null); setIsCreating(false); }}
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
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Project Title *</label>
                  <Input
                    type="text"
                    placeholder="e.g. Bulk Coal Freight"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                    className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Routing Slug *</label>
                  <Input
                    type="text"
                    placeholder="e.g. bulk-coal-freight"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                    required
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Case Study Cover Image URL</label>
                <Input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                />
              </div>

              {/* Client specs sidebar details grid */}
              <div className="border border-slate-800/80 p-4 rounded-2xl bg-slate-900/10 space-y-4">
                <span className="text-[9px] text-slate-500 uppercase font-bold block mb-1">Sidebar Information Parameters</span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Client Name</label>
                    <Input
                      type="text"
                      placeholder="e.g. PT Mega Coal"
                      value={formData.client}
                      onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                      className="bg-slate-900 border-slate-800 text-white text-xs h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Location Route</label>
                    <Input
                      type="text"
                      placeholder="e.g. Samarinda - Jakarta"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="bg-slate-900 border-slate-800 text-white text-xs h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Project Duration</label>
                    <Input
                      type="text"
                      placeholder="e.g. 14 Days"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      className="bg-slate-900 border-slate-800 text-white text-xs h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Cargo Category Type</label>
                    <Input
                      type="text"
                      placeholder="e.g. Heavy Equipment / Bulk"
                      value={formData.cargoType}
                      onChange={(e) => setFormData(prev => ({ ...prev, cargoType: e.target.value }))}
                      className="bg-slate-900 border-slate-800 text-white text-xs h-10"
                    />
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Brief Summary Excerpt *</label>
                <Input
                  type="text"
                  placeholder="Provide a quick portfolio summary..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                  required
                />
              </div>

              {/* Challenge */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">The Operational Challenge *</label>
                <textarea
                  placeholder="Describe the logistics challenge, constraints, or difficulties faced by the client..."
                  value={formData.challenge}
                  onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
                  className="w-full h-20 p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent resize-y text-slate-100"
                  required
                ></textarea>
              </div>

              {/* Solution */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Our Operational Solution *</label>
                <textarea
                  placeholder="Describe the customized logistics solution designed and executed by Bylian Logistic..."
                  value={formData.solution}
                  onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                  className="w-full h-20 p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent resize-y text-slate-100"
                  required
                ></textarea>
              </div>

              {/* Result */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">The Business Result & Impact *</label>
                <textarea
                  placeholder="Describe the positive results e.g. Reduced costs by 35%, zero damage, delivered ahead of schedule..."
                  value={formData.result}
                  onChange={(e) => setFormData(prev => ({ ...prev, result: e.target.value }))}
                  className="w-full h-20 p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent resize-y text-slate-100"
                  required
                ></textarea>
              </div>

              {/* Category tags */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Filter Categories (Comma separated)</label>
                <Input
                  type="text"
                  placeholder="e.g. Maritime, Land Freight, Heavy Cargo"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                />
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="p-6 border-t border-slate-800 flex gap-3 shrink-0 bg-slate-900/40">
              <Button 
                type="button"
                onClick={() => { setSelectedProject(null); setIsCreating(false); }}
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
