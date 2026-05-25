"use client";

import { useState } from "react";
import { 
  HelpCircle, Plus, Edit, Trash2, X, PlusCircle, 
  Search, Check, Save, Layers
} from "lucide-react";
import { useAdminState } from "@/context/AdminStateContext";
import { FAQ } from "@/data/faqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminFAQSCMS() {
  const { faqs, saveFaq, deleteFaq } = useAdminState();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "General", "Services", "Pricing", "Tracking", "International"];

  // CMS Drawer Form States
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    question: "",
    answer: "",
    category: "General"
  });

  const handleOpenEdit = (f: FAQ) => {
    setSelectedFaq(f);
    setIsCreating(false);
    setFormData({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category
    });
  };

  const handleOpenCreate = () => {
    setSelectedFaq(null);
    setIsCreating(true);
    setFormData({
      id: `faq-${Date.now()}`,
      question: "",
      answer: "",
      category: "General"
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) {
      alert("Please fill in all required fields.");
      return;
    }

    const compiledFaq: FAQ = {
      id: formData.id,
      question: formData.question,
      answer: formData.answer,
      category: formData.category
    };

    saveFaq(compiledFaq);
    
    // Close Drawer
    setSelectedFaq(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you absolutely sure you want to delete this FAQ item? It will be removed from the public website!")) {
      deleteFaq(id);
    }
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || f.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 font-sans text-slate-100 relative">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">FAQ Database CMS</h2>
          <p className="text-xs text-slate-400">Add, edit, or remove entries from the public Frequently Asked Questions page.</p>
        </div>
        <Button 
          onClick={handleOpenCreate}
          className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold self-start sm:self-auto rounded-xl h-11"
        >
          <Plus size={16} className="mr-1.5" /> Add FAQ Item
        </Button>
      </div>

      {/* Searches & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
        
        {/* Horizontal filter categories */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200
                ${activeCategory === cat 
                  ? "bg-brand-accent text-white" 
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-brand-accent focus-visible:border-transparent"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
        </div>

      </div>

      {/* Accordion list table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-5">Category</th>
                <th className="p-5 w-[30%]">Question</th>
                <th className="p-5 w-[50%]">Answer Preview</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
              {filteredFaqs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-500 text-xs">
                    No FAQs registered or match the search category.
                  </td>
                </tr>
              ) : (
                filteredFaqs.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-900/25 transition-colors">
                    <td className="p-5">
                      <span className="bg-slate-900 text-slate-400 text-[10px] font-bold uppercase tracking-wider border border-slate-800 px-2 py-0.5 rounded">
                        {f.category}
                      </span>
                    </td>
                    <td className="p-5 text-white font-bold leading-relaxed">{f.question}</td>
                    <td className="p-5 text-slate-400 text-xs line-clamp-3 leading-relaxed pt-6">{f.answer}</td>
                    <td className="p-5 text-right">
                      <div className="flex gap-1.5 justify-end">
                        <Button
                          onClick={() => handleOpenEdit(f)}
                          variant="outline"
                          size="sm"
                          className="bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white"
                        >
                          <Edit size={12} />
                        </Button>
                        <Button
                          onClick={() => handleDelete(f.id)}
                          size="sm"
                          className="bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-950/30 px-3 hover:text-red-300"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CMS DRAWER EDITOR SLIDEOUT OVERLAY */}
      {(selectedFaq || isCreating) && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop closer */}
          <div 
            onClick={() => { setSelectedFaq(null); setIsCreating(false); }}
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
                <HelpCircle className="text-brand-accent" size={20} />
                <div>
                  <h3 className="font-heading font-bold text-white leading-none">
                    {isCreating ? "Add FAQ Guide" : "Edit FAQ Item"}
                  </h3>
                  <span className="text-[10px] text-slate-500 mt-1 block">CMS question/answer builder</span>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => { setSelectedFaq(null); setIsCreating(false); }}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable inputs */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800 text-xs">
              
              {/* Category selector */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Category Segment</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full h-11 bg-slate-900 border border-slate-800 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent px-3 text-white"
                >
                  <option value="General">General</option>
                  <option value="Services">Services</option>
                  <option value="Pricing">Pricing</option>
                  <option value="Tracking">Tracking</option>
                  <option value="International">International</option>
                </select>
              </div>

              {/* Question */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">The Help Question *</label>
                <Input
                  type="text"
                  placeholder="e.g. Can I change delivery route mid-transit?"
                  value={formData.question}
                  onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                  required
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">The Detailed Guide Answer *</label>
                <textarea
                  placeholder="Provide a clear, detailed, and professional answer guide..."
                  value={formData.answer}
                  onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                  className="w-full h-44 p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent resize-y text-slate-100 text-xs leading-relaxed"
                  required
                ></textarea>
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="p-6 border-t border-slate-800 flex gap-3 shrink-0 bg-slate-900/40">
              <Button 
                type="button"
                onClick={() => { setSelectedFaq(null); setIsCreating(false); }}
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
