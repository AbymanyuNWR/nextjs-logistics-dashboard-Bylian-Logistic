import { PageHeader } from "@/components/shared/PageHeader";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader 
        title="Privacy Policy" 
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" }
        ]} 
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-brand-primary text-brand-text-muted">
            <h2>1. Introduction</h2>
            <p>Welcome to Bylian Logistic Transport Services. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at privacy@bylianlogistics.com.</p>
            
            <h2>2. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.</p>
            <ul>
              <li>Names, phone numbers, email addresses, and other similar contact data.</li>
              <li>Credentials like passwords, password hints, and similar security information.</li>
              <li>Shipping and tracking information related to your cargo.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
            <ul>
              <li>To facilitate account creation and logon process.</li>
              <li>To send administrative information to you.</li>
              <li>To fulfill and manage your orders and shipments.</li>
            </ul>

            <h2>4. Will Your Information be Shared with Anyone?</h2>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
            
            <h2>5. Contact Us</h2>
            <p>If you have questions or comments about this notice, you may email us at support@bylianlogistics.com.</p>
          </div>
        </div>
      </section>
    </>
  );
}
