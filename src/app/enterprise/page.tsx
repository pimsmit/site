export default function EnterprisePage() {
  return (
    <div style={{ background: '#0f1b2d', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15,27,45,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, color: '#fff', textDecoration: 'none' }}>ainomiq</a>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none' }}>Home</a>
          <a href="/platform" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none' }}>App</a>
          <a href="/contact" style={{ padding: '8px 20px', borderRadius: '8px', background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Contact sales</a>
        </div>
      </nav>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '160px 24px 80px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Enterprise</p>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px' }}>Custom AI systems<br />for your scale.</h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 48px' }}>We build custom dashboards, integrations, and automation systems tailored to your business.</p>
      </section>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>Case Studies</h2>
        {[
          { name: "Domino's", desc: "Multi-location order analytics and performance dashboards across 300+ stores.", modules: ["Custom Dashboard", "API Integration", "Real-time Analytics"] },
          { name: "Billie Jeans", desc: "Full-stack e-commerce automation: CS, ads, email, inventory — running 24/7.", modules: ["Customer Service AI", "Ad Management", "Email Automation", "Inventory AI"] },
        ].map((c) => (
          <div key={c.name} style={{ padding: '32px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '12px' }}>{c.name}</h3>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px', lineHeight: 1.6 }}>{c.desc}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>{c.modules.map((m) => (<span key={m} style={{ padding: '4px 12px', borderRadius: '6px', background: 'rgba(59,130,246,0.1)', fontSize: '12px', color: '#3b82f6' }}>{m}</span>))}</div>
          </div>
        ))}
      </section>
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px' }}>Ready to automate?</h2>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>Tell us about your business. We will show you what AI can do.</p>
        <a href="/contact" style={{ padding: '14px 40px', borderRadius: '10px', background: '#3b82f6', color: '#fff', fontSize: '16px', fontWeight: 600, textDecoration: 'none' }}>Get in touch</a>
      </section>
    </div>
  );
}
