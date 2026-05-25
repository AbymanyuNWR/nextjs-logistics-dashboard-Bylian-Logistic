"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FileText, Search, Filter, Eye, UserCheck, MessageSquare, 
  Trash2, X, PlusCircle, ArrowRight, Truck, Check, HelpCircle
} from "lucide-react";
import { useAdminState, QuoteRequest } from "@/context/AdminStateContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminQuotesPage() {
  const router = useRouter();
  const { quotes, updateQuoteStatus, users, addAudit } = useAdminState();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<QuoteRequest["status"] | "All">("All");
  
  // Modal Drawer State
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [assignedAdmin, setAssignedAdmin] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [quoteStatus, setQuoteStatus] = useState<QuoteRequest["status"]>("New");

  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch = q.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || q.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleOpenDrawer = (q: QuoteRequest) => {
    setSelectedQuote(q);
    setAssignedAdmin(q.assignedTo);
    setInternalNote(q.internalNote);
    setQuoteStatus(q.status);
  };

  const handleSaveChanges = () => {
    if (!selectedQuote) return;
    updateQuoteStatus(selectedQuote.id, quoteStatus, assignedAdmin, internalNote);
    
    // Close Drawer
    setSelectedQuote(null);
  };

  const handleConvertToShipment = () => {
    if (!selectedQuote) return;
    
    // Save quote parameters temporarily in sessionStorage to prefill the shipment form
    sessionStorage.setItem("bylian_convert_quote", JSON.stringify({
      origin: selectedQuote.pickupAddress,
      destination: selectedQuote.destinationAddress,
      service: selectedQuote.serviceType,
      receiver: selectedQuote.name,
      weight: selectedQuote.weight,
      pieces: selectedQuote.quantity,
      quoteId: selectedQuote.id
    }));

    addAudit("Convert Quote", "Quotes Management", `Converting accepted quote ${selectedQuote.id} into active shipment.`);
    
    // Automatically close drawer and redirect to shipments page
    setSelectedQuote(null);
    router.push("/admin/shipments?prefill=true");
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 relative">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Quote Requests Database</h2>
          <p className="text-xs text-slate-400">Review, assign, and process customer logistics requests.</p>
        </div>
      </div>

      {/* Filters & Search controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
        
        {/* Horizontal filter buttons */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {["All", "New", "Contacted", "Accepted", "Rejected", "Closed"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status as any)}
              className={`
                px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200
                ${activeFilter === status 
                  ? "bg-brand-accent text-white" 
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <Input
            type="text"
            placeholder="Search quotes, clients, IDs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-brand-accent focus-visible:border-transparent"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
        </div>

      </div>

      {/* Grid Database Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-5">Quote ID</th>
                <th className="p-5">Client Name</th>
                <th className="p-5">Service Type</th>
                <th className="p-5">Preferred Route</th>
                <th className="p-5">Urgency</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500 text-xs">
                    No quote requests match the selected search or status filters.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-900/25 transition-colors">
                    <td className="p-5 font-mono font-bold text-white">{q.id}</td>
                    <td className="p-5">
                      <div className="font-bold text-white">{q.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{q.company}</div>
                    </td>
                    <td className="p-5">{q.serviceType}</td>
                    <td className="p-5">
                      <div className="text-slate-200 font-medium truncate max-w-[150px]">{q.pickupAddress}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">To: {q.destinationAddress}</div>
                    </td>
                    <td className="p-5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        q.deliveryUrgency === "Super Express" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                        q.deliveryUrgency === "Express" ? "bg-orange-500/10 text-brand-accent border border-orange-500/20" :
                        "bg-slate-800 text-slate-400 border border-slate-700/50"
                      }`}>
                        {q.deliveryUrgency}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        q.status === "New" ? "bg-orange-500/15 text-brand-accent border border-orange-500/25" :
                        q.status === "Contacted" ? "bg-purple-500/15 text-purple-400 border border-purple-500/25" :
                        q.status === "Accepted" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25" :
                        q.status === "Rejected" ? "bg-red-500/15 text-red-400 border border-red-500/25" :
                        "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <Button 
                        onClick={() => handleOpenDrawer(q)}
                        size="sm" 
                        variant="outline" 
                        className="bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white"
                      >
                        <Eye size={14} className="mr-1.5" /> Review
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DRAWER SLIDEOUT OVERLAY MODAL */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop click closer */}
          <div 
            onClick={() => setSelectedQuote(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          ></div>
          
          {/* Drawer Body Panel */}
          <div className="relative w-full max-w-xl bg-slate-950 border-l border-slate-800 h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 text-slate-100">
            
            {/* Header */}
            <div className="h-20 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900/40">
              <div className="flex items-center space-x-3">
                <FileText className="text-brand-accent" size={20} />
                <div>
                  <h3 className="font-heading font-bold text-white leading-none">Review Quote Request</h3>
                  <span className="text-[10px] text-slate-500 mt-1 block font-mono">{selectedQuote.id} • Submitted: {selectedQuote.createdDate}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedQuote(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable specs */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800">
              
              {/* Client specifications */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4 bg-slate-900/30 border border-slate-900 p-4 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Client Name</span>
                    <p className="text-sm font-bold text-white mt-0.5">{selectedQuote.name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Company</span>
                    <p className="text-sm font-bold text-white mt-0.5">{selectedQuote.company}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Email Address</span>
                    <a href={`mailto:${selectedQuote.email}`} className="text-sm font-bold text-brand-accent hover:underline mt-0.5 block">{selectedQuote.email}</a>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Phone Number</span>
                    <a href={`tel:${selectedQuote.phone}`} className="text-sm font-bold text-brand-accent hover:underline mt-0.5 block">{selectedQuote.phone}</a>
                  </div>
                </div>
              </div>

              {/* Cargo parameters */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Freight & Route Parameters</h4>
                <div className="grid grid-cols-2 gap-4 bg-slate-900/30 border border-slate-900 p-4 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Service Type</span>
                    <p className="text-sm font-bold text-white mt-0.5">{selectedQuote.serviceType}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Freight Class</span>
                    <p className="text-sm font-bold text-white mt-0.5">{selectedQuote.freightType}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Origin Location</span>
                    <p className="text-sm font-bold text-white mt-0.5">{selectedQuote.pickupAddress}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Destination</span>
                    <p className="text-sm font-bold text-white mt-0.5">{selectedQuote.destinationAddress}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Total Weight</span>
                    <p className="text-sm font-bold text-white mt-0.5">{selectedQuote.weight}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Dimensions / Volume</span>
                    <p className="text-sm font-bold text-white mt-0.5">{selectedQuote.volume}</p>
                  </div>
                </div>
              </div>

              {/* Message block */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message & Handling Specs</h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/30 border border-slate-900 p-4 rounded-2xl font-medium">
                  {selectedQuote.cargoDescription || "No notes provided."}
                </p>
              </div>

              {/* Operations Control Segment */}
              <div className="border-t border-slate-800 pt-6 space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Internal Operations Controls</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Status update */}
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Process Status</label>
                    <select
                      value={quoteStatus}
                      onChange={(e) => setQuoteStatus(e.target.value as any)}
                      className="w-full h-11 bg-slate-900 border border-slate-800 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent px-3 text-white"
                    >
                      <option value="New">New / Unopened</option>
                      <option value="Contacted">Contacted Lead</option>
                      <option value="Accepted">Accepted & Deal</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  {/* Handled by admin staff */}
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Assigned Handler</label>
                    <select
                      value={assignedAdmin}
                      onChange={(e) => setAssignedAdmin(e.target.value)}
                      className="w-full h-11 bg-slate-900 border border-slate-800 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent px-3 text-white"
                    >
                      <option value="Unassigned">Unassigned</option>
                      {users.map(u => (
                        <option key={u.id} value={u.name}>{u.name} ({u.role})</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Staff internal notes */}
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Internal Staff Notes</label>
                  <textarea
                    placeholder="Write operational details, agreed pricing or call outcomes here..."
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    className="w-full h-24 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent resize-y text-slate-100"
                  ></textarea>
                </div>

              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="p-6 border-t border-slate-800 flex flex-col gap-3 shrink-0 bg-slate-900/40">
              {/* shipment conversion trigger */}
              {quoteStatus === "Accepted" && (
                <button
                  type="button"
                  onClick={handleConvertToShipment}
                  className="w-full h-12 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-500/10 flex items-center justify-center transition-all duration-300"
                >
                  <Truck size={16} className="mr-2 animate-bounce" />
                  Convert To Active Shipment <ArrowRight size={16} className="ml-1.5" />
                </button>
              )}
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => setSelectedQuote(null)}
                  variant="outline" 
                  className="flex-1 h-12 border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveChanges}
                  className="flex-1 h-12 bg-brand-accent text-white hover:bg-brand-accent-hover font-bold"
                >
                  Save Changes
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
