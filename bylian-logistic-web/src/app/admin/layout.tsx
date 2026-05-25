"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, FileText, Mail, Truck, FolderGit2, BookOpen, 
  HelpCircle, Users, Settings, LogOut, Menu, X, ShieldAlert,
  ChevronRight, Bell, User
} from "lucide-react";
import { useAdminState } from "@/context/AdminStateContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentAdmin, logout, quotes, messages } = useAdminState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Authentication & Role Gate Check
  useEffect(() => {
    if (mounted) {
      if (!currentAdmin && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else if (currentAdmin && pathname !== "/admin/login") {
        const role = currentAdmin.role;
        // Super Admin & Admin have full access
        if (role === "Super Admin" || role === "Admin") return;
        
        // Define exact allowed routes for each role
        const isRouteAllowed = (path: string): boolean => {
          if (path === "/admin/dashboard" || path === "/admin") return true;
          
          if (path.startsWith("/admin/quotes") && ["Customer Support", "Finance"].includes(role)) return true;
          if (path.startsWith("/admin/messages") && ["Customer Support"].includes(role)) return true;
          if (path.startsWith("/admin/shipments") && ["Shipment Operator"].includes(role)) return true;
          if (path.startsWith("/admin/services") && ["Marketing", "Content Editor"].includes(role)) return true;
          if (path.startsWith("/admin/projects") && ["Marketing", "Content Editor"].includes(role)) return true;
          if (path.startsWith("/admin/blogs") && ["Marketing", "Content Editor"].includes(role)) return true;
          if (path.startsWith("/admin/faq") && ["Content Editor"].includes(role)) return true;
          if (path.startsWith("/admin/subscribers") && ["Marketing", "Customer Support"].includes(role)) return true;
          
          return false;
        };

        if (!isRouteAllowed(pathname)) {
          router.push("/admin/dashboard");
        }
      }
    }
  }, [currentAdmin, mounted, pathname, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-brand-text-dark flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white border-t-brand-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Bypass layout wrapper for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Loading state if gate check is redirecting
  if (!currentAdmin) {
    return (
      <div className="min-h-screen bg-brand-text-dark flex items-center justify-center p-4">
        <div className="text-center text-white max-w-sm space-y-4">
          <ShieldAlert size={48} className="text-brand-accent mx-auto animate-bounce" />
          <h3 className="text-xl font-heading font-bold">Access Restricting Gated</h3>
          <p className="text-white/60 text-sm">You are unauthorized to view this area. Redirecting to security login portal...</p>
        </div>
      </div>
    );
  }

  // Count Unread Items
  const unreadQuotes = quotes.filter(q => q.status === "New").length;
  const unreadMessages = messages.filter(m => m.status === "New").length;
  const totalNotifications = unreadQuotes + unreadMessages;

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Quote Requests", href: "/admin/quotes", icon: FileText, badge: unreadQuotes },
    { label: "Inbox Messages", href: "/admin/messages", icon: Mail, badge: unreadMessages },
    { label: "Shipments & Tracking", href: "/admin/shipments", icon: Truck },
    { label: "CMS Services", href: "/admin/services", icon: FolderGit2 },
    { label: "CMS Case Studies", href: "/admin/projects", icon: FolderGit2 },
    { label: "CMS News Blogs", href: "/admin/blogs", icon: BookOpen },
    { label: "CMS FAQ", href: "/admin/faq", icon: HelpCircle },
    { label: "Newsletter Subs", href: "/admin/subscribers", icon: Users },
    { label: "System Users", href: "/admin/users", icon: Users },
    { label: "Settings & Audits", href: "/admin/settings", icon: Settings },
  ];

  // Filter sidebar menu items based on Role-Based Access Control (RBAC)
  const allowedMenuItems = menuItems.filter(item => {
    if (!currentAdmin) return false;
    const role = currentAdmin.role;
    if (role === "Super Admin" || role === "Admin") return true;

    switch (item.label) {
      case "Dashboard":
        return true;
      case "Quote Requests":
        return ["Customer Support", "Finance"].includes(role);
      case "Inbox Messages":
        return ["Customer Support"].includes(role);
      case "Shipments & Tracking":
        return ["Shipment Operator"].includes(role);
      case "CMS Services":
      case "CMS Case Studies":
      case "CMS News Blogs":
        return ["Marketing", "Content Editor"].includes(role);
      case "CMS FAQ":
        return ["Content Editor"].includes(role);
      case "Newsletter Subs":
        return ["Marketing", "Customer Support"].includes(role);
      case "System Users":
      case "Settings & Audits":
        return false; // Only Admin / Super Admin
      default:
        return false;
    }
  });

  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100 font-sans relative overflow-hidden">
      
      {/* Dynamic Background Details */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        ></div>
      )}

      {/* DASHBOARD SIDEBAR PANEL */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-slate-950 border-r border-slate-800 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static shrink-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        {/* Sidebar Header */}
        <div className="h-20 border-b border-slate-800 flex items-center justify-between px-6">
          <Link href="/admin/dashboard" className="flex flex-col items-start">
            <span className="text-xl font-heading font-bold text-white tracking-tight leading-none">
              Bylian <span className="text-brand-accent">Logistic</span>
            </span>
            <span className="text-[9px] tracking-wider uppercase font-semibold text-slate-500 mt-1">
              Admin Workspace
            </span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Profile Widget */}
        <div className="p-6 border-b border-slate-800/60 bg-slate-950/60 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-accent/25 border border-brand-accent/40 text-brand-accent flex items-center justify-center font-bold">
            {currentAdmin.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <h4 className="font-heading font-bold text-sm text-white truncate leading-snug">{currentAdmin.name}</h4>
            <span className="text-[10px] bg-slate-800 text-brand-accent border border-brand-accent/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mt-1 inline-block">
              {currentAdmin.role}
            </span>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800">
          {allowedMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group
                  ${isActive 
                    ? "bg-brand-accent text-white shadow-lg shadow-brand-accent/15" 
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={18} className={isActive ? "text-white" : "text-slate-400 group-hover:text-brand-accent transition-colors"} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 ? (
                  <span className={`
                    text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide
                    ${isActive ? "bg-white text-brand-accent" : "bg-brand-accent text-white"}
                  `}>
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "text-white" : "text-slate-500"}`} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Log out */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => { logout(); router.push("/admin/login"); }}
            className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-bold text-slate-400 hover:bg-red-950/20 hover:text-red-400 border border-transparent hover:border-red-950/30 transition-all"
          >
            <LogOut size={18} />
            <span>Logout Account</span>
          </button>
        </div>

      </aside>

      {/* CORE CONTENT PANEL AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Admin Header Navbar */}
        <header className="h-20 bg-slate-950/40 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 md:px-8 shrink-0 sticky top-0 z-30">
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl md:text-2xl font-heading font-bold text-white tracking-tight capitalize">
              {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors relative">
                <Bell size={18} />
                {totalNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                    {totalNotifications}
                  </span>
                )}
              </button>
            </div>

            {/* Language & Workspace Indicators */}
            <div className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>LIVE CORE</span>
            </div>

            {/* Quick public page link */}
            <Link 
              href="/"
              target="_blank"
              className="px-4 py-2 text-xs font-bold bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 hover:border-slate-600 transition-all text-white"
            >
              Public Web
            </Link>

          </div>

        </header>

        {/* Dynamic Pages Render */}
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
