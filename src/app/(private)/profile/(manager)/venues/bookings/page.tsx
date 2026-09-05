'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuthStore from '@/store/authStore';
import { fetchManagerVenues } from '@/api/venues/fetchManagerVenues';
import type { Venue } from '@/types';
import BackNav from '@/components/ui/BackNav';
import HeroSection from '@/components/ui/HeroSection';
import { LoadingContainer } from '@/components/ui/LoadingContainer';

export default function BookingsPage() {
  const user = AuthStore((store) => store.user);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchVenues = async () => {
      try {
        const venues = await fetchManagerVenues(user.name);
        setVenues(venues);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, [user]);

  return (
    <>
      <BackNav />
      <HeroSection />
      <section className="pt-[20px] md:p-[50px]">
        <h1 className="pl-[20px] pb-[10px] md:hidden">View Bookings</h1>
        {loading ? (
          <>
            <LoadingContainer />
            <LoadingContainer />
          </>
        ) : null}
        {!loading &&
          (!venues.some((v) => (v.bookings ?? []).length > 0) ? (
            <div className="px-[20px]">
              <Link
                href={`/profile/venues/create`}
                className="border p-[50px] flex flex-col items-center justify-center text-center rounded-[10px] bg-[#fff] mt-[10px] md:py-[80px]"
              >
                <p>There are no bookings yet.</p>

                <button className="login-cta bg-primary w-[166px] h-[43px] rounded-[10px] text-white flex items-center justify-center mt-[20px] hover:opacity-90 md:w-[320px] md:h-[58px]">
                  Create Venue <i className="fa-solid fa-plus"></i>
                </button>
              </Link>
            </div>
          ) : (
            <div className="px-[20px] pb-[30px] max-w-[450px] mx-auto md:px-0 md:max-w-none md:mt-[-20px] md:mb-[-50px]">
              {venues
                .filter((venue) => (venue.bookings ?? []).length > 0)
                .map((venue) => (
                  <div key={venue.id} className="mb-[30px]">
                    <h3 className="mb-[10px] font-bold">{venue.name}</h3>
                    <div className="grid grid-cols-1 gap-[20px] mt-[10px] md:grid-cols-2 md:gap-[50px] md:mt-[20px] lg:grid-cols-3">
                      {(venue.bookings ?? []).map((booking) => (
                        <div
                          key={booking.id}
                          className="w-full h-[174px] border rounded-[10px] p-[20px] bg-[#fff] flex flex-col justify-between gap-[20px]"
                        >
                          <div className="flex justify-between gap-[5px]">
                            {' '}
                            <div className="flex items-center gap-[5px]">
                              <Image
                                src={
                                  booking.customer?.avatar?.url ??
                                  '/no-photo.svg'
                                }
                                alt={
                                  booking.customer?.name ?? 'Customer Avatar'
                                }
                                width={25}
                                height={25}
                                className="h-[25px] w-[25px] rounded-full mr-[0px]"
                              />
                              <p className="text-calm ">
                                <span className="font-bold">
                                  {booking.customer?.name}
                                </span>
                              </p>
                            </div>
                            <p className="text-calm">
                              Guests:{' '}
                              <span className="font-bold underline">
                                {booking.guests}
                              </span>
                            </p>
                          </div>

                          <p className="text-calm">
                            {new Date(booking.dateFrom).toLocaleDateString()}{' '}
                            <i
                              className="fa-solid fa-minus"
                              aria-hidden="true"
                            ></i>
                            {new Date(booking.dateTo).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </section>
    </>
  );
}
