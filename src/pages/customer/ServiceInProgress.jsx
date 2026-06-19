import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle, Clock, Camera, User, Star, ChevronRight, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency, SERVICE_CHECKLIST } from '../../data/mockData';

const STEPS = [
  { id: 'arrived', label: 'Arrived', description: 'Technician has arrived at your location' },
  { id: 'inspecting', label: 'Inspecting', description: 'Performing multi-point vehicle inspection' },
  { id: 'working', label: 'Working', description: 'Actively performing the vehicle care service' },
  { id: 'finalising', label: 'Finalising', description: 'Quality inspection and final touch-ups' },
  { id: 'completed', label: 'Completed', description: 'Service completed. Ready for payment/review' },
];

const MOCK_NOTES = [
  { time: '10:02 AM', text: 'Kwame Asante arrived at East Legon, Accra.' },
  { time: '10:05 AM', text: 'Inspecting vehicle body. Found light paint swirl marks on bonnet.' },
  { time: '10:12 AM', text: 'Pre-wash complete. Foam wash active.' },
  { time: '10:30 AM', text: 'Started interior vacuuming and dashboard dressing.' },
  { time: '10:50 AM', text: 'Applying premium wax layer.' },
  { time: '11:00 AM', text: 'Final polish and detail check in progress.' },
];

