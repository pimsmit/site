export default function ContactPage() {
  return (
    <div style={{ background: '#0f1b2d', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15,27,45,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, color: '#fff', textDecoration: 'none' }}>ainomiq</a>
      </nav>
      <section style={{ maxWidth: 500, margin: '0 auto', padding: '160px 24px 80px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Contact</p>
        <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>Let&apos;s talk.</h1>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '48px' }}>Whether you need the app or a custom enterprise solution, we are here.</p>
        <form style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Name</label><input type="text" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} /></div>
          <div><label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Email</label><input type="email" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} /></div>
          <div><label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Company</label><input type="text" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} /></div>
          <div><label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Message</label><textarea rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} /></div>
          <button type="submit" style={{ padding: '14px', borderRadius: '8px', background: '#3b82f6', color: '#fff', fontSize: '15px', fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: '8px' }}>Send message</button>
        </form>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '32px' }}>Or email us: <a href="mailto:hello@ainomiq.com" style={{ color: '#3b82f6', textDecoration: 'none' }}>hello@ainomiq.com</a></p>
      </section>
    </div>
  );
}
