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
import { BLUR_DATA_URL } from '@/components/helpers/BlurDataUrl';
import ErrorMessage from '@/components/helpers/ErrorMessage';

export default function VenuesPage() {
  const user = AuthStore((store) => store.user);
  const setManagerVenues = ManagerVenuesStore((store) => store.setVenues);
  const setManagerVenue = ManagerVenuesStore((store) => store.setVenue);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchVenues = async () => {
      try {
        const venues = await fetchManagerVenues(user.name);
        setVenues(venues);
        setManagerVenues(user.name, venues);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to load venues',
        );
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

  let bookingsCount = 0;
  for (const venue of venues) {
    bookingsCount += venue._count?.bookings ?? 0;
  }

  return (
    <>
      <HeroSection bookingsCount={bookingsCount} venuesCount={venues.length} />
      <section className="pt-[175px] md:p-[50px] md:mt-[-10px]">
        <ManagerNav searchValue={search} onSearchChange={setSearch} />
        <h1 className="pl-[20px] pb-[10px] md:hidden">Manage Venues</h1>
        {loading ? (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <LoadingContainer />
            </div>
            <div className="w-full md:w-1/2">
              <LoadingContainer />
            </div>
          </div>
        ) : null}
        {!loading && error && (
          <ErrorMessage message={error} className="my-[50px] p-[50px]" />
        )}
        {!loading &&
          !error &&
          (venues.length === 0 ? (
            <div className="px-[20px]">
              <Link
                href={`/profile/venues/create`}
                className="border p-[50px] flex flex-col items-center justify-center text-center rounded-[10px] bg-[#fff] mt-[10px] md:py-[80px]"
              >
                <p>There are no venues to manage.</p>

                <button className="cta-primary mt-[20px]">
                  Create now <i className="fa-solid fa-plus"></i>
                </button>
              </Link>
            </div>
          ) : (
            <div className="px-[20px] pb-[30px] max-w-[450px] mx-auto md:px-0 md:max-w-none">
              {filteredVenues.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-[20px] border bg-[#fff] p-[50px] rounded-[10px]">
                  <p className="text-calm mt-[10px]">
                    No venues match your
                    <span className="font-bold mx-[5px]">
                      &quot;{search}&quot;
                    </span>
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
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="w-full h-[174px] object-cover rounded-[10px]"
                          onError={(e) => {
                            e.currentTarget.srcset = '/no-photo.svg';
                            e.currentTarget.src = '/no-photo.svg';
                          }}
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
                            ></i>
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
                          href={`/venue/${venue.id}`}
                          className="cta-card-action"
                        >
                          View
                          <i
                            className="fa-regular fa-eye ml-[5px]"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <Link
                          href={`/profile/venues/edit/${venue.id}`}
                          onClick={() =>
                            user && setManagerVenue(user.name, venue)
                          }
                          className="cta-card-action-solid"
                        >
                          Edit
                          <i
                            className="fa-regular fa-pen-to-square ml-[8px] mt-[-2px]"
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
