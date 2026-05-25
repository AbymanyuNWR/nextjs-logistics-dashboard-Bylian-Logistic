export type FAQ = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  // General
  {
    id: "faq-001",
    category: "General",
    question: "What is Bylian Logistic Transport Services?",
    answer: "Bylian Logistic Transport Services is a professional logistics company providing integrated transportation, warehousing, cargo handling, and freight solutions for businesses requiring safe and efficient movement of goods globally."
  },
  {
    id: "faq-002",
    category: "General",
    question: "Where is your company located?",
    answer: "Our headquarters is located at Jl. Logistic Center No. 88, Jakarta, Indonesia. We operate across multiple domestic and international hubs."
  },
  {
    id: "faq-003",
    category: "General",
    question: "What industries do you serve?",
    answer: "We serve a wide range of industries including manufacturing, retail, e-commerce, electronics, pharmaceuticals, and construction."
  },
  
  // Pricing
  {
    id: "faq-004",
    category: "Pricing",
    question: "How much does it cost to ship goods?",
    answer: "Shipping costs depend on the service type, cargo weight, volume, and destination. We provide transparent pricing based on these factors."
  },
  {
    id: "faq-005",
    category: "Pricing",
    question: "Can I request a custom quote?",
    answer: "Yes, you can request a custom quote via our 'Request a Quote' page, where you can provide specific details about your shipment needs."
  },
  {
    id: "faq-006",
    category: "Pricing",
    question: "What factors affect shipping cost?",
    answer: "The main factors include the mode of transport (air, sea, land), distance, weight, dimensions, fuel surcharges, and any special handling requirements (like refrigeration)."
  },

  // Services
  {
    id: "faq-007",
    category: "Services",
    question: "What logistics services do you provide?",
    answer: "We provide Land Freight, Maritime Freight, Train Freight, Air Cargo Support, Warehousing, and Last Mile Delivery."
  },
  {
    id: "faq-008",
    category: "Services",
    question: "Do you provide warehouse service?",
    answer: "Yes, we offer secure warehousing and inventory handling services for short-term and long-term storage."
  },
  {
    id: "faq-009",
    category: "Services",
    question: "Do you support last mile delivery?",
    answer: "Yes, our Last Mile Delivery service ensures that your goods are transported from distribution centers directly to the final customer efficiently."
  },
  {
    id: "faq-010",
    category: "Services",
    question: "What is the fastest goods transportation?",
    answer: "Air Cargo Support is generally our fastest transportation method, ideal for urgent and time-sensitive shipments."
  },

  // Tracking
  {
    id: "faq-011",
    category: "Tracking",
    question: "Can I track my shipment?",
    answer: "Absolutely. You can use your Tracking ID on our 'Track Shipment' page to get real-time updates on your cargo's status."
  },
  {
    id: "faq-012",
    category: "Tracking",
    question: "What should I do if my tracking ID is not found?",
    answer: "If your Tracking ID is not found, please ensure you entered it correctly. If the issue persists, contact our support team for assistance as it may take a few hours to appear in the system after booking."
  },
  {
    id: "faq-013",
    category: "Tracking",
    question: "How often is tracking updated?",
    answer: "Tracking is updated at key milestones: upon pickup, arrival at hubs, departure from ports/airports, out for delivery, and upon final delivery."
  },

  // International Shipping
  {
    id: "faq-014",
    category: "International Shipping",
    question: "Do you support international freight?",
    answer: "Yes, our Maritime Freight and Air Cargo Support services cover extensive international routes."
  },
  {
    id: "faq-015",
    category: "International Shipping",
    question: "Do you help with import/export documentation?",
    answer: "Yes, our team provides full assistance with customs clearance, import/export documentation, and regulatory compliance."
  },
  {
    id: "faq-016",
    category: "International Shipping",
    question: "What cargo can be shipped internationally?",
    answer: "We ship a variety of cargo including general goods, electronics, machinery, and textiles. However, hazardous materials and restricted items are subject to specific regulations."
  }
];
