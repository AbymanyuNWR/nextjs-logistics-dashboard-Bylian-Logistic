"use client";

import { useState } from "react";
import { 
  Users, Plus, ShieldCheck, X, Search, Save, 
  UserPlus, Info, Check, ToggleLeft, ToggleRight, Lock
} from "lucide-react";
import { useAdminState, AdminUser } from "@/context/AdminStateContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminUsersPage() {
  const { users, addUser, updateUserStatus } = useAdminState();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Create User Drawer States
  const [isCreating, setIsCreating] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    role: "Shipment Operator" as AdminUser["role"],
    status: "Active" as AdminUser["status"]
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.email) {
      alert("Please fill in name and email.");
      return;
    }

    addUser(newUserData);
    
    // Reset and close
    setNewUserData({
      name: "",
      email: "",
      role: "Shipment Operator",
      status: "Active"
    });
    setIsCreating(false);
  };

  const handleToggleStatus = (id: string, currentStatus: AdminUser["status"]) => {
    const nextStatus = currentStatus === "Active" ? "Inactive" : "Active";
    updateUserStatus(id, nextStatus);
  };

  const filteredUsers = users.filter((u) => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Role permissions map descriptions
  const rolePermissionsInfo = [
    { role: "Super Admin", access: "Full root access. Can modify system settings, wipe logs, export data, and manage handler accounts." },
    { role: "Admin", access: "Operations control. Manage quote requests, active dispatches, CMS services, case studies, blogs, and FAQ databases." },
    { role: "Shipment Operator", access: "Logistics only. Restriced to dispatch creation, shipment logging, timeline update checkpoints, and tracking lookups." },
    { role: "Customer Support", access: "Sales & Inboxes. Manage incoming emails, follow-up quote requests, update client statuses, and answer chats." },
    { role: "Content Editor", access: "CMS only. Draft and publish blogs, logistics guides, FAQS, case studies, and services testimonials." }
  ];

  return (
    <div className="space-y-6 font-sans text-slate-100 relative">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">System Access Control</h2>
          <p className="text-xs text-slate-400">Manage internal administrative accounts, staff roles, and access credentials.</p>
        </div>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold self-start sm:self-auto rounded-xl h-11 flex items-center"
        >
          <UserPlus size={16} className="mr-1.5" /> Register Admin User
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Users List & Search */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Search bar */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search admin users by name, email, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-slate-950 border-slate-850 text-white placeholder:text-slate-500 focus-visible:ring-brand-accent focus-visible:border-transparent"
            />
            <Search size={18} className="absolute left-3.5 top-3.5 text-slate-500" />
          </div>

          {/* Table */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <th className="p-5">Name & Email</th>
                    <th className="p-5">Security Role</th>
                    <th className="p-5">Last Login Session</th>
                    <th className="p-5">Terminal access</th>
                    <th className="p-5 text-right">Switch Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-900/25 transition-colors">
                      <td className="p-5">
                        <div className="font-bold text-white flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          <span>{u.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5 ml-4 font-mono">{u.email}</div>
                      </td>
                      <td className="p-5">
                        <span className="bg-slate-900 text-slate-400 text-[10px] font-bold uppercase tracking-wider border border-slate-800 px-2.5 py-0.5 rounded-full">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-5 text-slate-400 text-xs font-medium">{u.lastLogin}</td>
                      <td className="p-5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                          u.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => handleToggleStatus(u.id, u.status)}
                          className={`p-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ml-auto ${
                            u.status === "Active" 
                              ? "bg-slate-900 border-slate-800 text-slate-350 hover:bg-red-950/20 hover:text-red-400 hover:border-red-950/30" 
                              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white"
                          }`}
                        >
                          {u.status === "Active" ? (
                            <>Deactivate</>
                          ) : (
                            <>Activate</>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Columns: Roles & Access limits display */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
              <Lock size={16} className="text-brand-accent mr-2" /> Roles Access Matrix
            </h3>
            
            <div className="space-y-4">
              {rolePermissionsInfo.map((info, idx) => (
                <div key={idx} className="border-b border-slate-850 pb-3 last:border-0 last:pb-0 text-xs">
                  <span className="font-bold text-white text-xs block mb-1">{info.role}</span>
                  <p className="text-[11px] text-slate-450 leading-relaxed font-medium">{info.access}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* DRAWER CREATE USER SLIDEOUT OVERLAY */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop closer */}
          <div 
            onClick={() => setIsCreating(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          ></div>
          
          {/* Drawer Body Panel */}
          <form 
            onSubmit={handleCreateSubmit}
            className="relative w-full max-w-md bg-slate-950 border-l border-slate-800 h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 text-slate-100"
          >
            
            {/* Header */}
            <div className="h-20 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900/40">
              <div className="flex items-center space-x-3">
                <Users className="text-brand-accent" size={20} />
                <div>
                  <h3 className="font-heading font-bold text-white leading-none">Register Administrator</h3>
                  <span className="text-[10px] text-slate-500 mt-1 block">Account security access registrar</span>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsCreating(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable inputs */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800 text-xs">
              
              {/* Full Name */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Staff Member Name *</label>
                <Input
                  type="text"
                  placeholder="e.g. Hendra Wijaya"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Staff Terminal Email *</label>
                <Input
                  type="email"
                  placeholder="e.g. hendra@bylian.com"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white text-xs h-11"
                  required
                />
              </div>

              {/* Role selection */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-2">Security Authorization Role</label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, role: e.target.value as any }))}
                  className="w-full h-11 bg-slate-900 border border-slate-800 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent px-3 text-white"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Shipment Operator">Shipment Operator</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Content Editor">Content Editor</option>
                  <option value="Finance">Finance</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="p-6 border-t border-slate-800 flex gap-3 shrink-0 bg-slate-900/40">
              <Button 
                type="button"
                onClick={() => setIsCreating(false)}
                variant="outline" 
                className="flex-1 h-12 border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="flex-1 h-12 bg-brand-accent text-white hover:bg-brand-accent-hover font-bold flex items-center justify-center gap-1.5"
              >
                <Save size={14} /> Register Staff Account
              </Button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
