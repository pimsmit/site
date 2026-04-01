import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ainomiq — Always Ahead',
  description: 'AI automation platform for e-commerce. Automate customer service, ads, email, and operations.',
};

const nav = (
  <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15,27,45,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
    <a href="/" style={{ fontSize: '20px', fontWeight: 600, color: '#fff', textDecoration: 'none' }}>ainomiq</a>
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <a href="/platform" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none' }}>App</a>
      <a href="/enterprise" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none' }}>Enterprise</a>
      <a href="/about" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none' }}>About</a>
      <a href="https://app.ainomiq.com/login" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none' }}>Sign in</a>
      <a href="https://app.ainomiq.com/register" style={{ padding: '8px 20px', borderRadius: '8px', background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Get started</a>
    </div>
  </nav>
);

export default function Home() {
  return (
    <div style={{ background: '#0f1b2d', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {nav}

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '160px 24px 120px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>AI Automation Platform</p>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px' }}>Your business.<br />Automated.</h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 48px' }}>Ainomiq automates customer service, ad management, email marketing, and operations — so you can focus on growth.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://app.ainomiq.com/register" style={{ padding: '14px 32px', borderRadius: '10px', background: '#3b82f6', color: '#fff', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>Start free trial</a>
          <a href="/enterprise" style={{ padding: '14px 32px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '15px', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>Enterprise</a>
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>Trusted by</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', opacity: 0.4, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '18px', fontWeight: 600 }}>Billie Jeans</span>
          <span style={{ fontSize: '18px', fontWeight: 600 }}>Domino&apos;s</span>
          <span style={{ fontSize: '18px', fontWeight: 600 }}>+ 12 more</span>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', textAlign: 'center' }}>Platform</p>
        <h2 style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', letterSpacing: '-0.02em', marginBottom: '64px' }}>One dashboard. Every automation.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {[
            { title: 'Customer Service', desc: 'AI handles emails, DMs, and comments. 200+ tickets/day, zero human effort.', icon: 'CS' },
            { title: 'Ad Management', desc: 'Monitor Meta, Google, and TikTok ads. Kill losers, scale winners — automatically.', icon: 'Ads' },
            { title: 'Email Marketing', desc: 'Klaviyo flows, campaigns, and segmentation — all AI-optimized.', icon: 'Email' },
            { title: 'Inventory', desc: 'Smart stock alerts, reorder predictions, and fulfillment tracking.', icon: 'Stock' },
            { title: 'Performance', desc: 'Real-time analytics across all platforms. Revenue, ROAS, CAC — one view.', icon: 'Perf' },
            { title: 'Automations', desc: 'Custom workflows that connect everything. If this, then that — on steroids.', icon: 'Auto' },
          ].map((f) => (
            <div key={f.title} style={{ padding: '32px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#3b82f6' }}>{f.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Pricing</p>
        <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '48px' }}>Simple pricing. No surprises.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ padding: '32px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'left' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>App</h3>
            <p style={{ fontSize: '36px', fontWeight: 700, marginBottom: '4px' }}>&euro;149<span style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>/mo</span></p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>Everything included</p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}>
              <li>AI Customer Service</li><li>Ad Monitoring</li><li>Email Marketing</li><li>Inventory Tracking</li><li>Performance Dashboard</li><li>All Automations</li>
            </ul>
            <a href="https://app.ainomiq.com/register" style={{ display: 'block', marginTop: '24px', padding: '12px', borderRadius: '8px', background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: 500, textDecoration: 'none', textAlign: 'center' }}>Start free trial</a>
          </div>
          <div style={{ padding: '32px', borderRadius: '16px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)', textAlign: 'left' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#3b82f6', marginBottom: '8px' }}>Enterprise</h3>
            <p style={{ fontSize: '36px', fontWeight: 700, marginBottom: '4px' }}>Custom</p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>Tailored to your scale</p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}>
              <li>Everything in App</li><li>Custom Dashboards</li><li>API Access</li><li>Dedicated Support</li><li>Custom Integrations</li><li>SLA Guarantee</li>
            </ul>
            <a href="/contact" style={{ display: 'block', marginTop: '24px', padding: '12px', borderRadius: '8px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', fontSize: '14px', fontWeight: 500, textDecoration: 'none', textAlign: 'center', border: '1px solid rgba(59,130,246,0.3)' }}>Contact sales</a>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 700, margin: '0 auto', padding: '80px 24px 120px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>Always ahead.</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>Join businesses that automate with Ainomiq.</p>
        <a href="https://app.ainomiq.com/register" style={{ padding: '14px 40px', borderRadius: '10px', background: '#3b82f6', color: '#fff', fontSize: '16px', fontWeight: 600, textDecoration: 'none' }}>Get started free</a>
      </section>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>&copy; 2026 Ainomiq. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="/privacy" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Privacy</a>
          <a href="/terms" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Terms</a>
          <a href="/contact" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
