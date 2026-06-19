import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, User, Phone, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function PasswordStrength({ password }) {
  const strength = !password ? 0 : password.length < 6 ? 1 : password.length < 10 || !/[A-Z]/.test(password) ? 2 : !/[0-9!@#$%]/.test(password) ? 3 : 4;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', '#EF4444', '#F59E0B', '#3B82F6', '#15803D'];
  if (!password) return null;
  return (
    <div style={{ marginTop: '0.375rem' }}>
      <div style={{ display: 'flex', gap: '3px', marginBottom: '0.25rem' }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= strength ? colors[strength] : 'var(--color-border)', transition: 'background 0.3s' }} />
        ))}
      </div>
      <span style={{ fontSize: 'var(--font-size-xs)', color: colors[strength], fontWeight: 500 }}>{labels[strength]}</span>
    </div>
  );
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const password = watch('password', '');

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 1000));
    authRegister({ name: data.name, email: data.email, phone: data.phone });
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', background: 'var(--color-bg)' }}>
      {/* Left - Form */}
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem, 5vw, 4rem)', maxWidth: 480, margin: '0 auto', width: '100%' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, var(--color-primary), var(--color-navy))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>AutoCare <span style={{ color: 'var(--color-primary)' }}>Pro</span></span>
        </Link>

        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 600, marginBottom: '0.5rem' }}>Create your account</h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', fontSize: 'var(--font-size-sm)' }}>
          Join AutoCare Pro and get your first booking 10% off.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Registration form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="reg-name" className="form-label form-label-required">Full Name</label>
            <div className="input-icon-wrap">
              <User size={16} className="input-icon" />
              <input id="reg-name" type="text" className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Kwame Darko" aria-required="true"
                {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })} />
            </div>
            {errors.name && <span className="form-error" role="alert">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="reg-phone" className="form-label form-label-required">Phone Number (Ghana)</label>
            <div className="input-icon-wrap">
              <Phone size={16} className="input-icon" />
              <input id="reg-phone" type="tel" className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="+233 24 000 0000" aria-required="true"
                {...register('phone', { required: 'Phone is required', pattern: { value: /^\+?[\d\s\-]{10,15}$/, message: 'Valid Ghana number required' } })} />
            </div>
            {errors.phone && <span className="form-error" role="alert">{errors.phone.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="reg-email" className="form-label form-label-required">Email Address</label>
            <div className="input-icon-wrap">
              <Mail size={16} className="input-icon" />
              <input id="reg-email" type="email" className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="kwame@gmail.com" aria-required="true"
                {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Valid email required' } })} />
            </div>
            {errors.email && <span className="form-error" role="alert">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="reg-password" className="form-label form-label-required">Password</label>
            <div className="input-icon-wrap">
              <Lock size={16} className="input-icon" />
              <input id="reg-password" type={showPassword ? 'text' : 'password'} className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Create a strong password" aria-required="true" style={{ paddingRight: '2.5rem' }}
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-subtle)', cursor: 'pointer' }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <PasswordStrength password={password} />
            {errors.password && <span className="form-error" role="alert">{errors.password.message}</span>}
          </div>

          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '0.625rem' }}>
            <input id="reg-terms" type="checkbox" aria-required="true" style={{ marginTop: 3, accentColor: 'var(--color-primary)' }}
              {...register('terms', { required: 'You must accept the terms' })} />
            <label htmlFor="reg-terms" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)', cursor: 'pointer', lineHeight: 1.5 }}>
              I agree to AutoCare Pro's <a href="/privacy" style={{ color: 'var(--color-primary)' }}>Privacy Policy</a> and <a href="/terms" style={{ color: 'var(--color-primary)' }}>Terms of Service</a>
            </label>
          </div>
          {errors.terms && <span className="form-error" role="alert">{errors.terms.message}</span>}

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : <><span>Create Account</span> <ArrowRight size={16} /></>}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginTop: '1.5rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}>Sign In</Link>
        </p>
      </motion.div>

      {/* Right - Brand */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        style={{ background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-primary) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', color: 'white', position: 'relative', overflow: 'hidden' }}
        className="login-brand-panel">
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 360 }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>✨</div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, marginBottom: '1rem' }}>
            Get 10% off your first booking
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: '2rem', fontSize: 'var(--font-size-sm)' }}>
            Create your free account today and use code <strong style={{ color: 'white' }}>FIRSTCAR</strong> at checkout for 10% off your first service.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
            <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: '0.75rem', fontWeight: 500 }}>With an account you get:</p>
            {['Live technician tracking', 'Digital booking history', 'Saved vehicle profiles', 'Loyalty reward points', 'Priority booking access'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.85)', marginBottom: '0.4rem' }}>
                <span style={{ color: '#22C55E' }}>✓</span> {item}
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
