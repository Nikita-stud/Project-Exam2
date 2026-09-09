'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AuthStore from '@/store/authStore';
import { fetchBooking } from '@/api/bookings/fetchBooking';
import { cancelBooking } from '@/api/bookings/cancelBooking';
import type { Booking } from '@/types';
import BackNav from '@/components/ui/BackNav';
import VenueImages from '@/components/venues/VenueImages';
import { LoadingContainer } from '@/components/ui/LoadingContainer';
import ErrorMessage from '@/components/helpers/ErrorMessage';

export default function BookingDetailsPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const user = AuthStore((store) => store.user);
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const getBooking = async () => {
      try {
        const data = await fetchBooking(bookingId);
        setBooking(data);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Failed to fetch booking',
        );
      } finally {
        setLoading(false);
      }
    };

    getBooking();
  }, [user, bookingId]);

  const handleCancel = async () => {
    if (!booking) return;
    setCancelling(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await cancelBooking(booking.id);
      router.push('/profile/bookings');
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to cancel booking',
      );
      setCancelling(false);
    }
  };

  const venue = booking?.venue;
  const galleryImages =
    venue?.media.filter((image) => image.url).slice(0, 5) ?? [];

  return (
    <>
      <BackNav />
      {loading ? <LoadingContainer /> : null}
      {!loading && errorMessage ? (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-[20px] px-[20px] text-center">
          <Image
            src="/auth-logo.png"
            alt="Logo"
            loading="eager"
            width={120}
            height={130}
            className="w-[120px] h-[130px]"
          />
          <ErrorMessage message={errorMessage} />
          <Link
            href="/"
            className="cta-primary-full"
          >
            Back to venues page
            <i
              className="fa-regular fa-circle-right ml-[5px]"
              aria-hidden="true"
            ></i>
          </Link>
        </div>
      ) : null}
      {!loading && booking && venue ? (
        <div
          className={`overflow-hidden transition-all duration-2000 p-[20px] md:p-[50px] ${
            cancelling ? 'opacity-0 scale-50' : 'opacity-100'
          }`}
        >
          <div className="lg:flex lg:gap-[20px]">
            <div className="lg:w-[580px] lg:flex-none">
              <VenueImages venue={venue} images={galleryImages} />
            </div>

            <div className="mt-[20px] lg:mt-0 lg:flex lg:flex-col lg:flex-1">
              <section>
                <div className="flex items-baseline justify-between mb-[10px]">
                  <h1>{venue.name || 'No name'}</h1>
                  <p>
                    <i
                      className="fa-solid fa-star mr-[5px]"
                      aria-hidden="true"
                    ></i>
                    {venue.rating === 0 ? ' None' : venue.rating}
                  </p>
                </div>
                <div className="flex my-[20px]">
                  <Image
                    src={venue.owner?.avatar.url || '/no-photo.svg'}
                    alt={
                      venue.owner?.avatar.alt || venue.owner?.name || 'Owner'
                    }
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />
                  <div className="ml-[10px]">
                    <p className="text-calm">Owner</p>
                    <p>{venue.owner?.name}</p>
                  </div>
                </div>
                <section>
                  <h2 className="mb-[10px]">Details</h2>
                  <div className="flex flex-col gap-[10px]">
                    <p>
                      <strong>Location:</strong> {venue.location.address},
                      {venue.location.zip}
                      {venue.location.address}
                    </p>
                    <p>
                      <strong>Included:</strong>
                      {Object.entries(venue.meta)
                        .filter(([, included]) => included)
                        .map(
                          ([text]) =>
                            text.charAt(0).toUpperCase() + text.slice(1),
                        )
                        .join(', ') || 'None'}
                    </p>
                    <p>
                      <strong>Details:</strong> {venue.description}
                    </p>
                  </div>
                </section>
              </section>

              <section className="bg-calm/20 flex flex-col gap-[10px] p-[20px] my-[20px] rounded-[10px] lg:w-full lg:mt-auto">
                <h2>Your booking</h2>
                <p className="font-bold">
                  {new Date(booking.dateFrom).toLocaleDateString()}
                  <i
                    className="fa-solid fa-minus align-[-5%] mx-[5px]"
                    aria-hidden="true"
                  ></i>
                  {new Date(booking.dateTo).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between mb-[10px]">
                  <p>
                    Guests: <span className="font-bold">{booking.guests}</span>
                  </p>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="cta-card-action"
                  >
                    {cancelling ? 'Cancelling...' : 'Cancel'}
                    <i
                      className="fa-solid fa-xmark ml-[5px] mt-[2px]"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
