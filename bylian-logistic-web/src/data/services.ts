export type Service = {
  id: string;
  slug: string;
  title: string;
  category: string[];
  shortDescription: string;
  description: string;
  image: string;
  icon: string;
  benefits: string[];
  included: string[];
  steps: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    id: "srv-001",
    slug: "land-freight",
    title: "Land Freight",
    category: ["Domestic"],
    shortDescription: "Efficient road transportation using modern trucks for domestic distribution and intercity delivery.",
    description: "Efficient road transportation using modern trucks for domestic distribution, intercity delivery, retail logistics, and business cargo movement.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
    icon: "Truck",
    benefits: [
      "Flexible routes",
      "Suitable for domestic shipping",
      "Real-time delivery coordination",
      "Cost-effective for business goods",
      "Multiple vehicle options"
    ],
    included: [
      "Pickup scheduling",
      "Truck allocation",
      "Route planning",
      "Cargo handling",
      "Delivery confirmation"
    ],
    steps: [
      "Submit shipment details",
      "Our team confirms vehicle and schedule",
      "Goods are picked up",
      "Shipment is transported",
      "Delivery is confirmed"
    ],
    faqs: [
      { question: "What is the maximum weight for land freight?", answer: "We support up to 40 tons per standard truck load." },
      { question: "How long does intercity delivery take?", answer: "Typically 1-3 days depending on the distance and route conditions." }
    ]
  },
  {
    id: "srv-002",
    slug: "maritime-freight",
    title: "Maritime Freight",
    category: ["International"],
    shortDescription: "Reliable ocean freight solutions for import, export, and international cargo shipping.",
    description: "Reliable ocean freight solutions for import, export, and international cargo shipping through trusted port networks.",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=800",
    icon: "Ship",
    benefits: [
      "Suitable for large cargo",
      "International port coverage",
      "Cost-efficient for heavy shipments",
      "Container-based shipping",
      "Import/export support"
    ],
    included: [
      "Port coordination",
      "Container handling",
      "Cargo documentation support",
      "Shipment monitoring",
      "Delivery arrangement from port"
    ],
    steps: [
      "Submit shipment details",
      "Our team confirms schedule and container",
      "Goods are loaded into containers",
      "Shipment is transported by sea",
      "Delivery is confirmed at destination port"
    ],
    faqs: [
      { question: "Do you handle customs clearance?", answer: "Yes, our team provides full documentation and customs clearance support." },
      { question: "What container sizes are available?", answer: "We offer standard 20ft and 40ft containers, as well as specialized options." }
    ]
  },
  {
    id: "srv-003",
    slug: "train-freight",
    title: "Train Freight",
    category: ["Domestic"],
    shortDescription: "Cost-effective rail freight solutions for bulk cargo and long-distance delivery.",
    description: "Cost-effective rail freight solutions for bulk cargo, long-distance domestic delivery, and scheduled industrial transportation.",
    image: "https://images.unsplash.com/photo-1542456424-d2eec4cce991?auto=format&fit=crop&q=80&w=800",
    icon: "Train",
    benefits: [
      "Stable long-distance delivery",
      "Efficient for heavy cargo",
      "Lower cost for bulk goods",
      "Scheduled transport",
      "Reduced road congestion risk"
    ],
    included: [
      "Cargo loading coordination",
      "Rail freight booking",
      "Transit monitoring",
      "Destination handling",
      "Final delivery support"
    ],
    steps: [
      "Submit shipment details",
      "Our team confirms train schedule",
      "Goods are loaded onto freight cars",
      "Shipment is transported by rail",
      "Delivery is confirmed at destination terminal"
    ],
    faqs: [
      { question: "Is train freight cheaper than land freight?", answer: "Yes, for long distances and bulk cargo, rail transport is generally more cost-effective." },
      { question: "Do you offer door-to-door service with train freight?", answer: "We combine train freight with our land and last-mile delivery services for a complete door-to-door solution." }
    ]
  },
  {
    id: "srv-004",
    slug: "air-cargo-support",
    title: "Air Cargo Support",
    category: ["International", "Express"],
    shortDescription: "Fast cargo support for urgent shipments requiring speed and professional handling.",
    description: "Fast cargo support for urgent shipments that require speed, professional handling, and coordinated air freight movement.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    icon: "Plane",
    benefits: [
      "Best for urgent delivery",
      "Domestic and international support",
      "Priority handling",
      "Suitable for valuable goods",
      "Fast transit time"
    ],
    included: [
      "Air cargo coordination",
      "Pickup and airport transfer",
      "Documentation assistance",
      "Shipment tracking",
      "Final destination delivery support"
    ],
    steps: [
      "Submit shipment details",
      "Our team confirms flight schedule",
      "Goods are transferred to the airport",
      "Shipment is transported by air",
      "Delivery is confirmed at destination"
    ],
    faqs: [
      { question: "How fast is air cargo delivery?", answer: "Usually 1-3 days for international shipments and same-day or next-day for domestic." },
      { question: "Are there weight restrictions for air cargo?", answer: "Yes, weight and volume restrictions apply based on the airline and aircraft type." }
    ]
  },
  {
    id: "srv-005",
    slug: "warehousing",
    title: "Warehousing",
    category: ["Storage"],
    shortDescription: "Secure storage and inventory handling service for businesses.",
    description: "Secure storage and inventory handling service for businesses that need reliable warehouse support before distribution.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c663b0?auto=format&fit=crop&q=80&w=800",
    icon: "Warehouse",
    benefits: [
      "Safe storage",
      "Inventory handling",
      "Organized cargo movement",
      "Suitable for retail and e-commerce",
      "Flexible storage period"
    ],
    included: [
      "Goods receiving",
      "Stock placement",
      "Inventory monitoring",
      "Picking and packing",
      "Dispatch preparation"
    ],
    steps: [
      "Submit storage requirements",
      "Our team allocates warehouse space",
      "Goods are received and cataloged",
      "Inventory is stored securely",
      "Goods are dispatched upon request"
    ],
    faqs: [
      { question: "Can I track my inventory levels?", answer: "Yes, we provide an inventory management system for real-time tracking." },
      { question: "Do you offer cold storage?", answer: "Yes, we have specialized facilities for temperature-sensitive goods." }
    ]
  },
  {
    id: "srv-006",
    slug: "last-mile-delivery",
    title: "Last Mile Delivery",
    category: ["Domestic", "Express"],
    shortDescription: "Reliable final delivery service from distribution points to final customers.",
    description: "Reliable final delivery service that brings goods from distribution points directly to customers or business destinations.",
    image: "https://images.unsplash.com/photo-1620241608701-94ef138c7eb9?auto=format&fit=crop&q=80&w=800",
    icon: "Package",
    benefits: [
      "Fast local delivery",
      "Customer-focused process",
      "Suitable for e-commerce",
      "Delivery confirmation",
      "Route optimization"
    ],
    included: [
      "Package sorting",
      "Delivery route assignment",
      "Courier dispatch",
      "Customer handover",
      "Proof of delivery"
    ],
    steps: [
      "Packages arrive at the distribution hub",
      "Routes are optimized for efficiency",
      "Couriers are dispatched",
      "Packages are delivered to customers",
      "Delivery is confirmed with proof"
    ],
    faqs: [
      { question: "Do you offer same-day last mile delivery?", answer: "Yes, depending on the area and time of order confirmation." },
      { question: "Can customers track their delivery?", answer: "Yes, we provide tracking links for real-time delivery status." }
    ]
  }
];
