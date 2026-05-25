"use client";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminState } from "@/context/AdminStateContext";

export function Footer() {
  const { addSubscriber } = useAdminState();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      const res = addSubscriber(email);
      if (res === "duplicate") {
        setStatus("duplicate");
      } else {
        setStatus("success");
        setEmail("");
      }
      
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <footer className="bg-brand-text-dark text-brand-border pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Intro */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="flex flex-col items-start">
              <span className="text-2xl font-heading font-bold leading-tight text-white">
                Bylian <span className="text-brand-accent">Logistic</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-brand-text-muted">
                Transport Services
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-brand-border/80">
              Reliable logistics solutions for businesses that need fast transportation, cargo delivery, warehousing, and global freight services.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors text-brand-border" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors text-brand-border" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg className="w-[18px] h-[18px] stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors text-brand-border" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors text-brand-border" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company Info */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-lg font-heading font-bold text-white relative inline-block">
              Company Info
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-accent rounded-full"></span>
            </h3>
            <ul className="flex flex-col space-y-3 mt-4">
              <li><Link href="/about" className="text-brand-border/80 hover:text-brand-accent transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-brand-border/80 hover:text-brand-accent transition-colors">Our Services</Link></li>
              <li><Link href="/projects" className="text-brand-border/80 hover:text-brand-accent transition-colors">Projects & Case Studies</Link></li>
              <li><Link href="/blog" className="text-brand-border/80 hover:text-brand-accent transition-colors">News & Articles</Link></li>
              <li><Link href="/contact" className="text-brand-border/80 hover:text-brand-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-lg font-heading font-bold text-white relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-accent rounded-full"></span>
            </h3>
            <ul className="flex flex-col space-y-3 mt-4">
              <li><Link href="/services/land-freight" className="text-brand-border/80 hover:text-brand-accent transition-colors">Land Freight</Link></li>
              <li><Link href="/services/maritime-freight" className="text-brand-border/80 hover:text-brand-accent transition-colors">Maritime Freight</Link></li>
              <li><Link href="/services/train-freight" className="text-brand-border/80 hover:text-brand-accent transition-colors">Train Freight</Link></li>
              <li><Link href="/services/air-cargo-support" className="text-brand-border/80 hover:text-brand-accent transition-colors">Air Cargo Support</Link></li>
              <li><Link href="/services/warehousing" className="text-brand-border/80 hover:text-brand-accent transition-colors">Warehouse Service</Link></li>
              <li><Link href="/services/last-mile-delivery" className="text-brand-border/80 hover:text-brand-accent transition-colors">Delivery Support</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-lg font-heading font-bold text-white relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-accent rounded-full"></span>
            </h3>
            <ul className="flex flex-col space-y-4 mt-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-brand-accent shrink-0 mt-1" size={18} />
                <a href="https://maps.google.com/?q=Jl.+Logistic+Center+No.+88,+Jakarta,+Indonesia" target="_blank" rel="noopener noreferrer" className="text-brand-border/80 hover:text-brand-accent transition-colors">
                  Jl. Logistic Center No. 88, Jakarta, Indonesia
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-brand-accent shrink-0" size={18} />
                <a href="tel:+6281234567890" className="text-brand-border/80 hover:text-brand-accent transition-colors">
                  +62 812 3456 7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-brand-accent shrink-0" size={18} />
                <a href="mailto:support@bylianlogistics.com" className="text-brand-border/80 hover:text-brand-accent transition-colors">
                  support@bylianlogistics.com
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-bold text-white mb-2">Subscribe Newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-r-none bg-white/5 border-white/10 text-white placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-brand-accent focus-visible:border-transparent h-10"
                />
                <Button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="rounded-l-none h-10 px-4"
                >
                  {status === "loading" ? "..." : "Subscribe"}
                </Button>
              </form>
              {status === "error" && <p className="text-brand-error text-xs mt-1">Please enter a valid email.</p>}
              {status === "success" && <p className="text-brand-success text-xs mt-1">Thank you for subscribing.</p>}
              {status === "duplicate" && <p className="text-brand-warning text-xs mt-1">This email is already subscribed.</p>}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-brand-border/60">
            &copy; {new Date().getFullYear()} Bylian Logistic Transport Services. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-brand-border/60">
            <Link href="/privacy-policy" className="hover:text-brand-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-brand-accent transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
