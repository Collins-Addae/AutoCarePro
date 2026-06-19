import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { PRICING_TIERS, formatCurrency } from '../../data/mockData';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const COMPARISON = [
  { feature: 'Mobile Service', basic: true, standard: true, premium: true },
  { feature: 'Exterior Wash', basic: true, standard: true, premium: true },
  { feature: 'Tyre Dressing', basic: false, standard: true, premium: true },
  { feature: 'Wax Application', basic: false, standard: true, premium: true },
  { feature: 'Interior Vacuum', basic: false, standard: true, premium: true },
  { feature: 'Rim Cleaning', basic: false, standard: true, premium: true },
  { feature: 'Machine Polish', basic: false, standard: false, premium: true },
  { feature: 'Clay Bar Treatment', basic: false, standard: false, premium: true },
  { feature: 'Interior Deep Clean', basic: false, standard: false, premium: true },
  { feature: 'Odour Elimination', basic: false, standard: false, premium: true },
  { feature: 'Before & After Photos', basic: false, standard: false, premium: true },
  { feature: 'Priority Booking', basic: false, standard: true, premium: true },
];

export default function Pricing() {
  return (
    <>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, var(--color-navy-dark) 0%, var(--color-navy) 100%)', color: 'white', padding: '4rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h2" style={{ color: 'white', marginBottom: '1rem' }}>
            Clear, Transparent Pricing
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 480, margin: '0 auto' }}>
            No hidden fees. No surprises. All prices in Ghana Cedis (GHS). First booking gets 10% off.
          </motion.p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="section">
        <div className="container">
          <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: 960, margin: '0 auto' }} initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            {PRICING_TIERS.map(tier => (
              <motion.div key={tier.id} variants={fadeUp}>
                <div className="card" style={{
                  position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
                  border: tier.popular ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  transform: tier.popular ? 'scale(1.03)' : 'none',
                  boxShadow: tier.popular ? 'var(--shadow-xl)' : 'var(--shadow-sm)',
                }}>
                  {tier.popular && (
                    <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'var(--color-primary)', color: 'white', padding: '0.25rem 1rem', borderRadius: '99px', fontSize: 'var(--font-size-xs)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: '0.25rem', color: tier.color }}>{tier.name}</h2>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)' }}>{tier.tagline}</p>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--color-text)' }}>{formatCurrency(tier.price)}</span>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginLeft: '0.25rem' }}>/ {tier.billing}</span>
                  </div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.5rem', flex: 1 }}>
                    {tier.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)' }}>
                        <Check size={15} style={{ color: 'var(--color-success)', flexShrink: 0 }} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/book" className={`btn ${tier.popular ? 'btn-primary' : 'btn-secondary'} btn-lg`} style={{ width: '100%', justifyContent: 'center' }}>
                    {tier.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Comparison table */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} style={{ marginTop: '4rem' }}>
            <h2 style={{ textAlign: 'center', fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginBottom: '2rem' }}>Feature Comparison</h2>
            <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }} aria-label="Service tier comparison">
                <thead>
                  <tr style={{ background: 'var(--color-surface-2)' }}>
                    <th style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-text)' }}>Feature</th>
                    {['Basic', 'Standard', 'Premium'].map(name => (
                      <th key={name} style={{ padding: '0.875rem 1.25rem', textAlign: 'center', fontWeight: 600, color: name === 'Standard' ? 'var(--color-primary)' : 'var(--color-text)' }}>{name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, idx) => (
                    <tr key={row.feature} style={{ borderTop: '1px solid var(--color-border)', background: idx % 2 === 0 ? 'white' : 'var(--color-surface-2)' }}>
                      <td style={{ padding: '0.75rem 1.25rem', color: 'var(--color-muted)' }}>{row.feature}</td>
                      {['basic', 'standard', 'premium'].map(tier => (
                        <td key={tier} style={{ padding: '0.75rem 1.25rem', textAlign: 'center' }}>
                          {row[tier]
                            ? <Check size={16} style={{ color: 'var(--color-success)', margin: '0 auto' }} aria-label="Included" />
                            : <X size={16} style={{ color: 'var(--color-border-strong)', margin: '0 auto' }} aria-label="Not included" />
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Corporate CTA */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} style={{ marginTop: '3rem' }}>
            <div className="card" style={{ background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-primary) 100%)', color: 'white', textAlign: 'center', border: 'none' }}>
              <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginBottom: '0.5rem' }}>Corporate & Fleet Accounts</h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '1.5rem', maxWidth: 480, margin: '0 auto 1.5rem' }}>
                Managing a fleet? We offer custom pricing, priority scheduling, and consolidated invoicing for businesses with 5+ vehicles.
              </p>
              <Link to="/contact" className="btn btn-white btn-lg">Request Corporate Quote</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
