import Link from "next/link";
import { CheckCircle2, Award, History, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatisticsSection } from "@/components/shared/StatisticsSection";

export default function AboutPage() {
  const team = [
    { name: "Adrian Bylian", role: "Founder & Logistics Director", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "Melissa Tan", role: "Operations Manager", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "Kevin Pratama", role: "Freight Coordinator", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "Nadia Laras", role: "Customer Success Lead", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300" }
  ];

  const timeline = [
    { year: "2010", event: "Company foundation in Jakarta" },
    { year: "2014", event: "Expanded domestic land freight operations" },
    { year: "2018", event: "Added modern warehouse services" },
    { year: "2021", event: "Started international cargo & maritime support" },
    { year: "2026", event: "Launched digital tracking and integrated quote system" }
  ];

  return (
    <>
      <PageHeader 
        title="About Bylian Logistic Transport Services" 
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About" }
        ]} 
      />

      {/* Company Overview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 text-center max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-brand-bg-light border border-brand-border rounded-full px-4 py-1.5 mb-6">
            <span className="text-brand-accent text-sm font-bold tracking-wide uppercase">Company Overview</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-primary leading-tight mb-8">
            Delivering Reliable Logistics Solutions for Growing Businesses
          </h2>
          <p className="text-lg md:text-xl text-brand-text-muted leading-relaxed mb-10">
            Bylian Logistic Transport Services provides integrated freight, warehousing, cargo handling, and transportation solutions for businesses that need safe and efficient movement of goods. We pride ourselves on our punctuality, transparency, and dedication to customer success.
          </p>
          <div className="flex justify-center items-center gap-6">
            <Button size="lg" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/request-quote">Request Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-24 bg-brand-bg-light">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-brand-border hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-brand-bg-light text-brand-accent rounded-full flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-heading font-bold text-brand-primary mb-4">Our Mission</h3>
              <p className="text-brand-text-muted text-lg leading-relaxed">
                To help businesses move goods safely, efficiently, and transparently through reliable logistics operations, advanced technology, and dedicated customer support.
              </p>
            </div>
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-brand-border hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-brand-bg-light text-brand-accent rounded-full flex items-center justify-center mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-3xl font-heading font-bold text-brand-primary mb-4">Our Vision</h3>
              <p className="text-brand-text-muted text-lg leading-relaxed">
                To become the most trusted and innovative logistics partner for companies across Indonesia and global trade routes, setting the standard for logistics excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary mb-4">Our Core Values</h2>
            <p className="text-brand-text-muted max-w-2xl mx-auto">The principles that guide our everyday operations and ensure we deliver the best service possible.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Safety First", "On-Time Delivery", "Transparent Communication", 
              "Reliable Operation", "Customer-Focused Service", "Continuous Improvement"
            ].map((value, i) => (
              <div key={i} className="flex items-start space-x-4 p-6 border border-brand-border rounded-2xl group hover:border-brand-accent transition-colors">
                <div className="w-10 h-10 rounded-full bg-brand-bg-light text-brand-accent flex items-center justify-center shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-primary mb-2">{value}</h4>
                  <p className="text-sm text-brand-text-muted">We uphold this core value in every shipment, ensuring that all aspects of our service meet the highest standards.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Company Timeline */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-brand-bg-light border border-brand-border rounded-full px-4 py-1.5 mb-6">
                <span className="text-brand-accent text-sm font-bold tracking-wide uppercase">Our Journey</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary leading-tight mb-6">
                A history of <span className="text-brand-accent">logistics excellence</span>
              </h2>
              <p className="text-brand-text-muted leading-relaxed mb-8">
                Since our founding, we have continuously expanded our services, grown our fleet, and invested in modern technology to meet the evolving needs of the logistics industry.
              </p>
            </div>
            <div className="relative pl-8 border-l-2 border-brand-border">
              {timeline.map((item, i) => (
                <div key={i} className="mb-10 last:mb-0 relative group">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white border-4 border-brand-border group-hover:border-brand-accent transition-colors"></div>
                  <h4 className="text-2xl font-heading font-bold text-brand-accent mb-2">{item.year}</h4>
                  <p className="text-lg text-brand-primary font-medium">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-brand-bg-light">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 text-brand-primary">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Operation Experts</h2>
            <p className="text-brand-text-muted max-w-2xl mx-auto">Meet the dedicated professionals who ensure your goods are transported safely and efficiently.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm group border border-brand-border">
                <div className="relative h-72 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold text-brand-primary mb-1">{member.name}</h4>
                  <p className="text-brand-accent font-medium text-sm uppercase tracking-wider">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
