'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AuthStore from '@/store/authStore';
import VenueStore from '@/store/venueStore';
import { fetchUserBookings } from '@/api/bookings/fetchUserBookings';
import VenueCard from '@/components/venues/VenueCard';
import BackNav from '@/components/ui/BackNav';
import HeroSection from '@/components/ui/HeroSection';

export default function SavedVenuesPage() {
  const user = AuthStore((store) => store.user);
  const items = VenueStore((state) => state.items);
  const [bookingsCount, setBookingsCount] = useState(0);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchBookings = async () => {
      const bookings = await fetchUserBookings(user.name);
      setBookingsCount(bookings.length);
    };

    fetchBookings();
  }, [user]);

  return (
    <>
      <BackNav />
      <HeroSection bookingsCount={bookingsCount} />
      <section className="pt-[20px] md:p-[50px]">
        <h1 className="pl-[20px] md:hidden">Saved Venues</h1>
        {items.length === 0 ? (
          <div className="px-[20px]">
            <Link
              href={`/`}
              className="border p-[50px] flex flex-col items-center justify-center text-center rounded-[10px] bg-[#fff] mt-[10px] md:py-[80px]"
            >
              <p>You have not saved any venues yet.</p>

              <button className="login-cta bg-primary w-[166px] h-[43px] rounded-[10px] text-white flex items-center justify-center mt-[20px] hover:opacity-90 md:w-[320px] md:h-[58px]">
                Search now <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-[20px] px-[20px] md:grid-cols-2 md:gap-[50px] md:px-0 lg:grid-cols-3">
            {items.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
