import { fetchUserBookings } from '@/api/bookings/fetchUserBookings';
import { Booking } from '@/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuthStore from '@/store/authStore';

export default function UserBookings({ name }: { name: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const logout = AuthStore((store) => store.clearAuth);

  useEffect(() => {
    let active = true;
    fetchUserBookings(name).then((data) => {
      if (active) setBookings(data);
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
      href: 'profile/bookings',
      label: 'My Bookings',
      icon: 'fa-regular fa-calendar',
    },
    {
      href: '/',
      label: 'Logout',
      icon: 'fa-solid fa-arrow-right-from-bracket',
    },
  ];

  return (
    <>
      <h3>My Booking</h3>
      <div className="mt-[10px]">
        {bookings.length === 0 ? (
          <div className="border p-[50px] flex justify-center  rounded-[10px] bg-[#fff]">
            <p>You have no booking yet.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id}>{booking.venue.name}</div>
          ))
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
                <i className={`${link.icon} text-[20px]`}></i>
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
