'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const serviceLinks = [
  { href: '/saved', label: 'Saved' },
  { href: '/profile', label: 'Profile' },
  { href: '/bookings', label: 'Bookings' },
];

const discoverLinks = [
  { href: '/search', label: 'Search' },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="relative">
      <div className="flex justify-between">
        <Link href="/">
          <Image
            className="h-10 w-auto"
            src="/text-logo.png"
            alt="Logo"
            width={160}
            height={40}
          />
        </Link>
        <nav className="flex gap-4">
          <div className="flex flex-col gap-[20px]">
            <p className="font-bold underline">Service</p>
            {serviceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? 'font-bold' : 'font-normal'}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-[20px]">
            <p className="font-bold underline">Discover</p>
            {discoverLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? 'font-bold' : 'font-normal'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <p className="absolute bottom-[50px]">
        <i className="fa-regular fa-copyright"></i> {new Date().getFullYear()}{' '}
        Holidaze. All rights reserved.
      </p>
    </footer>
  );
}
