export default function AppPage() {
  return (
    <div style={{ background: '#0f1b2d', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15,27,45,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, color: '#fff', textDecoration: 'none' }}>ainomiq</a>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none' }}>Home</a>
          <a href="/enterprise" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none' }}>Enterprise</a>
          <a href="https://app.ainomiq.com/register" style={{ padding: '8px 20px', borderRadius: '8px', background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Start free trial</a>
        </div>
      </nav>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '160px 24px 80px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>App Platform</p>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px' }}>One subscription.<br />Unlimited automations.</h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 48px' }}>CS, ad monitoring, email marketing, inventory, and performance — all AI-powered, all in one dashboard.</p>
        <a href="https://app.ainomiq.com/register" style={{ padding: '14px 32px', borderRadius: '10px', background: '#3b82f6', color: '#fff', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>Start free trial</a>
      </section>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }}>
        {[
          { title: 'Customer Service', desc: 'AI handles emails, IG DMs, and comments. Learns your brand voice.', features: ['200+ tickets/day', 'Brand voice AI', 'Auto-escalation', 'Multi-language'] },
          { title: 'Ad Management', desc: 'Monitor Meta, Google, and TikTok performance. Auto-kill losers, scale winners.', features: ['Real-time metrics', 'Kill/scale alerts', 'Creative tracking', 'ROAS optimization'] },
          { title: 'Email Marketing', desc: 'AI-optimized Klaviyo flows, campaigns, and segments.', features: ['Flow optimization', 'A/B testing', 'Smart segments', 'Revenue tracking'] },
          { title: 'Performance', desc: 'All your data in one view. Revenue, ROAS, CAC, orders — across every platform.', features: ['Unified dashboard', 'Custom reports', 'Trend alerts', 'Export data'] },
        ].map((f) => (
          <div key={f.title} style={{ padding: '32px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '8px' }}>{f.title}</h3>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px', lineHeight: 1.6 }}>{f.desc}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>{f.features.map((feat) => (<span key={feat} style={{ padding: '4px 12px', borderRadius: '6px', background: 'rgba(59,130,246,0.08)', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{feat}</span>))}</div>
          </div>
        ))}
      </section>
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px' }}>&euro;149/month. Everything included.</h2>
        <a href="https://app.ainomiq.com/register" style={{ padding: '14px 40px', borderRadius: '10px', background: '#3b82f6', color: '#fff', fontSize: '16px', fontWeight: 600, textDecoration: 'none' }}>Get started free</a>
      </section>
    </div>
  );
}
