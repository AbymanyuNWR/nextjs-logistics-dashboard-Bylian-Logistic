"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminState } from "@/context/AdminStateContext";

export default function AdminIndexPage() {
  const router = useRouter();
  const { currentAdmin } = useAdminState();

  useEffect(() => {
    if (currentAdmin) {
      router.push("/admin/dashboard");
    } else {
      router.push("/admin/login");
    }
  }, [currentAdmin, router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-slate-800 border-t-brand-accent rounded-full animate-spin"></div>
    </div>
  );
}
