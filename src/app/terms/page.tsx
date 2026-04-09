import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions — Ainomiq",
  description: "Terms and conditions for using Ainomiq services and platform.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold tracking-tight text-ainomiq-text mb-4">{title}</h2>
      <div className="text-[15px] leading-relaxed text-ainomiq-text-muted space-y-3">
        {children}
      </div>
    </section>
  );
}

export default function TermsOfService() {
  return (
    <main className="pt-40 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text mb-4">
            Terms and Conditions
          </h1>
          <p className="text-ainomiq-text-muted text-lg">
            Last updated: April 9, 2026
          </p>
        </div>

        <div className="mb-12 text-[15px] leading-relaxed text-ainomiq-text-muted space-y-3">
          <p>
            These Terms and Conditions (&quot;Terms&quot;) apply to the use of the website ainomiq.com
            (&quot;Website&quot;), the Ainomiq platform and associated applications
            (&quot;Platform&quot;), and all services offered by Ainomiq (&quot;Services&quot;). By using
            the Website, Platform, or Services, you agree to these Terms.
          </p>
          <p>
            Ainomiq is registered at the Dutch Chamber of Commerce (Kamer van Koophandel) under number
            42032616, hereinafter referred to as &quot;Ainomiq&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;.
          </p>
        </div>

        <Section title="1. Definitions">
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong className="text-ainomiq-text">&quot;User&quot;</strong> — any natural or legal person who visits the Website, uses the Platform, or purchases Services.</li>
            <li><strong className="text-ainomiq-text">&quot;Platform&quot;</strong> — the Ainomiq e-commerce platform, including AI agents, dashboards, integrations, and associated functionality.</li>
            <li><strong className="text-ainomiq-text">&quot;Services&quot;</strong> — all services provided by Ainomiq, including AI automation, platform access, custom projects, and consultancy.</li>
            <li><strong className="text-ainomiq-text">&quot;Subscription&quot;</strong> — a recurring payment plan for access to the Platform.</li>
            <li><strong className="text-ainomiq-text">&quot;Custom Project&quot;</strong> — a project-based engagement with a defined scope and fee.</li>
            <li><strong className="text-ainomiq-text">&quot;Content&quot;</strong> — all text, images, data, configurations, AI models, and other materials made available through the Website or Platform.</li>
          </ul>
        </Section>

        <Section title="2. Description of Services">
          <p>
            Ainomiq provides an AI automation platform for e-commerce businesses. The Platform integrates
            with external tools and platforms (including Shopify, WooCommerce, Magento, Lightspeed, and
            Bol.com) and uses AI agents that automate business processes, including customer service,
            marketing automation, and product recommendations.
          </p>
          <p>
            Additionally, Ainomiq offers custom automation solutions on a project basis, including process
            automation, data analytics, document processing, and strategic consulting.
          </p>
        </Section>

        <Section title="3. Account Registration and Security">
          <p>
            To use the Platform, you must create an account. You are responsible for providing accurate and
            up-to-date information and for maintaining the confidentiality of your login credentials.
          </p>
          <p>
            You are fully responsible for all activities that occur under your account. Ainomiq shall not be
            liable for damages resulting from unauthorized use of your account due to negligence in protecting
            your credentials.
          </p>
          <p>
            Ainomiq reserves the right to refuse, suspend, or terminate accounts in the event of abuse or
            violation of these Terms.
          </p>
        </Section>

        <Section title="4. Subscriptions, Billing, and Payment">
          <p className="font-medium text-ainomiq-text">4.1 Subscriptions (Platform)</p>
          <p>
            Access to the Platform is offered through monthly recurring subscriptions. Billing is processed
            via Stripe or a payment provider designated by us.
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Subscription fees are charged monthly in advance.</li>
            <li>All amounts are in euros and exclusive of VAT, unless stated otherwise.</li>
            <li>Price changes will be communicated at least 30 days in advance.</li>
          </ul>

          <p className="font-medium text-ainomiq-text pt-3">4.2 Custom Projects</p>
          <p>
            Custom projects are invoiced on a project basis in accordance with a pre-agreed quotation.
            Payment is made according to the payment terms set out in the quotation.
          </p>

          <p className="font-medium text-ainomiq-text pt-3">4.3 Refunds</p>
          <p>
            All fees are non-refundable, unless expressly provided otherwise in these Terms or in a separate agreement.
          </p>
        </Section>

        <Section title="5. Intellectual Property">
          <p className="font-medium text-ainomiq-text">5.1 Ainomiq&apos;s Ownership</p>
          <p>
            All intellectual property rights relating to the Platform, Website, Content, AI configurations,
            skills, workflows, and underlying technology are owned by Ainomiq or its licensors. Nothing in
            these Terms transfers any ownership rights to the User.
          </p>
          <p>
            You are granted a limited, non-exclusive, non-transferable, non-sublicensable, and revocable
            license to use the Platform for the duration of your Subscription, solely for your own business operations.
          </p>

          <p className="font-medium text-ainomiq-text pt-3">5.2 User&apos;s Ownership</p>
          <p>
            You retain all rights to your own business data, content, and materials that you upload to or
            process through the Platform. Ainomiq does not claim any ownership rights over your data.
          </p>
        </Section>

        <Section title="6. Prohibited Conduct">
          <p>You may not:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Reverse engineer, decompile, or disassemble the Platform or Services.</li>
            <li>Copy, extract, or scrape AI configurations, skills, workflows, or other proprietary components.</li>
            <li>Resell, redistribute, or sublicense access to the Platform.</li>
            <li>Create derivative works based on the Platform or Content.</li>
            <li>Circumvent or tamper with security measures.</li>
            <li>Gain unauthorized access to data or accounts of other users.</li>
            <li>Use the Platform for illegal purposes.</li>
            <li>Benchmark or scrape the Platform for the purpose of building competing products.</li>
          </ul>
        </Section>

        <Section title="7. Suspension and Termination">
          <p className="font-medium text-ainomiq-text">7.1 Immediate Suspension</p>
          <p>
            Violation of Section 5 (Intellectual Property) or Section 6 (Prohibited Conduct) will result in
            the immediate and automatic suspension of your account, without prior notice. No refund, credit,
            or pro-rata reimbursement shall be issued.
          </p>

          <p className="font-medium text-ainomiq-text pt-3">7.2 Cancellation by User</p>
          <p>
            You may cancel your Subscription at any time. Cancellation takes effect at the end of the current
            billing period. You will retain access until that time.
          </p>

          <p className="font-medium text-ainomiq-text pt-3">7.3 Termination by Ainomiq</p>
          <p>
            Ainomiq may suspend or terminate your account with or without cause. In the event of termination
            for breach, no refund shall be issued. In the event of termination without cause, you will receive
            a pro-rata refund for the remaining subscription period.
          </p>
        </Section>

        <Section title="8. Your Data and Credentials">
          <p>
            Ainomiq handles your data with care. API keys and third-party login credentials are stored
            exclusively within your own platform environment and not in centralized systems.
          </p>
          <p>
            Support staff have limited access to your environment. Infrastructure teams may only access
            instances for maintenance purposes, with restrictions on viewing your data.
          </p>
          <p>
            For detailed information on data processing, please refer to our{" "}
            <Link href="/privacy" className="text-ainomiq-blue hover:underline">Privacy Policy</Link>.
          </p>
        </Section>

        <Section title="9. Third-Party AI Providers and Integrations">
          <p>
            The Platform uses third-party AI providers (including Claude by Anthropic,
            OpenAI, and Google Gemini) and integrates with external platforms. Your use of these services is
            subject to the terms and conditions of the respective providers.
          </p>
          <p>
            Ainomiq assumes no liability for the performance, availability, or output of third-party AI
            providers or integrated platforms.
          </p>
        </Section>

        <Section title="10. Disclaimer of Warranties">
          <div className="rounded-xl border border-ainomiq-border bg-ainomiq-surface p-4">
            <p className="text-sm font-medium text-ainomiq-text">
              The Platform and Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis,
              without warranties of any kind, whether express or implied.
            </p>
          </div>
          <p>
            Ainomiq does not warrant that AI-generated output is error-free, complete, or fit for a particular
            purpose. You are responsible at all times for verifying and validating AI output before acting upon it.
          </p>
          <p>
            Ainomiq does not guarantee uninterrupted or error-free operation of the Platform.
          </p>
        </Section>

        <Section title="11. Limitation of Liability">
          <p>
            Ainomiq&apos;s total liability is limited to the amount you have paid to Ainomiq in the three months
            preceding the event giving rise to the claim.
          </p>
          <p>
            In no event shall Ainomiq be liable for indirect, incidental, special, consequential, or punitive
            damages, including but not limited to lost profits, lost data, or business interruption.
          </p>
        </Section>

        <Section title="12. Indemnification">
          <p>
            You agree to indemnify and hold harmless Ainomiq, its directors, employees, and partners against
            all claims, demands, damages, costs, and expenses arising from:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Your use of the Platform or Services.</li>
            <li>Violation of these Terms.</li>
            <li>Violation of applicable laws or regulations.</li>
            <li>Infringement of third-party intellectual property rights.</li>
            <li>Actions performed by AI agents on your connected accounts or systems.</li>
          </ul>
        </Section>

        <Section title="13. Governing Law and Dispute Resolution">
          <p>
            These Terms are governed by the laws of the Netherlands. All disputes shall be submitted
            exclusively to the competent court in Amsterdam, the Netherlands.
          </p>
        </Section>

        <Section title="14. Modifications">
          <p>
            Ainomiq reserves the right to modify these Terms. Material changes shall be communicated at least
            fifteen (15) days prior to taking effect, via email or a notification on the Platform.
          </p>
          <p>
            Continued use after modified Terms take effect constitutes acceptance of those changes.
          </p>
        </Section>

        <Section title="15. Severability">
          <p>
            If any provision of these Terms is found to be invalid or unenforceable, that provision shall be
            modified to the minimum extent necessary. The remaining provisions shall continue in full force and effect.
          </p>
        </Section>

        <Section title="16. Entire Agreement">
          <p>
            These Terms, together with the{" "}
            <Link href="/privacy" className="text-ainomiq-blue hover:underline">Privacy Policy</Link>{" "}
            and any supplementary agreements, constitute the entire agreement between you and Ainomiq.
          </p>
        </Section>

        <Section title="17. Contact">
          <p>
            <strong className="text-ainomiq-text">Ainomiq</strong><br />
            Email: <a href="mailto:info@ainomiq.com" className="text-ainomiq-blue hover:underline">info@ainomiq.com</a><br />
            Website: <a href="https://ainomiq.com" className="text-ainomiq-blue hover:underline">ainomiq.com</a>
          </p>
        </Section>
      </div>
    </main>
  );
}
