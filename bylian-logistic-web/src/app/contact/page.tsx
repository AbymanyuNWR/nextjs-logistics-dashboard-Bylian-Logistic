"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminState } from "@/context/AdminStateContext";

export default function ContactPage() {
  const { addMessage } = useAdminState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error");
      return;
    }
    setFormStatus("loading");
    
    setTimeout(() => {
      addMessage(formData);
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <PageHeader 
        title="Contact Us" 
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact" }
        ]} 
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-brand-bg-light border border-brand-border rounded-full px-4 py-1.5 mb-6">
                <span className="text-brand-accent text-sm font-bold tracking-wide uppercase">Get In Touch</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-primary leading-tight mb-6">
                Feel free to <span className="text-brand-accent">contact us</span> anytime
              </h2>
              <p className="text-lg text-brand-text-muted leading-relaxed mb-12">
                Whether you have a question about our services, pricing, need a consultation, or anything else, our team is ready to answer all your questions.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 rounded-2xl bg-brand-bg-light text-brand-accent flex items-center justify-center shrink-0 border border-brand-border">
                    <MapPin size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-bold text-brand-primary mb-2">Office Location</h4>
                    <p className="text-brand-text-muted leading-relaxed">
                      Jl. Logistic Center No. 88, <br />
                      Jakarta Selatan, Indonesia 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 rounded-2xl bg-brand-bg-light text-brand-accent flex items-center justify-center shrink-0 border border-brand-border">
                    <Phone size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-bold text-brand-primary mb-2">Phone Number</h4>
                    <p className="text-brand-text-muted leading-relaxed">
                      Main: <a href="tel:+6281234567890" className="hover:text-brand-accent font-medium">+62 812 3456 7890</a><br />
                      Support: <a href="tel:+6281234567891" className="hover:text-brand-accent font-medium">+62 812 3456 7891</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 rounded-2xl bg-brand-bg-light text-brand-accent flex items-center justify-center shrink-0 border border-brand-border">
                    <Mail size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-bold text-brand-primary mb-2">Email Address</h4>
                    <p className="text-brand-text-muted leading-relaxed">
                      General: <a href="mailto:info@bylianlogistics.com" className="hover:text-brand-accent font-medium">info@bylianlogistics.com</a><br />
                      Support: <a href="mailto:support@bylianlogistics.com" className="hover:text-brand-accent font-medium">support@bylianlogistics.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-brand-bg-light p-8 md:p-12 rounded-3xl border border-brand-border shadow-sm">
              <h3 className="text-3xl font-heading font-bold text-brand-primary mb-2">Send Message</h3>
              <p className="text-brand-text-muted mb-8">We will respond to your message within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-brand-primary mb-2">Your Name *</label>
                    <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} className="h-14 bg-white" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-brand-primary mb-2">Your Email *</label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} className="h-14 bg-white" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-brand-primary mb-2">Your Phone</label>
                    <Input id="phone" name="phone" placeholder="+62 812..." value={formData.phone} onChange={handleInputChange} className="h-14 bg-white" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-brand-primary mb-2">Subject</label>
                    <Input id="subject" name="subject" placeholder="How can we help?" value={formData.subject} onChange={handleInputChange} className="h-14 bg-white" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-brand-primary mb-2">Your Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    placeholder="Write your message here..." 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    className="flex min-h-[150px] w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent resize-y"
                    required 
                  ></textarea>
                </div>
                
                {formStatus === "error" && <p className="text-brand-error text-sm font-medium">Please fill in all required fields.</p>}
                {formStatus === "success" && <p className="text-brand-success text-sm font-medium bg-brand-success/10 border border-brand-success/20 p-4 rounded-xl">Thank you! Your message has been sent successfully.</p>}
                
                <Button type="submit" size="lg" className="w-full h-14 text-base" disabled={formStatus === "loading"}>
                  {formStatus === "loading" ? "Sending..." : (
                    <>Send Message <Send size={18} className="ml-2" /></>
                  )}
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-brand-bg-light relative border-t border-brand-border">
        {/* Placeholder for iframe map */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
           <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24009849544!2d106.75871215433291!3d-6.229746487965005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5e82dd4b820!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale contrast-125"
          ></iframe>
        </div>
      </section>
    </>
  );
}
