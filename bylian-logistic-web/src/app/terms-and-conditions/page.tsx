import { PageHeader } from "@/components/shared/PageHeader";

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHeader 
        title="Terms and Conditions" 
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" }
        ]} 
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-brand-primary text-brand-text-muted">
            <h2>1. Agreement to Terms</h2>
            <p>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Bylian Logistic Transport Services ("Company", "we", "us", or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").</p>
            
            <h2>2. Intellectual Property Rights</h2>
            <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions.</p>

            <h2>3. User Representations</h2>
            <p>By using the Site, you represent and warrant that:</p>
            <ul>
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
              <li>You will not use the Site for any illegal or unauthorized purpose.</li>
            </ul>

            <h2>4. Products and Services</h2>
            <p>All shipping, freight, and logistics services are subject to specific contracts and agreements outside of this website. The information provided on this website regarding services is for informational purposes only.</p>
            
            <h2>5. Contact Us</h2>
            <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at support@bylianlogistics.com.</p>
          </div>
        </div>
      </section>
    </>
  );
}
