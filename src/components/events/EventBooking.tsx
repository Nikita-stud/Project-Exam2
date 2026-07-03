'use client';

import AuthStore from '@/store/authStore';
import { useState } from 'react';
import AuthModal from '../auth/AuthModal';

export default function EventBooking() {
  const [isOpen, setIsOpen] = useState(false);

  const token = AuthStore((store) => store.token);
  const venueManager = AuthStore((store) => store.user?.venueManager);

  const clearAuth = AuthStore((store) => store.clearAuth);

  return (
    <>
      {' '}
      {token ? (
        <button
          onClick={clearAuth}
          className="bg-primary flex flex-col items-center justify-center"
        >
          Book now
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="login-cta flex flex-col items-center justify-center"
        >
          <i className="fa-regular fa-user"></i> Login
        </button>
      )}
      {venueManager && (
        <p className="text-center text-sm text-gray-500">
          Venue managers cannot book events.
        </p>
      )}
      {isOpen && <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
}
