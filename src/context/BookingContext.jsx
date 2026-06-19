import { createContext, useContext, useState } from 'react';
import { MOCK_BOOKINGS } from '../data/mockData';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [currentBooking, setCurrentBooking] = useState(null);

  // 4-step wizard state
  const [bookingDraft, setBookingDraft] = useState({
    step: 1,
    service: null,
    location: '',
    vehicle: null,
    date: '',
    time: '',
    notes: '',
    paymentMethod: 'momo_mtn',
  });

  const updateDraft = (updates) => {
    setBookingDraft(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setBookingDraft(prev => ({ ...prev, step: Math.min(prev.step + 1, 4) }));
  };

  const prevStep = () => {
    setBookingDraft(prev => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
  };

  const confirmBooking = () => {
    const newBooking = {
      id: `ACP-2024-${String(bookings.length + 1).padStart(3, '0')}`,
      service: bookingDraft.service?.name || '',
      serviceId: bookingDraft.service?.id || '',
      status: 'upcoming',
      date: bookingDraft.date,
      time: bookingDraft.time,
      amount: bookingDraft.service?.priceFrom || 0,
      address: bookingDraft.location,
      vehicle: bookingDraft.vehicle,
      technician: {
        name: 'Efua Mensah',
        rating: 5.0,
        phone: '+233 55 987 6543',
        eta: '18 min',
      },
      rating: null,
      review: null,
    };
    setBookings(prev => [newBooking, ...prev]);
    setCurrentBooking(newBooking);
    // Reset draft
    setBookingDraft({ step: 1, service: null, location: '', vehicle: null, date: '', time: '', notes: '', paymentMethod: 'momo_mtn' });
    return newBooking;
  };

  const cancelBooking = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  };

  const rateBooking = (id, rating, review) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, rating, review } : b));
  };

  const getBooking = (id) => bookings.find(b => b.id === id);

  return (
    <BookingContext.Provider value={{
      bookings, currentBooking, bookingDraft,
      updateDraft, nextStep, prevStep, confirmBooking, cancelBooking, rateBooking, getBooking,
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
};
