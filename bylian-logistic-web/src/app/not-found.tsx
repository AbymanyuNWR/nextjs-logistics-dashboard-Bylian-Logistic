import Link from "next/link";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-bg-light px-4 py-24">
      <div className="max-w-2xl w-full bg-white p-12 rounded-3xl border border-brand-border shadow-xl text-center">
        <div className="w-24 h-24 bg-brand-warning/10 text-brand-warning rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertTriangle size={48} />
        </div>
        <h1 className="text-6xl md:text-8xl font-heading font-black text-brand-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-primary mb-4">Page Not Found</h2>
        <p className="text-brand-text-muted text-lg mb-10 max-w-md mx-auto">
          We're sorry, the page you requested could not be found. Please go back to the homepage or contact us if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="w-full sm:w-auto h-14">
            <Link href="/">
              <Home size={18} className="mr-2" /> Back to Homepage
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-14">
            <Link href="/contact">
              <ArrowLeft size={18} className="mr-2" /> Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
