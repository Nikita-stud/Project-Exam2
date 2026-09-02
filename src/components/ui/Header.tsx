'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import AuthModal from '@/components/auth/AuthModal';
import AuthStore from '@/store/authStore';

const navLinks = [
  { href: '/profile/saved', label: 'Saved', icon: 'fa-regular fa-heart' },
  { href: '/', label: 'Search', icon: 'fa-solid fa-magnifying-glass' },
  {
    href: '/profile/bookings',
    label: 'Bookings',
    icon: 'fa-regular fa-calendar',
  },
];

const managerNavLinks = [
  {
    href: '/profile/venues/create',
    label: 'Create',
    icon: 'fa-solid fa-plus',
  },
  { href: '/profile/venues', label: 'Venues', icon: '' },
  {
    href: '/profile/venues/bookings',
    label: 'Bookings',
    icon: 'fa-regular fa-calendar',
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const user = AuthStore((store) => store.user);

  const token = AuthStore((store) => store.token);
  const avatarUrl =
    AuthStore((store) => store.user?.avatar?.url) ?? '/no-photo.svg';
  const avatarAlt =
    AuthStore((store) => store.user?.avatar?.alt) ?? 'Profile image';

  const pathname = usePathname();

  return (
    <header>
      <div className="flex justify-between">
        <Link href="/" className="logo-header">
          <Image
            className="h-[50px] w-auto"
            src="/text-logo.png"
            alt="Logo"
            width={160}
            height={40}
          />
        </Link>
        <nav>
          {(user?.venueManager ? managerNavLinks : navLinks).map((link) => {
            const linkContent = (
              <>
                {link.label === 'Venues' ? (
                  <Image src="/auth-logo.png" alt="" width={18} height={18} />
                ) : (
                  <i className={link.icon} aria-hidden="true"></i>
                )}{' '}
                <span>{link.label}</span>
              </>
            );

            if (
              !token &&
              (link.label === 'Saved' ||
                link.label === 'Bookings' ||
                link.label === 'Search')
            ) {
              return (
                <button key={link.href} onClick={() => setIsOpen(true)}>
                  {linkContent}
                </button>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? 'font-bold' : 'font-normal'}
              >
                {linkContent}
              </Link>
            );
          })}
          {token ? (
            <Link
              href="/profile"
              className={`flex items-center justify-center gap-1 w-auto h-auto md:w-[179px] md:h-[48px] md:flex-row-reverse md:gap-2 md:px-3 text-black md:border md:rounded-[10px] ${pathname === '/profile' ? 'font-bold' : 'font-normal'}`}
            >
              <Image
                className="h-[20px] w-[20px] rounded-full"
                src={avatarUrl}
                alt={avatarAlt}
                width={20}
                height={20}
              />{' '}
              {user?.name?.slice(0, 6)}
            </Link>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="login-cta justify-center"
            >
              <i className="fa-regular fa-user" aria-hidden="true"></i> Login
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
