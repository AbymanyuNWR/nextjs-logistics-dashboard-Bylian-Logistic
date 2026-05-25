"use client";

import { usePathname } from "next/navigation";
import { AdminStateProvider } from "@/context/AdminStateContext";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <AdminStateProvider>
      <div className="flex flex-col min-h-screen">
        {!isAdmin && <TopBar />}
        {!isAdmin && <Navbar />}
        <main className="flex-1 flex flex-col">{children}</main>
        {!isAdmin && <Footer />}
      </div>
    </AdminStateProvider>
  );
}
