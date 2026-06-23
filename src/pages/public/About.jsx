import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Users, Target, Award, TrendingUp, Smartphone, Check } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const STATS = [
  { value: '1,200+', label: 'Happy Customers', icon: Users },
  { value: '4.9', label: 'Average Rating', icon: Award },
  { value: '12+', label: 'Technicians', icon: Users },
  { value: '7', label: 'Towns Covered', icon: MapPin },
];

const VALUES = [
  { icon: Award, title: 'Quality First', description: 'Every technician is certified, trained, and company-employed. Consistent quality across every job.' },
  { icon: Target, title: 'Customer Focus', description: 'Our customers drive every decision. Real-time tracking, digital records, and 24-hour satisfaction guarantee.' },
  { icon: TrendingUp, title: 'Innovation', description: 'We bring fintech thinking to automotive care — seamless booking, transparent pricing, and live tracking.' },
  { icon: Smartphone, title: 'Convenience', description: 'We come to you. Home, office, university campus — wherever your vehicle is parked.' },
];

const TEAM = [
  { name: 'Project Manager', role: 'Operations & Strategy', initials: 'PM', members: 'GodLove', bg: '#1A56DB' },
  { name: 'Frontend Engineers', role: 'Platform Development', initials: 'FE', members: ['Perry', 'Simon', 'Gabriel', 'Peter', 'Collins' ] ,bg: '#7C3AED' },
  { name: 'Backend Engineers', role: 'Backend Development', initials: 'BE', members: ['Dave', 'Nicholas', 'Effah', 'Delsin'], bg: '#15803D' },
  { name: 'System Designers', role: 'Product Design', initials: 'SD', members:['Davies', 'Daniel', 'Stephan'], bg: '#D97706' },
  { name: 'Documentation', role: 'Documenting', initials: 'D', members:['Richard', 'Manuel',], bg: '#D97706' },
];

const COVERAGE =  [
  'UCC Campus, Cape Coast',
  'Kwapro, Cape Coast',
  'Amamoma, Cape Coast',
  'Apewosika, Cape Coast',
  'Ayensu, Cape Coast',
  'Akotokyire, Cape Coast',
  'Abura, Cape Coast',
];

export default function About() {
  return (
    <>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, var(--color-navy-dark) 0%, var(--color-navy) 100%)', color: 'white', padding: '5rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span variants={fadeUp} className="section-label" style={{ background: 'rgba(26,86,219,0.3)', color: '#93C5FD', marginBottom: '1rem' }}>
              Our Story
            </motion.span>
            <motion.h1 variants={fadeUp} className="h2" style={{ color: 'white', marginBottom: '1.25rem' }}>
              About AutoCare Pro
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 580, margin: '0 auto', fontSize: 'var(--font-size-lg)', lineHeight: 1.7 }}>
              We're building Ghana's most trusted on-demand vehicle care platform — combining technology, trained professionals, and a commitment to exceptional service.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-sm">
        <div className="container">
          <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem' }} initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={fadeUp} className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-10)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.875rem' }}>
                  <stat.icon size={22} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginTop: '0.375rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section" style={{ background: 'var(--color-surface-2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.span variants={fadeUp} className="section-label">Mission & Vision</motion.span>
              <motion.h2 variants={fadeUp} className="h3" style={{ marginBottom: '1.25rem' }}>
                Transforming how Ghana cares for vehicles
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '1rem', fontSize: 'var(--font-size-base)' }}>
                AutoCare Pro was born from a simple observation: vehicle owners in Ghana waste hours traveling to service centres, waiting in queues, and dealing with inconsistent quality.
              </motion.p>
              <motion.p variants={fadeUp} style={{ color: 'var(--color-muted)', lineHeight: 1.8, fontSize: 'var(--font-size-base)' }}>
                Our mission is to deliver professional, standardised vehicle maintenance at your doorstep — using technology to make bookings seamless, tracking transparent, and payments instant.
              </motion.p>
              <motion.div variants={fadeUp} style={{ marginTop: '1.5rem' }}>
                <Link to="/book" className="btn btn-primary">Book Your Service</Link>
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className='grid grid-cols-2 gap-2'>
              {VALUES.map(v => (
                <motion.div key={v.title} variants={fadeUp} className="card" style={{ background: 'white' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-10)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <v.icon size={18} />
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: '0.375rem' }}>{v.title}</h3>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)', lineHeight: 1.7 }}>{v.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="section">
        <div className="container">
          <motion.div className="section-header" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeUp} className="section-label">Service Areas</motion.span>
            <motion.h2 variants={fadeUp} className="h3" style={{ marginBottom: '0.75rem' }}>Where We Operate</motion.h2>
            <motion.p variants={fadeUp} className="text-muted">Currently serving these areas, expanding monthly.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {COVERAGE.map(area => (
              <motion.div key={area} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', background: 'var(--color-primary-10)', color: 'var(--color-primary)', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>
                <MapPin size={13} /> {area}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--color-surface-2)' }}>
        <div className="container">
          <motion.div className="section-header" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeUp} className="section-label">Our Team</motion.span>
            <motion.h2 variants={fadeUp} className="h3">The people behind AutoCare Pro</motion.h2>
          </motion.div>
          <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', maxWidth: 800, margin: '0 auto' }} initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            {TEAM.map(member => (
              <motion.div key={member.name} variants={fadeUp} className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: member.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 600, margin: '0 auto 1rem' }}>{member.initials}</div>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{member.name}</p>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>{member.role}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', textAlign: 'center', alignItems: 'center', gap: '0.5rem' }}>
                        {Array.isArray(member.members) ? member.members.map(members => (
                          <div key={members} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)' }}>
                            <Check size={14} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                            {members}
                          </div>
                        )) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)' }}>
                            <Check size={14} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                            {member.members}
                          </div>
                        )}
                      </div>
                
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
