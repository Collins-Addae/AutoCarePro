import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, User, LogOut, Calendar, History, Car } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'technician') return '/technician/jobs';
    return '/dashboard';
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: scrolled ? '0.7rem' : '0',
          left: scrolled ? '1rem' : '0',
          right: scrolled ? '1rem' : '0',
          zIndex: 200,
          transition: 'top 0.3s ease, left 0.3s ease, right 0.3s ease, border-radius 0.3s ease, box-shadow 0.3s ease',
          borderRadius: scrolled ? '1rem' : 0,
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid rgba(226,232,240,0.6)' : '1px solid var(--color-border)',
          boxShadow: scrolled ? 'var(--shadow-lg)' : 'var(--shadow-md)',
        }}
        role="banner"
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: '64px', gap: '2rem' }}>
          {/* Logo */}
          <Link to="/" aria-label="AutoCare Pro home" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-navy))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
                <circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>
              </svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: '1.0625rem', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
              AutoCare <span style={{ color: 'var(--color-primary)' }}>Pro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1 }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 500,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-muted)',
                  background: isActive ? 'var(--color-primary-10)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                  textDecoration: 'none',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  id="user-menu-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-label="User menu"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.375rem 0.75rem 0.375rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--color-border)',
                    background: 'white', cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    fontSize: 'var(--font-size-sm)', fontWeight: 500,
                  }}
                >
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: user.avatarBg || 'var(--color-primary)',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 600,
                  }}>{user.avatar}</div>
                  <span className="desktop-nav" style={{ color: 'var(--color-text)' }}>{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} style={{ color: 'var(--color-muted)', transform: userMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                        background: 'white', border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-xl)', padding: '0.5rem',
                        boxShadow: 'var(--shadow-xl)', minWidth: 200, zIndex: 300,
                      }}
                      role="menu"
                    >
                      <div style={{ padding: '0.5rem 0.75rem 0.75rem', borderBottom: '1px solid var(--color-border)', marginBottom: '0.25rem' }}>
                        <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>{user.name}</p>
                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>{user.email}</p>
                      </div>
                      {[
                        { to: getDashboardLink(), icon: <User size={15} />, label: 'Dashboard' },
                        { to: '/book', icon: <Calendar size={15} />, label: 'Book Service' },
                        { to: '/history', icon: <History size={15} />, label: 'Booking History' },
                        { to: '/profile', icon: <Car size={15} />, label: 'Profile & Vehicles' },
                      ].map(item => (
                        <Link key={item.to} to={item.to} role="menuitem" style={{
                          display: 'flex', alignItems: 'center', gap: '0.625rem',
                          padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)',
                          fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text)',
                          transition: 'background var(--transition-fast)',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <span style={{ color: 'var(--color-muted)' }}>{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                      <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '0.25rem', paddingTop: '0.25rem' }}>
                        <button onClick={handleLogout} role="menuitem" style={{
                          display: 'flex', alignItems: 'center', gap: '0.625rem',
                          padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)',
                          fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-danger)',
                          transition: 'background var(--transition-fast)', width: '100%',
                          background: 'none', border: 'none', cursor: 'pointer',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-danger-light)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <LogOut size={15} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm desktop-nav" style={{ borderColor: 'var(--color-border)' }}>
                  Sign In
                </Link>
                <Link to="/book" className="btn btn-primary btn-sm">
                  Book Now
                </Link>
              </>
            )}

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="mobile-menu-btn"
              style={{
                padding: '0.5rem', borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--color-border)', background: 'white',
                cursor: 'pointer', display: 'none',
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)',
                backdropFilter: 'blur(4px)', zIndex: 190,
              }}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              aria-label="Mobile navigation"
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: '80%', maxWidth: 320, background: 'white',
                zIndex: 195, padding: '1.5rem',
                overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-primary)' }}>AutoCare Pro</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" style={{ padding: '0.375rem', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                  <X size={16} />
                </button>
              </div>

              {user && (
                <div style={{ padding: '0.875rem', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: user.avatarBg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600 }}>{user.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{user.name}</p>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>{user.role}</p>
                  </div>
                </div>
              )}

              {NAV_LINKS.map(link => (
                <NavLink key={link.to} to={link.to} style={({ isActive }) => ({
                  padding: '0.75rem', borderRadius: 'var(--radius-lg)',
                  fontWeight: 500, fontSize: 'var(--font-size-sm)',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                  background: isActive ? 'var(--color-primary-10)' : 'transparent',
                  textDecoration: 'none', display: 'block',
                })}>
                  {link.label}
                </NavLink>
              ))}

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                {user ? (
                  <button onClick={handleLogout} className="btn btn-ghost" style={{ width: '100%', color: 'var(--color-danger)' }}>
                    <LogOut size={16} /> Sign Out
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Sign In</Link>
                    <Link to="/register" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Create Account</Link>
                  </>
                )}
                <Link to="/book" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Book a Service
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
