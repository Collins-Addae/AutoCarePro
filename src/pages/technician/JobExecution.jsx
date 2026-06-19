import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Camera, Plus, Trash2, ArrowLeft, ShieldCheck, MapPin, User, Info, CheckSquare } from 'lucide-react';
import { SERVICE_CHECKLIST } from '../../data/mockData';

export default function JobExecution() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Checklist State
  const [tasks, setTasks] = useState(
    SERVICE_CHECKLIST.map(t => ({ ...t, done: false }))
  );
  
  // Photos State
  const [beforePhoto, setBeforePhoto] = useState(false);
  const [afterPhoto, setAfterPhoto] = useState(false);
  
  // Parts/Materials Logging State
  const [parts, setParts] = useState([]);
  const [partName, setPartName] = useState('');
  const [partQty, setPartQty] = useState(1);
  const [showAddPart, setShowAddPart] = useState(false);

  // Complete modal state
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  const addPart = (e) => {
    e.preventDefault();
    if (!partName) return;
    setParts(prev => [...prev, { id: Date.now(), name: partName, qty: partQty }]);
    setPartName('');
    setPartQty(1);
    setShowAddPart(false);
  };

  const removePart = (partId) => {
    setParts(prev => prev.filter(p => p.id !== partId));
  };

  const isChecklistFinished = tasks.every(t => t.done);
  const isPhotosAttached = beforePhoto && afterPhoto;
  const canComplete = isChecklistFinished && isPhotosAttached;

  const handleCompleteJob = () => {
    // Navigate back to queue with success state
    navigate('/technician/jobs');
  };

  return (
    <div style={{
      background: 'radial-gradient(ellipse at top, #1E293B 0%, #0F172A 100%)',
      minHeight: '100vh',
      color: 'white',
      paddingTop: '5.5rem',
      paddingBottom: '4rem'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Back navigation */}
        <Link to="/technician/jobs" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 'var(--font-size-sm)', marginBottom: '1.5rem' }}>
          <ArrowLeft size={16} /> Back to Job Queue
        </Link>

        {/* Job Details Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 'var(--radius-xl)', padding: '1.25rem', marginBottom: '1.5rem'
        }}>
          <span style={{ fontSize: '9px', background: 'var(--color-primary)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontWeight: 600, letterSpacing: '0.04em' }}>
            ACTIVE JOB
          </span>
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginTop: '0.5rem' }}>Premium Car Wash & Wax</h1>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.5)' }}>Job ID: {id || 'ACP-2024-003'}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
            <div>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontWeight: 600 }}>Customer Details</p>
              <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginTop: '0.25rem' }}>Kofi Mensah</p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.6)' }}>+233 24 987 6543</p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                <MapPin size={11} /> Independence Avenue, Accra
              </p>
            </div>
            <div>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontWeight: 600 }}>Vehicle Details</p>
              <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginTop: '0.25rem' }}>Toyota Corolla (2020)</p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.6)' }}>Plate: GR-1234-21</p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.6)' }}>Color: Silver</p>
            </div>
          </div>
        </div>

        {/* Content split grids */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
          {/* Left Column: Job Checklist */}
          <div>
            <div style={{
              background: 'rgba(30, 41, 59, 0.3)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 'var(--radius-xl)', padding: '1.25rem'
            }}>
              <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckSquare size={18} style={{ color: 'var(--color-primary)' }} />
                Service Checklist
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {tasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                      padding: '0.625rem', background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.04)', borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
                  >
                    <div style={{
                      width: 18, height: 18, borderRadius: 4,
                      background: task.done ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
                      border: task.done ? 'none' : '1px solid rgba(255,255,255,0.15)',
                      color: 'white', display: 'flex', alignItems: 'center', justify: 'center',
                      flexShrink: 0, marginTop: '0.125rem'
                    }}>
                      {task.done && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span style={{
                      fontSize: 'var(--font-size-xs)',
                      color: task.done ? 'rgba(255,255,255,0.4)' : 'white',
                      textDecoration: task.done ? 'line-through' : 'none',
                    }}>{task.task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Photos and logging */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Before / After Photos */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.3)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 'var(--radius-xl)', padding: '1.25rem'
            }}>
              <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Camera size={18} style={{ color: 'var(--color-primary)' }} />
                Photo Documentation
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Before Photo */}
                <button
                  onClick={() => setBeforePhoto(!beforePhoto)}
                  style={{
                    background: beforePhoto ? 'rgba(34, 197, 94, 0.05)' : 'rgba(255,255,255,0.02)',
                    border: beforePhoto ? '1.5px solid rgba(34, 197, 94, 0.4)' : '1.5px dashed rgba(255,255,255,0.15)',
                    borderRadius: 'var(--radius-lg)', padding: '1rem 0.5rem', cursor: 'pointer',
                    color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'
                  }}
                >
                  <Camera size={20} style={{ color: beforePhoto ? '#4ADE80' : 'rgba(255,255,255,0.4)' }} />
                  <span style={{ fontSize: '10px', fontWeight: 600 }}>BEFORE SERVICE</span>
                  <span style={{ fontSize: '9px', color: beforePhoto ? '#4ADE80' : 'rgba(255,255,255,0.4)' }}>
                    {beforePhoto ? '✓ Uploaded' : 'Upload photo'}
                  </span>
                </button>

                {/* After Photo */}
                <button
                  onClick={() => setAfterPhoto(!afterPhoto)}
                  style={{
                    background: afterPhoto ? 'rgba(34, 197, 94, 0.05)' : 'rgba(255,255,255,0.02)',
                    border: afterPhoto ? '1.5px solid rgba(34, 197, 94, 0.4)' : '1.5px dashed rgba(255,255,255,0.15)',
                    borderRadius: 'var(--radius-lg)', padding: '1rem 0.5rem', cursor: 'pointer',
                    color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'
                  }}
                >
                  <Camera size={20} style={{ color: afterPhoto ? '#4ADE80' : 'rgba(255,255,255,0.4)' }} />
                  <span style={{ fontSize: '10px', fontWeight: 600 }}>AFTER SERVICE</span>
                  <span style={{ fontSize: '9px', color: afterPhoto ? '#4ADE80' : 'rgba(255,255,255,0.4)' }}>
                    {afterPhoto ? '✓ Uploaded' : 'Upload photo'}
                  </span>
                </button>
              </div>
            </div>

            {/* Parts & Supplies Logging */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.3)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 'var(--radius-xl)', padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600 }}>Materials & Supplies</h2>
                <button onClick={() => setShowAddPart(!showAddPart)} style={{ border: 'none', background: 'none', color: 'var(--color-primary)', fontSize: 'var(--font-size-xs)', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' }}>
                  {showAddPart ? 'Cancel' : 'Log Supply'}
                </button>
              </div>

              {/* Log part inline form */}
              <AnimatePresence>
                {showAddPart && (
                  <motion.form
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onSubmit={addPart}
                    style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '0.75rem', overflow: 'hidden' }}
                  >
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        placeholder="Material name (e.g. Microfibre)"
                        value={partName}
                        onChange={e => setPartName(e.target.value)}
                        style={{
                          flex: 2, padding: '0.35rem 0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 'var(--radius-md)', color: 'white', fontSize: 'var(--font-size-xs)'
                        }}
                        required
                      />
                      <input
                        type="number"
                        min="1"
                        value={partQty}
                        onChange={e => setPartQty(parseInt(e.target.value))}
                        style={{
                          flex: 1, padding: '0.35rem 0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 'var(--radius-md)', color: 'white', fontSize: 'var(--font-size-xs)', textAlign: 'center'
                        }}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-xs" style={{ width: '100%', justifyContent: 'center' }}>
                      Add Material Record
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Logged parts list */}
              {parts.length === 0 ? (
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '0.5rem 0' }}>
                  No materials recorded. Log details if you use cleaning concentrates or replacement items.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  {parts.map(p => (
                    <div key={p.id} style={{ display: 'flex', justify: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 'var(--radius-md)' }}>
                      <span style={{ fontSize: 'var(--font-size-xs)' }}>{p.name} <strong style={{ color: 'rgba(255,255,255,0.5)' }}>x {p.qty}</strong></span>
                      <button onClick={() => removePart(p.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={12} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Warning Checklist Requirement banner */}
            {!canComplete && (
              <div style={{
                background: 'rgba(217, 119, 6, 0.1)', border: '1px solid rgba(217, 119, 6, 0.3)',
                borderRadius: 'var(--radius-lg)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem'
              }}>
                <Info size={16} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '0.125rem' }} />
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
                  <strong style={{ color: '#F59E0B' }}>Job incomplete:</strong> You must check off all tasks and upload both before and after images before finalising.
                </div>
              </div>
            )}

            {/* Complete Job Actions */}
            <button
              onClick={() => setShowConfirm(true)}
              disabled={!canComplete}
              className="btn btn-primary btn-lg"
              style={{
                width: '100%', justifyContent: 'center',
                opacity: canComplete ? 1 : 0.4,
                cursor: canComplete ? 'pointer' : 'not-allowed',
                boxShadow: canComplete ? '0 4px 14px rgba(26, 86, 219, 0.3)' : 'none'
              }}
            >
              <ShieldCheck size={16} /> Mark Service Completed
            </button>

          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-backdrop" onClick={() => setShowConfirm(false)}>
          <motion.div className="modal-box" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '0.5rem' }}>Verify Completion?</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--font-size-xs)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Are you sure you want to finalize this service? This will alert the customer, release their digital invoice, and log your earnings of GHS 140.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', color: 'white' }} onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', background: 'var(--color-success)' }} onClick={handleCompleteJob}>Yes, Finalize</button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
