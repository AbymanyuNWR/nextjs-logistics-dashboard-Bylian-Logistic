"use client";

import { useState } from "react";
import { 
  FolderGit2, Plus, Edit, Trash2, X, PlusCircle, 
  Search, Check, Save, ArrowRight, Tag
} from "lucide-react";
import { useAdminState } from "@/context/AdminStateContext";
import { Service } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminServicesCMS() {
  const { services, saveService, deleteService } = useAdminState();
  const [searchQuery, setSearchQuery] = useState("");
  
  // CMS Form States
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    slug: "",
    image: "",
    iconName: "Truck",
    shortDescription: "",
    description: "",
    category: "",
    benefits: "",
    included: "",
    steps: ""
  });

  const handleOpenEdit = (s: Service) => {
    setSelectedService(s);
    setIsCreating(false);
    setFormData({
      id: s.id,
      title: s.title,
      slug: s.slug,
      image: s.image,
      iconName: s.icon,
      shortDescription: s.shortDescription,
      description: s.description,
      category: s.category.join(", "),
      benefits: s.benefits.join("\n"),
      included: s.included.join("\n"),
      steps: s.steps.join("\n")
    });
  };

  const handleOpenCreate = () => {
    setSelectedService(null);
    setIsCreating(true);
    setFormData({
      id: `svc-${Date.now()}`,
      title: "",
      slug: "",
      image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c663b0?auto=format&fit=crop&q=80&w=800",
      iconName: "Truck",
      shortDescription: "",
      description: "",
      category: "Domestic, Express",
      benefits: "Fast Shipping\nReal-time Tracking",
      included: "Insurance Coverage\nDoor-to-door Handling",
      steps: "Book Online\nCargo Pickup\nFast Delivery"
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.shortDescription) {
      alert("Please fill in all required fields.");
      return;
    }

    const compiledService: Service = {
      id: formData.id,
      title: formData.title,
      slug: formData.slug.toLowerCase().trim().replace(/\s+/g, "-"),
      image: formData.image,
      icon: formData.iconName,
      shortDescription: formData.shortDescription,
      description: formData.description || formData.shortDescription,
      category: formData.category.split(",").map(c => c.trim()).filter(Boolean),
      benefits: formData.benefits.split("\n").map(b => b.trim()).filter(Boolean),
      included: formData.included.split("\n").map(i => i.trim()).filter(Boolean),
      steps: formData.steps.split("\n").map(s => s.trim()).filter(Boolean),
      // Faqs fallback
      faqs: [
        { question: "How long does delivery take?", answer: "Delivery times depend on routes, typical domestic transits average 2-4 business days." },
        { question: "Is my cargo insured?", answer: "Yes, standard basic insurance is included in every booking." }
      ]
    };

    saveService(compiledService);
    
    // Close Drawer
    setSelectedService(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you absolutely sure you want to delete this service? It will disappear from the public website!")) {
      deleteService(id);
    }
  };

  const filteredServices = services.filter((s) => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-slate-100 relative">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Services Content CMS</h2>
          <p className="text-xs text-slate-400">Add, modify, or archive website logistics services in real time.</p>
        </div>
        <Button 
          onClick={handleOpenCreate}
          className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold self-start sm:self-auto rounded-xl h-11"
        >
          <Plus size={16} className="mr-1.5" /> Publish Service
        </Button>
      </div>

      {/* Searches */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
        
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Database Split: {filteredServices.length} active service modules</span>
        </div>

        <div className="relative w-full md:w-80">
          <Input
            type="text"
            placeholder="Search service titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-brand-accent focus-visible:border-transparent"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
        </div>

      </div>

      {/* CMS Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((s) => (
          <div key={s.id} className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden flex flex-col justify-between group">
            
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-slate-900">
              <img 
                src={s.image} 
                alt={s.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="bg-brand-accent/25 border border-brand-accent/40 text-brand-accent text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {s.slug}
                </span>
                <h4 className="font-heading font-bold text-lg text-white mt-1 leading-snug">{s.title}</h4>
              </div>
            </div>

            {/* Description */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                {s.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {s.category.map((cat, idx) => (
                  <span key={idx} className="bg-slate-900 text-slate-400 text-[9px] font-bold uppercase tracking-wider border border-slate-800 px-2 py-0.5 rounded">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Panel */}
            <div className="p-4 border-t border-slate-900 bg-slate-950 flex gap-2 shrink-0">
              <Button
                onClick={() => handleOpenEdit(s)}
                variant="outline"
                className="flex-1 h-9 border-slate-800 hover:bg-slate-900 text-slate-350 hover:text-white text-xs font-bold"
              >
                <Edit size={12} className="mr-1" /> Edit
              </Button>
              <Button
                onClick={() => handleDelete(s.id)}
                className="bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-950/30 px-3 hover:text-red-300"
              >
                <Trash2 size={12} />
              </Button>
            </div>

          </div>
        ))}
      </div>

      {/* CMS DRAWER EDITOR SLIDEOUT OVERLAY */}
      {(selectedService || isCreating) && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop closer */}
          <div 
            onClick={() => { setSelectedService(null); setIsCreating(false); }}
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
                    {isCreating ? "Publish New Service" : "Edit Service Module"}
                  </h3>
                  <span className="text-[10px] text-slate-500 mt-1 block">CMS dynamic template publisher</span>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => { setSelectedService(null); setIsCreating(false); }}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable inputs */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800 text-xs">
              
              {/* Service Titles & Slugs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Service Title *</label>
                  <Input
                    type="text"
                    placeholder="e.g. Overland Courier"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                    className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Routing Slug (URL suffix) *</label>
                  <Input
                    type="text"
                    placeholder="e.g. overland-courier"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                    required
                  />
                </div>
              </div>

              {/* Service Image url */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Cover Unsplash Image URL</label>
                <Input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                />
              </div>

              {/* Short desc */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Short Excerpt Summary *</label>
                <Input
                  type="text"
                  placeholder="Provide a quick 1-sentence sales summary..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                  required
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Detailed Description</label>
                <textarea
                  placeholder="Provide detailed capabilities, operational features, and full service briefs..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full h-24 p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent resize-y text-slate-100"
                ></textarea>
              </div>

              {/* Category tags */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Category Labels (Comma separated)</label>
                <Input
                  type="text"
                  placeholder="e.g. Domestic, Cargo, Express"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                />
              </div>

              {/* Bullet features inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Key Benefits (Line by line)</label>
                  <textarea
                    placeholder="Fast logistics&#10;Affordable rate"
                    value={formData.benefits}
                    onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
                    className="w-full h-24 p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent resize-y text-slate-100"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Included Items (Line by line)</label>
                  <textarea
                    placeholder="Full Insurance&#10;Escort team"
                    value={formData.included}
                    onChange={(e) => setFormData(prev => ({ ...prev, included: e.target.value }))}
                    className="w-full h-24 p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent resize-y text-slate-100"
                  ></textarea>
                </div>
              </div>

              {/* Steps inputs */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Workflow Process Steps (Line by line)</label>
                <textarea
                  placeholder="Step 1: Submit Booking&#10;Step 2: Pickup Fleet Arrival&#10;Step 3: Successful Delivery"
                  value={formData.steps}
                  onChange={(e) => setFormData(prev => ({ ...prev, steps: e.target.value }))}
                  className="w-full h-20 p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent resize-y text-slate-100"
                ></textarea>
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="p-6 border-t border-slate-800 flex gap-3 shrink-0 bg-slate-900/40">
              <Button 
                type="button"
                onClick={() => { setSelectedService(null); setIsCreating(false); }}
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
