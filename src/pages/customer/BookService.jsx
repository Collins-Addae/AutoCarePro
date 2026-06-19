import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, MapPin, Calendar, Car, CreditCard, Clock, Droplets, Sparkles, Star, Zap, AlertTriangle, Circle, Droplet } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { SERVICES, MOCK_VEHICLES, formatCurrency, COVERAGE_AREAS } from '../../data/mockData';

const ICON_MAP = {
  droplets: Droplets, sparkles: Sparkles, star: Star, droplet: Droplet,
  circle: Circle, zap: Zap, 'alert-triangle': AlertTriangle,
  armchair: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"/></svg>,
};

const STEPS = ['Choose Service', 'Location & Time', 'Your Vehicle', 'Confirm & Pay'];

const TIME_SLOTS = [
  { label: '6:00 AM', available: true }, { label: '7:00 AM', available: true },
  { label: '8:00 AM', available: false }, { label: '9:00 AM', available: true },
  { label: '10:00 AM', available: true }, { label: '11:00 AM', available: true },
  { label: '12:00 PM', available: false }, { label: '1:00 PM', available: true },
  { label: '2:00 PM', available: true }, { label: '3:00 PM', available: true },
  { label: '4:00 PM', available: false }, { label: '5:00 PM', available: true },
  { label: '6:00 PM', available: true }, { label: '7:00 PM', available: true },
];

const PAYMENT_METHODS = [
  { id: 'momo_mtn', label: 'MTN Mobile Money', desc: 'Pay with MTN MoMo' },
  { id: 'momo_vodafone', label: 'Vodafone Cash', desc: 'Pay with Vodafone Cash' },
  { id: 'card', label: 'Debit / Credit Card', desc: 'Visa or Mastercard via Paystack' },
  { id: 'wallet', label: 'AutoCare Wallet', desc: '480 pts = GHS 24.00 credit' },
];

