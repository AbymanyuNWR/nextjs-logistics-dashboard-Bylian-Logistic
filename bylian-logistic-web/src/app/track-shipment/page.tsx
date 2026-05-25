"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Truck, CheckCircle2, Package, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminState } from "@/context/AdminStateContext";
import { TrackingStatus } from "@/data/tracking";

function TrackingInterface() {
  const { shipments } = useAdminState();
  const searchParams = useSearchParams();
  const initialTracking = searchParams.get("tracking") || "";

  const [trackingId, setTrackingId] = useState(initialTracking);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "not_found">("idle");
  const [result, setResult] = useState<TrackingStatus | null>(null);

  useEffect(() => {
    if (initialTracking) {
      handleSearch(initialTracking);
    }
  }, [initialTracking, shipments]); // include shipments in dependency array to react to admin additions

  const handleSearch = (idToSearch: string) => {
    if (!idToSearch) return;
    
    setStatus("loading");
    setSearchQuery(idToSearch);
    
    // Simulate API delay
    setTimeout(() => {
      const found = shipments.find(t => t.id.toLowerCase() === idToSearch.toLowerCase());
      if (found) {
        setResult(found);
        setStatus("found");
      } else {
        setResult(null);
        setStatus("not_found");
      }
    }, 1200);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(trackingId);
  };

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Search Form */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-brand-border relative z-10 mb-[-4rem]">
        <h3 className="text-2xl font-heading font-bold text-brand-primary mb-2">Track Your Shipment</h3>
        <p className="text-brand-text-muted mb-8">Enter your tracking ID below to get real-time status updates.</p>
        
        <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Input 
              type="text" 
              placeholder="Enter Tracking ID (e.g. BYL-2026-001)" 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="pl-12 h-14 bg-brand-bg-light border-brand-border text-lg font-medium"
              required
            />
            <Package size={24} className="absolute left-4 top-4 text-brand-primary" />
          </div>
          <Button type="submit" size="lg" className="h-14 px-8" disabled={status === "loading"}>
            {status === "loading" ? "Searching..." : (
              <>Track Now <Search size={20} className="ml-2" /></>
            )}
          </Button>
        </form>
      </div>

      {/* Results Area */}
      <div className="pt-24 pb-12 px-4 md:px-12 bg-brand-bg-light rounded-b-3xl border border-t-0 border-brand-border min-h-[400px]">
        
        {status === "idle" && (
          <div className="h-full flex flex-col items-center justify-center text-center text-brand-text-muted py-12">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
              <MapPin size={32} className="text-brand-border" />
            </div>
            <p className="text-lg">Please enter a tracking ID to view shipment details.</p>
            <p className="text-sm mt-2">Hint: Try <span className="font-bold text-brand-primary cursor-pointer hover:underline" onClick={() => {setTrackingId("BYL-2026-001"); handleSearch("BYL-2026-001")}}>BYL-2026-001</span> or <span className="font-bold text-brand-primary cursor-pointer hover:underline" onClick={() => {setTrackingId("BYL-2026-002"); handleSearch("BYL-2026-002")}}>BYL-2026-002</span></p>
          </div>
        )}

        {status === "loading" && (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-12 h-12 border-4 border-brand-border border-t-brand-accent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium text-brand-primary">Locating your shipment...</p>
          </div>
        )}

        {status === "not_found" && (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 bg-brand-error/10 text-brand-error rounded-full flex items-center justify-center mb-6">
              <AlertCircle size={40} />
            </div>
            <h4 className="text-2xl font-heading font-bold text-brand-primary mb-2">Shipment Not Found</h4>
            <p className="text-brand-text-muted text-lg mb-6 max-w-md mx-auto">
              We couldn't find any shipment matching ID "{searchQuery}". Please check the ID and try again.
            </p>
            <Button variant="outline" onClick={() => setStatus("idle")}>Try Another ID</Button>
          </div>
        )}

        {status === "found" && result && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Header Info */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-border mb-8 flex flex-wrap justify-between items-center gap-6">
              <div>
                <p className="text-sm text-brand-text-muted mb-1 font-bold uppercase tracking-wider">Tracking ID</p>
                <h4 className="text-xl font-heading font-bold text-brand-primary">{result.id}</h4>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-sm text-brand-text-muted mb-1 font-bold uppercase tracking-wider">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    result.status === 'Delivered' ? 'bg-brand-success/10 text-brand-success' :
                    result.status === 'In Transit' ? 'bg-brand-accent/10 text-brand-accent' :
                    result.status === 'Exception' ? 'bg-brand-error/10 text-brand-error' :
                    'bg-brand-warning/10 text-brand-warning'
                  }`}>
                    {result.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-brand-text-muted mb-1 font-bold uppercase tracking-wider">Est. Delivery</p>
                  <p className="font-bold text-brand-primary">{result.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Visual Cargo Route Map */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-850 shadow-xl mb-8 relative overflow-hidden text-white">
              {/* Radar Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full filter blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h4 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-ping"></span>
                    Live Transit Route Map
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">Interactive radar mapping of active logistics channels.</p>
                </div>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-350">
                  <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                    <span className="text-slate-500 mr-1">CARRIER:</span> BYLIAN LOGISTICS
                  </div>
                  <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                    <span className="text-slate-500 mr-1">LAT/LNG:</span> {
                      result.status === "Delivered" ? "-1.2921° S, 103.7831° E" :
                      result.status === "Pending Pickup" ? "-6.2088° S, 106.8456° E" :
                      "-6.9667° S, 110.4167° E"
                    }
                  </div>
                </div>
              </div>

              {/* Glowing Interactive Vector Map Canvas */}
              <div className="h-64 bg-slate-900/40 rounded-2xl border border-slate-850 relative flex items-center justify-center p-6 overflow-hidden">
                
                {/* Visual Route Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  
                  {/* Glowing path */}
                  <path 
                    d="M 120 120 Q 300 40 480 120" 
                    fill="none" 
                    stroke="#f97316" 
                    strokeWidth="6" 
                    strokeOpacity="0.1" 
                    strokeLinecap="round" 
                  />
                  {/* Dashed line */}
                  <path 
                    d="M 120 120 Q 300 40 480 120" 
                    fill="none" 
                    stroke="url(#routeGrad)" 
                    strokeWidth="3" 
                    strokeDasharray="6 4" 
                    strokeLinecap="round"
                  />
                </svg>

                {/* Pulse wave at origin */}
                <div className="absolute left-[80px] md:left-[120px] top-[120px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center relative">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mt-2">{result.origin.split(",")[0]}</span>
                </div>

                {/* Pulse wave at destination */}
                <div className="absolute right-[80px] md:right-[120px] top-[120px] translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center relative">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mt-2">{result.destination.split(",")[0]}</span>
                </div>

                {/* Pulsing Sonar Ring & Center Marker */}
                {result.status === "In Transit" && (
                  <div className="absolute left-1/2 top-[80px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                    <span className="absolute w-10 h-10 rounded-full border border-brand-accent/40 animate-ping pointer-events-none"></span>
                    <div className="w-9 h-9 rounded-xl bg-brand-accent border border-orange-400 text-white flex items-center justify-center shadow-lg shadow-brand-accent/35 relative">
                      <Truck size={16} />
                    </div>
                    <span className="text-[10px] font-extrabold text-brand-accent uppercase tracking-wide mt-2 bg-slate-950/80 border border-slate-800 px-2.5 py-0.5 rounded-full shadow-sm truncate max-w-[150px]">
                      {result.currentLocation.split(" ")[0]}
                    </span>
                  </div>
                )}

                {result.status === "Delivered" && (
                  <div className="absolute right-[80px] md:right-[120px] top-[120px] translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                    <span className="absolute w-10 h-10 rounded-full border border-emerald-500/40 animate-ping pointer-events-none"></span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 border border-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/35 relative">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wide mt-2 bg-slate-950/80 border border-slate-800 px-2.5 py-0.5 rounded-full shadow-sm">
                      Delivered
                    </span>
                  </div>
                )}

                {result.status === "Pending Pickup" && (
                  <div className="absolute left-[80px] md:left-[120px] top-[120px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                    <span className="absolute w-10 h-10 rounded-full border border-amber-500/40 animate-ping pointer-events-none"></span>
                    <div className="w-9 h-9 rounded-xl bg-amber-500 border border-amber-400 text-white flex items-center justify-center shadow-lg shadow-amber-500/35 relative">
                      <Package size={16} />
                    </div>
                    <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wide mt-2 bg-slate-950/80 border border-slate-800 px-2.5 py-0.5 rounded-full shadow-sm">
                      Pending
                    </span>
                  </div>
                )}

              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Timeline */}
              <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-brand-border">
                <h4 className="text-xl font-heading font-bold text-brand-primary mb-8">Tracking History</h4>
                
                <div className="relative border-l-2 border-brand-border ml-4 space-y-8">
                  {result.timeline.map((event, i) => {
                    const isLatest = i === 0;
                    return (
                      <div key={i} className="relative pl-8">
                        <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center border-4 ${
                          isLatest 
                            ? 'bg-brand-accent border-brand-bg-light shadow-md' 
                            : 'bg-brand-border border-white'
                        }`}>
                          {isLatest ? <Truck size={12} className="text-white" /> : <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                        <div className={`${isLatest ? 'opacity-100' : 'opacity-70'}`}>
                          <h5 className={`text-lg font-bold ${isLatest ? 'text-brand-accent' : 'text-brand-primary'} mb-1`}>{event.status}</h5>
                          <p className="text-brand-text-dark font-medium mb-1">{event.location}</p>
                          <p className="text-sm text-brand-text-muted flex items-center">
                            {event.date} • {event.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-border">
                  <h4 className="font-bold text-brand-primary mb-4 pb-4 border-b border-brand-border">Origin & Destination</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-brand-bg-light flex items-center justify-center text-brand-text-muted shrink-0 mt-0.5">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-brand-text-muted font-bold uppercase tracking-wider mb-1">From</p>
                        <p className="font-medium text-brand-primary text-sm">{result.origin}</p>
                      </div>
                    </div>
                    <div className="ml-4 border-l-2 border-dashed border-brand-border h-4"></div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-brand-text-muted font-bold uppercase tracking-wider mb-1">To</p>
                        <p className="font-medium text-brand-primary text-sm">{result.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-border">
                  <h4 className="font-bold text-brand-primary mb-4 pb-4 border-b border-brand-border">Shipment Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-brand-text-muted text-sm">Service</span>
                      <span className="font-medium text-brand-primary text-sm">{result.details.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-muted text-sm">Weight</span>
                      <span className="font-medium text-brand-primary text-sm">{result.details.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-muted text-sm">Pieces</span>
                      <span className="font-medium text-brand-primary text-sm">{result.details.pieces}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackShipmentPage() {
  return (
    <>
      <PageHeader 
        title="Track Shipment" 
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Track" }
        ]} 
      />

      <section className="py-24 bg-white min-h-[80vh]">
        <div className="container mx-auto max-w-7xl px-4">
          <Suspense fallback={<div className="h-64 flex items-center justify-center"><p>Loading tracking interface...</p></div>}>
            <TrackingInterface />
          </Suspense>
        </div>
      </section>
    </>
  );
}
