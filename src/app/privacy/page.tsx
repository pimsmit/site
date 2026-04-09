import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Ainomiq",
  description: "How Ainomiq collects, uses, and protects your personal data.",
};

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold tracking-tight text-ainomiq-text mb-4">{title}</h2>
      <div className="text-[15px] leading-relaxed text-ainomiq-text-muted space-y-3">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <main className="pt-40 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text mb-4">
            Privacy Policy
          </h1>
          <p className="text-ainomiq-text-muted text-lg">
            Version 1.0 — April 9, 2026
          </p>
        </div>

        {/* App policy link - subtle */}
        <div className="mb-12 flex items-center gap-3 rounded-2xl border border-ainomiq-border bg-ainomiq-surface px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ainomiq-blue-glow shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ainomiq-blue">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" x2="21" y1="14" y2="3" />
            </svg>
          </div>
          <p className="text-sm text-ainomiq-text-muted">
            Looking for the app privacy policy?{" "}
            <a href="https://app.ainomiq.com/privacy-policy" className="text-ainomiq-blue font-medium hover:underline">
              app.ainomiq.com/privacy-policy
            </a>
          </p>
        </div>

        {/* Content */}
        <PolicySection title="1. Introduction">
          <p>
            This privacy policy describes how Ainomiq (&quot;we&quot;, &quot;us&quot; or &quot;our&quot;)
            collects, processes and protects personal data through our website ainomiq.com.
          </p>
          <p>
            Ainomiq is established in the Netherlands and operates in compliance with the General Data
            Protection Regulation (GDPR), the Dutch GDPR Implementation Act (UAVG) and other applicable
            privacy legislation.
          </p>
          <p>
            Data Controller: Ainomiq, established in the Netherlands. For questions, please contact us
            at <a href="mailto:privacy@ainomiq.com" className="text-ainomiq-blue hover:underline">privacy@ainomiq.com</a>.
          </p>
        </PolicySection>

        <PolicySection title="2. Data We Collect">
          <p className="font-medium text-ainomiq-text">Data you provide to us</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong className="text-ainomiq-text">Contact information:</strong> name, email address and optionally company name when you submit a contact form, request a quote or subscribe to our newsletter.</li>
            <li><strong className="text-ainomiq-text">Communications:</strong> messages you send us via email, contact forms or other channels, including the content and metadata of these messages.</li>
          </ul>

          <p className="font-medium text-ainomiq-text pt-3">Data collected automatically</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong className="text-ainomiq-text">Technical data:</strong> IP address (anonymized), browser type, operating system, referring URL, pages visited, click behavior and session duration.</li>
            <li><strong className="text-ainomiq-text">Cookies:</strong> functional and analytical cookies. See section 7 for our cookie policy.</li>
          </ul>

          <p className="font-medium text-ainomiq-text pt-3">Data we do not collect</p>
          <p>
            We do not collect special categories of personal data (such as health data or biometric data).
            We do not place tracking or advertising cookies and do not build advertising profiles.
          </p>
        </PolicySection>

        <PolicySection title="3. Legal Basis for Processing">
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong className="text-ainomiq-text">Consent (Art. 6(1)(a) GDPR):</strong> for placing analytical cookies and sending newsletters. You may withdraw this consent at any time.</li>
            <li><strong className="text-ainomiq-text">Legitimate interest (Art. 6(1)(f) GDPR):</strong> for the functioning and security of our website and improving our services.</li>
            <li><strong className="text-ainomiq-text">Performance of contract (Art. 6(1)(b) GDPR):</strong> for responding to quote requests and contact inquiries.</li>
          </ul>
        </PolicySection>

        <PolicySection title="4. Purposes of Processing">
          <p>We use your data exclusively for:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Responding to your inquiries and contact requests</li>
            <li>Sending requested information, quotes or newsletters</li>
            <li>Analyzing and improving the use of our website</li>
            <li>Ensuring the security and availability of our website</li>
          </ul>
          <p className="font-medium text-ainomiq-text pt-2">
            We do not sell your data. We do not share your data with advertisers. We do not use your data to train AI models.
          </p>
        </PolicySection>

        <PolicySection title="5. Third Parties and Sub-Processors">
          <div className="space-y-4">
            <div className="rounded-xl border border-ainomiq-border p-4">
              <p className="font-medium text-ainomiq-text text-sm">Vercel — Hosting</p>
              <p className="text-sm mt-1">Processes technical request data (IP address, headers) for serving the website. US-based; Standard Contractual Clauses (SCCs).</p>
            </div>
            <div className="rounded-xl border border-ainomiq-border p-4">
              <p className="font-medium text-ainomiq-text text-sm">Anthropic — AI</p>
              <p className="text-sm mt-1">Provision of AI language models used on the website. US-based; Standard Contractual Clauses (SCCs).</p>
            </div>
            <div className="rounded-xl border border-ainomiq-border p-4">
              <p className="font-medium text-ainomiq-text text-sm">GitHub — Code Hosting</p>
              <p className="text-sm mt-1">Hosting of website source code. No direct processing of visitor data. US-based; Standard Contractual Clauses (SCCs).</p>
            </div>
          </div>
          <p className="pt-2">
            We have entered into data processing agreements with all sub-processors in accordance with GDPR
            requirements. Personal data is not transferred outside the EEA without appropriate safeguards.
          </p>
        </PolicySection>

        <PolicySection title="6. Retention Periods">
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong className="text-ainomiq-text">Contact information and communications:</strong> up to 2 years after the last contact, unless there is an ongoing agreement.</li>
            <li><strong className="text-ainomiq-text">Newsletter subscribers:</strong> until unsubscription, after which data is deleted within 30 days.</li>
            <li><strong className="text-ainomiq-text">Analytical data:</strong> up to 26 months, after which it is anonymized or deleted.</li>
          </ul>
        </PolicySection>

        <PolicySection title="7. Cookie Policy">
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong className="text-ainomiq-text">Strictly necessary cookies:</strong> required for basic website functionality. Cannot be disabled.</li>
            <li><strong className="text-ainomiq-text">Analytical cookies:</strong> anonymized cookies for analyzing website usage. Only placed with your consent.</li>
          </ul>
          <p>
            We do not place tracking, advertising or social media cookies. You can adjust your cookie
            preferences at any time through your browser settings.
          </p>
        </PolicySection>

        <PolicySection title="8. Security">
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Encryption of data in transit (TLS 1.2+)</li>
            <li>Access control based on the principle of least privilege</li>
            <li>Regular security assessments</li>
          </ul>
          <p>
            In the event of a data breach that poses a risk to your rights and freedoms, we will notify
            you and the Dutch Data Protection Authority within 72 hours of discovery, in accordance with
            Articles 33 and 34 of the GDPR.
          </p>
        </PolicySection>

        <PolicySection title="9. Your Rights">
          <p>Under the GDPR, you have the following rights:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong className="text-ainomiq-text">Right of access (Art. 15)</strong> — request information about your personal data.</li>
            <li><strong className="text-ainomiq-text">Right to rectification (Art. 16)</strong> — request correction of inaccurate data.</li>
            <li><strong className="text-ainomiq-text">Right to erasure (Art. 17)</strong> — request deletion of your personal data.</li>
            <li><strong className="text-ainomiq-text">Right to restriction (Art. 18)</strong> — request restriction of processing.</li>
            <li><strong className="text-ainomiq-text">Right to data portability (Art. 20)</strong> — receive your data in a machine-readable format.</li>
            <li><strong className="text-ainomiq-text">Right to object (Art. 21)</strong> — object to processing based on legitimate interest.</li>
            <li><strong className="text-ainomiq-text">Right to withdraw consent</strong> — withdraw consent at any time.</li>
          </ul>
          <p>
            Exercise your rights via{" "}
            <a href="mailto:privacy@ainomiq.com" className="text-ainomiq-blue hover:underline">privacy@ainomiq.com</a>.
            We will respond within 30 days. You may also lodge a complaint with the{" "}
            <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-ainomiq-blue hover:underline">
              Dutch Data Protection Authority
            </a>.
          </p>
        </PolicySection>

        <PolicySection title="10. Children">
          <p>
            Our website is not directed at individuals under the age of 16. We do not knowingly collect
            personal data from minors.
          </p>
        </PolicySection>

        <PolicySection title="11. Changes">
          <p>
            We reserve the right to amend this privacy policy. Material changes will be communicated via
            a notification on our website, at least 30 days before taking effect.
          </p>
        </PolicySection>

        <PolicySection title="12. Contact">
          <p>
            <strong className="text-ainomiq-text">Ainomiq</strong><br />
            Email: <a href="mailto:privacy@ainomiq.com" className="text-ainomiq-blue hover:underline">privacy@ainomiq.com</a><br />
            Website: <a href="https://ainomiq.com" className="text-ainomiq-blue hover:underline">ainomiq.com</a>
          </p>
        </PolicySection>
      </div>
    </main>
  );
}
