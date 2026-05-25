"use client";

import { useState } from "react";
import { 
  Mail, Search, Star, AlertTriangle, Eye, X, MessageCircle, 
  Send, Calendar, User, Phone, Check, RefreshCw
} from "lucide-react";
import { useAdminState, ContactMessage } from "@/context/AdminStateContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminMessagesPage() {
  const { messages, updateMessageStatus, settings } = useAdminState();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ContactMessage["status"] | "All">("All");
  
  // Drawer / View State
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState("");
  const [statusVal, setStatusVal] = useState<ContactMessage["status"]>("New");

  const filteredMessages = messages.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || m.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleOpenMsg = (m: ContactMessage) => {
    setSelectedMsg(m);
    setStatusVal(m.status === "New" ? "Read" : m.status);
    setReplyText("");
    
    // Automatically mark unread message as read on click
    if (m.status === "New") {
      updateMessageStatus(m.id, "Read");
    }
  };

  const handleSendReply = () => {
    if (!selectedMsg) return;
    
    updateMessageStatus(selectedMsg.id, "Replied", replyText || undefined);
    
    // Reset and close
    setSelectedMsg(null);
    setReplyText("");
  };

  const handleOpenWhatsApp = (m: ContactMessage) => {
    // Standard WhatsApp opener template
    const rawPhone = m.phone.replace(/[^0-9]/g, "");
    const formattedPhone = rawPhone.startsWith("0") ? `62${rawPhone.slice(1)}` : rawPhone;
    const msgText = encodeURIComponent(`Hello ${m.name}, thank you for contacting Bylian Logistic. Regarding your inquiry: "${m.subject}"...`);
    
    window.open(`https://wa.me/${formattedPhone || settings.whatsapp}?text=${msgText}`, "_blank");
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 relative">
      
      {/* Header details */}
      <div>
        <h2 className="text-xl font-bold text-white">Inbox Inquiries</h2>
        <p className="text-xs text-slate-400">View and respond to client inquiries and site feedback.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
        
        {/* Horizontal filter buttons */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {["All", "New", "Read", "Replied", "Spam"].map((status) => (
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

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Input
            type="text"
            placeholder="Search email, name, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-brand-accent focus-visible:border-transparent"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
        </div>

      </div>

      {/* Messages database layout */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-5">Status</th>
                <th className="p-5">From</th>
                <th className="p-5">Subject Header</th>
                <th className="p-5">Inquiry Details</th>
                <th className="p-5">Date Received</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500 text-xs">
                    No contact messages found.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((m) => (
                  <tr key={m.id} className={`hover:bg-slate-900/25 transition-colors ${m.status === "New" ? "bg-brand-accent/5 font-semibold" : ""}`}>
                    <td className="p-5">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide border ${
                        m.status === "New" ? "bg-orange-500/15 text-brand-accent border-orange-500/20" :
                        m.status === "Replied" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" :
                        "bg-slate-850 text-slate-450 border-slate-800"
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-white">{m.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{m.email}</div>
                    </td>
                    <td className="p-5 text-white font-medium truncate max-w-[150px]">{m.subject || "No Subject"}</td>
                    <td className="p-5 text-slate-400 truncate max-w-[200px]">{m.message}</td>
                    <td className="p-5 text-slate-400 text-xs">{m.createdDate.substring(0, 10)}</td>
                    <td className="p-5 text-right">
                      <Button 
                        onClick={() => handleOpenMsg(m)}
                        size="sm" 
                        variant="outline" 
                        className="bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white"
                      >
                        <Eye size={14} className="mr-1.5" /> Read
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MESSAGE DRAWER DETAILED MODAL */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop closer */}
          <div 
            onClick={() => setSelectedMsg(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          ></div>
          
          {/* Drawer Body */}
          <div className="relative w-full max-w-xl bg-slate-950 border-l border-slate-800 h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 text-slate-100">
            
            {/* Header */}
            <div className="h-20 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900/40">
              <div className="flex items-center space-x-3">
                <Mail className="text-brand-accent" size={20} />
                <div>
                  <h3 className="font-heading font-bold text-white leading-none">Inquiry Details</h3>
                  <span className="text-[10px] text-slate-500 mt-1 block font-mono">{selectedMsg.id} • Received: {selectedMsg.createdDate}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMsg(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800">
              
              {/* Profile card */}
              <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-2xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-bold">From Client</span>
                    <h4 className="font-bold text-white mt-0.5">{selectedMsg.name}</h4>
                  </div>
                  <button
                    onClick={() => handleOpenWhatsApp(selectedMsg)}
                    className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle size={14} /> WhatsApp
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Email:</span> <a href={`mailto:${selectedMsg.email}`} className="text-brand-accent hover:underline font-bold">{selectedMsg.email}</a>
                  </div>
                  <div>
                    <span className="text-slate-500">Phone:</span> <a href={`tel:${selectedMsg.phone}`} className="text-brand-accent hover:underline font-bold">{selectedMsg.phone || "-"}</a>
                  </div>
                </div>
              </div>

              {/* Message block */}
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">Subject: {selectedMsg.subject || "No Subject"}</span>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/30 border border-slate-900 p-5 rounded-2xl whitespace-pre-wrap">
                  {selectedMsg.message}
                </p>
              </div>

              {/* Replies History */}
              {selectedMsg.replies.length > 0 && (
                <div className="space-y-4 border-t border-slate-800 pt-6">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Communication Logs</h4>
                  {selectedMsg.replies.map((rep, idx) => (
                    <div key={idx} className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                        <span>Staff Outbound Response</span>
                        <span>{rep.date}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">{rep.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Internal responses editor */}
              <div className="border-t border-slate-800 pt-6 space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Respond Inquiry</h4>
                
                {/* Status selector */}
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Change Status</label>
                  <select
                    value={statusVal}
                    onChange={(e) => setStatusVal(e.target.value as any)}
                    className="w-full h-11 bg-slate-900 border border-slate-800 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent px-3 text-white"
                  >
                    <option value="Read">Mark Read</option>
                    <option value="Replied">Mark Replied</option>
                    <option value="Spam">Mark Spam</option>
                  </select>
                </div>

                {/* Reply textbox */}
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Response Log Note (Saves in logs)</label>
                  <textarea
                    placeholder="Log details of your reply or direct follow-up outcome here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full h-28 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent resize-y text-slate-100"
                  ></textarea>
                </div>

              </div>

            </div>

            {/* Actions Bar */}
            <div className="p-6 border-t border-slate-800 flex gap-3 shrink-0 bg-slate-900/40">
              <Button 
                onClick={() => setSelectedMsg(null)}
                variant="outline" 
                className="flex-1 h-12 border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSendReply}
                className="flex-1 h-12 bg-brand-accent text-white hover:bg-brand-accent-hover font-bold"
              >
                Save & Respond <Send size={14} className="ml-1.5" />
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
