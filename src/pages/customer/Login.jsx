import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Phone, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginAsCustomer } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 800));
    loginAsCustomer({ email: data.email });
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', background: 'var(--color-bg)' }}>
      {/* Left - Form */}
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem, 5vw, 4rem)', maxWidth: 480, margin: '0 auto', width: '100%' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem', textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, var(--color-primary), var(--color-navy))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>AutoCare <span style={{ color: 'var(--color-primary)' }}>Pro</span></span>
        </Link>

        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text)' }}>Welcome back</h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', fontSize: 'var(--font-size-sm)' }}>
          Sign in to manage your bookings and vehicles.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Login form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="login-email" className="form-label form-label-required">Email Address</label>
            <div className="input-icon-wrap">
              <Phone size={16} className="input-icon" />
              <input id="login-email" type="email" className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="kwame@gmail.com" aria-required="true"
                {...register('email', { required: 'Email is required' })} />
            </div>
            {errors.email && <span className="form-error" role="alert">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="login-password" className="form-label form-label-required">Password</label>
              <a href="#" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <div className="input-icon-wrap">
              <Lock size={16} className="input-icon" />
              <input id="login-password" type={showPassword ? 'text' : 'password'} className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="••••••••" aria-required="true" style={{ paddingRight: '2.5rem' }}
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-subtle)', cursor: 'pointer' }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="form-error" role="alert">{errors.password.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : <><span>Sign In</span> <ArrowRight size={16} /></>}
          </button>
        </form>

        <div style={{ position: 'relative', margin: '1.5rem 0', textAlign: 'center' }}>
          <div className="divider" />
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--color-bg)', padding: '0 0.75rem', fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>or</span>
        </div>

        <p style={{ textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}>Create one free</Link>
        </p>

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--color-primary-10)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-primary-20)' }}>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', fontWeight: 500, marginBottom: '0.375rem' }}>Demo Access</p>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>Use any email/password to log in as a demo customer. For technician portal: <Link to="/technician/login" style={{ color: 'var(--color-primary)' }}>Technician Login</Link></p>
        </div>
      </motion.div>

      {/* Right - Brand */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        style={{ background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-primary) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', color: 'white', position: 'relative', overflow: 'hidden' }}
        className="login-brand-panel"
      >
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 380 }}>
          
             <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', textDecoration: 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, var(--color-primary), var(--color-navy))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>
              </div>
              <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>AutoCare <span style={{ color: 'var(--color-primary)' }}>Pro</span></span>
            </Link>
          
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 600, marginBottom: '1rem', lineHeight: 1.2 }}>
            Professional vehicle care, wherever you are.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: '2rem', fontSize: 'var(--font-size-sm)' }}>
            Join 1,200+ customers across Ghana who trust AutoCare Pro for reliable, on-demand vehicle maintenance.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['Verified & background-checked technicians', 'Real-time GPS tracking', 'Secure Paystack payments (MoMo & Card)', 'Digital service records'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.85)' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <style>{`
        @media (max-width: 768px) { .login-brand-panel { display: none !important; } }
      `}</style>
    </div>
  );
}
