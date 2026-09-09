import { useEffect, useState } from 'react';
import { fetchManagerVenues } from '@/api/venues/fetchManagerVenues';
import type { Venue } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { LoadingContainer } from '@/components/ui/LoadingContainer';
import { BLUR_DATA_URL } from '@/components/helpers/BlurDataUrl';
import ErrorMessage from '@/components/helpers/ErrorMessage';

export default function ManagerVenues({ name }: { name: string }) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await fetchManagerVenues(name);
        setVenues(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to load venues',
        );
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, [name]);

  return (
    <>
      <h3 className="font-semibold md:mb-[20px]">My Venues</h3>
      <div className="mt-[10px]">
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
            <Link
              href={`/profile/venues/create`}
              className="border p-[50px] flex flex-col items-center justify-center text-center rounded-[10px] bg-[#fff] md:mb-[50px] md:py-[80px]"
            >
              <p>You have not created a venue yet.</p>
              <button className="cta-primary mt-[20px]">
                Create now{' '}
                <i className="fa-solid fa-plus" aria-hidden="true"></i>
              </button>
            </Link>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] mb-[40px] md:mb-[50px]">
              {venues.map((venue) => (
                <div
                  key={venue.id}
                  className="border rounded-[10px] overflow-hidden"
                >
                  <Link
                    href={`/venue/${venue.id}`}
                    className="relative w-full block h-[82px] md:h-[225px]"
                  >
                    <Image
                      src={venue.media[0]?.url ?? '/no-photo.svg'}
                      alt={venue.media[0]?.alt ?? 'Image not found'}
                      fill
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.srcset = '/no-photo.svg';
                        e.currentTarget.src = '/no-photo.svg';
                      }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}