export default function ServiceInProgress() {
  const { id } = useParams();
  const { getBooking, rateBooking } = useBooking();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(1); // Default to 'Inspecting'
  const [checklist, setChecklist] = useState(
    SERVICE_CHECKLIST.map((c, i) => ({ ...c, done: i < 2 })) // initial state: first 2 done
  );
  const [notes, setNotes] = useState(MOCK_NOTES.slice(0, 2));
  const [timeLeft, setTimeLeft] = useState(45); // minutes
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [hasRated, setHasRated] = useState(false);

  const booking = getBooking(id) || {
    id: id,
    service: 'Premium Car Wash',
    amount: 135,
    address: 'East Legon, Accra',
    technician: { name: 'Kwame Asante', rating: 4.9, phone: '+233 24 567 8901' },
    vehicle: { make: 'Toyota', model: 'Corolla', year: '2020', plate: 'GR-1234-21' },
  };

  // Simulate progress over time
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setCurrentStepIndex(prev => {
        const next = Math.min(prev + 1, STEPS.length - 1);
        
        // Update checklist items based on step
        if (next === 2) { // Working
          setChecklist(prevList => prevList.map((c, idx) => ({ ...c, done: idx < 6 })));
          setNotes(prevNotes => [...prevNotes, MOCK_NOTES[2], MOCK_NOTES[3]]);
          setTimeLeft(25);
        } else if (next === 3) { // Finalising
          setChecklist(prevList => prevList.map((c, idx) => ({ ...c, done: idx < 9 })));
          setNotes(prevNotes => [...prevNotes, MOCK_NOTES[4], MOCK_NOTES[5]]);
          setTimeLeft(8);
        } else if (next === 4) { // Completed
          setChecklist(prevList => prevList.map(c => ({ ...c, done: true })));
          setTimeLeft(0);
          setShowRatingModal(true);
        }
        
        return next;
      });
    }, 15000); // Progress updates every 15 seconds for simulation

    return () => clearInterval(progressTimer);
  }, []);

  // Time countdown simulation
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 20000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const activeStep = STEPS[currentStepIndex];
  const isCompleted = activeStep.id === 'completed';

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    rateBooking(booking.id, rating, reviewText);
    setHasRated(true);
    setTimeout(() => {
      setShowRatingModal(false);
    }, 1000);
  };

  return (
    <div className="page-content" style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Service Tracker
            </span>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600 }}>Active Care Session</h1>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)' }}>Booking ID: {booking.id}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <a href={`tel:${booking.technician?.phone}`} className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Phone size={14} /> Call Technician
            </a>
          </div>
        </div>

        {/* Top Status & Countdown Dashboard */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Status Panel */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '4px solid var(--color-primary)' }}>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.04em' }}>Current Stage</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.375rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: isCompleted ? 'var(--color-success)' : 'var(--color-primary)', animation: isCompleted ? 'none' : 'pulse-dot 1.5s infinite' }} />
              <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, color: 'var(--color-text)' }}>{activeStep.label}</h2>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)', marginTop: '0.25rem' }}>{activeStep.description}</p>
          </div>

          {/* Time Remaining Panel */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: isCompleted ? 'var(--color-success-light)' : 'white' }}>
            <p style={{ fontSize: 'var(--font-size-xs)', color: isCompleted ? 'var(--color-success)' : 'var(--color-muted)', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.04em' }}>
              {isCompleted ? 'Completion Status' : 'Est. Time Remaining'}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem', marginTop: '0.375rem' }}>
              <Clock size={20} style={{ color: isCompleted ? 'var(--color-success)' : 'var(--color-primary)', alignSelf: 'center', marginRight: '0.25rem' }} />
              {isCompleted ? (
                <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, color: 'var(--color-success)' }}>Done! 🌟</span>
              ) : (
                <>
                  <span style={{ fontSize: '2rem', fontWeight: 600, lineHeight: 1 }}>{timeLeft}</span>
                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', fontWeight: 500 }}>mins</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Progress Stepper */}
        <div className="card" style={{ marginBottom: '1.5rem', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '500px', padding: '0.5rem 0' }}>
            {STEPS.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              return (
                <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative' }}>
                  {/* Step Connector line */}
                  {idx < STEPS.length - 1 && (
                    <div style={{
                      position: 'absolute', top: 14, left: '50%', right: '-50%', height: 2,
                      background: idx < currentStepIndex ? 'var(--color-primary)' : 'var(--color-border)',
                      zIndex: 1
                    }} />
                  )}
                  {/* Step Circle */}
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: isPast ? 'var(--color-primary)' : isActive ? 'white' : 'var(--color-bg)',
                    border: isPast ? 'none' : isActive ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                    color: isPast ? 'white' : isActive ? 'var(--color-primary)' : 'var(--color-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 600, fontSize: '0.75rem', zIndex: 2, position: 'relative',
                    transition: 'all 0.3s ease'
                  }}>
                    {isPast ? <Check size={14} strokeWidth={3} /> : idx + 1}
                  </div>
                  <span style={{
                    fontSize: 'var(--font-size-xs)', fontWeight: isActive || isPast ? 600 : 500,
                    color: isActive ? 'var(--color-primary)' : isPast ? 'var(--color-text)' : 'var(--color-muted)',
                    marginTop: '0.5rem', textAlign: 'center'
                  }}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Split Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
          {/* Left: Job Checklist */}
          <div>
            <div className="card" style={{ height: '100%' }}>
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--color-primary)' }} />
                Service Inclusions & Checklist
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {checklist.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-surface-2)' }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: item.done ? 'var(--color-success-light)' : 'transparent',
                      border: item.done ? 'none' : '1.5px solid var(--color-border)',
                      color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: '0.125rem'
                    }}>
                      {item.done && <Check size={11} strokeWidth={3} />}
                    </div>
                    <span style={{
                      fontSize: 'var(--font-size-sm)',
                      color: item.done ? 'var(--color-muted)' : 'var(--color-text)',
                      textDecoration: item.done ? 'line-through' : 'none',
                      transition: 'all 0.2s'
                    }}>
                      {item.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Notes Feed & Media Photos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Live Notes Feed */}
            <div className="card">
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: '1rem' }}>Live Activity Feed</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                {/* Timeline vertical bar */}
                <div style={{ position: 'absolute', top: 8, bottom: 8, left: 24, width: 2, background: 'var(--color-border)' }} />
                
                {notes.map((note, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%', background: 'var(--color-primary)',
                      border: '4px solid white', margin: '4px 0 0 16px', boxShadow: '0 0 0 1px var(--color-border)'
                    }} />
                    <div style={{ flex: 1, background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)', padding: '0.75rem 1rem' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)', fontWeight: 500 }}>{note.time}</span>
                      <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text)', marginTop: '0.125rem' }}>{note.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Before / After Photo documentation */}
            <div className="card">
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Camera size={18} style={{ color: 'var(--color-primary)' }} />
                Before & After Photos
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {/* Before Photo */}
                <div style={{ background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)', padding: '0.75rem', border: '1px dashed var(--color-border)', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Before Service</span>
                  <div style={{ height: 90, background: '#E2E8F0', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)' }}>
                    <Camera size={20} />
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-muted)', display: 'block', marginTop: '0.375rem' }}>Uploaded 10:04 AM</span>
                </div>

                {/* After Photo */}
                <div style={{ background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)', padding: '0.75rem', border: '1px dashed var(--color-border)', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>After Service</span>
                  {currentStepIndex >= 3 ? (
                    <div>
                      <div style={{ height: 90, background: 'var(--color-primary-10)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                        <Camera size={20} />
                      </div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--color-primary)', display: 'block', marginTop: '0.375rem', fontWeight: 500 }}>Completed</span>
                    </div>
                  ) : (
                    <div style={{ height: 90, background: '#F1F5F9', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-subtle)' }}>
                      <Clock size={16} />
                      <span style={{ fontSize: '0.6rem', marginTop: '0.25rem' }}>Inspecting...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Technician Profile Card */}
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--color-navy)', color: 'white' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.9rem', flexShrink: 0 }}>
                KA
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{booking.technician?.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.7)' }}>
                  <Star size={10} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
                  {booking.technician?.rating} · Lead Technician
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Completion Rating & Modal overlay */}
      <AnimatePresence>
        {showRatingModal && (
          <div className="modal-backdrop" onClick={() => setShowRatingModal(false)}>
            <motion.div className="modal-box" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
              
              {!hasRated ? (
                <form onSubmit={handleRatingSubmit} style={{ textAlign: 'center' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <CheckCircle size={30} />
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '0.25rem' }}>Service Completed!</h3>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)', marginBottom: '1.25rem' }}>
                    Kwame has completed the care session. How was your experience?
                  </p>

                  {/* Star selector */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0.25rem', outline: 'none' }}>
                        <Star size={28} style={{
                          fill: star <= rating ? '#F59E0B' : 'none',
                          color: star <= rating ? '#F59E0B' : 'var(--color-border)'
                        }} />
                      </button>
                    ))}
                  </div>

                  <textarea
                    placeholder="Tell us what you liked (optional)..."
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    style={{
                      width: '100%', minHeight: '80px', padding: '0.75rem', borderRadius: 'var(--radius-lg)',
                      border: '1.5px solid var(--color-border)', outline: 'none', fontSize: 'var(--font-size-sm)',
                      fontFamily: 'inherit', marginBottom: '1.25rem', resize: 'vertical'
                    }}
                  />

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link to="/dashboard" className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>Skip Review</Link>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Submit Feedback</button>
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <CheckCircle size={30} />
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '0.25rem' }}>Thank You!</h3>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
                    Your feedback helps us maintain premium quality.
                  </p>
                  <Link to="/dashboard" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Back to Dashboard
                  </Link>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
