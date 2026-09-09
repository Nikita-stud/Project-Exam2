'use client';
import type { Venue } from '../../types/index';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import SaveVenueButton from './SaveVenueButton';
import { BLUR_DATA_URL } from '@/components/helpers/BlurDataUrl';

export default function VenueCard({ venue }: { venue: Venue }) {
  const searchParams = useSearchParams();

  const query = new URLSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const guests = searchParams.get('guests');
  if (from && to) {
    query.set('from', from);
    query.set('to', to);
  }
  if (guests) {
    query.set('guests', guests);
  }
  const queryString = query.toString();
  const href = `/venue/${venue.id}${queryString ? `?${queryString}` : ''}`;

  return (
    <div className="card rounded-[10px] overflow-hidden">
      <div className="relative h-full flex flex-col">
        <Link href={href} className="flex flex-col flex-1">
          <Image
            src={venue.media[0]?.url || '/no-photo.svg'}
            alt={venue.media[0]?.alt || venue.name || 'No Image'}
            width={350}
            height={174}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="w-full h-[174px] object-cover rounded-[10px] border-[1px] border-black"
            onError={(e) => {
              e.currentTarget.srcset = '/no-photo.svg';
              e.currentTarget.src = '/no-photo.svg';
            }}
          />
          <div className="pt-[5px] p-[15px] flex flex-col flex-1">
            <div className="flex items-baseline justify-between">
              <h2 className="font-bold max-w-50 truncate overflow-hidden">
                {venue.name || 'No name'}
              </h2>
              <p>
                <i className="fa-solid fa-star mr-[5px]" aria-hidden="true"></i>
                {venue.rating === 0 ? ' None' : venue.rating}
              </p>
            </div>
            <p className="grey line-clamp-2">{venue.description}</p>
            <p className="grey">Max guests: {venue.maxGuests}</p>

            <p className="font-bold flex justify-between mt-auto">
              Price per night:
              <span className="underline ml-[5px]">{venue.price} NOK</span>
            </p>
          </div>
        </Link>
        <SaveVenueButton venue={venue} />
      </div>
    </div>
  );
}
