'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuthStore from '@/store/authStore';
import { fetchUserBookings } from '@/api/bookings/fetchUserBookings';
import { cancelBooking } from '@/api/bookings/cancelBooking';
import type { Booking } from '@/types';
import BackNav from '@/components/ui/BackNav';
import HeroSection from '@/components/ui/HeroSection';
import { LoadingContainer } from '@/components/ui/LoadingContainer';

export default function BookingPage() {
  const user = AuthStore((store) => store.user);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchBookings = async () => {
      try {
        const bookings = await fetchUserBookings(user.name);
        setBookings(bookings);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancel = async (bookingId: string) => {
    if (!user) {
      return;
    }

    setCancellingId(bookingId);
    try {
      await cancelBooking(bookingId);
      const bookings = await fetchUserBookings(user.name);
      setBookings(bookings);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <>
      <BackNav />
      <HeroSection />
      <section className="pt-[20px] md:p-[50px]">
        <h1 className="pl-[20px] pb-[10px] md:hidden">Upcoming Bookings</h1>
        {loading ? (
          <>
            <LoadingContainer />
            <LoadingContainer />
          </>
        ) : null}
        {!loading &&
          (bookings.length === 0 ? (
            <div className="px-[20px]">
              <Link
                href={`/`}
                className="border p-[50px] flex flex-col items-center justify-center text-center rounded-[10px] bg-[#fff] mt-[10px] md:py-[80px]"
              >
                <p>You have not bookings yet.</p>

                <button className="login-cta bg-primary w-[166px] h-[43px] rounded-[10px] text-white flex items-center justify-center mt-[20px] hover:opacity-90 md:w-[320px] md:h-[58px]">
                  Search now <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </Link>
            </div>
          ) : (
            <div className="px-[20px] pb-[30px] max-w-[450px] m-auto">
              <div className="flex flex-col gap-[20px] mt-[10px]">
                {bookings.map((booking) => (
                  <div key={booking.id} className="overflow-hidden">
                    <Link
                      href={`/venue/${booking.venue.id}`}
                      className="block relative"
                    >
                      <Image
                        src={booking.venue.media[0]?.url ?? '/no-photo.svg'}
                        alt={booking.venue.media[0]?.alt ?? 'Image not found'}
                        width={350}
                        height={174}
                        className="w-full border h-[174px] object-cover rounded-[10px]"
                      />
                      <h2 className="mt-[10px]">{booking.venue.name}</h2>
                      <p className="text-calm">
                        Expected guests: {booking.guests} adults
                      </p>
                      <p className="font-bold flex justify-between">
                        <span>
                          {new Date(booking.dateFrom).toLocaleDateString()} -{' '}
                          {new Date(booking.dateTo).toLocaleDateString()}
                        </span>
                      </p>
                    </Link>
                    <div className="flex justify-between gap-[20px] mt-[10px]">
                      <button
                        type="button"
                        onClick={() => handleCancel(booking.id)}
                        disabled={cancellingId === booking.id}
                        className="flex items-center justify-center max-w-[166px] h-[43px] font-bold w-full border rounded-[10px] hover:opacity-90 disabled:opacity-50"
                      >
                        {cancellingId === booking.id
                          ? 'Cancelling...'
                          : 'Cancel Booking'}
                      </button>
                      <Link
                        href={`/venue/${booking.venue.id}`}
                        className="flex items-center justify-center max-w-[166px] h-[43px] font-bold w-full bg-calm text-white rounded-[10px] hover:opacity-90"
                      >
                        More Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </section>
    </>
  );
}
