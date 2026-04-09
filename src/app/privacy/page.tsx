import { Metadata } from "next/metadata";

export const metadata: Metadata = {
  title: "Privacy Policy — Ainomiq",
  description: "How Ainomiq collects, uses, and protects your personal data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="pt-40 pb-24 px-6">
      <div className="mx-auto max-w-3xl prose prose-gray">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-ainomiq-text-muted mb-10">Last updated: April 9, 2026</p>

        <h2>1. Who We Are</h2>
        <p>
          Ainomiq (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is an AI automation company based in The Netherlands.
          We provide AI-powered customer service, marketing automation, and data integration
          services for e-commerce businesses. Our website is <a href="https://ainomiq.com">ainomiq.com</a> and
          our application is accessible at <a href="https://app.ainomiq.com">app.ainomiq.com</a>.
        </p>
        <p>Contact: <a href="mailto:info@ainomiq.com">info@ainomiq.com</a></p>

        <h2>2. What Data We Collect</h2>
        <p>We may collect the following categories of personal data:</p>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, company name, and password when you create an account.</li>
          <li><strong>Business Data:</strong> Store URLs, API credentials (encrypted), and integration settings you provide to connect third-party services (Shopify, Klaviyo, Meta, Google Ads).</li>
          <li><strong>Usage Data:</strong> Pages visited, features used, timestamps, browser type, and IP address.</li>
          <li><strong>Communication Data:</strong> Emails, support requests, and any messages you send us.</li>
          <li><strong>Customer Data:</strong> Data processed on behalf of our clients (e.g., customer support emails, order data) is processed as a data processor under a Data Processing Agreement.</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <ul>
          <li>To provide, maintain, and improve our services.</li>
          <li>To authenticate your identity and manage your account.</li>
          <li>To process integrations with third-party platforms on your behalf.</li>
          <li>To communicate with you about your account, updates, and support.</li>
          <li>To analyze usage patterns and improve our platform.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2>4. Legal Basis for Processing (GDPR)</h2>
        <p>We process personal data based on:</p>
        <ul>
          <li><strong>Contract:</strong> Processing necessary to perform our services as agreed.</li>
          <li><strong>Legitimate Interest:</strong> Analytics, security, and service improvement.</li>
          <li><strong>Consent:</strong> Where explicitly provided (e.g., marketing communications).</li>
          <li><strong>Legal Obligation:</strong> Compliance with applicable laws.</li>
        </ul>

        <h2>5. Third-Party Services</h2>
        <p>
          We integrate with third-party platforms to deliver our services. When you connect a
          third-party account (Shopify, Klaviyo, Meta, Google Ads, Google Analytics), we access
          data from those platforms as authorized by you. We do not sell your data to third parties.
        </p>
        <p>We use the following service providers:</p>
        <ul>
          <li><strong>Vercel:</strong> Hosting and deployment (USA, GDPR DPA in place).</li>
          <li><strong>Auth0:</strong> Authentication (USA, GDPR DPA in place).</li>
          <li><strong>Turso:</strong> Database (EU region).</li>
          <li><strong>Google APIs:</strong> Google Ads, Google Analytics integration.</li>
          <li><strong>Meta APIs:</strong> Advertising platform integration.</li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>
          We retain your personal data for as long as your account is active or as needed to
          provide services. When you delete your account, we remove your personal data within
          30 days, except where retention is required by law.
        </p>

        <h2>7. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your data,
          including encryption of API credentials at rest, secure HTTPS connections, access
          controls, and regular security reviews.
        </p>

        <h2>8. Your Rights</h2>
        <p>Under the GDPR, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Rectify inaccurate data.</li>
          <li>Erase your data (&quot;right to be forgotten&quot;).</li>
          <li>Restrict or object to processing.</li>
          <li>Data portability.</li>
          <li>Withdraw consent at any time.</li>
          <li>Lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).</li>
        </ul>
        <p>To exercise any of these rights, contact us at <a href="mailto:info@ainomiq.com">info@ainomiq.com</a>.</p>

        <h2>9. Cookies</h2>
        <p>
          We use essential cookies for authentication and session management. We may use
          analytics cookies to understand how our platform is used. You can manage cookie
          preferences in your browser settings.
        </p>

        <h2>10. International Transfers</h2>
        <p>
          Some of our service providers are based outside the EU/EEA. Where data is transferred
          internationally, we ensure appropriate safeguards are in place (Standard Contractual
          Clauses or adequacy decisions).
        </p>

        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of material
          changes by posting the updated policy on our website with a new effective date.
        </p>

        <h2>12. Contact</h2>
        <p>
          If you have questions about this Privacy Policy or our data practices, contact us at:<br />
          <strong>Ainomiq</strong><br />
          Email: <a href="mailto:info@ainomiq.com">info@ainomiq.com</a><br />
          Location: The Netherlands
        </p>
      </div>
    </main>
  );
}
