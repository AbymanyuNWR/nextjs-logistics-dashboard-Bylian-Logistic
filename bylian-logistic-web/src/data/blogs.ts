export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
};

export const blogs: BlogPost[] = [
  {
    id: "blg-001",
    slug: "how-new-transportation-systems-are-changing-logistics",
    title: "How New Transportation Systems Are Changing Logistics",
    category: "Transport",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800",
    excerpt: "Explore how modern transportation networks and smart vehicles are revolutionizing the way goods are moved globally.",
    content: "The logistics industry is undergoing a massive transformation. With the advent of smart vehicles, AI-driven route optimization, and autonomous transport systems, moving goods from point A to point B has never been more efficient. In this article, we delve into how these new systems are reducing transit times, lowering carbon footprints, and providing real-time visibility into supply chains...",
    author: "Adrian Bylian",
    publishedAt: "2026-04-15",
    readTime: "5 min read"
  },
  {
    id: "blg-002",
    slug: "how-tracking-systems-improve-goods-logistics",
    title: "How Tracking Systems Improve Goods Logistics",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    excerpt: "Real-time tracking is no longer a luxury, it's a necessity. Learn how visibility impacts customer satisfaction and operational efficiency.",
    content: "In today's fast-paced world, customers expect to know exactly where their packages are at any given moment. Modern tracking systems utilize GPS and IoT sensors to provide real-time updates. This not only enhances customer trust but also allows logistics companies to proactively address delays and optimize routes on the fly...",
    author: "Melissa Tan",
    publishedAt: "2026-04-22",
    readTime: "4 min read"
  },
  {
    id: "blg-003",
    slug: "preparation-of-sending-goods-through-containers",
    title: "Preparation Of Sending Goods Through Containers",
    category: "Cargo",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
    excerpt: "A comprehensive guide on how to properly pack and prepare your goods for safe containerized shipping.",
    content: "Shipping goods internationally via containers requires meticulous preparation. From selecting the right container size to ensuring proper weight distribution and securing the cargo against movement during sea transit, every step is critical. We provide a checklist to ensure your goods arrive in pristine condition...",
    author: "Kevin Pratama",
    publishedAt: "2026-05-05",
    readTime: "6 min read"
  },
  {
    id: "blg-004",
    slug: "the-role-of-warehouse-management-in-modern-logistics",
    title: "The Role Of Warehouse Management In Modern Logistics",
    category: "Warehouse",
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c663b0?auto=format&fit=crop&q=80&w=800",
    excerpt: "Efficient warehousing is the backbone of supply chain logistics. Discover the strategies for optimizing warehouse operations.",
    content: "A warehouse is more than just a storage facility; it is a dynamic hub where inventory is received, sorted, and dispatched. Advanced Warehouse Management Systems (WMS) automate these processes, reducing human error and speeding up fulfillment times. Let's look at how technology is shaping the future of warehousing...",
    author: "Nadia Laras",
    publishedAt: "2026-05-12",
    readTime: "5 min read"
  },
  {
    id: "blg-005",
    slug: "how-businesses-can-reduce-delivery-delays",
    title: "How Businesses Can Reduce Delivery Delays",
    category: "Business Tips",
    image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=800",
    excerpt: "Actionable tips for businesses to streamline their delivery processes and minimize unexpected delays.",
    content: "Delivery delays can severely impact customer satisfaction and brand reputation. By analyzing historical data, diversifying carrier options, and improving warehouse picking processes, businesses can significantly reduce the likelihood of delays. Here are top strategies to keep your deliveries on track...",
    author: "Adrian Bylian",
    publishedAt: "2026-05-18",
    readTime: "7 min read"
  },
  {
    id: "blg-006",
    slug: "choosing-the-right-freight-service-for-your-cargo",
    title: "Choosing The Right Freight Service For Your Cargo",
    category: "Transport",
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=800",
    excerpt: "Land, Sea, or Air? How to determine the most cost-effective and efficient freight method for your specific needs.",
    content: "Selecting the appropriate freight service depends on various factors including budget, urgency, and the nature of the goods. While air freight offers unparalleled speed, maritime shipping is the champion of cost-efficiency for large volumes. This guide helps you weigh the pros and cons of each mode...",
    author: "Melissa Tan",
    publishedAt: "2026-05-24",
    readTime: "6 min read"
  }
];

export type Blog = BlogPost;
