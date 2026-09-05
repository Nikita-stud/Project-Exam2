'use client';
import { useEffect, useState } from 'react';
import AuthStore from '@/store/authStore';
import { usePathname } from 'next/navigation';
import { fetchManagerVenues } from '@/api/venues/fetchManagerVenues';

export default function HeroSection() {
  const pathname = usePathname();
  const user = AuthStore((store) => store.user);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [venuesCount, setVenuesCount] = useState(0);

  let title = '';

  if (pathname === '/profile/venues') {
    title = 'My Venues';
  } else if (pathname === '/profile/venues/bookings') {
    title = 'My Bookings';
  } else if (pathname === '/profile/bookings') {
    title = 'My Bookings';
  } else if (pathname === '/profile/saved') {
    title = 'Saved Venues';
  }

  useEffect(() => {
    if (!user?.venueManager) {
      return;
    }

    const getBookingsCount = async () => {
      try {
        const venues = await fetchManagerVenues(user.name);

        let count = 0;
        for (const venue of venues) {
          count += venue._count?.bookings ?? 0;
        }

        setBookingsCount(count);
        setVenuesCount(venues.length);
      } catch (error) {
        console.error(error);
      }
    };

    getBookingsCount();
  }, [user]);

  return (
    <section
      className={`hidden md:flex justify-between  ${user?.venueManager ? 'bg-[linear-gradient(to_right,#1B627A_0%,#4BB0CE_96%)]' : 'bg-[linear-gradient(to_right,#1F6B52_0%,#48E0A2_96%)]'} h-[260px] px-[50px]`}
    >
      <div className="flex flex-col gap-[10px] pt-[120px]">
        <h2 className="font-bold {user?.venueManager ? 'text-white' : 'text-black'}">
          {title}
        </h2>
        <h2 className={user?.venueManager ? 'text-white' : 'text-black'}>
          {user?.venueManager ? ' Manager' : 'User'} Dashboard
        </h2>
      </div>
      <div
        className={`flex gap-[10px] pt-[160px] ${user?.venueManager ? 'text-white' : 'text-black'}`}
      >
        <div>
          <p className="flex justify-end">
            {user?.venueManager ? bookingsCount : 'None'}
          </p>
          <p>Active bookings</p>
        </div>
        <div
          className={`border-[3px] ${user?.venueManager ? 'border-white' : 'border-dark'}  h-[68px] mt-[-18px] rounded-[10px]`}
        ></div>
        <div>
          <p className="flex justify-start">
            {user?.venueManager ? venuesCount : 'Nothing'}
          </p>
          <p>{user?.venueManager ? 'Venues' : 'Saved'}</p>
        </div>
      </div>
    </section>
  );
}
