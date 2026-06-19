import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Car, ChevronRight, MapPin, Star, Plus, Droplets, Sparkles, Zap, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { MOCK_VEHICLES, formatCurrency, formatDate, STATUS_CONFIG } from '../../data/mockData';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

const QUICK_SERVICES = [
  { id: 'basic-wash', label: 'Basic Wash', icon: Droplets, color: '#3B82F6', price: 80 },
  { id: 'premium-wash', label: 'Premium Wash', icon: Sparkles, color: '#1A56DB', price: 120 },
  { id: 'interior-cleaning', label: 'Interior', icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"/></svg>, color: '#7C3AED', price: 150 },
  { id: 'battery-jump', label: 'Battery Help', icon: Zap, color: '#EF4444', price: 60 },
  { id: 'flat-tyre', label: 'Flat Tyre', icon: AlertTriangle, color: '#DC2626', price: 70 },
  { id: 'full-detail', label: 'Full Detail', icon: Star, color: '#D97706', price: 300 },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Dashboard() {
  const { user } = useAuth();
  const { bookings } = useBooking();

  const activeBooking = bookings.find(b => b.status === 'in-progress');
  const upcoming = bookings.filter(b => b.status === 'upcoming').slice(0, 2);
  const recent = bookings.filter(b => b.status === 'completed').slice(0, 3);

  return (
    <div className="page-content" style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
        {/* Header */}
        <motion.div initial="hidden" animate="show" variants={stagger} style={{ marginBottom: '2rem' }}>
          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
            <div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '0.25rem' }}>{getGreeting()}, 👋</p>
              <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--color-text)' }}>{user?.name || 'Customer'}</h1>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ padding: '0.375rem 0.875rem', background: 'var(--color-success-light)', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-size-xs)', fontWeight: 500, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Star size={12} /> {user?.loyaltyPoints || 0} pts
              </div>
              <Link to="/book" className="btn btn-primary">
                <Plus size={16} /> Book Service
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Active Booking Alert */}
        {activeBooking && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '1.5rem' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-navy) 100%)', borderRadius: 'var(--radius-xl)', padding: '1.25rem 1.5rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', animation: 'pulse-dot 1.5s infinite' }} />
                  <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>SERVICE IN PROGRESS</span>
                </div>
                <p style={{ fontWeight: 600, fontSize: 'var(--font-size-lg)' }}>{activeBooking.service}</p>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.75)' }}>Technician: {activeBooking.technician?.name}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link to={`/service-in-progress/${activeBooking.id}`} className="btn btn-white btn-sm">Track Live</Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Book */}
        <motion.div initial="hidden" animate="show" variants={stagger} style={{ marginBottom: '2rem' }}>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: '1rem' }}>Quick Book</motion.h2>
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.75rem' }}>
            {QUICK_SERVICES.map(s => (
              <Link key={s.id} to="/book" state={{ serviceId: s.id }} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '1rem 0.75rem', textAlign: 'center', cursor: 'pointer', transition: 'all var(--transition-normal)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 4px 12px ${s.color}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)', background: `${s.color}15`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <s.icon size={18} />
                  </div>
                  <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500, color: 'var(--color-text)', lineHeight: 1.3 }}>{s.label}</span>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', fontWeight: 500 }}>GHS {s.price}</span>
                </div>
              </Link>
            ))}
          </motion.div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Upcoming Bookings */}
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>Upcoming Bookings</h2>
              <Link to="/history" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>View all</Link>
            </motion.div>
            {upcoming.length === 0 ? (
              <motion.div variants={fadeUp} className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <Calendar size={32} style={{ color: 'var(--color-subtle)', margin: '0 auto 0.75rem' }} />
                <p style={{ color: 'var(--color-muted)', fontSize: 'var(--font-size-sm)' }}>No upcoming bookings</p>
                <Link to="/book" className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>Book Now</Link>
              </motion.div>
            ) : (
              upcoming.map(booking => (
                <motion.div key={booking.id} variants={fadeUp} className="card" style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)', marginBottom: '0.25rem' }}>{booking.service}</p>
                      <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>{booking.id}</p>
                    </div>
                    <span className={`badge ${STATUS_CONFIG[booking.status]?.class}`}>{STATUS_CONFIG[booking.status]?.label}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>
                      <Calendar size={12} /> {formatDate(booking.date)} · {booking.time}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>
                      <MapPin size={12} /> {booking.address}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.875rem', paddingTop: '0.875rem', borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: 'var(--font-size-sm)' }}>{formatCurrency(booking.amount)}</span>
                    <Link to={`/tracking/${booking.id}`} className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      View <ChevronRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Vehicles & Recent */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Vehicles */}
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>My Vehicles</h2>
                <Link to="/profile" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Manage</Link>
              </motion.div>
              {MOCK_VEHICLES.map(v => (
                <motion.div key={v.id} variants={fadeUp} className="card" style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-10)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Car size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{v.year} {v.make} {v.model}</p>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>{v.plate} · {v.color}</p>
                  </div>
                  {v.primary && <span className="badge badge-blue" style={{ fontSize: '0.6rem' }}>Primary</span>}
                </motion.div>
              ))}
            </motion.div>

            {/* Recent */}
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>Recent Activity</h2>
              </motion.div>
              {recent.slice(0, 2).map(b => (
                <motion.div key={b.id} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '0.5rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)', truncate: true }}>{b.service}</p>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>{formatDate(b.date)}</p>
                  </div>
                  <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text)', flexShrink: 0 }}>{formatCurrency(b.amount)}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
