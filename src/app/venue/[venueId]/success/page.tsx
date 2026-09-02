import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import fetchVenue from '@/api/venues/fetchVenue';
import type { BookingSuccessPageType } from '@/types';

export const metadata: Metadata = {
  title: 'Success Page || Holidaze',
  description:
    'Your favorite destinations and venues in one place. Book your next trip with us and experience the best of venues and sights.',
};

export default async function BookingSuccessPage({
  params,
  searchParams,
}: BookingSuccessPageType) {
  const { venueId } = await params;
  const { from, to, guests } = await searchParams;
  const venue = await fetchVenue(venueId);

  return (
    <div className="p-[20px] flex flex-col items-center text-center">
      <Image
        src="/success-icon.png"
        alt="Success Icon"
        width={80}
        height={80}
        className="mb-[20px]"
      />
      <h1 className="mb-[20px]">Your booking has been confirmed</h1>
      <Image
        src={venue.media[0]?.url || '/no-photo.svg'}
        alt={venue.media[0]?.alt || venue.name}
        width={350}
        height={260}
        className="w-full h-[260px] object-cover rounded-[10px] mb-[20px]"
      />
      <h2 className="mb-[10px]">Successful reservation</h2>
      <p className="mb-[20px]">
        Your trip to {venue.name} has been booked
        <br />
        {from} – {to}
        <br />
        Guests: {guests}
      </p>
      <Link
        href="/"
        className="login-cta bg-primary w-[166px] h-[43px] rounded-[10px] text-white flex items-center justify-center hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
}
