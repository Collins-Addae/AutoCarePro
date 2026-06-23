import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import PublicLayout from './components/layout/PublicLayout';
import SplashScreen from './components/ui/SplashScreen';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Public Pages
import Home from './pages/public/Home';
import Services from './pages/public/Services';
import HowItWorks from './pages/public/HowItWorks';
import Pricing from './pages/public/Pricing';
import About from './pages/public/About';
import Contact from './pages/public/Contact';

// Customer Pages
import Register from './pages/customer/Register';
import Login from './pages/customer/Login';
import Dashboard from './pages/customer/Dashboard';
import BookService from './pages/customer/BookService';
import BookingConfirmed from './pages/customer/BookingConfirmed';
import LiveTracking from './pages/customer/LiveTracking';
import ServiceInProgress from './pages/customer/ServiceInProgress';
import BookingHistory from './pages/customer/BookingHistory';
import Profile from './pages/customer/Profile';

// Technician Pages
import TechLogin from './pages/technician/TechLogin';
import JobQueue from './pages/technician/JobQueue';
import JobExecution from './pages/technician/JobExecution';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Route Guard Component
function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        height: '100vh', background: 'var(--color-bg)'
      }}>
        <div style={{
          border: '3px solid var(--color-border)',
          borderTop: '3px solid var(--color-primary)',
          borderRadius: '50%',
          width: 24,
          height: 24,
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    // If it's a technician path, redirect to technician login
    if (window.location.pathname.startsWith('/technician')) {
      return <Navigate to="/technician/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'technician') {
      return <Navigate to="/technician/jobs" replace />;
    }
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <AuthProvider>
      <BookingProvider>
        <AnimatePresence mode="wait">
          {showSplash && (
            <SplashScreen onComplete={handleSplashComplete} />
          )}
        </AnimatePresence>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Pages wrapped with Navbar and Footer */}
            <Route path="/" element={<PublicLayout />}>
              {/* Public Routes */}
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="how-it-works" element={<HowItWorks />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* Protected Customer Routes */}
              <Route path="dashboard" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="book" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <BookService />
                </ProtectedRoute>
              } />
              <Route path="booking-confirmed/:id" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <BookingConfirmed />
                </ProtectedRoute>
              } />
              <Route path="tracking/:id" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <LiveTracking />
                </ProtectedRoute>
              } />
              <Route path="service-in-progress/:id" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <ServiceInProgress />
                </ProtectedRoute>
              } />
              <Route path="history" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <BookingHistory />
                </ProtectedRoute>
              } />
              <Route path="profile" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Profile />
                </ProtectedRoute>
              } />
            </Route>

            {/* Technician Routes (No Global Navbar/Footer) */}
            <Route path="/technician/login" element={<TechLogin />} />
            <Route path="/technician/jobs" element={
              <ProtectedRoute allowedRoles={['technician']}>
                <JobQueue />
              </ProtectedRoute>
            } />
            <Route path="/technician/job/:id" element={
              <ProtectedRoute allowedRoles={['technician']}>
                <JobExecution />
              </ProtectedRoute>
            } />

            {/* Admin Routes (No Global Navbar/Footer) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </BookingProvider>
      
      {/* Dynamic inline spinning loader keyframe definition */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </AuthProvider>
  );
}
