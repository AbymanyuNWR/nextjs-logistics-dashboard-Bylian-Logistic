export type TrackingTimelineItem = {
  status: string;
  location: string;
  date: string;
  time: string;
};

export type TrackingStatus = {
  id: string;
  status: 'Pending Pickup' | 'In Transit' | 'Delivered' | 'Delayed' | 'Exception';
  estimatedDelivery: string;
  origin: string;
  destination: string;
  receiver: string;
  currentLocation: string;
  details: {
    service: string;
    weight: string;
    pieces: string;
  };
  timeline: TrackingTimelineItem[];
};

export const trackingData: TrackingStatus[] = [
  {
    id: "BYL-2026-001",
    status: "In Transit",
    estimatedDelivery: "June 02, 2026",
    origin: "Jakarta, ID",
    destination: "Surabaya, ID",
    receiver: "PT Retail Nusantara",
    currentLocation: "Semarang Distribution Hub",
    details: {
      service: "Land Freight (Express)",
      weight: "250 kg",
      pieces: "5 Pallets"
    },
    timeline: [
      { status: "In Transit", location: "Semarang Distribution Hub", date: "May 29, 2026", time: "16:40" },
      { status: "Arrived at Sorting Hub", location: "Semarang Sorting Center", date: "May 29, 2026", time: "08:15" },
      { status: "Package Picked Up", location: "Jakarta Main Warehouse", date: "May 28, 2026", time: "14:30" },
      { status: "Shipment Created", location: "Client Office", date: "May 28, 2026", time: "09:00" }
    ]
  },
  {
    id: "BYL-2026-002",
    status: "Delivered",
    estimatedDelivery: "May 20, 2026",
    origin: "Jakarta Port (Tanjung Priok)",
    destination: "Singapore Port (Keppel)",
    receiver: "Singapore Consignee Warehouse",
    currentLocation: "Singapore Consignee Warehouse",
    details: {
      service: "Maritime Freight (FCL)",
      weight: "18,400 kg",
      pieces: "1 x 40ft Container"
    },
    timeline: [
      { status: "Delivered", location: "Singapore Consignee Warehouse", date: "May 20, 2026", time: "15:30" },
      { status: "Customs Cleared", location: "Singapore Customs Office", date: "May 19, 2026", time: "11:10" },
      { status: "Arrived Destination Port", location: "Singapore Port Terminal", date: "May 18, 2026", time: "09:45" },
      { status: "Departed Port", location: "Jakarta International Port", date: "May 12, 2026", time: "18:00" },
      { status: "Container Loaded", location: "Jakarta Loading Bay", date: "May 11, 2026", time: "12:00" },
      { status: "Shipment Created", location: "Client Office", date: "May 10, 2026", time: "10:00" }
    ]
  },
  {
    id: "BYL-2026-003",
    status: "Pending Pickup",
    estimatedDelivery: "June 05, 2026",
    origin: "Bandung Warehouse",
    destination: "Jakarta Retail Store",
    receiver: "Jakarta Retail Store",
    currentLocation: "Bandung Warehouse",
    details: {
      service: "Warehouse & Delivery Support",
      weight: "120 kg",
      pieces: "12 Cartons"
    },
    timeline: [
      { status: "Shipment Created", location: "Bandung Warehouse", date: "May 30, 2026", time: "13:20" }
    ]
  }
];
