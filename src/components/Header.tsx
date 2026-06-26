'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LoginModal from '@/components/auth/LoginModal';

const navLinks = [
  { href: '/saved', label: 'Saved', icon: 'fa-regular fa-heart' },
  { href: '/search', label: 'Search', icon: 'fa-solid fa-magnifying-glass' },
  { href: '/bookings', label: 'Bookings', icon: 'fa-regular fa-calendar' },
];

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const pathname = usePathname();

  // useEffect(() => {
  //   const storedTheme = localStorage.getItem('app-theme');
  //   if (storedTheme) {
  //     setTheme(storedTheme);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('app-theme', theme);
  // }, []);

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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 ${pathname === link.href ? 'font-bold' : 'font-normal'}`}
            >
              <i className={link.icon}></i> {link.label}
            </Link>
          ))}
          <button
            onClick={() => setIsPopupOpen(true)}
            className="login-cta flex flex-col items-center justify-center"
          >
            <i className="fa-regular fa-user"></i> Login
          </button>
        </nav>
        <LoginModal
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      </div>
    </header>
  );
}
