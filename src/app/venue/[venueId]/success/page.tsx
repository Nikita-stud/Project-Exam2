import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import fetchVenue from '@/api/venues/fetchVenue';
import type { BookingSuccessPageType } from '@/types';
import BackNav from '@/components/ui/BackNav';

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
    <>
      <BackNav />
      <div className="p-[20px]">
        <Image
          src="/success-icon.png"
          alt="Success Icon"
          width={80}
          height={80}
          className="mb-[20px] m-auto"
        />
        <h1 className="mb-[20px]">Your booking has been confirmed</h1>
        <Image
          src={venue.media[0]?.url || '/no-photo.svg'}
          alt={venue.media[0]?.alt || venue.name}
          width={350}
          height={260}
          className="w-full h-[260px] object-cover rounded-[10px] mb-[20px] border-[1px] border-black"
        />
        <div>
          <h2 className="my-[20px]">Successful reservation</h2>
          <p>
            Your trip to <span className="font-bold">{venue.name}</span> has
            been booked
          </p>
          <p className="mt-[20px] font-bold">
            {from}
            <i className="fa-solid fa-minus align-[-5%]" aria-hidden="true"></i>
            {to}
          </p>
          <p className="mt-[10px]">
            Guests: <span className="font-bold">{guests}</span>
          </p>
        </div>
        <div className="flex justify-center mb-[10px] md:mb-[40px]">
          <Link
            href="/"
            className="login-cta mt-[20px] bg-primary w-full max-w-[350px] h-[58px] rounded-[10px] text-white flex items-center justify-center hover:opacity-90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
