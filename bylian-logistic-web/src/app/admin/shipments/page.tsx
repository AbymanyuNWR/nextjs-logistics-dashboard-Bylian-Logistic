"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Truck, PlusCircle, Search, Filter, Calendar, MapPin, 
  CheckCircle2, AlertTriangle, Eye, X, Edit, Plus, Info, Check
} from "lucide-react";
import { useAdminState } from "@/context/AdminStateContext";
import { TrackingStatus } from "@/data/tracking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminShipmentsPage() {
  const searchParams = useSearchParams();
  const { shipments, addShipment, updateShipmentStatus, settings, addAudit } = useAdminState();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<TrackingStatus["status"] | "All">("All");
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");
  
  // Create Form State
  const [newShipmentData, setNewShipmentData] = useState({
    id: "",
    service: "Land Freight",
    origin: "",
    destination: "",
    estimatedDelivery: "",
    currentLocation: "",
    receiver: "",
    weight: "",
    pieces: ""
  });
  
  // Prefill Check Banner
  const [prefilledFromQuote, setPrefilledFromQuote] = useState<string | null>(null);

  // Edit / Status Updater State
  const [selectedShipment, setSelectedShipment] = useState<TrackingStatus | null>(null);
  const [newStatus, setNewStatus] = useState<TrackingStatus["status"]>("In Transit");
  const [updateLocation, setUpdateLocation] = useState("");
  const [checkpointNote, setCheckpointNote] = useState("");

  // Handle Prefills from Quote Page Conversion
  useEffect(() => {
    const prefillTrigger = searchParams.get("prefill") === "true";
    if (prefillTrigger) {
      const savedPrefill = sessionStorage.getItem("bylian_convert_quote");
      if (savedPrefill) {
        const parsed = JSON.parse(savedPrefill);
        
        // Generate a random tracking ID number
        const randId = Math.floor(1000 + Math.random() * 9000);
        const autoTrackingId = `${settings.trackingPrefix}${randId}`;

        setNewShipmentData({
          id: autoTrackingId,
          service: parsed.service,
          origin: parsed.origin !== "Not specified" ? parsed.origin : "",
          destination: parsed.destination !== "Not specified" ? parsed.destination : "",
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10), // +7 days default
          currentLocation: parsed.origin !== "Not specified" ? parsed.origin : "Hub Center",
          receiver: parsed.receiver,
          weight: parsed.weight !== "Not specified" ? parsed.weight : "",
          pieces: parsed.pieces !== "Not specified" ? parsed.pieces : "1 Lot"
        });

        setPrefilledFromQuote(parsed.quoteId);
        setActiveTab("create");
      }
    }
  }, [searchParams, settings]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { id, service, origin, destination, estimatedDelivery, currentLocation, receiver, weight, pieces } = newShipmentData;
    
    if (!id || !origin || !destination || !receiver) {
      alert("Please fill in all required fields.");
      return;
    }

    addShipment({
      id,
      status: "Pending Pickup",
      origin,
      destination,
      estimatedDelivery,
      currentLocation: currentLocation || origin,
      receiver,
      details: {
        service,
        weight: weight || "Not specified",
        pieces: pieces || "1 Lot"
      }
    });

    // Clear prefill trigger if active
    if (prefilledFromQuote) {
      sessionStorage.removeItem("bylian_convert_quote");
      setPrefilledFromQuote(null);
    }

    // Reset Form
    setNewShipmentData({
      id: "",
      service: "Land Freight",
      origin: "",
      destination: "",
      estimatedDelivery: "",
      currentLocation: "",
      receiver: "",
      weight: "",
      pieces: ""
    });

    // Go back to List
    setActiveTab("list");
  };

  const handleOpenStatusDrawer = (s: TrackingStatus) => {
    setSelectedShipment(s);
    setNewStatus(s.status);
    setUpdateLocation(s.currentLocation);
    setCheckpointNote("");
  };

  const handleSaveStatusUpdate = () => {
    if (!selectedShipment) return;

    updateShipmentStatus(
      selectedShipment.id,
      newStatus,
      updateLocation || selectedShipment.currentLocation,
      checkpointNote || undefined
    );

    // Close
    setSelectedShipment(null);
  };

  const generateRandomID = () => {
    const randNum = Math.floor(100 + Math.random() * 900);
    setNewShipmentData(prev => ({
      ...prev,
      id: `${settings.trackingPrefix}${randNum}`
    }));
  };

  const filteredShipments = shipments.filter((s) => {
    const matchesSearch = s.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || s.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 font-sans text-slate-100 relative">
      
      {/* Title & Nav Tabs */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Operations & Logistics Hub</h2>
          <p className="text-xs text-slate-400">Generate tracking codes, schedule cargo routes, and log shipment updates.</p>
        </div>
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => { setActiveTab("list"); if (prefilledFromQuote) { sessionStorage.removeItem("bylian_convert_quote"); setPrefilledFromQuote(null); } }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "list" ? "bg-brand-accent text-white" : "text-slate-400 hover:text-white"}`}
          >
            Active Shipments
          </button>
          <button
            onClick={() => { setActiveTab("create"); generateRandomID(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "create" ? "bg-brand-accent text-white" : "text-slate-400 hover:text-white"}`}
          >
            Generate Shipment
          </button>
        </div>
      </div>

      {activeTab === "list" ? (
        <>
          {/* Filters & Searches */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {["All", "Pending Pickup", "In Transit", "Delivered", "Delayed"].map((status) => (
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

            {/* Searches */}
            <div className="relative w-full md:w-80">
              <Input
                type="text"
                placeholder="Search tracking, clients, routes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-brand-accent focus-visible:border-transparent"
              />
              <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
            </div>

          </div>

          {/* Database Grid */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <th className="p-5">Tracking ID</th>
                    <th className="p-5">Client / Receiver</th>
                    <th className="p-5">Route Path</th>
                    <th className="p-5">Estimated Delivery</th>
                    <th className="p-5">Current Node</th>
                    <th className="p-5">Status</th>
                    <th className="p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
                  {filteredShipments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-slate-500 text-xs">
                        No shipments tracked in active database splits.
                      </td>
                    </tr>
                  ) : (
                    filteredShipments.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-900/25 transition-colors">
                        <td className="p-5 font-mono font-bold text-white">{s.id}</td>
                        <td className="p-5">
                          <div className="font-bold text-white">{s.receiver}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{s.details.service}</div>
                        </td>
                        <td className="p-5">
                          <div className="text-slate-200 font-medium">{s.origin}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">To: {s.destination}</div>
                        </td>
                        <td className="p-5 text-slate-400 text-xs">{s.estimatedDelivery}</td>
                        <td className="p-5">
                          <div className="text-slate-200 text-xs truncate max-w-[150px]">{s.currentLocation}</div>
                        </td>
                        <td className="p-5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            s.status === "Delivered" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" :
                            s.status === "In Transit" ? "bg-blue-500/15 text-blue-400 border border-blue-500/20" :
                            s.status === "Delayed" ? "bg-brand-accent/15 text-brand-accent border border-brand-accent/20" :
                            "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="p-5 text-right">
                          <Button 
                            onClick={() => handleOpenStatusDrawer(s)}
                            size="sm" 
                            className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold"
                          >
                            <Edit size={12} className="mr-1.5" /> Update Logs
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* CREATE SHIPMENT FORM SCREEN */
        <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-xl max-w-3xl mx-auto space-y-6">
          
          {/* Prefill Conversion Notification */}
          {prefilledFromQuote && (
            <div className="bg-orange-500/10 border border-brand-accent/20 p-4 rounded-2xl flex items-center space-x-3 text-brand-accent text-xs">
              <Info size={16} className="shrink-0" />
              <p>
                <strong>Quote Conversion Alert:</strong> Prefilling details from Accepted Sales Quote <strong className="font-mono">{prefilledFromQuote}</strong>.
              </p>
            </div>
          )}

          <h3 className="text-lg font-heading font-bold text-white flex items-center">
            <PlusCircle size={20} className="text-brand-accent mr-2" />
            Generate New Dispatch Shipment
          </h3>
          
          <form onSubmit={handleCreateSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Tracking ID */}
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Tracking Code (Searchable ID)</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="e.g. BYL-2026-999"
                    value={newShipmentData.id}
                    onChange={(e) => setNewShipmentData(prev => ({ ...prev, id: e.target.value }))}
                    className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-650 h-12"
                    required
                  />
                  <Button 
                    type="button" 
                    onClick={generateRandomID}
                    className="bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-3"
                  >
                    Auto
                  </Button>
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Freight Delivery Service</label>
                <select
                  value={newShipmentData.service}
                  onChange={(e) => setNewShipmentData(prev => ({ ...prev, service: e.target.value }))}
                  className="w-full h-12 bg-slate-900 border border-slate-800 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent px-3 text-white"
                  required
                >
                  <option value="Land Freight">Land Freight</option>
                  <option value="Maritime Freight">Maritime Freight</option>
                  <option value="Train Freight">Train Freight</option>
                  <option value="Air Cargo Support">Air Cargo Support</option>
                  <option value="Warehousing">Warehousing</option>
                  <option value="Last Mile Delivery">Last Mile Delivery</option>
                </select>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Origin Location */}
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Origin Dispatch City / Node *</label>
                <Input
                  type="text"
                  placeholder="e.g. Jakarta Hub, ID"
                  value={newShipmentData.origin}
                  onChange={(e) => setNewShipmentData(prev => ({ ...prev, origin: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white h-12"
                  required
                />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Destination Cargo Destination *</label>
                <Input
                  type="text"
                  placeholder="e.g. Singapore Port, SG"
                  value={newShipmentData.destination}
                  onChange={(e) => setNewShipmentData(prev => ({ ...prev, destination: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white h-12"
                  required
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Receiver Client Name */}
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Receiver Consignee Name *</label>
                <Input
                  type="text"
                  placeholder="e.g. PT Retail Nusantara"
                  value={newShipmentData.receiver}
                  onChange={(e) => setNewShipmentData(prev => ({ ...prev, receiver: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white h-12"
                  required
                />
              </div>

              {/* Est delivery */}
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Preferred Estimated Delivery</label>
                <Input
                  type="date"
                  value={newShipmentData.estimatedDelivery}
                  onChange={(e) => setNewShipmentData(prev => ({ ...prev, estimatedDelivery: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white h-12"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Cargo Weight */}
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Cargo Net Weight</label>
                <Input
                  type="text"
                  placeholder="e.g. 350 kg or 12 Metric Ton"
                  value={newShipmentData.weight}
                  onChange={(e) => setNewShipmentData(prev => ({ ...prev, weight: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white h-12"
                />
              </div>

              {/* Quantity Pieces */}
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Quantity Load Pieces</label>
                <Input
                  type="text"
                  placeholder="e.g. 5 Pallets or 120 Boxes"
                  value={newShipmentData.pieces}
                  onChange={(e) => setNewShipmentData(prev => ({ ...prev, pieces: e.target.value }))}
                  className="bg-slate-900 border-slate-800 text-white h-12"
                />
              </div>

            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-4 border-t border-slate-850 justify-end">
              <Button
                type="button"
                onClick={() => { setActiveTab("list"); if (prefilledFromQuote) { sessionStorage.removeItem("bylian_convert_quote"); setPrefilledFromQuote(null); } }}
                variant="outline"
                className="h-12 border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-12 bg-brand-accent text-white hover:bg-brand-accent-hover font-bold px-8"
              >
                Generate Shipment Dispatch
              </Button>
            </div>

          </form>

        </div>
      )}

      {/* UPDATE STATUS DRAWERS SLIDEOUT OVERLAY */}
      {selectedShipment && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop closer */}
          <div 
            onClick={() => setSelectedShipment(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          ></div>
          
          {/* Drawer Body Panel */}
          <div className="relative w-full max-w-xl bg-slate-950 border-l border-slate-800 h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 text-slate-100">
            
            {/* Header */}
            <div className="h-20 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900/40">
              <div className="flex items-center space-x-3">
                <Truck className="text-brand-accent" size={20} />
                <div>
                  <h3 className="font-heading font-bold text-white leading-none">Update Shipment Logs</h3>
                  <span className="text-[10px] text-slate-500 mt- block font-mono">{selectedShipment.id} • Receiver: {selectedShipment.receiver}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedShipment(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable specs */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800">
              
              {/* Shipment spec preview card */}
              <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-2xl grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500">Service Class:</span> <span className="font-bold text-white">{selectedShipment.details.service}</span>
                </div>
                <div>
                  <span className="text-slate-500">Est. Delivery:</span> <span className="font-bold text-white">{selectedShipment.estimatedDelivery}</span>
                </div>
                <div>
                  <span className="text-slate-500">Origin Route:</span> <span className="font-bold text-white">{selectedShipment.origin}</span>
                </div>
                <div>
                  <span className="text-slate-500">Destination:</span> <span className="font-bold text-white">{selectedShipment.destination}</span>
                </div>
              </div>

              {/* Status parameters editor */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Log Dispatch Parameters</h4>
                
                {/* Status selector */}
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Transit Node Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full h-11 bg-slate-900 border border-slate-800 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent px-3 text-white"
                  >
                    <option value="Pending Pickup">Pending Pickup</option>
                    <option value="In Transit">Active In-Transit</option>
                    <option value="Delivered">Delivered Cargo</option>
                    <option value="Delayed">Delayed Exception</option>
                  </select>
                </div>

                {/* Current location input */}
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Current Location Node</label>
                  <Input
                    type="text"
                    placeholder="e.g. Cirebon Transit Hub, ID"
                    value={updateLocation}
                    onChange={(e) => setUpdateLocation(e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white h-11"
                  />
                </div>

                {/* Checkpoint timeline description */}
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase font-bold mb-2">Checkpoint Log Timeline Entry (What is happening?)</label>
                  <textarea
                    placeholder="Provide a detailed log e.g., Cargo processed, customs clearances at Tanjung Priok, out for final distribution..."
                    value={checkpointNote}
                    onChange={(e) => setCheckpointNote(e.target.value)}
                    className="w-full h-24 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent resize-y text-slate-100"
                  ></textarea>
                  <p className="text-[10px] text-slate-500 mt-1">This timeline checkpoint entry will show up instantly on the user tracking history timeline!</p>
                </div>

              </div>

              {/* Historical Timeline logs list */}
              <div className="space-y-4 border-t border-slate-800 pt-6">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tracking Timeline History</h4>
                <div className="relative border-l border-slate-800 ml-4 space-y-4">
                  {selectedShipment.timeline.map((event, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div className="absolute -left-[5.5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-accent border border-slate-950"></div>
                      <div className="text-xs">
                        <span className="font-bold text-white">{event.status}</span>
                        <p className="text-slate-400 mt-0.5">{event.location} • {event.date} {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Actions Bar */}
            <div className="p-6 border-t border-slate-800 flex gap-3 shrink-0 bg-slate-900/40">
              <Button 
                onClick={() => setSelectedShipment(null)}
                variant="outline" 
                className="flex-1 h-12 border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveStatusUpdate}
                className="flex-1 h-12 bg-brand-accent text-white hover:bg-brand-accent-hover font-bold"
              >
                Save Dispatch Update <Check size={14} className="ml-1.5" />
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
