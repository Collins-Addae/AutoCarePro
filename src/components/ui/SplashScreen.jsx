import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 300); // Small delay after progress bar completes to allow exit animation to begin
          return 100;
        }
        // Random progress increment
        const increment = Math.floor(Math.random() * 12) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.03,
        transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] } 
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(circle at center, #1E3A5F 0%, #0F172A 100%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: 'white',
      }}
    >
      {/* Background Glow Ring Animations */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <motion.div
          animate={{
            scale: [1, 1.4, 1.8],
            opacity: [0.15, 0.05, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            border: '2px solid rgba(26, 86, 219, 0.3)',
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1.6],
            opacity: [0.2, 0.08, 0],
          }}
          transition={{
            duration: 3,
            delay: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            border: '2px solid rgba(96, 165, 250, 0.2)',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        {/* Animated Branded Logo Icon */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            delay: 0.2
          }}
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'linear-gradient(135deg, var(--color-primary), #1E40AF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 36px rgba(26, 86, 219, 0.4)',
            marginBottom: '1.5rem',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
            <circle cx="6.5" cy="16.5" r="2.5"/>
            <circle cx="16.5" cy="16.5" r="2.5"/>
          </svg>
        </motion.div>

        {/* Branded Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            margin: 0,
            color: 'white',
          }}
        >
          AutoCare <span style={{ color: '#60A5FA' }}>Pro</span>
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'rgba(255, 255, 255, 0.6)',
            marginTop: '0.5rem',
            marginBottom: '2.5rem',
            letterSpacing: '0.04em',
            fontWeight: 500
          }}
        >
          Professional vehicle care, wherever you are.
        </motion.p>

        {/* Loading Progress Indicator Wrapper */}
        <div style={{ width: '220px', position: 'relative' }}>
          {/* Progress track */}
          <div style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            marginBottom: '0.75rem'
          }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #60A5FA, var(--color-primary))',
                width: `${progress}%`,
                borderRadius: 'var(--radius-full)'
              }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>
          {/* Progress Percent Label */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: '10px',
              fontFamily: 'monospace',
              color: 'rgba(255, 255, 255, 0.45)',
              display: 'block'
            }}
          >
            {progress}%
          </motion.span>
        </div>

      </div>

      {/* Flag footer indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.05em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem'
        }}
      >
        🇬🇭 Proudly Serving Ghana
      </motion.div>
    </motion.div>
  );
}
