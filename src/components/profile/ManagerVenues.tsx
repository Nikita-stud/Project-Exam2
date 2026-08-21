import { useEffect, useState } from 'react';
import { fetchManagerVenues } from '@/api/bookings/fetchManagerVenues';
import type { Venue } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import AuthStore from '@/store/authStore';

export default function ManagerVenues({ name }: { name: string }) {
  const [venues, setVenues] = useState<Venue[]>([]);

  const logout = AuthStore((store) => store.clearAuth);

  useEffect(() => {
    let active = true;
    fetchManagerVenues(name).then((data) => {
      if (active) setVenues(data);
    });
    return () => {
      active = false;
    };
  }, [name]);

  const navLinks = [
    {
      href: 'profile/edit',
      label: 'Edit Profile',
      icon: 'fa-regular fa-pen-to-square',
    },
    {
      href: 'profile/venues',
      label: 'My Venues',
      icon: '',
    },
    {
      href: '/',
      label: 'Logout',
      icon: 'fa-solid fa-arrow-right-from-bracket',
    },
  ];

  return (
    <>
      <h3>My Venues</h3>
      <div className="mt-[10px]">
        {venues.length === 0 ? (
          <div className="border p-[50px] flex justify-center rounded-[10px] bg-[#fff]">
            <p>You have no venues yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2  gap-[20px]">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="border rounded-[10px] overflow-hidden"
              >
                <Link
                  href={`/venue/${venue.id}`}
                  className="relative w-full block h-[82px]"
                >
                  <Image
                    src={venue.media[0]?.url ?? '/no-photo.svg'}
                    alt={venue.media[0]?.alt ?? 'Image not found'}
                    fill
                    className="object-cover"
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between gap-[30px] mt-[30px] mb-[10px]">
        {navLinks.map((link) =>
          link.label !== 'Logout' ? (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center"
            >
              <span className="flex justify-between w-full items-center">
                {link.label === 'My Venues' ? (
                  <Image src="/auth-logo.png" alt="" width={20} height={20} />
                ) : (
                  <i className={`${link.icon} text-[20px]`}></i>
                )}
                <span className="profile-links">{link.label}</span>
                <i
                  className="fa-regular fa-circle-right text-2xl"
                  aria-hidden="true"
                ></i>
              </span>
            </Link>
          ) : (
            <button
              key={link.href}
              onClick={logout}
              className="flex flex-col items-center"
            >
              <span className="flex justify-between w-full items-center">
                <i className={`${link.icon} text-[20px] text-[#e03a2f]`}></i>
                <span className="profile-links ml-[-60px] text-[#e03a2f]">
                  {link.label}
                </span>
                <i className="opacity-0"></i>
              </span>
            </button>
          ),
        )}
      </div>
    </>
  );
}
