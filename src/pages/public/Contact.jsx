import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    reset();
  };

  return (
    <>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, var(--color-navy-dark) 0%, var(--color-navy) 100%)', color: 'white', padding: '4rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h2" style={{ color: 'white', marginBottom: '1rem' }}>Get in Touch</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 440, margin: '0 auto' }}>
            Have a question, need a corporate quote, or want to partner with us? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            {/* Contact Info */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginBottom: '1.5rem' }}>Contact Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {[
                  { icon: Phone, label: 'Phone', value: '+233 24 000 0000', href: 'tel:+233240000000' },
                  { icon: Mail, label: 'Email', value: 'hello@autocarepro.gh', href: 'mailto:hello@autocarepro.gh' },
                  { icon: MapPin, label: 'Office', value: 'UCC, Cape Coast, Ghana', href: null },
                  { icon: Clock, label: 'Hours', value: 'Mon–Sun: 6:00 AM – 9:00 PM', href: null },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-10)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)', marginBottom: '0.125rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text)', textDecoration: 'none' }}>{item.value}</a>
                        : <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{item.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a href="https://wa.me/233240000000?text=Hi%20AutoCare%20Pro!%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer"
                className="btn btn-success btn-lg" style={{ display: 'inline-flex', gap: '0.625rem', textDecoration: 'none' }}>
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <div className="card" style={{ padding: '2rem' }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                      <CheckCircle size={30} />
                    </div>
                    <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: '0.5rem' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--color-muted)', fontSize: 'var(--font-size-sm)', marginBottom: '1.5rem' }}>
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button className="btn btn-ghost" onClick={() => setSubmitted(false)}>Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Contact form">
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: '1.5rem' }}>Send a Message</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      <div className="form-group">
                        <label htmlFor="contact-name" className="form-label form-label-required">Full Name</label>
                        <input id="contact-name" type="text" className={`form-input ${errors.name ? 'error' : ''}`}
                          placeholder="Kwame Darko" aria-required="true"
                          {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })} />
                        {errors.name && <span className="form-error" role="alert">{errors.name.message}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="contact-email" className="form-label form-label-required">Email</label>
                        <input id="contact-email" type="email" className={`form-input ${errors.email ? 'error' : ''}`}
                          placeholder="kwame@gmail.com" aria-required="true"
                          {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Valid email required' } })} />
                        {errors.email && <span className="form-error" role="alert">{errors.email.message}</span>}
                      </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label htmlFor="contact-phone" className="form-label">Phone Number</label>
                      <input id="contact-phone" type="tel" className="form-input" placeholder="+233 24 000 0000"
                        {...register('phone')} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label htmlFor="contact-subject" className="form-label form-label-required">Subject</label>
                      <select id="contact-subject" className={`form-select ${errors.subject ? 'error' : ''}`} aria-required="true"
                        {...register('subject', { required: 'Please select a subject' })}>
                        <option value="">Select a topic...</option>
                        <option>General Enquiry</option>
                        <option>Corporate Quote</option>
                        <option>Partnership</option>
                        <option>Complaint / Feedback</option>
                        <option>Technical Issue</option>
                      </select>
                      {errors.subject && <span className="form-error" role="alert">{errors.subject.message}</span>}
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label htmlFor="contact-message" className="form-label form-label-required">Message</label>
                      <textarea id="contact-message" className={`form-input ${errors.message ? 'error' : ''}`}
                        placeholder="Tell us how we can help..." rows={4} style={{ resize: 'vertical' }} aria-required="true"
                        {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Please write at least 20 characters' } })} />
                      {errors.message && <span className="form-error" role="alert">{errors.message.message}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
