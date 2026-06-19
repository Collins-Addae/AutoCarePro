import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Star, ChevronDown, ChevronUp, Download, RefreshCw, Eye } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency, formatDate, STATUS_CONFIG } from '../../data/mockData';

export default function BookingHistory() {
  const { bookings, rateBooking } = useBooking();
  const [activeTab, setActiveTab] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  
  // Rating states
  const [ratingBookingId, setRatingBookingId] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  const openRatingModal = (id, currentRating, currentReview) => {
    setRatingBookingId(id);
    setRating(currentRating || 5);
    setReviewText(currentReview || '');
  };

  const submitRating = (e) => {
    e.preventDefault();
    if (ratingBookingId) {
      rateBooking(ratingBookingId, rating, reviewText);
      setRatingBookingId(null);
    }
  };

  const exportHistory = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href",     dataStr);
    downloadAnchor.setAttribute("download", `autocarepro_bookings_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="page-content" style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600 }}>Booking History</h1>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)' }}>View and manage your past vehicle care sessions</p>
          </div>
          <button onClick={exportHistory} className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={14} /> Export CSV
          </button>
        </div>

        {/* Tab Filters */}
        <div style={{ display: 'flex', gap: '0.375rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
          {[
            { id: 'all', label: 'All Services' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'in-progress', label: 'Active' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                border: 'none',
                background: activeTab === tab.id ? 'var(--color-primary-10)' : 'transparent',
                color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-muted)',
                padding: '0.5rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 500,
                fontSize: 'var(--font-size-sm)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <Calendar size={48} style={{ color: 'var(--color-subtle)', margin: '0 auto 1rem' }} />
            <h3 style={{ fontWeight: 600, fontSize: 'var(--font-size-base)', marginBottom: '0.25rem' }}>No bookings found</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: 'var(--font-size-sm)', marginBottom: '1.5rem' }}>
              We couldn't find any bookings matching this filter.
            </p>
            <Link to="/book" className="btn btn-primary btn-sm">Book a Service Now</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredBookings.map((booking) => {
              const isExpanded = expandedId === booking.id;
              const config = STATUS_CONFIG[booking.status] || { label: booking.status, class: 'badge-muted' };

              return (
                <div key={booking.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  
                  {/* Summary Row */}
                  <div
                    onClick={() => toggleExpand(booking.id)}
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      cursor: 'pointer',
                      background: isExpanded ? 'var(--color-surface-2)' : 'white',
                      transition: 'background 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 'var(--radius-lg)',
                        background: 'var(--color-primary-10)', color: 'var(--color-primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        <Calendar size={20} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text)' }}>
                          {booking.service}
                        </h3>
                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.125rem' }}>
                          <span>{booking.id}</span> · <span>{formatDate(booking.date)}</span> at <span>{booking.time}</span>
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text)' }}>
                          {formatCurrency(booking.amount)}
                        </p>
                        <span className={`badge ${config.class}`} style={{ marginTop: '0.25rem', display: 'inline-block' }}>
                          {config.label}
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp size={16} style={{ color: 'var(--color-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--color-muted)' }} />}
                    </div>
                  </div>

                  {/* Expandable Details Container */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ borderTop: '1px solid var(--color-border)', overflow: 'hidden' }}
                      >
                        <div style={{ padding: '1.25rem', background: '#FAFCFF', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                          
                          {/* Left Details */}
                          <div>
                            <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Service Details</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: 'var(--font-size-xs)' }}>
                              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text)' }}>
                                <MapPin size={12} style={{ color: 'var(--color-muted)' }} /> {booking.address}
                              </p>
                              {booking.vehicle && (
                                <p style={{ color: 'var(--color-text)' }}>
                                  <strong style={{ color: 'var(--color-muted)' }}>Vehicle:</strong> {booking.vehicle.year} {booking.vehicle.make} {booking.vehicle.model} ({booking.vehicle.plate})
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Right Details (Technician / Feedback) */}
                          <div>
                            <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Assigned Partner</p>
                            {booking.technician ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary-dark)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600 }}>
                                  {booking.technician.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div style={{ fontSize: 'var(--font-size-xs)' }}>
                                  <p style={{ fontWeight: 600 }}>{booking.technician.name}</p>
                                  <p style={{ color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Star size={10} style={{ fill: '#F59E0B', color: '#F59E0B' }} /> {booking.technician.rating}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>No technician assigned yet.</p>
                            )}
                          </div>

                          {/* Review & Action Button column */}
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px' }}>
                            <div>
                              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Your Rating</p>
                              {booking.status === 'completed' ? (
                                booking.rating ? (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: 'var(--font-size-xs)' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                      <Star key={star} size={11} style={{
                                        fill: star <= booking.rating ? '#F59E0B' : 'none',
                                        color: star <= booking.rating ? '#F59E0B' : 'var(--color-border)'
                                      }} />
                                    ))}
                                    {booking.review && <span style={{ color: 'var(--color-muted)', marginLeft: '0.25rem', fontStyle: 'italic' }}>"{booking.review}"</span>}
                                  </div>
                                ) : (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); openRatingModal(booking.id, booking.rating, booking.review); }}
                                    style={{
                                      border: 'none', background: 'none', color: 'var(--color-primary)', fontSize: 'var(--font-size-xs)', fontWeight: 500, cursor: 'pointer', padding: 0, textDecoration: 'underline'
                                    }}
                                  >
                                    Write a review
                                  </button>
                                )
                              ) : (
                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>Available after service.</p>
                              )}
                            </div>

                            {/* Actions bar inside expansion */}
                            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', marginTop: '0.5rem' }}>
                              {booking.status === 'completed' && (
                                <Link to="/book" state={{ serviceId: booking.serviceId }} className="btn btn-primary btn-xs" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                  <RefreshCw size={10} /> Rebook
                                </Link>
                              )}
                              {booking.status === 'in-progress' && (
                                <Link to={`/service-in-progress/${booking.id}`} className="btn btn-primary btn-xs" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                  <Eye size={10} /> View Progress
                                </Link>
                              )}
                              {booking.status === 'upcoming' && (
                                <Link to={`/tracking/${booking.id}`} className="btn btn-ghost btn-xs">
                                  Track Technician
                                </Link>
                              )}
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Review Modal */}
      {ratingBookingId && (
        <div className="modal-backdrop" onClick={() => setRatingBookingId(null)}>
          <motion.div className="modal-box" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <form onSubmit={submitRating} style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '0.25rem' }}>Rate Service</h3>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)', marginBottom: '1.25rem' }}>
                How would you rate booking reference {ratingBookingId}?
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
                placeholder="Write a brief comment about this service..."
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                style={{
                  width: '100%', minHeight: '80px', padding: '0.75rem', borderRadius: 'var(--radius-lg)',
                  border: '1.5px solid var(--color-border)', outline: 'none', fontSize: 'var(--font-size-sm)',
                  fontFamily: 'inherit', marginBottom: '1.25rem', resize: 'vertical'
                }}
              />

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setRatingBookingId(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Save Review</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
