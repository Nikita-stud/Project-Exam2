'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuthStore from '@/store/authStore';
import { fetchManagerVenues } from '@/api/bookings/fetchManagerVenues';
import type { Venue } from '@/types';
import ManagerNav from '@/components/ManagerNav';

export default function VenuesPage() {
  const user = AuthStore((store) => store.user);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchVenues = async () => {
      const venues = await fetchManagerVenues(user.name);
      await setVenues(venues);
    };

    fetchVenues();
  }, [user]);

  const filteredBookings = venues.filter((venue) => {
    const searched = search.trim().toLowerCase();
    return venue.name.trim().toLowerCase().includes(searched);
  });

  return (
    <section className="pt-[175px] md:p-[50px]">
      <ManagerNav searchValue={search} onSearchChange={setSearch} />
      <h1 className="pl-[20px] pb-[10px]">Bookings</h1>
      {venues.length === 0 ? (
        <div className="px-[20px]">
          <Link
            href={`/profile/venues/create`}
            className="border p-[50px] flex flex-col items-center justify-center text-center rounded-[10px] bg-[#fff] mt-[10px] md:py-[80px]"
          >
            <p>There are no bookings yet.</p>

            <button className="login-cta bg-primary w-[166px] h-[43px] rounded-[10px] text-white flex items-center justify-center mt-[20px] hover:opacity-90">
              Create Venue <i className="fa-solid fa-plus"></i>
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-[20px] mt-[10px] p-[20px]">
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
    </section>
  );
}
