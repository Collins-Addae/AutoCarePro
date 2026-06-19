import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Clock, Droplets, Sparkles, Star, Zap, AlertTriangle, Circle, Droplet } from 'lucide-react';
import { SERVICES, formatCurrency } from '../../data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'cleaning', label: 'Cleaning & Detailing' },
  { id: 'mechanical', label: 'Mechanical' },
  { id: 'emergency', label: 'Emergency' },
];

const ICON_MAP = {
  droplets: Droplets, sparkles: Sparkles, star: Star, droplet: Droplet,
  circle: Circle, zap: Zap, 'alert-triangle': AlertTriangle,
  armchair: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>,
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const filtered = activeCategory === 'all' ? SERVICES : SERVICES.filter(s => s.category === activeCategory);

  return (
    <>
      {/* Page header */}
      <section style={{ background: 'linear-gradient(135deg, var(--color-navy-dark) 0%, var(--color-navy) 100%)', color: 'white', padding: '4rem 0 3rem' }} aria-label="Services page header">
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="section-label" style={{ background: 'rgba(26,86,219,0.3)', color: '#93C5FD', marginBottom: '1rem' }}>
            Our Services
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="h2" style={{ color: 'white', marginBottom: '1rem' }}>
            Professional services for every vehicle
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--font-size-lg)', maxWidth: 540, margin: '0 auto' }}>
            From rapid exterior washes to full mechanical care — all delivered by verified professionals to your location.
          </motion.p>
        </div>
      </section>

      <section className="section" aria-label="Services catalogue">
        <div className="container">
          {/* Filter tabs */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <div className="tab-nav" style={{ display: 'inline-flex' }}>
              {CATEGORIES.map(cat => (
                <button key={cat.id} className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`} onClick={() => setActiveCategory(cat.id)}>
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Service cards */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {filtered.map((service) => {
              const IconComp = ICON_MAP[service.icon] || Droplets;
              const isExpanded = expanded === service.id;
              return (
                <div key={service.id} className="card" style={{ cursor: 'pointer', transition: 'all var(--transition-normal)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-lg)', background: `${service.color}18`, color: service.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <IconComp size={22} />
                    </div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                        <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>{service.name}</h2>
                        {service.popular && <span className="badge badge-blue">Popular</span>}
                        <span className="badge badge-gray" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={11} /> {service.duration}
                        </span>
                      </div>
                      <p style={{ color: 'var(--color-muted)', fontSize: 'var(--font-size-sm)' }}>{service.description}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, color: 'var(--color-primary)' }}>
                        {formatCurrency(service.priceFrom)}
                        {service.priceTo !== service.priceFrom && <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', fontWeight: 400 }}> – {formatCurrency(service.priceTo)}</span>}
                      </div>
                      <div style={{ display: 'flex', gap: '0.625rem', marginTop: '0.5rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setExpanded(isExpanded ? null : service.id)}
                          className="btn btn-ghost btn-sm"
                          aria-expanded={isExpanded}
                          aria-controls={`service-details-${service.id}`}
                        >
                          {isExpanded ? 'Less' : 'Details'}
                        </button>
                        <Link to="/book" className="btn btn-primary btn-sm" state={{ serviceId: service.id }}>
                          Book
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Expandable includes */}
                  <motion.div
                    id={`service-details-${service.id}`}
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingTop: '1.25rem', marginTop: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
                      <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-muted)', letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                        What's Included
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                        {service.includes.map(item => (
                          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)' }}>
                            <Check size={14} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} style={{ marginTop: '3rem', textAlign: 'center' }}>
            <div className="card" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', background: 'var(--color-primary-10)', border: '1.5px solid var(--color-primary-20)' }}>
              <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '0.5rem' }}>Need something custom?</p>
              <p style={{ color: 'var(--color-muted)', marginBottom: '1.25rem', fontSize: 'var(--font-size-sm)' }}>
                Corporate fleet, special vehicle, or bulk booking? We'll create a package for you.
              </p>
              <Link to="/contact" className="btn btn-primary">Request Custom Quote</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
