'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuthStore from '@/store/authStore';
import ManagerVenuesStore from '@/store/managerVenuesStore';
import { fetchManagerVenues } from '@/api/venues/fetchManagerVenues';
import type { Venue } from '@/types';
import ManagerNav from '@/components/ui/ManagerNav';
import HeroSection from '@/components/ui/HeroSection';
import { LoadingContainer } from '@/components/ui/LoadingContainer';

export default function VenuesPage() {
  const user = AuthStore((store) => store.user);
  const setManagerVenues = ManagerVenuesStore((store) => store.setVenues);
  const setManagerVenue = ManagerVenuesStore((store) => store.setVenue);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchVenues = async () => {
      try {
        const venues = await fetchManagerVenues(user.name);
        setVenues(venues);
        setManagerVenues(user.name, venues);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, [user, setManagerVenues]);

  const filteredVenues = venues.filter((venue) => {
    const searched = search.trim().toLowerCase();
    return venue.name.trim().toLowerCase().includes(searched);
  });

  return (
    <>
      <HeroSection />
      <section className="pt-[175px] md:p-[50px] md:mt-[-10px]">
        <ManagerNav searchValue={search} onSearchChange={setSearch} />
        <h1 className="pl-[20px] pb-[10px] md:hidden">Manage Venues</h1>
        {loading ? (
          <>
            <LoadingContainer />
            <LoadingContainer />
          </>
        ) : null}
        {!loading &&
          (venues.length === 0 ? (
            <div className="px-[20px]">
              <Link
                href={`/profile/venues/create`}
                className="border p-[50px] flex flex-col items-center justify-center text-center rounded-[10px] bg-[#fff] mt-[10px] md:py-[80px]"
              >
                <p>There are no venues to manage.</p>

                <button className="login-cta bg-primary w-[166px] h-[43px] rounded-[10px] text-white flex items-center justify-center mt-[20px] hover:opacity-90 md:w-[320px] md:h-[58px]">
                  Create now <i className="fa-solid fa-plus"></i>
                </button>
              </Link>
            </div>
          ) : (
            <div className="px-[20px] pb-[30px] max-w-[450px] mx-auto md:px-0 md:max-w-none">
              {filteredVenues.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-[20px] border bg-[#fff] p-[50px] rounded-[10px]">
                  <p className="text-calm mt-[10px]">
                    No venues match your{' '}
                    <span className="font-bold">&quot;{search}&quot;</span>{' '}
                    search.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-[20px] mt-[10px] md:grid-cols-2 md:gap-[50px] md:mt-[20px] lg:grid-cols-3">
                  {filteredVenues.map((venue) => (
                    <div key={venue.id} className="overflow-hidden">
                      <Link
                        href={`/venue/${venue.id}`}
                        className="block relative"
                      >
                        <Image
                          src={venue.media[0]?.url ?? '/no-photo.svg'}
                          alt={venue.media[0]?.alt ?? 'Image not found'}
                          width={350}
                          height={174}
                          className="w-full h-[174px] object-cover rounded-[10px]"
                        />
                        {(venue._count?.bookings ?? 0) > 0 && (
                          <div className="absolute flex items-center justify-center w-[50px] h-[50px] bg-primary rounded-full top-[20px] right-[20px]">
                            <p className="text-white">
                              {venue._count?.bookings}
                            </p>
                          </div>
                        )}
                        <div className="flex items-baseline justify-between mt-[10px]">
                          <h2>{venue.name}</h2>
                          <p>
                            <i
                              className="fa-solid fa-star"
                              aria-hidden="true"
                            ></i>{' '}
                            {venue.rating === 0 ? ' None' : venue.rating}
                          </p>
                        </div>
                        <p className="text-calm">
                          Max guests: {venue.maxGuests} adults
                        </p>
                        <p className="text-calm">
                          Price per night: {venue.price} NOK
                        </p>
                      </Link>
                      <div className="flex justify-between gap-[20px] mt-[10px]">
                        <Link
                          href="/profile/venues/bookings"
                          className="flex items-center justify-center max-w-[166px] h-[43px] font-bold w-full border rounded-[10px] hover:opacity-90"
                        >
                          Bookings
                          <i
                            className="fa-regular fa-calendar ml-[10px]"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <Link
                          href={`/profile/venues/${venue.id}/edit`}
                          onClick={() =>
                            user && setManagerVenue(user.name, venue)
                          }
                          className="flex items-center justify-center max-w-[166px] h-[43px] font-bold w-full bg-calm text-white rounded-[10px] hover:opacity-90"
                        >
                          Edit
                          <i
                            className="fa-regular fa-pen-to-square ml-[10px]"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </section>
    </>
  );
}
