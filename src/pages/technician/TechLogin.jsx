import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ShieldAlert, Lock, UserCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function TechLogin() {
  const { loginAsTechnician } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      techId: 'TECH-2024-041',
      password: '••••••••',
    }
  });

  const onSubmit = (data) => {
    setLoading(true);
    setError('');
    
    // Simulate tech login validation
    setTimeout(() => {
      if (data.techId.trim() === '') {
        setError('Please enter a valid Technician ID.');
        setLoading(false);
        return;
      }
      
      try {
        loginAsTechnician();
        navigate('/technician/jobs');
      } catch (err) {
        setError('Authentication failed. Check connection.');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div style={{
      background: 'radial-gradient(ellipse at center, var(--color-navy) 0%, #0F172A 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      color: 'white',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(30, 58, 95, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-2xl)',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Brand/Branding */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '12px',
            background: 'var(--color-primary)', display: 'flex',
            alignItems: 'center', justify: 'center', margin: '0 auto 1rem',
            boxShadow: '0 4px 12px rgba(26, 86, 219, 0.4)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: 'auto' }}>
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, color: 'white', letterSpacing: '-0.02em' }}>Partner Portal</h1>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>AutoCare Pro Technician Sign-In</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '0.75rem',
            marginBottom: '1.25rem',
            fontSize: 'var(--font-size-xs)',
            color: '#FCA5A5',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="techId" style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '0.375rem' }}>
              Employee ID
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', display: 'flex' }}><UserCheck size={16} /></span>
              <input
                id="techId"
                type="text"
                placeholder="TECH-YYYY-XXX"
                style={{
                  width: '100%', padding: '0.625rem 0.75rem 0.625rem 2.25rem',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: errors.techId ? '1.5px solid var(--color-danger)' : '1.5px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--radius-lg)', outline: 'none', color: 'white', fontSize: 'var(--font-size-sm)',
                  transition: 'border var(--transition-fast)'
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={e => e.currentTarget.style.borderColor = errors.techId ? 'var(--color-danger)' : 'rgba(255, 255, 255, 0.15)'}
                {...register('techId', { required: 'Technician ID is required' })}
              />
            </div>
            {errors.techId && <span style={{ color: '#FCA5A5', fontSize: '10px', marginTop: '0.25rem', display: 'block' }}>{errors.techId.message}</span>}
          </div>

          <div>
            <label htmlFor="password" style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '0.375rem' }}>
              Security PIN / Password
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', display: 'flex' }}><Lock size={16} /></span>
              <input
                id="password"
                type="password"
                placeholder="Password"
                style={{
                  width: '100%', padding: '0.625rem 0.75rem 0.625rem 2.25rem',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: errors.password ? '1.5px solid var(--color-danger)' : '1.5px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--radius-lg)', outline: 'none', color: 'white', fontSize: 'var(--font-size-sm)',
                  transition: 'border var(--transition-fast)'
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={e => e.currentTarget.style.borderColor = errors.password ? 'var(--color-danger)' : 'rgba(255, 255, 255, 0.15)'}
                {...register('password', { required: 'Password is required' })}
              />
            </div>
            {errors.password && <span style={{ color: '#FCA5A5', fontSize: '10px', marginTop: '0.25rem', display: 'block' }}>{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%', justifyContent: 'center', height: '42px', marginTop: '0.5rem',
              boxShadow: '0 4px 12px rgba(26, 86, 219, 0.3)'
            }}
          >
            {loading ? 'Authenticating...' : (
              <>Sign In to Partner Portal <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem' }}>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.45)' }}>
            Lost access or need a partner account?
          </p>
          <a href="mailto:partners@autocarepro.gh" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500, marginTop: '0.25rem', display: 'inline-block' }}>
            Contact Operations Support
          </a>
        </div>
      </motion.div>
    </div>
  );
}
