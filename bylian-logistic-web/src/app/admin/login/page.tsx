"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { useAdminState } from "@/context/AdminStateContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, currentAdmin } = useAdminState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (currentAdmin) {
      router.push("/admin/dashboard");
    }
  }, [currentAdmin, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        setStatus("success");
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 800);
      } else {
        setStatus("error");
        setErrorMsg("Invalid email or password. Hint: Use admin@bylian.com and password admin123");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-brand-text-dark flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative Grid & Blurred Background Blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full filter blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[100px] pointer-events-none animate-pulse duration-5000"></div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
        
        {/* Portal Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-accent/20 border border-brand-accent/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-accent">
            <ShieldCheck size={36} />
          </div>
          <h2 className="text-3xl font-heading font-bold text-white tracking-tight leading-none mb-2">
            Bylian <span className="text-brand-accent">Portal</span>
          </h2>
          <p className="text-white/50 text-sm">Administrative Security Authenticator</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            
            {/* Email Input */}
            <div className="relative">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Admin Email</label>
              <div className="relative">
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@bylian.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-brand-accent focus-visible:border-transparent"
                  required
                />
                <Mail size={20} className="absolute left-4 top-4 text-white/40" />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-white/60">Admin Password</label>
                <span className="text-[10px] text-brand-accent hover:underline cursor-pointer">Forgot?</span>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-brand-accent focus-visible:border-transparent"
                  required
                />
                <Lock size={20} className="absolute left-4 top-4 text-white/40" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-white/40 hover:text-white focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

          </div>

          {/* Feedback logs */}
          {status === "error" && (
            <div className="bg-brand-error/10 border border-brand-error/20 p-4 rounded-xl text-brand-error text-xs font-medium leading-relaxed">
              {errorMsg}
            </div>
          )}

          {status === "success" && (
            <div className="bg-brand-success/10 border border-brand-success/20 p-4 rounded-xl text-brand-success text-xs font-medium text-center">
              Login authorized. Granting terminal access...
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-14 bg-brand-accent text-white hover:bg-brand-accent-hover font-bold text-base transition-all duration-300"
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying Security Key...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center">
                Access Core System <ArrowRight size={18} className="ml-2" />
              </span>
            )}
          </Button>
        </form>

        {/* Hints Grid */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-[11px] leading-relaxed">
            Authorized Personnel Only. Systems logs are audited. <br />
            <span className="font-bold text-white/60">Demo Login:</span> admin@bylian.com / admin123
          </p>
        </div>

      </div>
    </div>
  );
}
