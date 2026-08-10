'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import AuthModal from '@/components/auth/AuthModal';
import AuthStore from '@/store/authStore';

const navLinks = [
  { href: '/saved', label: 'Saved', icon: 'fa-regular fa-heart' },
  { href: '/search', label: 'Search', icon: 'fa-solid fa-magnifying-glass' },
  { href: '/bookings', label: 'Bookings', icon: 'fa-regular fa-calendar' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const token = AuthStore((store) => store.token);
  const avatarUrl =
    AuthStore((store) => store.user?.avatar?.url) ?? '/no-photo.svg';
  const avatarAlt =
    AuthStore((store) => store.user?.avatar?.alt) ?? 'Profile image';

  const pathname = usePathname();

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
          {token ? (
            <Link
              href="/profile"
              className={`login-cta flex flex-col items-center justify-center ${pathname === '/profile' ? 'font-bold' : 'font-normal'}`}
            >
              <Image
                className="h-[20px] w-[20px] rounded-full"
                src={avatarUrl}
                alt={avatarAlt}
                width={20}
                height={20}
              />{' '}
              Profile
            </Link>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="login-cta flex flex-col items-center justify-center"
            >
              <i className="fa-regular fa-user"></i> Login
            </button>
          )}
        </nav>
        {isOpen && (
          <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </div>
    </header>
  );
}
