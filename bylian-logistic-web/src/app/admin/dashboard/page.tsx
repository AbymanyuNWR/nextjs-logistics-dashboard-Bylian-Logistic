"use client";

import Link from "next/link";
import { 
  FileText, Mail, Truck, Users, ArrowUpRight, ArrowRight,
  TrendingUp, Clock, AlertTriangle, CheckCircle2, UserCheck, ShieldAlert
} from "lucide-react";
import { useAdminState } from "@/context/AdminStateContext";

export default function AdminDashboardPage() {
  const { quotes, shipments, messages, subscribers, auditLogs, currentAdmin } = useAdminState();

  // Metrics calculations
  const totalQuotes = quotes.length;
  const newQuotesCount = quotes.filter(q => q.status === "New").length;
  
  const totalShipments = shipments.length;
  const activeShipmentsCount = shipments.filter(s => s.status === "In Transit" || s.status === "Pending Pickup").length;
  const delayedShipmentsCount = shipments.filter(s => s.status === "Delayed").length;
  const deliveredShipmentsCount = shipments.filter(s => s.status === "Delivered").length;
  
  const totalMessages = messages.length;
  const unreadMessagesCount = messages.filter(m => m.status === "New").length;
  
  const totalSubs = subscribers.length;

  // Recent data sets
  const recentQuotes = quotes.slice(0, 3);
  const recentMessages = messages.slice(0, 3);
  const recentLogs = auditLogs.slice(0, 4);

  // Pure CSS Chart Calculation Data
  // Mock weekly trends
  const quoteTrends = [
    { label: "Mon", count: 3 },
    { label: "Tue", count: 5 },
    { label: "Wed", count: 7 },
    { label: "Thu", count: totalQuotes > 0 ? Math.min(12, Math.max(4, Math.floor(totalQuotes * 0.4))) : 4 },
    { label: "Fri", count: totalQuotes > 0 ? Math.min(15, Math.max(6, Math.floor(totalQuotes * 0.6))) : 9 },
    { label: "Sat", count: newQuotesCount + 2 },
    { label: "Sun", count: newQuotesCount }
  ];
  
  const maxTrendVal = Math.max(...quoteTrends.map(t => t.count), 1);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
              Welcome back, <span className="text-brand-accent">{currentAdmin?.name || "Administrator"}</span>!
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Here is what is happening across Bylian Logistic Transport systems today.
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs bg-slate-800/80 border border-slate-700/50 px-4 py-2 rounded-2xl text-slate-300 self-start md:self-auto">
            <Clock size={14} className="text-brand-accent animate-spin duration-3000" />
            <span>Last Login: {currentAdmin?.lastLogin || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Quote Widget */}
        <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 text-brand-accent rounded-2xl flex items-center justify-center">
              <FileText size={22} />
            </div>
            <span className="text-[10px] bg-slate-800 text-brand-accent border border-brand-accent/20 px-2 py-0.5 rounded-full font-bold">
              {newQuotesCount} NEW
            </span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Quote Requests</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-3xl font-bold text-white">{totalQuotes}</h3>
            <span className="text-emerald-500 text-xs font-bold flex items-center">
              <TrendingUp size={12} className="mr-0.5" /> +15%
            </span>
          </div>
        </div>

        {/* Shipment Widget */}
        <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center">
              <Truck size={22} />
            </div>
            <span className="text-[10px] bg-slate-800 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold">
              {activeShipmentsCount} ACTIVE
            </span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Active Shipments</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-3xl font-bold text-white">{totalShipments}</h3>
            <span className="text-emerald-500 text-xs font-bold flex items-center">
              <TrendingUp size={12} className="mr-0.5" /> +8%
            </span>
          </div>
        </div>

        {/* Message Widget */}
        <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center">
              <Mail size={22} />
            </div>
            <span className="text-[10px] bg-slate-800 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full font-bold">
              {unreadMessagesCount} UNREAD
            </span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Inbox Messages</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-3xl font-bold text-white">{totalMessages}</h3>
            <span className="text-slate-500 text-xs font-bold">Inbox items</span>
          </div>
        </div>

        {/* Subscribers Widget */}
        <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
              <Users size={22} />
            </div>
            <span className="text-[10px] bg-slate-800 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
              +3 TODAY
            </span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Newsletter Database</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-3xl font-bold text-white">{totalSubs}</h3>
            <span className="text-emerald-500 text-xs font-bold flex items-center">
              <TrendingUp size={12} className="mr-0.5" /> +24%
            </span>
          </div>
        </div>

      </div>

      {/* Analytical Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Weekly Quote Trends Chart (Pure CSS + SVG Curve Overlay) */}
        <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/5 rounded-full filter blur-[50px] pointer-events-none"></div>
          <div>
            <h3 className="text-lg font-heading font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-accent shrink-0"></span>
              Quote Submission Volume
            </h3>
            <p className="text-xs text-slate-400 mb-8 font-medium">Weekly submission trends for freight calculations.</p>
          </div>
          
          {/* Chart Columns & Trajectory Area */}
          <div className="flex items-end justify-between h-48 px-2 md:px-6 relative">
            {/* Grid background lines */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none border-b border-slate-800/40">
              <div className="w-full border-t border-slate-800/20 h-0"></div>
              <div className="w-full border-t border-slate-800/20 h-0"></div>
              <div className="w-full border-t border-slate-800/20 h-0"></div>
              <div className="w-full border-t border-slate-800/20 h-0"></div>
            </div>
            
            {/* SVG Glowing Trajectory Line Overlay */}
            <svg className="absolute inset-x-0 bottom-10 top-0 w-full h-[70%] pointer-events-none z-20 opacity-80" viewBox="0 0 700 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffedd5" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="chartAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Shaded Area */}
              <path d="M 50 200 L 50 140 L 150 110 L 250 80 L 350 120 L 450 60 L 550 90 L 650 40 L 650 200 Z" fill="url(#chartAreaGrad)" />
              {/* Trajectory Stroke */}
              <path 
                d="M 50 140 L 150 110 L 250 80 L 350 120 L 450 60 L 550 90 L 650 40" 
                fill="none" 
                stroke="url(#chartLineGrad)" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            
            {/* Render Bars */}
            {quoteTrends.map((t, idx) => {
              const heightPct = (t.count / maxTrendVal) * 80;
              return (
                <div key={idx} className="flex flex-col items-center flex-1 group/bar relative z-10">
                  {/* Tooltip */}
                  <span className="opacity-0 group-hover/bar:opacity-100 transition-opacity bg-brand-accent text-white text-[10px] font-extrabold px-2.5 py-1 rounded-xl absolute -top-8 pointer-events-none shadow-md z-30 font-mono">
                    {t.count} quotes
                  </span>
                  {/* Visual Bar with tailwind styled gradient */}
                  <div 
                    style={{ height: `${heightPct}%`, minHeight: "8px" }} 
                    className="w-8 sm:w-10 rounded-t-lg bg-slate-900/60 border border-slate-800 group-hover/bar:bg-gradient-to-t group-hover/bar:from-brand-accent group-hover/bar:to-orange-400 group-hover/bar:border-orange-400 transition-all duration-300 shadow-lg"
                  ></div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase mt-3 font-mono">{t.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shipment Capacity Allocation (SVG Donut Chart + Details) */}
        <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full filter blur-[50px] pointer-events-none"></div>
          <div>
            <h3 className="text-lg font-heading font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
              Shipment Capacity Allocation
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-medium">Split statistics based on delivery operations.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between my-auto">
            {/* SVG Circular Donut Chart */}
            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                {/* Background tracks */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1e293b" strokeWidth="3" />
                
                {/* Segment: Delivered (Green) */}
                <circle 
                  cx="18" cy="18" r="15.915" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="3.5" 
                  strokeDasharray={`${totalShipments > 0 ? (deliveredShipmentsCount/totalShipments)*100 : 0} ${totalShipments > 0 ? 100 - (deliveredShipmentsCount/totalShipments)*100 : 100}`}
                  strokeDashoffset="0"
                />

                {/* Segment: In Transit (Blue) */}
                <circle 
                  cx="18" cy="18" r="15.915" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="3.5" 
                  strokeDasharray={`${totalShipments > 0 ? (activeShipmentsCount/totalShipments)*100 : 0} ${totalShipments > 0 ? 100 - (activeShipmentsCount/totalShipments)*100 : 100}`}
                  strokeDashoffset={`-${totalShipments > 0 ? (deliveredShipmentsCount/totalShipments)*100 : 0}`}
                />

                {/* Segment: Delayed (Orange) */}
                <circle 
                  cx="18" cy="18" r="15.915" 
                  fill="none" 
                  stroke="#f97316" 
                  strokeWidth="3.5" 
                  strokeDasharray={`${totalShipments > 0 ? (delayedShipmentsCount/totalShipments)*100 : 0} ${totalShipments > 0 ? 100 - (delayedShipmentsCount/totalShipments)*100 : 100}`}
                  strokeDashoffset={`-${totalShipments > 0 ? ((deliveredShipmentsCount + activeShipmentsCount)/totalShipments)*100 : 0}`}
                />
              </svg>
              {/* Pulser core */}
              <div className="absolute w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex flex-col items-center justify-center font-mono">
                <span className="text-[9px] text-slate-500 font-extrabold uppercase leading-none mb-1">TOTAL</span>
                <span className="text-lg font-bold text-white leading-none">{totalShipments}</span>
              </div>
            </div>

            {/* Progress Bars & Labels */}
            <div className="flex-1 space-y-4 w-full">
              {/* Delivered */}
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-bold">
                  <span className="text-slate-350 flex items-center">
                    <span className="w-2 h-2 rounded bg-emerald-500 mr-1.5 shrink-0"></span>
                    Delivered
                  </span>
                  <span className="text-slate-400">{deliveredShipmentsCount} ({totalShipments > 0 ? Math.round((deliveredShipmentsCount/totalShipments)*100) : 0}%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-850 overflow-hidden">
                  <div 
                    style={{ width: `${totalShipments > 0 ? (deliveredShipmentsCount/totalShipments)*100 : 0}%` }} 
                    className="h-full bg-emerald-500 rounded-full"
                  ></div>
                </div>
              </div>

              {/* In Transit */}
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-bold">
                  <span className="text-slate-350 flex items-center">
                    <span className="w-2 h-2 rounded bg-blue-500 mr-1.5 shrink-0"></span>
                    In-Transit
                  </span>
                  <span className="text-slate-400">{activeShipmentsCount} ({totalShipments > 0 ? Math.round((activeShipmentsCount/totalShipments)*100) : 0}%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-850 overflow-hidden">
                  <div 
                    style={{ width: `${totalShipments > 0 ? (activeShipmentsCount/totalShipments)*100 : 0}%` }} 
                    className="h-full bg-blue-500 rounded-full"
                  ></div>
                </div>
              </div>

              {/* Delayed */}
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-bold">
                  <span className="text-slate-350 flex items-center">
                    <span className="w-2 h-2 rounded bg-orange-500 mr-1.5 shrink-0"></span>
                    Delayed
                  </span>
                  <span className="text-slate-400">{delayedShipmentsCount} ({totalShipments > 0 ? Math.round((delayedShipmentsCount/totalShipments)*100) : 0}%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-850 overflow-hidden">
                  <div 
                    style={{ width: `${totalShipments > 0 ? (delayedShipmentsCount/totalShipments)*100 : 0}%` }} 
                    className="h-full bg-orange-500 rounded-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/40 text-center mt-4">
            <Link 
              href="/admin/shipments" 
              className="text-xs font-bold text-brand-accent hover:underline inline-flex items-center"
            >
              Operations Center <ArrowRight size={12} className="ml-1" />
            </Link>
          </div>
        </div>

      </div>

      {/* Recents & Audit Logging Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Quotes */}
        <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-heading font-bold text-white">Recent Quote Requests</h3>
              <Link href="/admin/quotes" className="text-xs text-brand-accent hover:underline font-bold">All</Link>
            </div>
            {recentQuotes.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No quote requests submitted yet.
              </div>
            ) : (
              <div className="space-y-4">
                {recentQuotes.map((q) => (
                  <div key={q.id} className="p-4 border border-slate-850 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 transition-colors flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white">{q.name}</h4>
                      <p className="text-slate-400 text-[10px] mt-0.5">{q.company} • {q.serviceType}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                      q.status === "New" ? "bg-orange-500/20 text-brand-accent" :
                      q.status === "Accepted" ? "bg-emerald-500/20 text-emerald-400" :
                      "bg-slate-800 text-slate-400"
                    }`}>
                      {q.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-heading font-bold text-white">Inbox Inquiries</h3>
              <Link href="/admin/messages" className="text-xs text-brand-accent hover:underline font-bold">All</Link>
            </div>
            {recentMessages.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No messages received yet.
              </div>
            ) : (
              <div className="space-y-4">
                {recentMessages.map((m) => (
                  <div key={m.id} className="p-4 border border-slate-850 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 transition-colors">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-bold text-sm text-white truncate max-w-[150px]">{m.name}</h4>
                      <span className="text-[9px] text-slate-500">{m.createdDate.substring(0, 10)}</span>
                    </div>
                    <p className="text-slate-400 text-[10px] truncate">{m.subject || "No Subject"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick System Audit Logger */}
        <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-heading font-bold text-white">System Security Log</h3>
              <Link href="/admin/settings" className="text-xs text-brand-accent hover:underline font-bold">Logs</Link>
            </div>
            <div className="space-y-4">
              {recentLogs.map((l) => (
                <div key={l.id} className="flex space-x-3 text-xs">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                    l.action.includes("Success") || l.action.includes("Create") ? "bg-emerald-500/10 text-emerald-400" :
                    l.action.includes("Delete") ? "bg-red-500/10 text-red-400" :
                    "bg-slate-800 text-slate-400"
                  }`}>
                    <UserCheck size={12} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-slate-300 font-bold truncate">{l.action}</p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">{l.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
