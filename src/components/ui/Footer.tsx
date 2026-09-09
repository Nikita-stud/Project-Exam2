'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthStore from '@/store/authStore';

const serviceLinks = [
  { href: '/profile/saved', label: 'Saved' },
  { href: '/profile', label: 'Profile' },
  { href: '/profile/bookings', label: 'Bookings' },
];

const managerServiceLinks = [
  { href: '/profile/venues/create', label: 'Create' },
  { href: '/profile', label: 'Profile' },
  { href: '/profile/venues/bookings', label: 'Bookings' },
];

const discoverLinks = [{ href: '/', label: 'Search' }];
const managerDiscoverLinks = [{ href: '/profile/venues', label: 'Venues' }];

export default function Footer() {
  const pathname = usePathname();
  const user = AuthStore((store) => store.user);

  return (
    <footer className="relative">
      <div className="flex justify-between">
        <Link href="/" className="focus:outline-none">
          <Image
            className="h-[50px] w-auto"
            src="/text-logo.png"
            alt="Logo"
            width={160}
            height={40}
          />
        </Link>
        <nav className="flex gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <p className="font-bold underline">Service</p>
            <ul className="flex flex-col gap-[20px]">
              {(user?.venueManager ? managerServiceLinks : serviceLinks).map(
                (link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={
                        pathname === link.href ? 'font-bold' : 'font-normal'
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="flex flex-col gap-[20px]">
            <p className="font-bold underline">Discover</p>
            <ul className="flex flex-col gap-[20px]">
              {(user?.venueManager ? managerDiscoverLinks : discoverLinks).map(
                (link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={
                        pathname === link.href ? 'font-bold' : 'font-normal'
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </nav>
      </div>
      <p className="absolute bottom-[50px]">
        <i className="fa-regular fa-copyright mr-[5px]" aria-hidden="true"></i>
        {new Date().getFullYear()} Holidaze. All rights reserved.
      </p>
    </footer>
  );
}
