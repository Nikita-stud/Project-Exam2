import { fetchUserBookings } from '@/api/bookings/fetchUserBookings';
import { Booking } from '@/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function UserBookings({ name }: { name: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    let active = true;
    fetchUserBookings(name).then((data) => {
      if (active) setBookings(data);
    });
    return () => {
      active = false;
    };
  }, [name]);

  return (
    <>
      <h3 className="font-semibold md:mb-[20px]">My Booking</h3>
      <div className="mt-[10px]">
        {bookings.length === 0 ? (
          <Link
            href={`/search`}
            className="border p-[50px] flex flex-col items-center justify-center text-center rounded-[10px] bg-[#fff] md:mb-[50px] md:py-[80px]"
          >
            <p>You have not bookings yet.</p>
            <button className="login-cta bg-primary w-[166px] h-[43px] rounded-[10px] text-white flex items-center justify-center mt-[20px] hover:opacity-90 md:w-[320px] h-[58px]">
              Search now{' '}
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            </button>
          </Link>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] mb-[40px] md:mb-[50px]">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border rounded-[10px] overflow-hidden"
              >
                <Link
                  href={`/venue/${booking.id}`}
                  className="relative w-full block h-[82px] md:h-[225px]"
                >
                  <Image
                    src={booking.venue.media[0]?.url ?? '/no-photo.svg'}
                    alt={booking.venue.media[0]?.alt ?? 'Image not found'}
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
