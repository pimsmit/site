import { Metadata } from "next/metadata";

export const metadata: Metadata = {
  title: "Terms of Service — Ainomiq",
  description: "Terms and conditions for using Ainomiq services.",
};

export default function TermsOfService() {
  return (
    <main className="pt-40 pb-24 px-6">
      <div className="mx-auto max-w-3xl prose prose-gray">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-ainomiq-text-muted mb-10">Last updated: April 9, 2026</p>

        <h2>1. Agreement</h2>
        <p>
          By accessing or using Ainomiq&apos;s website (<a href="https://ainomiq.com">ainomiq.com</a>),
          application (<a href="https://app.ainomiq.com">app.ainomiq.com</a>), or any of our services,
          you agree to be bound by these Terms of Service. If you do not agree, do not use our services.
        </p>

        <h2>2. Services</h2>
        <p>
          Ainomiq provides AI-powered automation services for businesses, including but not limited to:
        </p>
        <ul>
          <li>AI Customer Service automation (email handling, response generation).</li>
          <li>Marketing automation and campaign management (Meta Ads, Google Ads).</li>
          <li>E-commerce integrations (Shopify, Klaviyo, Meta, Google Analytics).</li>
          <li>Data analytics and performance reporting.</li>
          <li>Custom AI automation solutions for enterprise clients.</li>
        </ul>

        <h2>3. Account Registration</h2>
        <p>
          To use certain features, you must create an account. You are responsible for maintaining
          the confidentiality of your credentials and for all activity under your account. You must
          provide accurate and complete information and notify us immediately of any unauthorized access.
        </p>

        <h2>4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use our services for any unlawful purpose.</li>
          <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts.</li>
          <li>Interfere with or disrupt the integrity or performance of our services.</li>
          <li>Reverse engineer, decompile, or disassemble any part of our platform.</li>
          <li>Use our services to send spam, phishing, or other unsolicited communications.</li>
          <li>Resell or redistribute our services without prior written consent.</li>
        </ul>

        <h2>5. Third-Party Integrations</h2>
        <p>
          Our services integrate with third-party platforms (Shopify, Klaviyo, Meta, Google).
          Your use of these integrations is subject to the respective third-party terms and policies.
          We are not responsible for third-party platform availability, changes, or data practices.
          You authorize us to access and process data from connected third-party accounts as necessary
          to deliver our services.
        </p>

        <h2>6. Intellectual Property</h2>
        <p>
          All content, software, designs, and materials on our website and platform are owned by
          Ainomiq or its licensors and are protected by intellectual property laws. You may not
          copy, modify, or distribute our materials without prior written consent.
        </p>
        <p>
          You retain ownership of all data and content you provide to us. You grant us a limited
          license to use your data solely to provide and improve our services.
        </p>

        <h2>7. Payment & Billing</h2>
        <p>
          Paid services are billed as described in your service agreement or subscription plan.
          All fees are exclusive of applicable taxes unless stated otherwise. Late payments may
          result in suspension of services.
        </p>

        <h2>8. Service Availability</h2>
        <p>
          We strive to maintain high availability but do not guarantee uninterrupted service.
          We may perform maintenance, updates, or modifications that temporarily affect availability.
          We will provide reasonable notice of planned downtime when possible.
        </p>

        <h2>9. Data Processing</h2>
        <p>
          When we process personal data on your behalf (e.g., your customers&apos; data for AI
          customer service), we act as a data processor. A Data Processing Agreement (DPA) governs
          this relationship in compliance with the GDPR. See our <a href="/privacy">Privacy Policy</a> for
          details on how we handle data.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Ainomiq shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages, or any loss of profits, revenue,
          data, or business opportunities arising from your use of our services.
        </p>
        <p>
          Our total liability for any claim arising from these Terms or our services shall not
          exceed the amount you paid to us in the twelve (12) months preceding the claim.
        </p>

        <h2>11. Indemnification</h2>
        <p>
          You agree to indemnify and hold Ainomiq harmless from any claims, damages, or expenses
          arising from your use of our services, your violation of these Terms, or your infringement
          of any third-party rights.
        </p>

        <h2>12. Termination</h2>
        <p>
          Either party may terminate the service agreement with 30 days&apos; written notice. We may
          suspend or terminate your access immediately if you violate these Terms. Upon termination,
          your right to use our services ceases, and we will delete your data within 30 days unless
          retention is required by law.
        </p>

        <h2>13. Governing Law</h2>
        <p>
          These Terms are governed by the laws of The Netherlands. Any disputes shall be submitted
          to the competent courts in The Netherlands.
        </p>

        <h2>14. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Material changes will be communicated via
          email or a notice on our website. Continued use of our services after changes take effect
          constitutes acceptance of the updated Terms.
        </p>

        <h2>15. Contact</h2>
        <p>
          If you have questions about these Terms, contact us at:<br />
          <strong>Ainomiq</strong><br />
          Email: <a href="mailto:info@ainomiq.com">info@ainomiq.com</a><br />
          Location: The Netherlands
        </p>
      </div>
    </main>
  );
}
