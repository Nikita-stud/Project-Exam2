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
      <div className="p-[20px] md:p-[0px]">
        <div className="md:px-[50px] md:my-[50px] md:grid md:grid-cols-2 md:gap-x-[30px] md:gap-y-[20px] md:items-stretch">
          <Image
            src="/success-icon.png"
            alt="Success Icon"
            loading="eager"
            width={80}
            height={80}
            className="mb-[20px] m-auto md:col-start-2 md:row-start-1"
          />
          <h1 className="mb-[20px] md:col-start-2 md:row-start-2">
            Your booking has been confirmed
          </h1>
          <div className="relative h-[260px] mb-[20px] md:mb-0 md:h-full md:col-start-1 md:row-start-1 md:row-span-4">
            <Image
              src={venue.media[0]?.url || '/no-photo.svg'}
              alt={venue.media[0]?.alt || venue.name}
              fill
              sizes="(min-width: 744px) 50vw, 100vw"
              className="object-cover rounded-[10px] border-[1px] border-black"
            />
          </div>
          <div className="md:col-start-2 md:row-start-3">
            <h2 className="my-[20px]">Successful reservation</h2>
            <p>
              Your trip to <span className="font-bold">{venue.name}</span> has
              been booked
            </p>
            <p className="mt-[20px] font-bold">
              {from}
              <i
                className="fa-solid fa-minus align-[-5%]"
                aria-hidden="true"
              ></i>
              {to}
            </p>
            <p className="mt-[10px]">
              Guests: <span className="font-bold">{guests}</span>
            </p>
          </div>
          <div className="flex justify-center mb-[10px] md:mb-0  md:col-start-2 md:row-start-4 ">
            <Link
              href="/"
              className="login-cta mt-[20px] bg-primary w-full max-w-[350px] h-[58px] rounded-[10px] text-white flex items-center justify-center hover:opacity-90"
            >
              Back to Home
              <i
                className="fa-regular fa-circle-right ml-[5px]"
                aria-hidden="true"
              ></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