// Step 1 — Service Selection
function StepService({ draft, updateDraft }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? SERVICES : SERVICES.filter(s => s.category === filter);

  return (
    <div>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginBottom: '0.5rem' }}>Choose a Service</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', fontSize: 'var(--font-size-sm)' }}>Select the service you need for your vehicle.</p>

      <div className="tab-nav" style={{ marginBottom: '1.5rem' }}>
        {['all', 'cleaning', 'mechanical', 'emergency'].map(cat => (
          <button key={cat} className={`tab-btn ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)} style={{ textTransform: 'capitalize' }}>
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.map(service => {
          const IconComp = ICON_MAP[service.icon] || Droplets;
          const isSelected = draft.service?.id === service.id;
          return (
            <motion.div key={service.id} whileTap={{ scale: 0.99 }}
              onClick={() => updateDraft({ service })}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem',
                border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-xl)', cursor: 'pointer', background: isSelected ? 'var(--color-primary-10)' : 'white',
                transition: 'all var(--transition-fast)',
              }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: `${service.color}18`, color: service.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <IconComp size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{service.name}</p>
                  {service.popular && <span className="badge badge-blue" style={{ fontSize: '0.6rem' }}>Popular</span>}
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>{service.description}</p>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-subtle)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={10} /> {service.duration}
                </p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontWeight: 600, fontSize: 'var(--font-size-base)', color: 'var(--color-primary)' }}>{formatCurrency(service.priceFrom)}</p>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>from</p>
              </div>
              {isSelected && (
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={13} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Step 2 — Location & Time
function StepLocation({ draft, updateDraft }) {
  const today = new Date().toISOString().split('T')[0];
  const next7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return { date: d.toISOString().split('T')[0], label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-GH', { weekday: 'short', day: 'numeric', month: 'short' }) };
  });

  return (
    <div>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginBottom: '0.5rem' }}>Location & Schedule</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', fontSize: 'var(--font-size-sm)' }}>Where should we come, and when?</p>

      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="booking-address" className="form-label form-label-required" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <MapPin size={14} /> Service Address
        </label>
        <select id="booking-address" className="form-select" value={draft.location} onChange={e => updateDraft({ location: e.target.value })} aria-required="true">
          <option value="">Select your area...</option>
          {COVERAGE_AREAS.map(a => <option key={a}>{a}</option>)}
        </select>
        <p className="form-help">Don't see your area? <a href="/contact" style={{ color: 'var(--color-primary)' }}>Contact us</a></p>
      </div>

      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
        <label className="form-label form-label-required" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Calendar size={14} /> Preferred Date
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {next7.map(day => (
            <button key={day.date} onClick={() => updateDraft({ date: day.date })}
              style={{
                padding: '0.625rem 1rem', borderRadius: 'var(--radius-lg)', border: `1.5px solid ${draft.date === day.date ? 'var(--color-primary)' : 'var(--color-border)'}`,
                background: draft.date === day.date ? 'var(--color-primary)' : 'white',
                color: draft.date === day.date ? 'white' : 'var(--color-text)',
                fontSize: 'var(--font-size-xs)', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
              }}>
              {day.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label form-label-required" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Clock size={14} /> Preferred Time
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '0.5rem' }}>
          {TIME_SLOTS.map(slot => (
            <button key={slot.label} onClick={() => slot.available && updateDraft({ time: slot.label })} disabled={!slot.available}
              style={{
                padding: '0.5rem', borderRadius: 'var(--radius-md)', border: `1.5px solid ${draft.time === slot.label ? 'var(--color-primary)' : 'var(--color-border)'}`,
                background: draft.time === slot.label ? 'var(--color-primary)' : slot.available ? 'white' : 'var(--color-surface-2)',
                color: draft.time === slot.label ? 'white' : slot.available ? 'var(--color-text)' : 'var(--color-subtle)',
                fontSize: 'var(--font-size-xs)', fontWeight: 500, cursor: slot.available ? 'pointer' : 'not-allowed',
                transition: 'all var(--transition-fast)',
              }}>
              {slot.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 3 — Vehicle
function StepVehicle({ draft, updateDraft }) {
  return (
    <div>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginBottom: '0.5rem' }}>Your Vehicle</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', fontSize: 'var(--font-size-sm)' }}>Which vehicle do you need serviced?</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {MOCK_VEHICLES.map(v => {
          const isSelected = draft.vehicle?.id === v.id;
          return (
            <div key={v.id} onClick={() => updateDraft({ vehicle: v })}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-xl)', cursor: 'pointer', background: isSelected ? 'var(--color-primary-10)' : 'white', transition: 'all var(--transition-fast)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-10)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Car size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{v.year} {v.make} {v.model}</p>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>{v.plate} · {v.color}</p>
              </div>
              {v.primary && <span className="badge badge-blue" style={{ fontSize: '0.6rem' }}>Primary</span>}
              {isSelected && <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={13} /></div>}
            </div>
          );
        })}
      </div>

      <div className="form-group">
        <label htmlFor="booking-notes" className="form-label">Special Instructions</label>
        <textarea id="booking-notes" className="form-input" rows={3} placeholder="E.g. 'Please avoid left side door — has a scratch'. Any allergies to specific products?" value={draft.notes} onChange={e => updateDraft({ notes: e.target.value })} />
        <p className="form-help">Optional but helpful for the technician</p>
      </div>
    </div>
  );
}

// Step 4 — Confirm
function StepConfirm({ draft, updateDraft }) {
  return (
    <div>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginBottom: '0.5rem' }}>Confirm & Pay</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', fontSize: 'var(--font-size-sm)' }}>Review your booking before confirming.</p>

      {/* Order Summary */}
      <div className="card" style={{ marginBottom: '1.5rem', background: 'var(--color-surface-2)' }}>
        <h3 style={{ fontWeight: 600, fontSize: 'var(--font-size-base)', marginBottom: '1rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.7rem' }}>Order Summary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {[
            { label: 'Service', value: draft.service?.name || '—' },
            { label: 'Location', value: draft.location || '—' },
            { label: 'Date & Time', value: draft.date && draft.time ? `${draft.date} at ${draft.time}` : '—' },
            { label: 'Vehicle', value: draft.vehicle ? `${draft.vehicle.year} ${draft.vehicle.make} ${draft.vehicle.model}` : '—' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: 'var(--font-size-sm)' }}>
              <span style={{ color: 'var(--color-muted)' }}>{row.label}</span>
              <span style={{ fontWeight: 500, textAlign: 'right', color: 'var(--color-text)' }}>{row.value}</span>
            </div>
          ))}
          <div className="divider" style={{ margin: '0.375rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-base)', fontWeight: 600 }}>
            <span>Total</span>
            <span style={{ color: 'var(--color-primary)' }}>{draft.service ? formatCurrency(draft.service.priceFrom) : 'GHS 0'}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="form-group">
        <label className="form-label form-label-required" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.75rem' }}>
          <CreditCard size={14} /> Payment Method
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {PAYMENT_METHODS.map(pm => (
            <div key={pm.id} onClick={() => updateDraft({ paymentMethod: pm.id })}
              style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1rem', border: `2px solid ${draft.paymentMethod === pm.id ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-lg)', cursor: 'pointer', background: draft.paymentMethod === pm.id ? 'var(--color-primary-10)' : 'white', transition: 'all var(--transition-fast)' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${draft.paymentMethod === pm.id ? 'var(--color-primary)' : 'var(--color-border)'}`, background: draft.paymentMethod === pm.id ? 'var(--color-primary)' : 'white', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {draft.paymentMethod === pm.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
              </div>
              <div>
                <p style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>{pm.label}</p>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>{pm.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BookService() {
  const { bookingDraft, updateDraft, nextStep, prevStep, confirmBooking } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();
  const step = bookingDraft.step;

  // Pre-select service from navigation state
  useEffect(() => {
    if (location.state?.serviceId) {
      const service = SERVICES.find(s => s.id === location.state.serviceId);
      if (service) updateDraft({ service });
    }
  }, []);

  const canNext = () => {
    if (step === 1) return !!bookingDraft.service;
    if (step === 2) return !!bookingDraft.location && !!bookingDraft.date && !!bookingDraft.time;
    if (step === 3) return !!bookingDraft.vehicle;
    return true;
  };

  const handleNext = () => {
    if (step === 4) {
      const booking = confirmBooking();
      navigate(`/booking-confirmed/${booking.id}`);
    } else {
      nextStep();
    }
  };

  return (
    <div className="page-content" style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: 700 }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 600, marginBottom: '0.5rem' }}>Book a Service</h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 'var(--font-size-sm)' }}>Complete {STEPS.length} steps to confirm your booking.</p>
        </div>

        {/* Step Indicator */}
        <div className="step-indicator" style={{ marginBottom: '2.5rem' }}>
          {STEPS.map((label, idx) => {
            const stepNum = idx + 1;
            const status = step > stepNum ? 'done' : step === stepNum ? 'active' : '';
            return (
              <div key={label} className={`step-item ${status}`}>
                <div className="step-circle">
                  {step > stepNum ? <Check size={14} /> : stepNum}
                </div>
                <span className="step-label">{label}</span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="card" style={{ marginBottom: '1.5rem', padding: '2rem' }}>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              {step === 1 && <StepService draft={bookingDraft} updateDraft={updateDraft} />}
              {step === 2 && <StepLocation draft={bookingDraft} updateDraft={updateDraft} />}
              {step === 3 && <StepVehicle draft={bookingDraft} updateDraft={updateDraft} />}
              {step === 4 && <StepConfirm draft={bookingDraft} updateDraft={updateDraft} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {step > 1
            ? <button className="btn btn-ghost" onClick={prevStep} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <ChevronLeft size={16} /> Back
              </button>
            : <div />
          }
          <button className="btn btn-primary btn-lg" onClick={handleNext} disabled={!canNext()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {step === 4 ? 'Confirm & Pay' : 'Continue'}
            {step < 4 && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
