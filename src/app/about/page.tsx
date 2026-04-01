export default function AboutPage() {
  return (
    <div style={{ background: '#0f1b2d', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15,27,45,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, color: '#fff', textDecoration: 'none' }}>ainomiq</a>
        <a href="https://app.ainomiq.com/register" style={{ padding: '8px 20px', borderRadius: '8px', background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Get started</a>
      </nav>
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '160px 24px 80px' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>About</p>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: '32px' }}>Automate everything that does not need a human touch.</h1>
        <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '24px' }}>Ainomiq is an AI automation platform founded by <strong style={{ color: '#fff' }}>Pim</strong> (ecommerce specialist) and <strong style={{ color: '#fff' }}>Bink</strong> (IT specialist).</p>
          <p style={{ marginBottom: '24px' }}>Born from real-world experience running ecommerce businesses, Ainomiq packages proven automation workflows into a single platform.</p>
          <p style={{ marginBottom: '24px' }}>Our mission: <strong style={{ color: '#fff' }}>automate everything that does not need a human touch</strong> — so humans can focus on what does.</p>
        </div>
      </section>
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px' }}>Core Values</h2>
        {[
          { title: 'Autonomy', desc: 'Systems work independently. No babysitting.' },
          { title: 'Precision', desc: 'Zero tolerance for errors.' },
          { title: 'Simplicity', desc: 'Complex tech behind the scenes. Simple interface.' },
          { title: 'Transparency', desc: 'Clients see exactly what AI does and why.' },
        ].map((v) => (
          <div key={v.title} style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>{v.title}</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>{v.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
