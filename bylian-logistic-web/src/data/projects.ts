export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string[];
  image: string;
  excerpt: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
  details: {
    client: string;
    location: string;
    duration: string;
    cargoType: string;
  };
};

export const projects: Project[] = [
  {
    id: "prj-001",
    slug: "port-to-port-container-freight-solution",
    title: "Port To Port Container Freight Solution",
    category: ["Maritime"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c663b0?auto=format&fit=crop&q=80&w=800",
    excerpt: "End-to-end container logistics handling for a major international trading firm.",
    overview: "We provided a complete port-to-port maritime freight solution for a large trading corporation needing regular shipments between Jakarta and Singapore.",
    challenge: "The client required strict scheduling and rapid customs clearance to meet tight distribution deadlines without incurring storage penalties.",
    solution: "We implemented an optimized booking strategy, pre-cleared documentation, and coordinated closely with port authorities on both sides.",
    result: "Delivered on schedule consistently for 6 months, reducing the client's transit delays by 35%.",
    details: {
      client: "Corporate Client",
      location: "Jakarta - Singapore",
      duration: "14 Days per shipment",
      cargoType: "Container Cargo"
    }
  },
  {
    id: "prj-002",
    slug: "250-metric-ton-goods-freight-for-manufacturer",
    title: "250 Metric Ton Goods Freight For Manufacturer",
    category: ["Land Freight", "Heavy Cargo"],
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
    excerpt: "Coordinating heavy transportation for industrial manufacturing equipment.",
    overview: "We successfully transported 250 metric tons of manufacturing equipment from a central distribution hub to a new factory site.",
    challenge: "The cargo was oversized and heavy, requiring special permits, route planning to avoid weak bridges, and coordinated escorts.",
    solution: "Our team deployed a fleet of heavy-duty flatbed trucks, secured all necessary permits, and surveyed the route in advance to ensure safety.",
    result: "All equipment arrived safely with zero damage, 2 days ahead of the projected schedule.",
    details: {
      client: "Industrial Manufacturer",
      location: "Surabaya - Semarang",
      duration: "5 Days",
      cargoType: "Heavy Machinery"
    }
  },
  {
    id: "prj-003",
    slug: "shipping-large-container-from-china-to-usa",
    title: "Shipping Large Container From China To USA",
    category: ["International", "Maritime"],
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=800",
    excerpt: "Managing cross-Pacific freight for an electronics brand.",
    overview: "We managed the international shipping of consumer electronics from manufacturing plants in China to distribution centers in the USA.",
    challenge: "Navigating complex international customs regulations and ensuring high security for valuable electronic cargo.",
    solution: "Utilized secure container tracking, streamlined customs documentation, and partnered with reliable ocean carriers for prioritized handling.",
    result: "Achieved a 99.8% on-time delivery rate, ensuring the client's products hit the shelves for the holiday season.",
    details: {
      client: "Electronics Brand",
      location: "Shenzhen, CN - Los Angeles, US",
      duration: "21 Days",
      cargoType: "Electronics"
    }
  },
  {
    id: "prj-004",
    slug: "200-metric-ton-goods-freight-for-mega-corp",
    title: "200 Metric Ton Goods Freight For Mega Corp",
    category: ["Train Freight", "Heavy Cargo"],
    image: "https://images.unsplash.com/photo-1542456424-d2eec4cce991?auto=format&fit=crop&q=80&w=800",
    excerpt: "Bulk material transportation via rail for a large corporate infrastructure project.",
    overview: "Facilitated the movement of 200 metric tons of construction materials using our train freight network.",
    challenge: "The client needed a highly cost-effective solution for a massive volume of goods that road transport could not efficiently support.",
    solution: "We arranged dedicated rail cars and coordinated seamless transfer from rail terminal to the construction site using our heavy trucks.",
    result: "Reduced transportation costs by 40% compared to exclusive road freight, while meeting all project timelines.",
    details: {
      client: "Mega Corp",
      location: "Bandung - Jakarta",
      duration: "3 Days",
      cargoType: "Construction Materials"
    }
  }
];
