"use client";

import { useState } from "react";
import { 
  Users, Search, PlusCircle, Trash2, Download, 
  Mail, Calendar, ArrowRight, UserCheck, BarChart2
} from "lucide-react";
import { useAdminState } from "@/context/AdminStateContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminSubscribersPage() {
  const { subscribers, addSubscriber, removeSubscriber, addAudit } = useAdminState();
  const [searchQuery, setSearchQuery] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !/^\S+@\S+\.\S+$/.test(newEmail)) {
      setStatusType("error");
      setStatusMsg("Please enter a valid email address.");
      return;
    }

    const res = addSubscriber(newEmail);
    if (res === "duplicate") {
      setStatusType("error");
      setStatusMsg("This email is already subscribed.");
    } else {
      setStatusType("success");
      setStatusMsg("Subscriber added successfully!");
      setNewEmail("");
      
      setTimeout(() => {
        setStatusType("");
        setStatusMsg("");
      }, 4000);
    }
  };

  const handleDelete = (email: string) => {
    if (confirm(`Remove subscriber ${email} from the marketing database?`)) {
      removeSubscriber(email);
    }
  };

  const handleExportCSV = () => {
    // Simulate CSV Export
    const csvContent = "data:text/csv;charset=utf-8,Email Address\n" + subscribers.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bylian_subscribers_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addAudit("CSV Export", "Newsletter Subscriptions", "Subscribers email database exported to CSV file.");
    alert("Newsletter subscribers exported successfully! Check your downloads folder.");
  };

  const filteredSubs = subscribers.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 font-sans text-slate-100 relative">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Newsletter Leads Database</h2>
          <p className="text-xs text-slate-400">Manage email marketing subscriptions and export database leads.</p>
        </div>
        <Button 
          onClick={handleExportCSV}
          className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold self-start sm:self-auto rounded-xl h-11 flex items-center"
        >
          <Download size={16} className="mr-1.5" /> Export Subscribers (CSV)
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: List & Search */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Search bar */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search subscriber emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-slate-950 border-slate-850 text-white placeholder:text-slate-500 focus-visible:ring-brand-accent focus-visible:border-transparent"
            />
            <Search size={18} className="absolute left-3.5 top-3.5 text-slate-500" />
          </div>

          {/* Database List */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <th className="p-5">Subscriber Email</th>
                    <th className="p-5">Status</th>
                    <th className="p-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
                  {filteredSubs.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-12 text-center text-slate-500 text-xs">
                        No subscribers registered in database split.
                      </td>
                    </tr>
                  ) : (
                    filteredSubs.map((email, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/25 transition-colors">
                        <td className="p-5 font-medium text-white flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                            <Mail size={14} />
                          </div>
                          <span>{email}</span>
                        </td>
                        <td className="p-5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Active
                          </span>
                        </td>
                        <td className="p-5 text-right">
                          <button
                            onClick={() => handleDelete(email)}
                            className="p-2 bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-950/30 rounded-xl transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right column: Analytics & Add Manual */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Manual Add Card */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
              <PlusCircle size={16} className="text-brand-accent mr-2" /> Manual Registration
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">Add a single offline or corporate customer email to the subscription database splits.</p>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <Input
                type="email"
                placeholder="client@corporate.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                required
              />
              
              {statusMsg && (
                <div className={`p-3 rounded-xl text-[10px] font-semibold ${
                  statusType === "success" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" :
                  "bg-red-500/10 border border-red-500/20 text-red-400"
                }`}>
                  {statusMsg}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-brand-accent hover:bg-brand-accent-hover text-white font-bold text-xs"
              >
                Register Email Address
              </Button>
            </form>
          </div>

          {/* Subscribers split metrics card */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
              <BarChart2 size={16} className="text-brand-accent mr-2" /> Growth Overview
            </h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex justify-between border-b border-slate-850 pb-2">
                <span className="text-slate-400 font-medium">Total Emails</span>
                <span className="font-bold text-white">{subscribers.length} Contacts</span>
              </div>
              <div className="flex justify-between border-b border-slate-850 pb-2">
                <span className="text-slate-400 font-medium">Verified Valid</span>
                <span className="font-bold text-emerald-400">100% Verified</span>
              </div>
              <div className="flex justify-between border-b border-slate-850 pb-2">
                <span className="text-slate-400 font-medium">Monthly Rate</span>
                <span className="font-bold text-emerald-400">+28% Growth</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
