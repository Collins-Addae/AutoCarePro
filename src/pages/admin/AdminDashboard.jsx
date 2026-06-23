import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { 
  ADMIN_STATS, 
  REVENUE_CHART_DATA, 
  MOCK_TECHNICIANS, 
  formatCurrency, 
  STATUS_CONFIG 
} from '../../data/mockData';
import { 
  TrendingUp, Users, ShieldAlert, Star, Calendar, 
  MapPin, Bell, UserPlus, XCircle, ChevronRight, LogOut 
} from 'lucide-react';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { bookings, cancelBooking, updateDraft } = useBooking();
  const [activeMetricTab, setActiveMetricTab] = useState('revenue');
  
  // Local state for administrative adjustments
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [dispatchers, setDispatchers] = useState(MOCK_TECHNICIANS);
  
  const handleAssignTech = (bookingId, techName) => {
    // Modify booking technician assignment in local view simulation
    const updatedBookings = bookings.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'assigned',
          technician: {
            name: techName,
            rating: 4.8,
            phone: '+233 24 555 6677'
          }
        };
      }
      return b;
    });
    // For this simulation we can assign it and close
    setShowAssignModal(false);
    setSelectedBooking(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return { bg: '#E8F5E9', text: '#2E7D32' };
      case 'in-progress': return { bg: '#E3F2FD', text: '#1565C0' };
      case 'upcoming': return { bg: '#FFF3E0', text: '#E65100' };
      case 'cancelled': return { bg: '#FFEBEE', text: '#C62828' };
      default: return { bg: '#F5F5F5', text: '#616161' };
    }
  };

  // Custom SVG Bar Chart metrics selector
  const chartMaxVal = activeMetricTab === 'revenue' 
    ? Math.max(...REVENUE_CHART_DATA.map(d => d.revenue)) 
    : Math.max(...REVENUE_CHART_DATA.map(d => d.bookings));

  return (
    <div className="page-content" style={{ background: '#F1F5F9', minHeight: '100vh', paddingTop: '5rem' }}>
      
      {/* Sticky Inner Admin Navbar */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '1rem 0', marginBottom: '2rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', animation: 'pulse-dot 1.5s infinite' }} />
              Operations Center (Admin)
            </h1>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>AutoCare Pro Ghana Core Dispatch Platform</p>
          </div>
          <button onClick={logout} className="btn btn-ghost btn-sm" style={{ color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <LogOut size={14} /> Exit System
          </button>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        
        {/* KPI Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          {[
            { label: 'Active Bookings', val: ADMIN_STATS.activeBookings, desc: 'Jobs in progress today', icon: <Calendar size={20} style={{ color: 'var(--color-primary)' }} /> },
            { label: 'Revenue (Today)', val: `GHS ${ADMIN_STATS.revenueToday}`, desc: 'Settled pay volume', icon: <TrendingUp size={20} style={{ color: '#16A34A' }} /> },
            { label: 'Active Crew', val: ADMIN_STATS.activeTechnicians, desc: 'Partner technicians online', icon: <Users size={20} style={{ color: '#4F46E5' }} /> },
            { label: 'Average Rating', val: `${ADMIN_STATS.avgRating} ★`, desc: 'From 500+ client ratings', icon: <Star size={20} style={{ color: '#D97706' }} /> },
          ].map((card, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid rgba(0,0,0,0.05)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {card.icon}
              </div>
              <div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)', fontWeight: 500 }}>{card.label}</p>
                <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, color: 'var(--color-text)', marginTop: '0.125rem' }}>{card.val}</h3>
                <p style={{ fontSize: '10px', color: 'var(--color-muted)', marginTop: '0.125rem' }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mid Section split */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem', alignItems: 'start' }}>
          
          {/* Main Bookings Control Table */}
          <div className="card" style={{ overflowX: 'auto', padding: '1.5rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600 }}>Live Booking Queue</h2>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>Real-time updates of incoming customer requests</p>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-xs)', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Reference</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Service Requested</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Address</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Crew Partner</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => {
                  const colors = getStatusColor(b.status);
                  return (
                    <tr key={b.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.15s' }}>
                      <td style={{ padding: '0.875rem 0.5rem', fontWeight: 600 }}>{b.id}</td>
                      <td style={{ padding: '0.875rem 0.5rem' }}>
                        <div>{b.service}</div>
                        <div style={{ fontSize: '9px', color: 'var(--color-muted)' }}>GHS {b.amount}</div>
                      </td>
                      <td style={{ padding: '0.875rem 0.5rem', color: 'var(--color-muted)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {b.address}
                      </td>
                      <td style={{ padding: '0.875rem 0.5rem' }}>
                        <span style={{
                          background: colors.bg,
                          color: colors.text,
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '9px',
                          fontWeight: 600,
                          display: 'inline-block'
                        }}>
                          {b.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '0.875rem 0.5rem' }}>
                        {b.technician ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px' }}>
                              {b.technician.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span>{b.technician.name}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setSelectedBooking(b); setShowAssignModal(true); }}
                            className="btn btn-ghost btn-xs"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-primary)' }}
                          >
                            <UserPlus size={10} /> Dispatch Partner
                          </button>
                        )}
                      </td>
                      <td style={{ padding: '0.875rem 0.5rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'flex-end' }}>
                          {b.status !== 'cancelled' && b.status !== 'completed' && (
                            <button
                              onClick={() => cancelBooking(b.id)}
                              aria-label="Cancel booking"
                              className="btn btn-ghost btn-xs"
                              style={{ color: 'var(--color-danger)', border: 'none', padding: '0.25rem' }}
                            >
                              <XCircle size={13} />
                            </button>
                          )}
                          <Link to={`/tracking/${b.id}`} className="btn btn-ghost btn-xs" style={{ padding: '0.25rem' }} aria-label="Track booking">
                            <ChevronRight size={13} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Right Column: Custom SVG Chart */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Chart Widget Card */}
            <div className="card" style={{ padding: '1.5rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>Performance Activity</h3>
                  <p style={{ fontSize: '10px', color: 'var(--color-muted)' }}>7-day operational breakdown</p>
                </div>
                {/* Metric selector switches */}
                <div style={{ display: 'flex', background: 'var(--color-surface-2)', padding: '2px', borderRadius: 'var(--radius-md)' }}>
                  <button
                    onClick={() => setActiveMetricTab('revenue')}
                    style={{
                      border: 'none', padding: '0.25rem 0.5rem', borderRadius: 4, cursor: 'pointer', fontSize: '9px', fontWeight: 600,
                      background: activeMetricTab === 'revenue' ? 'white' : 'transparent',
                      color: activeMetricTab === 'revenue' ? 'var(--color-primary)' : 'var(--color-muted)',
                      boxShadow: activeMetricTab === 'revenue' ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    Revenue
                  </button>
                  <button
                    onClick={() => setActiveMetricTab('bookings')}
                    style={{
                      border: 'none', padding: '0.25rem 0.5rem', borderRadius: 4, cursor: 'pointer', fontSize: '9px', fontWeight: 600,
                      background: activeMetricTab === 'bookings' ? 'white' : 'transparent',
                      color: activeMetricTab === 'bookings' ? 'var(--color-primary)' : 'var(--color-muted)',
                      boxShadow: activeMetricTab === 'bookings' ? 'white' : 'none'
                    }}
                  >
                    Volume
                  </button>
                </div>
              </div>

              {/* Custom SVG Bar Chart */}
              <div style={{ height: 180, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 0.5rem' }}>
                {REVENUE_CHART_DATA.map((day, idx) => {
                  const val = activeMetricTab === 'revenue' ? day.revenue : day.bookings;
                  const percentHeight = Math.max(10, (val / chartMaxVal) * 100);

                  return (
                    <div key={idx} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '0.5rem', height: '100%', justifyContent: 'flex-end'
                    }}>
                      {/* Bar Visual */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${percentHeight - 20}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        style={{
                          width: '60%', maxWidth: '28px', minHeight: '6px',
                          background: activeMetricTab === 'revenue' 
                            ? 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-navy) 100%)' 
                            : 'linear-gradient(180deg, #10B981 0%, #047857 100%)',
                          borderRadius: '4px 4px 0 0',
                          position: 'relative'
                        }}
                        title={`${day.day}: ${val}`}
                      >
                        {/* Hover values tooltip */}
                        <div style={{
                          position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
                          background: 'var(--color-navy)', color: 'white', padding: '2px 4px', borderRadius: 4,
                          fontSize: '8px', opacity: 0.9, pointerEvents: 'none', whiteSpace: 'nowrap'
                        }}>
                          {activeMetricTab === 'revenue' ? `GHS ${val}` : val}
                        </div>
                      </motion.div>
                      {/* Day string label */}
                      <span style={{ fontSize: '10px', color: 'var(--color-muted)', fontWeight: 500 }}>{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technician Partner Availability Map Panel */}
            <div className="card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '0.875rem' }}>Crew Deployment Status</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {MOCK_TECHNICIANS.map(t => (
                  <div key={t.id} style={{ display: 'flex', justify: 'space-between', alignItems: 'center', fontSize: 'var(--font-size-xs)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: t.status === 'available' ? 'var(--color-success)' : '#EF4444'
                      }} />
                      <div>
                        <p style={{ fontWeight: 600 }}>{t.name}</p>
                        <p style={{ fontSize: '9px', color: 'var(--color-muted)' }}>Coverage: {t.location}</p>
                      </div>
                    </div>
                    <span style={{
                      color: t.status === 'available' ? 'var(--color-success)' : '#EF4444',
                      fontWeight: 600, fontSize: '10px'
                    }}>
                      {t.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Technician Dispatch modal */}
      {showAssignModal && selectedBooking && (
        <div className="modal-backdrop" onClick={() => { setShowAssignModal(false); setSelectedBooking(null); }}>
          <motion.div className="modal-box" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '0.375rem' }}>Dispatch Partner</h3>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)', marginBottom: '1.25rem' }}>
              Select a technician for booking <strong>{selectedBooking.id}</strong> ({selectedBooking.service}).
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: 200, overflowY: 'auto', marginBottom: '1.25rem' }}>
              {dispatchers.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleAssignTech(selectedBooking.id, t.name)}
                  style={{
                    display: 'flex', justify: 'space-between', alignItems: 'center', padding: '0.75rem',
                    background: 'white', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer', textAlign: 'left', outline: 'none'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: t.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 600 }}>
                      {t.avatar}
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text)' }}>{t.name}</p>
                      <p style={{ fontSize: '9px', color: 'var(--color-muted)' }}>Location: {t.location} · rating: {t.rating}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '9px', color: t.status === 'available' ? 'var(--color-success)' : 'var(--color-muted)', fontWeight: 600 }}>
                    {t.status.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
            
            <button className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setShowAssignModal(false); setSelectedBooking(null); }}>
              Cancel Dispatch
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}
