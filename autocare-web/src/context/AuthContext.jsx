import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const MOCK_CUSTOMER = {
  id: 'user-001',
  name: 'Kwame Darko',
  email: 'kwame.darko@gmail.com',
  phone: '+233 24 567 8901',
  avatar: 'KD',
  avatarBg: '#1A56DB',
  role: 'customer',
  loyaltyPoints: 480,
  memberSince: '2024-01-15',
  address: '45 Boundary Road, East Legon, Accra',
};

const MOCK_TECHNICIAN = {
  id: 'tech-001',
  name: 'Kwame Asante',
  email: 'kwame.asante@autocarepro.gh',
  phone: '+233 24 111 2233',
  avatar: 'KA',
  avatarBg: '#1E3A5F',
  role: 'technician',
  techId: 'TECH-2024-041',
  rating: 4.9,
  totalJobs: 312,
  status: 'available',
};

const MOCK_ADMIN = {
  id: 'admin-001',
  name: 'Admin User',
  email: 'admin@autocarepro.gh',
  role: 'admin',
  avatar: 'AU',
  avatarBg: '#7C3AED',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('acp_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const loginAsCustomer = (credentials) => {
    const u = { ...MOCK_CUSTOMER, ...credentials };
    localStorage.setItem('acp_user', JSON.stringify(u));
    setUser(u);
    return u;
  };

  const loginAsTechnician = () => {
    localStorage.setItem('acp_user', JSON.stringify(MOCK_TECHNICIAN));
    setUser(MOCK_TECHNICIAN);
    return MOCK_TECHNICIAN;
  };

  const loginAsAdmin = () => {
    localStorage.setItem('acp_user', JSON.stringify(MOCK_ADMIN));
    setUser(MOCK_ADMIN);
    return MOCK_ADMIN;
  };

  const register = (data) => {
    const u = { ...MOCK_CUSTOMER, name: data.name, email: data.email, phone: data.phone };
    localStorage.setItem('acp_user', JSON.stringify(u));
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem('acp_user');
    setUser(null);
  };

  const updateProfile = (data) => {
    const updated = { ...user, ...data };
    localStorage.setItem('acp_user', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAsCustomer, loginAsTechnician, loginAsAdmin, register, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
