'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AuthStore from '@/store/authStore';
import { fetchManagerVenues } from '@/api/venues/fetchManagerVenues';
import { cancelBooking } from '@/api/bookings/cancelBooking';
import type { Venue } from '@/types';
import BackNav from '@/components/BackNav';
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

  let hasBookings = false;

  for (const venue of venues) {
    if ((venue.bookings ?? []).length > 0) {
      hasBookings = true;
      break;
    }
  }

  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleCancel = async (bookingId: string) => {
    if (!user) {
      return;
    }

    setCancellingId(bookingId);
    try {
      await cancelBooking(bookingId);
      const venues = await fetchManagerVenues(user.name);
      setVenues(venues);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <section className="pt-[20px] md:p-[50px]">
      <BackNav />
      <h1 className="pl-[20px] pb-[10px]">Bookings</h1>
      {loading ? (
        <>
          <LoadingContainer />
          <LoadingContainer />
        </>
      ) : null}
      {!loading &&
        (!hasBookings ? (
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
          <div className="px-[20px] pb-[30px] max-w-[450px] m-auto">
            <div className="flex flex-col gap-[20px] mt-[10px]">
              {venues.map((venue) =>
                (venue.bookings ?? []).map((booking) => (
                  <div
                    key={booking.id}
                    className="w-full h-[174px] border rounded-[10px] p-[20px] flex flex-col justify-between"
                  >
                    <div>
                      <h2>{venue.name}</h2>
                      <p className="text-calm">
                        Booked by: {booking.customer?.name ?? 'Unknown'}
                      </p>
                      <p className="text-calm">
                        {new Date(booking.dateFrom).toLocaleDateString()} –{' '}
                        {new Date(booking.dateTo).toLocaleDateString()}
                      </p>
                      <p className="text-calm">Guests: {booking.guests}</p>
                      <p className="text-calm">Booking ID: {booking.id}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCancel(booking.id)}
                      disabled={cancellingId === booking.id}
                      className="bg-primary text-white h-[43px] rounded-[10px] font-bold hover:opacity-90 disabled:opacity-50"
                    >
                      {cancellingId === booking.id
                        ? 'Cancelling...'
                        : 'Cancel Booking'}
                    </button>
                  </div>
                )),
              )}
            </div>
          </div>
        ))}
    </section>
  );
}
