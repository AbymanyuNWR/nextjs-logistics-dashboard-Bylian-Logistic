import { MapPin, Mail, Clock } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-brand-primary text-white text-sm py-2 hidden md:block">
      <div className="container mx-auto max-w-7xl px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <a
            href="https://maps.google.com/?q=Jl.+Logistic+Center+No.+88,+Jakarta,+Indonesia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-brand-accent transition-colors"
          >
            <MapPin size={14} className="text-brand-accent" />
            <span>Jl. Logistic Center No. 88, Jakarta, Indonesia</span>
          </a>
          <a
            href="mailto:support@bylianlogistics.com"
            className="flex items-center space-x-2 hover:text-brand-accent transition-colors"
          >
            <Mail size={14} className="text-brand-accent" />
            <span>support@bylianlogistics.com</span>
          </a>
        </div>
        <div className="flex items-center space-x-2" title="Business Hours">
          <Clock size={14} className="text-brand-accent" />
          <span>Mon - Sat: 08.00 - 18.00</span>
        </div>
      </div>
    </div>
  );
}
