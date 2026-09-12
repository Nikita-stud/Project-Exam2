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
import { BLUR_DATA_URL } from '@/components/helpers/BlurDataUrl';
import ErrorMessage from '@/components/helpers/ErrorMessage';

export default function BookingPage() {
  const user = AuthStore((store) => store.user);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cancelErrorId, setCancelErrorId] = useState<string | null>(null);
  const [cancelError, setCancelError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchBookings = async () => {
      try {
        const bookings = await fetchUserBookings(user.name);
        setBookings(bookings);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to load bookings',
        );
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
    setCancelErrorId(null);
    setCancelError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await cancelBooking(bookingId);

      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (error) {
      setCancelErrorId(bookingId);
      setCancelError(
        error instanceof Error ? error.message : 'Failed to cancel booking',
      );
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <>
      <BackNav />
      <HeroSection bookingsCount={bookings.length} />
      <section className="pt-[20px] md:p-[50px]">
        <h1 className="pl-[20px] pb-[10px] md:hidden">Upcoming Bookings</h1>
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
          (bookings.length === 0 ? (
            <div className="px-[20px]">
              <Link
                href={`/`}
                className="border p-[50px] flex flex-col items-center justify-center text-center rounded-[10px] bg-[#fff] mt-[10px] md:py-[80px]"
              >
                <p>You have not bookings yet.</p>

                <button className="cta-primary mt-[20px]">
                  Search now <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </Link>
            </div>
          ) : (
            <div className="px-[20px] pb-[30px] max-w-[450px] mx-auto md:px-0 md:max-w-none">
              <div className="grid grid-cols-1 gap-[20px] mt-[10px] md:grid-cols-2 md:gap-[50px] lg:grid-cols-3">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`overflow-hidden transition-all duration-2000 ${
                      cancellingId === booking.id
                        ? 'opacity-0 scale-50'
                        : 'opacity-100'
                    }`}
                  >
                    <Link
                      href={`/venue/${booking.venue.id}`}
                      className="block relative"
                    >
                      <Image
                        src={booking.venue.media[0]?.url ?? '/no-photo.svg'}
                        alt={booking.venue.media[0]?.alt ?? 'Image not found'}
                        width={350}
                        height={174}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="w-full border h-[174px] object-cover rounded-[10px]"
                        onError={(e) => {
                          e.currentTarget.srcset = '/no-photo.svg';
                          e.currentTarget.src = '/no-photo.svg';
                        }}
                      />
                      {cancelErrorId === booking.id && cancelError ? (
                        <ErrorMessage
                          message={cancelError}
                          className="mt-[10px]"
                        />
                      ) : (
                        <>
                          <h2 className="mt-[10px]">{booking.venue.name}</h2>
                          <p className="text-calm">
                            Expected guests: {booking.guests} adults
                          </p>
                          <p className="font-bold flex justify-between">
                            <span>
                              {new Date(booking.dateFrom).toLocaleDateString()}
                              <i
                                className="fa-solid fa-minus align-[-5%] mx-[5px]"
                                aria-hidden="true"
                              ></i>
                              {new Date(booking.dateTo).toLocaleDateString()}
                            </span>
                          </p>
                        </>
                      )}
                    </Link>
                    <div className="flex justify-between gap-[20px] mt-[10px]">
                      <button
                        type="button"
                        onClick={() => handleCancel(booking.id)}
                        disabled={cancellingId === booking.id}
                        className="cta-card-action"
                      >
                        {cancellingId === booking.id
                          ? 'Cancelling...'
                          : 'Cancel'}
                        <i
                          className="fa-solid fa-xmark ml-[5px] mt-[2px]"
                          aria-hidden="true"
                        ></i>
                      </button>
                      <Link
                        href={`/profile/bookings/${booking.id}`}
                        className="cta-card-action-solid"
                      >
                        Details
                        <i
                          className="fa-solid fa-circle-info ml-[5px]"
                          aria-hidden="true"
                        ></i>
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
