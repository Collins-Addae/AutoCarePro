import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, X, Navigation, Clock, Star } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../data/mockData';

// Simulated technician positions along a route
const ROUTE_POSITIONS = [
  { lat: 5.6404, lng: -0.1665 },
  { lat: 5.6382, lng: -0.1632 },
  { lat: 5.6360, lng: -0.1599 },
  { lat: 5.6338, lng: -0.1567 },
  { lat: 5.6314, lng: -0.1534 },
  { lat: 5.6300, lng: -0.1511 },
];

const ETAS = ['22 min', '18 min', '15 min', '11 min', '7 min', '3 min', 'Arrived'];

export default function LiveTracking() {
  const { id } = useParams();
  const { getBooking, cancelBooking } = useBooking();
  const [posIndex, setPosIndex] = useState(0);
  const [showCancel, setShowCancel] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const booking = getBooking(id) || {
    id: id,
    service: 'Premium Car Wash',
    address: 'East Legon, Accra',
    amount: 135,
    technician: { name: 'Efua Mensah', rating: 5.0, phone: '+233 55 987 6543' },
  };

  // Simulate technician movement
  useEffect(() => {
    if (posIndex >= ROUTE_POSITIONS.length - 1) return;
    const timer = setInterval(() => setPosIndex(prev => Math.min(prev + 1, ROUTE_POSITIONS.length - 1)), 8000);
    return () => clearInterval(timer);
  }, [posIndex]);

  const eta = ETAS[posIndex] || 'Arrived';
  const isArrived = eta === 'Arrived';

  return (
    <div className="page-content" style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600 }}>Live Tracking</h1>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)' }}>Booking {id}</p>
          </div>
          {!isArrived && (
            <button onClick={() => setShowCancel(true)} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger-light)' }}>
              Cancel Booking
            </button>
          )}
        </div>

        {/* ETA Banner */}
        <motion.div animate={{ scale: isArrived ? [1, 1.02, 1] : 1 }} transition={{ duration: 0.4 }}
          style={{
            background: isArrived ? 'linear-gradient(135deg, var(--color-success), #0D6E34)' : 'linear-gradient(135deg, var(--color-primary), var(--color-navy))',
            color: 'white', borderRadius: 'var(--radius-xl)', padding: '1.5rem', marginBottom: '1.25rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
          }}>
          <div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.7)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {isArrived ? 'Your technician has arrived' : 'Estimated Arrival'}
            </p>
            <div style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1 }}>
              {isArrived ? '✓ Ready to start' : eta}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <a href={`tel:${booking.technician?.phone}`} aria-label="Call technician" className="btn btn-white btn-sm">
              <Phone size={14} /> Call
            </a>
            <button onClick={() => setChatOpen(true)} className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.25)' }}>
              <MessageCircle size={14} /> Chat
            </button>
          </div>
        </motion.div>

        {/* Map placeholder (Leaflet requires window — use iframe as map embed) */}
        <div style={{ height: 340, borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--color-border)', marginBottom: '1.25rem', position: 'relative', background: '#E8F4FD' }}>
          <iframe
            title="Technician tracking map"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${ROUTE_POSITIONS[posIndex].lng - 0.01},${ROUTE_POSITIONS[posIndex].lat - 0.008},${ROUTE_POSITIONS[posIndex].lng + 0.01},${ROUTE_POSITIONS[posIndex].lat + 0.008}&layer=mapnik&marker=${ROUTE_POSITIONS[posIndex].lat},${ROUTE_POSITIONS[posIndex].lng}`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            onLoad={() => setMapLoaded(true)}
          />
          {!mapLoaded && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E8F4FD', zIndex: 1 }}>
              <div style={{ textAlign: 'center', color: 'var(--color-muted)' }}>
                <Navigation size={32} style={{ margin: '0 auto 0.75rem', color: 'var(--color-primary)' }} />
                <p style={{ fontSize: 'var(--font-size-sm)' }}>Loading map...</p>
              </div>
            </div>
          )}
          {/* Live indicator */}
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'white', borderRadius: 'var(--radius-full)', padding: '0.35rem 0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--font-size-xs)', fontWeight: 500, boxShadow: 'var(--shadow-md)', zIndex: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', animation: 'pulse-dot 1.5s infinite' }} />
            Live
          </div>
        </div>

        {/* Technician info */}
        {booking.technician && (
          <div className="card" style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem', fontWeight: 600, flexShrink: 0 }}>
                {booking.technician.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600 }}>{booking.technician.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>
                  <Star size={11} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
                  {booking.technician.rating} · AutoCare Pro Certified
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)' }}>Service Total</p>
                <p style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{formatCurrency(booking.amount)}</p>
              </div>
            </div>
          </div>
        )}

        {isArrived && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Link to={`/service-in-progress/${id}`} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
              View Service Progress
            </Link>
          </motion.div>
        )}
      </div>

      {/* Cancel Modal */}
      {showCancel && (
        <div className="modal-backdrop" onClick={() => setShowCancel(false)}>
          <motion.div className="modal-box" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: '0.75rem' }}>Cancel Booking?</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: 'var(--font-size-sm)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Are you sure you want to cancel booking <strong>{id}</strong>? Your technician is already on the way. Cancellation fees may apply.
            </p>
            <div style={{ display: 'flex', gap: '0.875rem' }}>
              <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowCancel(false)}>Keep Booking</button>
              <button className="btn btn-danger" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { cancelBooking(id); setShowCancel(false); }}>Yes, Cancel</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Chat Modal */}
      {chatOpen && (
        <div className="modal-backdrop" onClick={() => setChatOpen(false)}>
          <motion.div className="modal-box" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 600 }}>Chat with Technician</h3>
              <button onClick={() => setChatOpen(false)} aria-label="Close chat" style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}><X size={18} /></button>
            </div>
            <div style={{ background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)', padding: '1rem', minHeight: 140, marginBottom: '1rem', fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Chat feature coming soon. Use the call button to reach your technician directly.
            </div>
            <a href={`tel:${booking.technician?.phone}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Phone size={16} /> Call {booking.technician?.name}
            </a>
          </motion.div>
        </div>
      )}
    </div>
  );
}
