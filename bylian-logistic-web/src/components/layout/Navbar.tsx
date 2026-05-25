"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { 
      name: "Services", 
      href: "/services",
      subItems: [
        { name: "Land Freight", href: "/services/land-freight" },
        { name: "Maritime Freight", href: "/services/maritime-freight" },
        { name: "Train Freight", href: "/services/train-freight" },
        { name: "Air Cargo Support", href: "/services/air-cargo-support" },
        { name: "Warehousing", href: "/services/warehousing" },
        { name: "Last Mile Delivery", href: "/services/last-mile-delivery" },
      ]
    },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-brand-primary shadow-lg py-3" : "bg-white py-4 shadow-sm"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start z-50">
            <span className={cn("text-2xl font-heading font-bold leading-tight", isScrolled ? "text-white" : "text-brand-primary")}>
              Bylian <span className="text-brand-accent">Logistic</span>
            </span>
            <span className={cn("text-[10px] tracking-wider uppercase font-semibold", isScrolled ? "text-brand-bg-light" : "text-brand-text-muted")}>
              Transport Services
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group px-2 py-2">
                {link.subItems ? (
                  <>
                    <button className={cn("flex items-center space-x-1 font-medium hover:text-brand-accent transition-colors", 
                      isScrolled ? "text-white" : "text-brand-text-dark",
                      pathname.startsWith("/services") ? "text-brand-accent" : ""
                    )}>
                      <span>{link.name}</span>
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                    <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-xl rounded-lg border border-brand-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-left flex flex-col py-2">
                      {link.subItems.map(subItem => (
                        <Link 
                          key={subItem.name} 
                          href={subItem.href}
                          className="px-4 py-2 text-sm font-medium text-brand-text-dark hover:bg-brand-bg-light hover:text-brand-accent transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link 
                    href={link.href}
                    className={cn(
                      "font-medium hover:text-brand-accent transition-colors relative",
                      isScrolled ? "text-white" : "text-brand-text-dark",
                      pathname === link.href ? "text-brand-accent" : ""
                    )}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-accent rounded-full" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <a href="tel:+6281234567890" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-full bg-brand-bg-light flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                <Phone size={18} className="text-brand-primary group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className={cn("text-[10px] uppercase font-bold tracking-wider", isScrolled ? "text-brand-border" : "text-brand-text-muted")}>Call Us Any Time</span>
                <span className={cn("font-bold text-sm", isScrolled ? "text-white" : "text-brand-primary")}>+62 812 3456 7890</span>
              </div>
            </a>
            <Button asChild>
              <Link href="/request-quote">Get A Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden z-50 p-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={28} className={isScrolled ? "text-white" : "text-brand-text-dark"} />
            ) : (
              <Menu size={28} className={isScrolled ? "text-white" : "text-brand-text-dark"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={cn(
          "fixed inset-0 bg-brand-primary/95 backdrop-blur-sm z-40 lg:hidden flex flex-col pt-24 pb-8 px-6 transition-transform duration-300 transform",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-4 overflow-y-auto flex-1">
          {navLinks.map((link) => (
            <div key={link.name} className="flex flex-col">
              {link.subItems ? (
                <>
                  <button 
                    className="flex justify-between items-center py-3 text-white font-bold text-lg border-b border-white/10"
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={20} className={cn("transition-transform", isServicesOpen ? "rotate-180" : "")} />
                  </button>
                  {isServicesOpen && (
                    <div className="flex flex-col bg-white/5 rounded-lg mt-2 p-2 space-y-1">
                      {link.subItems.map(subItem => (
                        <Link 
                          key={subItem.name} 
                          href={subItem.href}
                          className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-md font-medium"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link 
                  href={link.href}
                  className={cn(
                    "py-3 font-bold text-lg border-b border-white/10 transition-colors",
                    pathname === link.href ? "text-brand-accent" : "text-white"
                  )}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/request-quote">Get A Quote</Link>
          </Button>
          <a href="tel:+6281234567890" className="flex items-center justify-center space-x-2 text-white bg-white/10 rounded-xl py-3 font-bold">
            <Phone size={18} />
            <span>+62 812 3456 7890</span>
          </a>
        </div>
      </div>
    </header>
  );
}
