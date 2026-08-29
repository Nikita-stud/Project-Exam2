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
          className="bg-primary w-[166px] h-[43px] font-bold rounded-[10px] text-white flex items-center justify-center gap-[8px]"
        >
          Login
          <i
            className="fa-regular fa-circle-right text-xl"
            aria-hidden="true"
          ></i>
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
