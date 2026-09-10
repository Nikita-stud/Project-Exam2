'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AuthModal from '@/components/auth/AuthModal';
import AuthStore from '@/store/authStore';
import { BLUR_DATA_URL } from '@/components/helpers/BlurDataUrl';

const navLinks = [
  { href: '/', label: 'Search', icon: 'fa-solid fa-magnifying-glass' },
  { href: '/profile/saved', label: 'Saved', icon: 'fa-regular fa-heart' },
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = AuthStore((store) => store.user);
  const token = AuthStore((store) => store.token);
  const avatarUrl =
    AuthStore((store) => store.user?.avatar?.url) ?? '/no-photo.svg';
  const avatarAlt =
    AuthStore((store) => store.user?.avatar?.alt) ?? 'Profile image';

  const pathname = usePathname();

  let links = navLinks;
  if (user?.venueManager) {
    links = managerNavLinks;
  } else if (!token) {
    links = navLinks.filter((link) => link.label === 'Search');
  }

  return (
    <header>
      <div className="flex justify-between">
        <Link href="/" className="logo-header focus:outline-none">
          <Image
            className="h-[50px] w-auto"
            src="/text-logo.png"
            alt="Logo icon"
            width={160}
            height={40}
          />
        </Link>
        <nav aria-label="Main">
          <ul>
            {links.map((link) => {
              const linkContent = (
                <>
                  {link.label === 'Venues' ? (
                    <Image src="/auth-logo.png" alt="" width={18} height={18} />
                  ) : (
                    <i className={link.icon} aria-hidden="true"></i>
                  )}
                  <span>{link.label}</span>
                </>
              );

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      pathname === link.href ? 'font-bold' : 'font-normal'
                    }
                  >
                    {linkContent}
                  </Link>
                </li>
              );
            })}
            <li>
              {token ? (
                <Link
                  href="/profile"
                  className={`flex items-center bg-[#fff] justify-center gap-1 w-auto h-auto md:w-[179px] md:h-[48px] md:flex-row-reverse md:gap-2 md:px-3 text-black md:border md:rounded-[10px] transition-colors duration-500 hover:bg-text hover:text-white ${pathname === '/profile' ? 'font-bold' : 'font-normal'}`}
                >
                  <Image
                    className="h-[20px] w-[20px] rounded-full"
                    src={avatarUrl}
                    alt={avatarAlt}
                    width={20}
                    height={20}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                  {user?.name?.slice(0, 6)}
                </Link>
              ) : (
                <button
                  onClick={() => setIsOpen(true)}
                  className="cta-login font-bold justify-center"
                >
                  <i className="fa-regular fa-user" aria-hidden="true"></i>
                  Login
                </button>
              )}
            </li>
          </ul>
        </nav>
        {isOpen && (
          <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </div>
    </header>
  );
}
