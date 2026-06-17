'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import AuthModal from '@/components/auth/AuthModal';

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <header>
      <div className="flex justify-between">
        <Link href="/" className="hidden logo-header">
          <Image
            className="h-10 w-auto"
            src="/text-logo.png"
            alt="Logo"
            width={160}
            height={40}
          />
        </Link>
        <nav>
          <Link href="/" className="flex flex-col items-center">
            <i className="fa-regular fa-heart"></i> Saved
          </Link>
          <Link href="/" className="flex flex-col items-center gap-1">
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </Link>
          <Link href="/" className="flex flex-col items-center gap-1">
            <i className="fa-regular fa-calendar"></i> Bookings
          </Link>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="login-cta flex flex-col items-center justify-center"
          >
            <i className="fa-regular fa-user"></i> Login
          </button>
        </nav>
        <AuthModal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      </div>
    </header>
  );
}
