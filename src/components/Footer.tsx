'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
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
            <Link href="/">Saved</Link>
            <Link href="/">Profile</Link>
            <Link href="/">Bookings</Link>
          </div>
          <div className="flex flex-col gap-[20px]">
            <p className="font-bold underline">Discover</p>
            <Link href="/">Search</Link>
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
