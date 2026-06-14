'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-between">
        <Link href="/">
          <img className="h-10" src="/text-logo.png" alt="Logo" />
        </Link>
        <nav className="flex gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-bold underline">Service</p>
            <Link href="/">Saved</Link>
            <Link href="/">Profile</Link>
            <Link href="/">Bookings</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold underline">Discover</p>
            <Link href="/">Search</Link>
          </div>
        </nav>
      </div>
      <p>
        <i className="fa-regular fa-copyright"></i> 2024 BookYourStay
      </p>
    </footer>
  );
}
