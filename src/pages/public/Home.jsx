import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Droplets, Sparkles, Zap, AlertTriangle, Circle, Droplet, BadgeCheck, ShieldCheck, GraduationCap, Download, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES, TESTIMONIALS, HOW_IT_WORKS_STEPS, formatCurrency } from '../../data/mockData';
import heroImage from '../../assets/images/hero.jpg';

// ---- Animation Variants ----
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const ICON_MAP = {
  droplets: Droplets, sparkles: Sparkles, star: Star, armchair: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" /><path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" /><path d="M5 18v2" /><path d="M19 18v2" />
    </svg>
  ),
  droplet: Droplet, circle: Circle, zap: Zap, 'alert-triangle': AlertTriangle,
};

// ---- Hero Section ----
function HeroSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0A1628 0%, var(--color-navy) 50%, #1A3A6B 100%)',
        color: 'white',
        padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Hero section"
    >
      {/* Background decoration */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <img
          src={heroImage}
          alt=""
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            objectFit: 'cover',
            opacity: 0.5,
            maskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)'
          }}
        />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,86,219,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)' }} />
        {/* Grid lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(26,86,219,0.25)', border: '1px solid rgba(26,86,219,0.4)',
                color: '#93C5FD', padding: '0.375rem 1rem', borderRadius: '9999px',
                fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.04em',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', animation: 'pulse-dot 1.5s infinite' }} aria-hidden="true" />
                Now serving UCC Campus · Amamoma · Apewosika · Ayensu · Abura · Kwapro
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="h1" style={{ color: 'white', marginBottom: '1.5rem', maxWidth: 680, margin: '0 auto 1.5rem' }}>
              Professional Vehicle Care,{' '}
              <span style={{ color: '#60A5FA', position: 'relative' }}>
                Wherever You Are
                <span style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #60A5FA, transparent)', borderRadius: 99, opacity: 0.6 }} />
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 2.5rem' }}>
              Book a verified AutoCare Pro technician to your home, office, or anywhere in Ghana. Same-day service. Transparent pricing. Starting from <strong style={{ color: 'white' }}>GHS 80</strong>.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/book" className="btn btn-primary btn-xl" style={{ gap: '0.5rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                Book a Service
              </Link>
              <Link to="/how-it-works" className="btn btn-xl" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
                See How It Works
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              {[
                { value: '1,200+', label: 'Bookings' },
                { value: '4.9★', label: 'Avg. Rating' },
                { value: '12+', label: 'Technicians' },
                { value: '4', label: 'Cities' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 600, color: 'white' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.15rem' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---- Services Section ----
function ServicesSection() {
  const featured = SERVICES.slice(0, 4);
  return (
    <section className="section" aria-labelledby="services-heading">
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
          <motion.span variants={fadeUp} className="section-label">Our Services</motion.span>
          <motion.h2 variants={fadeUp} className="h2" id="services-heading" style={{ marginBottom: '1rem' }}>
            Everything your vehicle needs
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted" style={{ fontSize: 'var(--font-size-lg)' }}>
            From quick exterior washes to comprehensive detailing and emergency assistance — all delivered to you.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-auto" style={{ gap: '1.25rem' }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          {featured.map((service) => {
            const IconComp = ICON_MAP[service.icon] || Droplets;
            return (
              <motion.div key={service.id} variants={fadeUp}>
                <div className="card card-hover" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                  {service.popular && (
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'var(--color-primary)', color: 'white',
                      padding: '0.2rem 0.6rem', borderRadius: '99px',
                      fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.04em',
                      zIndex: 2,
                    }}>POPULAR</div>
                  )}
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.name}
                      style={{
                        width: '100%',
                        height: 160,
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                        marginBottom: '1rem'
                      }}
                    />
                  )}
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: `${service.color}18`, color: service.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', padding: '0 1rem' }}>
                    <IconComp size={20} />
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '0.5rem' }}>{service.name}</h3>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>{service.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <div>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>From </span>
                      <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, color: 'var(--color-primary)' }}>{formatCurrency(service.priceFrom)}</span>
                    </div>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>{service.duration}</span>
                  </div>
                  <Link to="/book" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                    Book Now
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div style={{ textAlign: 'center', marginTop: '2.5rem' }} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <Link to="/services" className="btn btn-secondary btn-lg">
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ---- How It Works (condensed) ----
function HowItWorksSection() {
  return (
    <section className="section" style={{ background: 'var(--color-surface-2)' }} aria-labelledby="hiw-heading">
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.span variants={fadeUp} className="section-label">Simple Process</motion.span>
          <motion.h2 variants={fadeUp} className="h2" id="hiw-heading" style={{ marginBottom: '1rem' }}>
            Car care in 3 simple steps
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted" style={{ fontSize: 'var(--font-size-lg)' }}>
            Get professional service without leaving your parking spot.
          </motion.p>
        </motion.div>

        <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }} initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          {HOW_IT_WORKS_STEPS.slice(0, 3).map((step) => (
            <motion.div key={step.step} variants={fadeUp} style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.5rem', fontWeight: 600 }}>
                {step.step}
              </div>
              <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: '0.75rem' }}>{step.title}</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: 'var(--font-size-sm)', lineHeight: 1.7 }}>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div style={{ textAlign: 'center', marginTop: '2rem' }} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <Link to="/how-it-works" className="btn btn-ghost btn-lg">See Full Process →</Link>
        </motion.div>
      </div>
    </section>
  );
}

// ---- Technician Trust Band ----
function TechnicianTrustBand() {
  return (
    <section style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-primary-10)', padding: '4rem 0' }}>
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h3 variants={fadeUp} style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center', fontSize: '22px', fontWeight: 500, lineHeight: 1.4, color: 'var(--color-navy)' }}>
            Every technician is trained, vetted, and employed by AutoCare Pro — not a gig worker.
          </motion.h3>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0', marginTop: '2.5rem' }}>
            {[
              { icon: BadgeCheck, num: "100%", label: "Company Employed", sub: "No freelancers. No gig workers." },
              { icon: ShieldCheck, num: "Background", label: "Verified", sub: "Identity, references, and history." },
              { icon: GraduationCap, num: "Professionally", label: "Trained", sub: "Certified before their first job." },
            ].map((s) => (
              <motion.div key={s.label} variants={fadeUp} style={{ padding: '1.5rem', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
                <s.icon size={20} strokeWidth={1.5} style={{ margin: '0 auto', color: 'var(--color-primary)' }} />
                <div style={{ marginTop: '0.75rem', fontSize: '22px', fontWeight: 600, color: 'var(--color-navy)' }}>{s.num}</div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-navy)' }}>{s.label}</div>
                <div style={{ marginTop: '0.25rem', fontSize: '13px', color: 'var(--color-muted)' }}>{s.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ---- Testimonials ----
function TestimonialsSection() {
  return (
    <section className="section" aria-labelledby="testimonials-heading">
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.span variants={fadeUp} className="section-label">Customer Reviews</motion.span>
          <motion.h2 variants={fadeUp} className="h2" id="testimonials-heading" style={{ marginBottom: '1rem' }}>
            Loved by vehicle owners across Ghana
          </motion.h2>
        </motion.div>

        <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }} initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          {TESTIMONIALS.map(t => (
            <motion.div key={t.id} variants={fadeUp} className="card card-hover">
              <div className="stars" aria-label={`${t.rating} out of 5 stars`} style={{ marginBottom: '1rem' }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                ))}
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                "{t.comment}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.avatarBg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600, flexShrink: 0 }}>{t.avatar}</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{t.name}</p>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>{t.role} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- PWA Install Section ----
function PWAInstallSection() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowInstall(false);
    }

    setDeferredPrompt(null);
  };

  if (!showInstall) return null;

  return (
    <section className="section" style={{ background: 'var(--color-surface-2)' }} aria-label="PWA installation">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="card"
          style={{
            maxWidth: 700,
            margin: '0 auto',
            padding: '2.5rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, var(--color-primary-10) 0%, var(--color-primary-5) 100%)',
            border: '2px solid var(--color-primary-20)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'var(--color-primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Smartphone size={32} />
            </div>
          </div>
          <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-navy)' }}>
            Install AutoCare Pro
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: 'var(--font-size-sm)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Add AutoCare Pro to your home screen for quick access. Book services, track bookings, and get notifications — all from your phone.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleInstallClick}
              className="btn btn-primary btn-lg"
              style={{ gap: '0.5rem' }}
            >
              <Download size={18} />
              Install App
            </button>
            <button
              onClick={() => setShowInstall(false)}
              className="btn btn-ghost btn-lg"
            >
              Maybe Later
            </button>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)', marginTop: '1rem' }}>
            No download required · Works offline · Fast & lightweight
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ---- CTA Banner ----
function CTASection() {
  return (
    <section className="section" aria-label="Call to action">
      <div className="container">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          style={{
            background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-primary) 100%)',
            borderRadius: 'var(--radius-2xl)', padding: 'clamp(2.5rem, 5vw, 4rem)',
            textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -30, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span className="section-label" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', marginBottom: '1.25rem' }}>
              Get Started Today
            </span>
            <h2 className="h2" style={{ color: 'white', marginBottom: '1rem' }}>
              Your car deserves the best care
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'var(--font-size-lg)', marginBottom: '2rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
              Join over 1,200 satisfied customers in Ghana. First booking? Get 10% off with code <strong style={{ color: 'white' }}>FIRSTCAR</strong>.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-white btn-xl">
                Create Free Account
              </Link>
              <Link to="/book" className="btn btn-xl" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)' }}>
                Book Now
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---- Home Page ----
export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <TechnicianTrustBand />
      <TestimonialsSection />
      <PWAInstallSection />
      <CTASection />
    </>
  );
}
