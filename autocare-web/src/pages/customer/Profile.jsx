import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Car, Plus, Trash2, Award, CreditCard, Bell, LogOut, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_VEHICLES } from '../../data/mockData';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [vehicles, setVehicles] = useState(() => {
    const stored = localStorage.getItem('acp_vehicles');
    return stored ? JSON.parse(stored) : MOCK_VEHICLES;
  });

  // Edit Mode states
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');

  // Add Vehicle states
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [newMake, setNewMake] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newPlate, setNewPlate] = useState('');
  const [newColor, setNewColor] = useState('');

  // Preference states
  const [smsNotify, setSmsNotify] = useState(true);
  const [emailNotify, setEmailNotify] = useState(true);
  const [whatsappNotify, setWhatsappNotify] = useState(true);

  const saveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name, phone, email, address });
    setIsEditing(false);
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!newMake || !newModel || !newPlate) return;
    
    const newV = {
      id: `v${Date.now()}`,
      make: newMake,
      model: newModel,
      year: newYear || '2020',
      plate: newPlate,
      color: newColor || 'Grey',
      primary: vehicles.length === 0,
    };
    
    const updated = [...vehicles, newV];
    setVehicles(updated);
    localStorage.setItem('acp_vehicles', JSON.stringify(updated));

    // Reset fields
    setNewMake('');
    setNewModel('');
    setNewYear('');
    setNewPlate('');
    setNewColor('');
    setShowAddVehicle(false);
  };

  const deleteVehicle = (id) => {
    const updated = vehicles.filter(v => v.id !== id);
    // If we deleted the primary vehicle, set the first remaining as primary
    if (updated.length > 0 && !updated.some(v => v.primary)) {
      updated[0].primary = true;
    }
    setVehicles(updated);
    localStorage.setItem('acp_vehicles', JSON.stringify(updated));
  };

  const makePrimary = (id) => {
    const updated = vehicles.map(v => ({ ...v, primary: v.id === id }));
    setVehicles(updated);
    localStorage.setItem('acp_vehicles', JSON.stringify(updated));
  };

  return (
    <div className="page-content" style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600 }}>Profile & Vehicles</h1>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)' }}>Manage your personal details, vehicles, and app settings</p>
          </div>
          <button onClick={logout} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger-light)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        {/* Layout split grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
          {/* Left Column: Personal info & Loyalty */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Loyalty points card */}
            <div className="card" style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-navy))',
              color: 'white', position: 'relative', overflow: 'hidden'
            }}>
              {/* background decoration circle */}
              <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.06em' }}>Loyalty Member Program</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <Award size={28} style={{ color: '#F59E0B' }} />
                  <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 600, lineHeight: 1 }}>{user?.loyaltyPoints || 480}</h2>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500, marginTop: '0.125rem' }}>Available Points</p>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div style={{ marginTop: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', marginBottom: '0.375rem', color: 'rgba(255,255,255,0.8)' }}>
                    <span>Progress to next reward</span>
                    <span>480 / 500 pts</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--radius-full)' }}>
                    <div style={{ width: '96%', height: '100%', background: '#F59E0B', borderRadius: 'var(--radius-full)' }} />
                  </div>
                  <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem' }}>
                    Only 20 more points to unlock a free Premium Car Wash!
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Info Form */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600 }}>Personal Information</h3>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="btn btn-ghost btn-xs">
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={saveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500, color: 'var(--color-muted)', display: 'block', marginBottom: '0.375rem' }}>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500, color: 'var(--color-muted)', display: 'block', marginBottom: '0.375rem' }}>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500, color: 'var(--color-muted)', display: 'block', marginBottom: '0.375rem' }}>Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500, color: 'var(--color-muted)', display: 'block', marginBottom: '0.375rem' }}>Default Service Location</label>
                    <textarea
                      className="form-control"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      style={{ minHeight: '60px', resize: 'vertical' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button type="button" onClick={() => setIsEditing(false)} className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Save Changes</button>
                  </div>
                </form>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  {/* Avatar view */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: user?.avatarBg || 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 600 }}>
                      {user?.avatar || 'KD'}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 600, fontSize: 'var(--font-size-base)' }}>{user?.name}</h4>
                      <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>Registered Client since {user?.memberSince || 'Jan 2024'}</p>
                    </div>
                  </div>

                  {/* Profile data list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { label: 'Email Address', value: user?.email, icon: <Mail size={14} /> },
                      { label: 'Phone Number', value: user?.phone, icon: <Phone size={14} /> },
                      { label: 'Primary Location', value: user?.address, icon: <MapPin size={14} /> },
                    ].map((row, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <span style={{ color: 'var(--color-muted)', marginTop: '0.125rem' }}>{row.icon}</span>
                        <div>
                          <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{row.label}</p>
                          <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{row.value || 'Not configured'}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </div>

          </div>

          {/* Right Column: Vehicles, Payment Methods & Notifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Vehicles section */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Car size={18} style={{ color: 'var(--color-primary)' }} />
                  Saved Vehicles
                </h3>
                <button onClick={() => setShowAddVehicle(!showAddVehicle)} className="btn btn-primary btn-xs" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Plus size={12} /> Add Vehicle
                </button>
              </div>

              {/* Add Vehicle slide/reveal form */}
              <AnimatePresence>
                {showAddVehicle && (
                  <motion.form
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onSubmit={handleAddVehicle}
                    style={{ background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)', padding: '1rem', marginBottom: '1rem', border: '1px solid var(--color-border)', overflow: 'hidden' }}
                  >
                    <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: '0.75rem' }}>Add New Vehicle</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        placeholder="Make (e.g. Toyota)"
                        value={newMake}
                        onChange={e => setNewMake(e.target.value)}
                        className="form-control"
                        style={{ fontSize: 'var(--font-size-xs)' }}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Model (e.g. Corolla)"
                        value={newModel}
                        onChange={e => setNewModel(e.target.value)}
                        className="form-control"
                        style={{ fontSize: 'var(--font-size-xs)' }}
                        required
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <input
                        type="text"
                        placeholder="Year (e.g. 2020)"
                        value={newYear}
                        onChange={e => setNewYear(e.target.value)}
                        className="form-control"
                        style={{ fontSize: 'var(--font-size-xs)' }}
                      />
                      <input
                        type="text"
                        placeholder="Plate Number"
                        value={newPlate}
                        onChange={e => setNewPlate(e.target.value)}
                        className="form-control"
                        style={{ fontSize: 'var(--font-size-xs)' }}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Color"
                        value={newColor}
                        onChange={e => setNewColor(e.target.value)}
                        className="form-control"
                        style={{ fontSize: 'var(--font-size-xs)' }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="button" onClick={() => setShowAddVehicle(false)} className="btn btn-ghost btn-xs" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                      <button type="submit" className="btn btn-primary btn-xs" style={{ flex: 1, justifyContent: 'center' }}>Save Vehicle</button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Vehicles List */}
              {vehicles.length === 0 ? (
                <p style={{ color: 'var(--color-muted)', fontSize: 'var(--font-size-xs)', textAlign: 'center', padding: '1rem 0' }}>
                  No vehicles saved. Click Add Vehicle to save your car details.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {vehicles.map(v => (
                    <div key={v.id} style={{ display: 'flex', alignItems: 'center', justify: 'space-between', padding: '0.75rem', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Car size={16} style={{ color: 'var(--color-primary)' }} />
                        <div>
                          <p style={{ fontWeight: 600, fontSize: 'var(--font-size-xs)' }}>{v.year} {v.make} {v.model}</p>
                          <p style={{ fontSize: '0.65rem', color: 'var(--color-muted)' }}>{v.plate} · {v.color}</p>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        {v.primary ? (
                          <span style={{ background: 'var(--color-primary-10)', color: 'var(--color-primary)', fontSize: '0.6rem', padding: '0.15rem 0.4rem', borderRadius: 'var(--radius-full)', fontWeight: 500 }}>
                            Primary
                          </span>
                        ) : (
                          <button onClick={() => makePrimary(v.id)} style={{ border: 'none', background: 'none', color: 'var(--color-muted)', fontSize: '0.6rem', cursor: 'pointer', textDecoration: 'underline' }}>
                            Make Primary
                          </button>
                        )}
                        <button onClick={() => deleteVehicle(v.id)} aria-label="Delete vehicle" style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-danger)', padding: '0.25rem' }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Methods */}
            <div className="card">
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={18} style={{ color: 'var(--color-primary)' }} />
                Billing & Mobile Money
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* MoMo MTN option */}
                <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 32, height: 20, background: '#FCD34D', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.5rem', color: '#1E3A8A' }}>MTN MoMo</div>
                    <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500 }}>{user?.phone || '+233 24 567 8901'}</span>
                  </div>
                  <span style={{ background: 'var(--color-success-light)', color: 'var(--color-success)', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={10} strokeWidth={3} />
                  </span>
                </div>
                
                {/* Vodafone Cash mock option */}
                <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-border)', opacity: 0.6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 32, height: 20, background: '#EF4444', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.5rem', color: 'white' }}>Telecel</div>
                    <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500 }}>Add Mobile Wallet</span>
                  </div>
                  <button style={{ border: 'none', background: 'none', color: 'var(--color-primary)', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 500 }}>Add</button>
                </div>
              </div>
            </div>

            {/* Notification settings */}
            <div className="card">
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={18} style={{ color: 'var(--color-primary)' }} />
                Notification Settings
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'SMS Progress Updates', desc: 'Receive technician progress reports via SMS', value: smsNotify, toggle: setSmsNotify },
                  { label: 'Email Receipts & Invoices', desc: 'Digital receipt sent instantly after service completes', value: emailNotify, toggle: setEmailNotify },
                  { label: 'WhatsApp Live Tracking Links', desc: 'Get quick Leaflet map links via WhatsApp', value: whatsappNotify, toggle: setWhatsappNotify },
                ].map((pref, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', paddingBottom: '0.5rem', borderBottom: idx < 2 ? '1px solid var(--color-border)' : 'none' }}>
                    <div>
                      <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500 }}>{pref.label}</p>
                      <p style={{ fontSize: '0.65rem', color: 'var(--color-muted)', marginTop: '0.125rem' }}>{pref.desc}</p>
                    </div>
                    
                    {/* Simple toggle slider button */}
                    <button
                      onClick={() => pref.toggle(!pref.value)}
                      style={{
                        width: 36, height: 20, borderRadius: 'var(--radius-full)',
                        background: pref.value ? 'var(--color-primary)' : 'var(--color-border)',
                        border: 'none', cursor: 'pointer', padding: '2px', display: 'flex',
                        justifyContent: pref.value ? 'flex-end' : 'flex-start',
                        transition: 'all 0.2s', outline: 'none'
                      }}
                    >
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', boxShadow: 'var(--shadow-sm)' }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
