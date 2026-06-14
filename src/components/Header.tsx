'use client';

import Link from 'next/link';
import { useState } from 'react';
import AuthModal from '@/components/auth/AuthModal';

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <header>
      <div className="flex justify-between">
        <Link href="/" className="hidden md:inline">
          <img className="h-10" src="/text-logo.png" alt="Logo" />
        </Link>
        <nav>
          <Link href="/">
            <i className="fa-regular fa-heart"></i> Saved
          </Link>
          <Link href="/">
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </Link>
          <Link href="/">
            <i className="fa-regular fa-calendar"></i> Bookings
          </Link>
          <button onClick={() => setIsPopupOpen(true)}>
            <i className="fa-regular fa-user"></i> Login
          </button>
        </nav>
        <AuthModal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      </div>
    </header>
  );
}
