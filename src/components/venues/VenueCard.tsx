'use client';

import type { Venue } from '../../types/index';
import Image from 'next/image';
import Link from 'next/link';
import SaveVenueButton from './SaveVenueButton';

export default function VenueCard({ venue }: { venue: Venue }) {
  return (
    <div className="card rounded-[10px] overflow-hidden">
      <div className="relative">
        <Link href={`/venue/${venue.id}`}>
          <Image
            src={venue.media[0]?.url || '/no-photo.svg'}
            alt={venue.media[0]?.alt || venue.name}
            width={350}
            height={174}
            className="w-full h-[174px] object-cover rounded-[10px] border-[1px] border-black"
          />
          <div className="pt-[5px] p-[15px]">
            <div className="flex items-baseline justify-between">
              <h2 className="font-bold max-w-50 truncate overflow-hidden">
                {venue.name}
              </h2>
              <p>
                <i className="fa-solid fa-star" aria-hidden="true"></i>{' '}
                {venue.rating === 0 ? ' None' : venue.rating}
              </p>
            </div>
            <p className="grey line-clamp-2">{venue.description}</p>
            <p className="grey">Max guests: {venue.maxGuests}</p>

            <p className="font-bold flex justify-between">
              Price per night:{' '}
              <span className="underline">{venue.price} NOK</span>
            </p>
          </div>
        </Link>
        <SaveVenueButton venue={venue} />
      </div>
    </div>
  );
}
