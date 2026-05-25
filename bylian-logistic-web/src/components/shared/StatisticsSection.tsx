export function StatisticsSection() {
  return (
    <section className="py-20 bg-brand-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=2000')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/20">
          {[
            { num: "50k+", label: "Successful Deliveries" },
            { num: "256+", label: "Expert Team Members" },
            { num: "25+", label: "Countries Covered" },
            { num: "125+", label: "Trusted Corporate Clients" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4 group">
              <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-2 group-hover:text-brand-accent transition-colors duration-300">
                {stat.num}
              </div>
              <div className="text-white/80 font-medium text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
