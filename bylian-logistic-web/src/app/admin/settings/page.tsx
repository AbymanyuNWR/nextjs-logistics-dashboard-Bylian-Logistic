"use client";

import { useState } from "react";
import { 
  Settings, Save, Activity, ShieldCheck, Mail, Phone, 
  MapPin, Sliders, ToggleLeft, ToggleRight, FileText
} from "lucide-react";
import { useAdminState, SystemSettings } from "@/context/AdminStateContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminSettingsPage() {
  const { settings, saveSettings, auditLogs } = useAdminState();
  const [activeTab, setActiveTab] = useState<"settings" | "audits">("settings");
  
  // Settings Form State
  const [formData, setFormData] = useState<SystemSettings>({ ...settings });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    
    setTimeout(() => {
      saveSettings(formData);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1200);
  };

  const handleToggleMaintenance = () => {
    setFormData(prev => ({
      ...prev,
      maintenanceMode: !prev.maintenanceMode
    }));
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 relative">
      
      {/* Title & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">System Settings & Audits</h2>
          <p className="text-xs text-slate-400">Configure global metadata variables and view administrative security audit records.</p>
        </div>
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "settings" ? "bg-brand-accent text-white" : "text-slate-400 hover:text-white"}`}
          >
            Global Variables
          </button>
          <button
            onClick={() => setActiveTab("audits")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "audits" ? "bg-brand-accent text-white" : "text-slate-400 hover:text-white"}`}
          >
            Security Audit Logs
          </button>
        </div>
      </div>

      {activeTab === "settings" ? (
        /* GLOBAL SYSTEM VARIABLES CONFIGURATOR */
        <form onSubmit={handleFormSubmit} className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-xl max-w-4xl mx-auto space-y-8">
          
          <h3 className="text-base font-heading font-bold text-white border-b border-slate-850 pb-4 flex items-center">
            <Sliders className="text-brand-accent mr-2" size={18} /> Global Configurations
          </h3>

          {/* Company Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Core Parameters</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Company Name</label>
                <Input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-800 text-white h-11"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Company Tagline</label>
                <Input
                  type="text"
                  name="companyTagline"
                  value={formData.companyTagline}
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-800 text-white h-11"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 pt-4 border-t border-slate-900">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact & Address Indicators</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Office Phone Number</label>
                <Input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-800 text-white h-11"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Main Corporate Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-800 text-white h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">WhatsApp Redirect Number (Indonesian code prefix)</label>
                <Input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-800 text-white h-11"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Operating Business Hours</label>
                <Input
                  type="text"
                  name="officeHours"
                  value={formData.officeHours}
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-800 text-white h-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Physical Headquarters Address</label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="bg-slate-900 border-slate-800 text-white h-11"
              />
            </div>
          </div>

          {/* System Prefixes */}
          <div className="space-y-4 pt-4 border-t border-slate-900">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Database Prefix Indicators</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Tracking Code prefix</label>
                <Input
                  type="text"
                  name="trackingPrefix"
                  value={formData.trackingPrefix}
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-800 text-white h-11"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Quote Request ID Prefix</label>
                <Input
                  type="text"
                  name="quotePrefix"
                  value={formData.quotePrefix}
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-800 text-white h-11"
                  required
                />
              </div>
            </div>
          </div>

          {/* Maintenance Mode Toggle */}
          <div className="pt-6 border-t border-slate-900 flex justify-between items-center bg-slate-900/10 p-5 rounded-2xl border border-slate-850">
            <div>
              <span className="font-bold text-white text-xs block mb-1">System Maintenance Mode</span>
              <p className="text-[10px] text-slate-500 leading-relaxed max-w-sm">Block customer logins and quote requests temporarily while server migration tasks are performed.</p>
            </div>
            <button
              type="button"
              onClick={handleToggleMaintenance}
              className="text-slate-400 hover:text-white"
            >
              {formData.maintenanceMode ? (
                <ToggleRight className="text-brand-accent" size={38} />
              ) : (
                <ToggleLeft className="text-slate-600" size={38} />
              )}
            </button>
          </div>

          {/* Saving logs feedback & submits */}
          <div className="flex gap-4 pt-4 border-t border-slate-900 justify-between items-center shrink-0">
            <div>
              {saveStatus === "success" && (
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                  Settings variables updated in state context successfully!
                </span>
              )}
            </div>
            <Button
              type="submit"
              disabled={saveStatus === "saving"}
              className="h-12 bg-brand-accent text-white hover:bg-brand-accent-hover font-bold px-8"
            >
              {saveStatus === "saving" ? "Updating values..." : "Save System Configs"}
            </Button>
          </div>

        </form>
      ) : (
        /* SECURITY AUDIT LOGS TRACKER */
        <div className="space-y-4 max-w-5xl mx-auto">
          
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
              <Activity className="text-brand-accent mr-2" size={16} /> Total foot prints logged: {auditLogs.length} audit logs
            </span>
          </div>

          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <th className="p-5">IP Address</th>
                    <th className="p-5">Admin Operator</th>
                    <th className="p-5">System Module</th>
                    <th className="p-5">Aksi / Action</th>
                    <th className="p-5">Details Description</th>
                    <th className="p-5">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-xs text-slate-300">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-900/25 transition-colors">
                      <td className="p-5 font-mono text-slate-500">{log.ipAddress}</td>
                      <td className="p-5">
                        <div className="font-bold text-white">{log.adminUser}</div>
                      </td>
                      <td className="p-5">
                        <span className="bg-slate-900 text-slate-400 text-[10px] font-bold uppercase tracking-wider border border-slate-800 px-2 py-0.5 rounded">
                          {log.module}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                          log.action.includes("Success") || log.action.includes("Create") || log.action.includes("Publish") ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          log.action.includes("Delete") || log.action.includes("Remove") ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                          "bg-slate-850 text-slate-400 border-slate-800"
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="p-5 text-slate-400 font-medium leading-relaxed">{log.description}</td>
                      <td className="p-5 text-slate-500 font-medium whitespace-nowrap">{log.createdDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
