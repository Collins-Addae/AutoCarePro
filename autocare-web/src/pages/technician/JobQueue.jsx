import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Car, DollarSign, Power, CheckCircle, ChevronRight, Briefcase, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, MOCK_BOOKINGS } from '../../data/mockData';

// Generate simulated job queue specific to technician
const MOCK_JOBS = [
  {
    id: 'ACP-2024-003',
    service: 'Oil Change',
    status: 'assigned', // assigned to tech
    date: 'Today',
    time: '09:00 AM',
    earnings: 140, // 210 * 0.66 payout
    customer: { name: 'Kofi Mensah', phone: '+233 24 987 6543' },
    address: 'Independence Avenue, Accra',
    vehicle: { make: 'Toyota', model: 'Corolla', year: '2020', plate: 'GR-1234-21', color: 'Silver' },
  },
  {
    id: 'ACP-2024-010',
    service: 'Premium Car Wash',
    status: 'pending', // available in queue
    date: 'Today',
    time: '11:30 AM',
    earnings: 90, // 150 * 0.60
    customer: { name: 'Sarah Owusu', phone: '+233 20 555 1234' },
    address: '12 Ring Road Central, Osu, Accra',
    vehicle: { make: 'Mercedes-Benz', model: 'C-Class', year: '2018', plate: 'GR-7788-18', color: 'Black' },
  },
  {
    id: 'ACP-2024-011',
    service: 'Full Vehicle Detail',
    status: 'pending',
    date: 'Today',
    time: '02:00 PM',
    earnings: 240, // 400 * 0.60
    customer: { name: 'Dr. Emmanuel Asante', phone: '+233 54 123 4567' },
    address: 'Airport Residential Area, Accra',
    vehicle: { make: 'Land Rover', model: 'Range Rover', year: '2021', plate: 'GR-8899-21', color: 'White' },
  },
];

export default function JobQueue() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [notification, setNotification] = useState('');

  const acceptJob = (id) => {
    setJobs(prev => prev.map(job => job.id === id ? { ...job, status: 'assigned' } : job));
    setNotification('Job accepted successfully! Navigate to execution to start.');
    setTimeout(() => setNotification(''), 4000);
  };

  const declineJob = (id) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    setNotification('Job declined and returned to dispatcher.');
    setTimeout(() => setNotification(''), 4000);
  };

  const startJob = (id) => {
    navigate(`/technician/job/${id}`);
  };

  return (
    <div style={{
      background: 'radial-gradient(ellipse at top, #1E293B 0%, #0F172A 100%)',
      minHeight: '100vh',
      color: 'white',
      paddingTop: '5.5rem', // below sticky header
      paddingBottom: '4rem'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Top Floating Banner Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              style={{
                position: 'fixed', top: '5rem', left: '50%', transform: 'translateX(-50%)',
                background: 'var(--color-success)', color: 'white', padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-full)', zIndex: 1000, boxShadow: 'var(--shadow-lg)',
                fontSize: 'var(--font-size-xs)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}
            >
              <CheckCircle size={14} />
              {notification}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technician header info bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 'var(--radius-xl)', padding: '1.25rem', marginBottom: '1.5rem',
          flexWrap: 'wrap', gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 600 }}>
              {user?.avatar || 'KA'}
            </div>
            <div>
              <p style={{ fontWeight: 600 }}>{user?.name || 'Partner'}</p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.6)' }}>ID: {user?.techId || 'TECH-2024-041'} · Lead Tech</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Online Toggle */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              style={{
                background: isOnline ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: isOnline ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                color: isOnline ? '#4ADE80' : '#F87171',
                padding: '0.375rem 0.875rem',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                transition: 'all 0.2s'
              }}
            >
              <Power size={12} />
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </button>
            
            <button onClick={logout} className="btn btn-ghost btn-sm" style={{ color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Today\'s Earnings', val: 'GHS 230', desc: 'Active & finished jobs', icon: <DollarSign size={20} style={{ color: '#4ADE80' }} /> },
            { label: 'Jobs Completed', val: '3 / 4', desc: 'Good standing rate', icon: <Briefcase size={20} style={{ color: 'var(--color-primary)' }} /> },
            { label: 'Partner Rating', val: '4.9 ★', desc: 'Top 5% in Accra', icon: <Award size={20} style={{ color: '#F59E0B' }} /> },
          ].map((stat, idx) => (
            <div key={idx} style={{
              background: 'rgba(30, 41, 59, 0.3)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 'var(--radius-xl)', padding: '1.25rem', display: 'flex', gap: '1rem'
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{stat.label}</p>
                <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginTop: '0.125rem' }}>{stat.val}</h3>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '0.125rem' }}>{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Assigned Jobs List */}
        <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)' }} />
          Assigned Tasks
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {jobs.filter(j => j.status === 'assigned').length === 0 ? (
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-xl)', padding: '2.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)'
            }}>
              <Briefcase size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
              <p style={{ fontSize: 'var(--font-size-sm)' }}>No active assigned jobs. Scan the open queue below.</p>
            </div>
          ) : (
            jobs.filter(j => j.status === 'assigned').map(job => (
              <div key={job.id} style={{
                background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-xl)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <span style={{ background: 'var(--color-primary)', color: 'white', fontSize: '9px', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', letterSpacing: '0.04em' }}>
                      ASSIGNED
                    </span>
                    <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginTop: '0.5rem' }}>{job.service}</h3>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.6)' }}>Reference: {job.id}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.5)' }}>Payout</p>
                    <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, color: '#4ADE80' }}>GHS {job.earnings}</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: 'var(--font-size-xs)', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: 'var(--radius-lg)' }}>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Customer Details</p>
                    <p style={{ fontWeight: 600, marginTop: '0.125rem' }}>{job.customer.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>{job.customer.phone}</p>
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Vehicle Details</p>
                    <p style={{ fontWeight: 600, marginTop: '0.125rem' }}>{job.vehicle.year} {job.vehicle.make} {job.vehicle.model}</p>
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>{job.vehicle.plate} · {job.vehicle.color}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.6)', fontSize: 'var(--font-size-xs)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={12} /> {job.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={12} /> {job.address.split(',')[0]}</span>
                  </div>
                  <button onClick={() => startJob(job.id)} className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    Start Checklist <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Dispatch Queue (Incoming Requests) */}
        <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
          Available Dispatch Queue
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {jobs.filter(j => j.status === 'pending').length === 0 ? (
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-xl)', padding: '2.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)'
            }}>
              <Power size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
              <p style={{ fontSize: 'var(--font-size-sm)' }}>No new jobs in your area right now. Staying alert.</p>
            </div>
          ) : (
            jobs.filter(j => j.status === 'pending').map(job => (
              <div key={job.id} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 'var(--radius-xl)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>{job.service}</h3>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.5)' }}>Ref: {job.id} · Scheduled {job.time}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.5)' }}>Est. Payout</p>
                    <p style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, color: '#4ADE80' }}>GHS {job.earnings}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.6)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={12} /> {job.address}</span>
                  <span>·</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Car size={12} /> {job.vehicle.color} {job.vehicle.make}</span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', width: '100%', marginTop: '0.25rem' }}>
                  <button onClick={() => declineJob(job.id)} className="btn btn-ghost btn-sm" style={{ flex: 1, color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)', justifyContent: 'center' }}>
                    Decline
                  </button>
                  <button onClick={() => acceptJob(job.id)} className="btn btn-primary btn-sm" style={{ flex: 2, justifyContent: 'center' }}>
                    Accept Request
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
