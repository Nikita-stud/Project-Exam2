import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { BookingSuccessPageType } from '@/types';
import BackNav from '@/components/ui/BackNav';
import SuccessVenueImage from '@/components/venues/SuccessVenueImage';
import ResetSearchHelper from '@/components/helpers/ResetSearchHelper';

export const metadata: Metadata = {
  title: 'Success Page || Holidaze',
  description:
    'Your favorite destinations and venues in one place. Book your next trip with us and experience the best of venues and sights.',
};

export default async function BookingSuccessPage({
  searchParams,
}: BookingSuccessPageType) {
  const { from, to, guests, name, image } = await searchParams;

  return (
    <>
      <BackNav />
      <ResetSearchHelper />
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
            <SuccessVenueImage image={image} />
          </div>
          <div className="md:col-start-2 md:row-start-3">
            <h2 className="my-[20px]">Successful reservation</h2>
            <p>
              Your trip to <span className="font-bold">{name}</span> has been
              booked
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
            <Link href="/" className="cta-primary-full mt-[20px]">
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
