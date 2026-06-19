import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Copy, MapPin, Calendar, Phone, Star, Share2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency, formatDate } from '../../data/mockData';
import { useState } from 'react';

export default function BookingConfirmed() {
  const { id } = useParams();
  const { getBooking } = useBooking();
  const [copied, setCopied] = useState(false);
  const booking = getBooking(id) || {
    id: id || 'ACP-2024-NEW',
    service: 'Premium Car Wash',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    address: 'East Legon, Accra',
    amount: 135,
    vehicle: { make: 'Toyota', model: 'Corolla', year: '2020' },
    technician: { name: 'Efua Mensah', rating: 5.0, phone: '+233 55 987 6543', eta: '18 min' },
  };

  const copyRef = () => {
    navigator.clipboard.writeText(booking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-content" style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: 600 }}>
        {/* Success animation */}
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle size={40} />
          </div>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 600, marginBottom: '0.5rem' }}>
            Booking Confirmed! 🎉
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ color: 'var(--color-muted)', fontSize: 'var(--font-size-sm)' }}>
            Your technician has been notified and is preparing for your service.
          </motion.p>
        </motion.div>

        {/* Booking Reference */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, var(--color-primary-10), white)', border: '1.5px solid var(--color-primary-20)', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>Booking Reference</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '0.04em' }}>{booking.id}</span>
              <button onClick={copyRef} aria-label="Copy booking reference" style={{ padding: '0.375rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'white', cursor: 'pointer', color: copied ? 'var(--color-success)' : 'var(--color-muted)' }}>
                <Copy size={14} />
              </button>
            </div>
            {copied && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-success)', marginTop: '0.25rem' }}>Copied!</p>}
          </div>

          {/* Booking Details */}
          <div className="card" style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontWeight: 600, fontSize: 'var(--font-size-base)', marginBottom: '1rem' }}>Booking Details</h2>
            {[
              { label: 'Service', value: booking.service },
              { label: 'Date & Time', value: `${formatDate(booking.date)} at ${booking.time}` },
              { label: 'Location', value: booking.address, icon: <MapPin size={13} /> },
              { label: 'Vehicle', value: `${booking.vehicle?.year} ${booking.vehicle?.make} ${booking.vehicle?.model}` },
              { label: 'Amount', value: formatCurrency(booking.amount) },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)', fontSize: 'var(--font-size-sm)' }}>
                <span style={{ color: 'var(--color-muted)' }}>{row.label}</span>
                <span style={{ fontWeight: 500, textAlign: 'right', color: row.label === 'Amount' ? 'var(--color-primary)' : 'var(--color-text)' }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Technician Card */}
          {booking.technician && (
            <div className="card" style={{ background: 'var(--color-navy)', color: 'white', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.6)', marginBottom: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your Technician</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem', fontWeight: 600 }}>
                  {booking.technician.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 'var(--font-size-base)' }}>{booking.technician.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.7)' }}>
                    <Star size={11} style={{ fill: '#F59E0B', color: '#F59E0B' }} /> {booking.technician.rating} rating
                    {booking.technician.eta && <> · ETA: <strong style={{ color: 'white' }}>{booking.technician.eta}</strong></>}
                  </div>
                </div>
                <a href={`tel:${booking.technician.phone}`} aria-label="Call technician" className="btn btn-white btn-sm">
                  <Phone size={14} />
                </a>
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
            <Link to={`/tracking/${booking.id}`} className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: 'center' }}>
              <MapPin size={16} /> Track Live
            </Link>
            <button onClick={() => navigator.share?.({ title: 'AutoCare Pro Booking', text: `Booking Ref: ${booking.id}`, url: window.location.href })}
              className="btn btn-ghost btn-lg" aria-label="Share booking" style={{ flexShrink: 0 }}>
              <Share2 size={16} />
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/dashboard" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', textDecoration: 'none' }}>
              ← Back to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
