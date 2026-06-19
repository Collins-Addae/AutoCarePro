import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, CreditCard, Search, UserCheck, Map, ChevronDown } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../../data/mockData';
import { useState } from 'react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const ICON_MAP = { search: Search, 'map-pin': MapPin, 'user-check': UserCheck, map: Map, 'credit-card': CreditCard };

const FAQS = [
  { q: 'How far in advance do I need to book?', a: 'You can book same-day if technicians are available. We recommend booking 1–2 hours in advance to ensure availability, especially on weekends.' },
  { q: 'Where do technicians operate?', a: 'We currently serve East Legon, Osu, Airport Residential, Cantonments, Labone, Adenta (Accra), Tema Communities 1–5, KNUST Campus and Adum (Kumasi), and Sekondi-Takoradi. More areas are expanding monthly.' },
  { q: 'What do technicians need at my location?', a: 'Just a parking space and access to your vehicle. For premium services, we bring our own water supply and equipment. No outdoor tap or electricity is needed.' },
  { q: 'Are technicians background-checked?', a: 'Yes. All AutoCare Pro technicians are company employees who undergo identity verification, background checks, and a certified training programme before their first booking.' },
  { q: 'What payment methods are accepted?', a: 'We accept MTN Mobile Money, Vodafone Cash, Airtel-Tigo Cash, Visa/Mastercard, and AutoCare wallet credits. All payments processed securely via Paystack.' },
  { q: 'What if I\'m not satisfied with the service?', a: 'We offer a 24-hour satisfaction guarantee. If you\'re not happy, contact us and we\'ll arrange a re-service or partial refund at our discretion.' },
];

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, var(--color-navy-dark) 0%, var(--color-navy) 100%)', color: 'white', padding: '4rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label" style={{ background: 'rgba(26,86,219,0.3)', color: '#93C5FD', marginBottom: '1rem' }}>
            The Process
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="h2" style={{ color: 'white', marginBottom: '1rem' }}>
            How AutoCare Pro Works
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto' }}>
            From booking to spotless vehicle in five seamless steps.
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const IconComp = ICON_MAP[step.icon] || Search;
              const isLast = idx === HOW_IT_WORKS_STEPS.length - 1;
              return (
                <motion.div key={step.step} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
                  style={{ display: 'flex', gap: '1.5rem', paddingBottom: isLast ? 0 : '2.5rem' }}
                >
                  {/* Step indicator column */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 'var(--font-size-lg)', boxShadow: 'var(--shadow-primary)', zIndex: 1 }}>
                      {step.step}
                    </div>
                    {!isLast && <div style={{ width: 2, flex: 1, background: 'var(--color-border)', marginTop: '0.75rem' }} />}
                  </div>
                  {/* Content */}
                  <div className="card" style={{ flex: 1, marginBottom: isLast ? 0 : '0' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-10)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <IconComp size={20} />
                      </div>
                      <div>
                        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: '0.5rem' }}>{step.title}</h2>
                        <p style={{ color: 'var(--color-muted)', lineHeight: 1.7, fontSize: 'var(--font-size-sm)' }}>{step.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/book" className="btn btn-primary btn-xl">Book Your First Service</Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--color-surface-2)' }} aria-label="Frequently asked questions">
        <div className="container">
          <motion.div className="section-header" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeUp} className="section-label">FAQ</motion.span>
            <motion.h2 variants={fadeUp} className="h2" id="faq-heading" style={{ marginBottom: '0.5rem' }}>Frequently Asked Questions</motion.h2>
          </motion.div>

          <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQS.map((faq, idx) => (
              <motion.div key={idx} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                <div className="card" style={{ cursor: 'pointer', padding: '1.25rem var(--space-6)' }} onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <h3 style={{ fontWeight: 600, fontSize: 'var(--font-size-base)' }}>{faq.q}</h3>
                    <ChevronDown size={18} style={{ color: 'var(--color-muted)', flexShrink: 0, transform: openFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
                  </div>
                  <motion.div initial={false} animate={{ height: openFaq === idx ? 'auto' : 0, opacity: openFaq === idx ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                    <p style={{ color: 'var(--color-muted)', fontSize: 'var(--font-size-sm)', lineHeight: 1.8, paddingTop: '0.875rem', borderTop: '1px solid var(--color-border)', marginTop: '0.875rem' }}>{faq.a}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
