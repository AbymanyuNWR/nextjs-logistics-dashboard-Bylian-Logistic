export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "tst-001",
    name: "Jonathan Malik",
    role: "Business Owner",
    company: "Malik Retail Group",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5,
    quote: "Bylian Logistic has transformed our supply chain. Their land freight and last-mile delivery services are incredibly reliable and always on time."
  },
  {
    id: "tst-002",
    name: "Sarah Amelia",
    role: "Export Manager",
    company: "Global Indo Trading",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5,
    quote: "The team at Bylian made international shipping seamless for us. Their maritime freight operations handled our complex customs requirements flawlessly."
  },
  {
    id: "tst-003",
    name: "Rudi Hartono",
    role: "Warehouse Supervisor",
    company: "TechDistribusi Nusantara",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4,
    quote: "We utilized their warehousing and distribution network. The integration was smooth, and the visibility they provide into our inventory is top-notch."
  },
  {
    id: "tst-004",
    name: "Elena Rostova",
    role: "Operations Director",
    company: "BuildCorp Materials",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5,
    quote: "Moving 200 tons of materials seemed daunting until we partnered with Bylian. Their train freight solution saved us time and significantly cut costs."
  }
];
