import { useEffect, useState } from 'react';
import { fetchManagerVenues } from '@/api/venues/fetchManagerVenues';
import type { Venue } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

export default function ManagerVenues({ name }: { name: string }) {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    let active = true;
    fetchManagerVenues(name).then((data) => {
      if (active) setVenues(data);
    });
    return () => {
      active = false;
    };
  }, [name]);

  return (
    <>
      <h3>My Venues</h3>
      <div className="mt-[10px]">
        {venues.length === 0 ? (
          <Link
            href={`/profile/venues/create`}
            className="border p-[50px] flex flex-col items-center justify-center text-center rounded-[10px] bg-[#fff] md:mb-[50px] md:py-[80px]"
          >
            <p>You have not created a venue yet.</p>
            <button className="login-cta bg-primary w-[166px] h-[43px] rounded-[10px] text-white flex items-center justify-center mt-[20px] hover:opacity-90">
              Create now <i className="fa-solid fa-plus"></i>
            </button>
          </Link>
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
    </>
  );
}
