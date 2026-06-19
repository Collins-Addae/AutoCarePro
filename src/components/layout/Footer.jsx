import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const FOOTER_LINKS = {
  Services: [
    { label: 'Basic Car Wash', to: '/services' },
    { label: 'Premium Car Wash', to: '/services' },
    { label: 'Interior Cleaning', to: '/services' },
    { label: 'Full Detailing', to: '/services' },
    { label: 'Emergency Assist', to: '/services' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Contact', to: '/contact' },
    { label: 'Careers', to: '/about' },
  ],
  Customers: [
    { label: 'Book a Service', to: '/book' },
    { label: 'My Dashboard', to: '/dashboard' },
    { label: 'Booking History', to: '/history' },
    { label: 'My Profile', to: '/profile' },
    { label: 'Live Tracking', to: '/dashboard' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-navy)', color: 'white', paddingTop: '4rem' }} role="contentinfo">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', paddingBottom: '3rem' }}>
          {/* Brand */}
          <div style={{ minWidth: 220 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, var(--color-primary), #1E40AF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
                  <circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>
                </svg>
              </div>
              <span style={{ fontWeight: 600, fontSize: '1.0625rem', letterSpacing: '-0.01em' }}>AutoCare Pro</span>
            </div>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Professional vehicle care, wherever you are. Serving UCC, Accra, Kumasi, Tema, and Takoradi.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { icon: <Phone size={14} />, text: '+233 24 000 0000' },
                { icon: <Mail size={14} />, text: 'hello@autocarepro.gh' },
                { icon: <MapPin size={14} />, text: 'UCC, Cape Coast, Ghana' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.65)' }}>
                  <span style={{ color: 'var(--color-primary-light)' }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '1rem', color: 'white', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {heading}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.65)', transition: 'color var(--transition-fast)', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'white'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.45)' }}>
            © {new Date().getFullYear()} AutoCare Pro. All rights reserved. 🇬🇭 Made in Ghana.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {[
              { icon: <MessageCircle size={16} />, label: 'WhatsApp', href: 'https://wa.me/233240000000' },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>, label: 'Instagram', href: '#' },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>, label: 'Twitter / X', href: '#' },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>, label: 'LinkedIn', href: '#' },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                aria-label={item.label}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
