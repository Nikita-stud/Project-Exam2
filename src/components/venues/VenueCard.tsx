import type { Venue } from '../../types/index';
import Image from 'next/image';
import Link from 'next/link';

export default function VenueCard({ venue }: { venue: Venue }) {
  return (
    <div className="card rounded-[10px] overflow-hidden p-[5px]">
      <Link href={`/venue/${venue.id}`}>
        <Image
          src={venue.media[0]?.url || '/no-photo.svg'}
          alt={venue.media[0]?.alt || venue.name}
          width={350}
          height={174}
          className="w-full h-[174px] object-cover rounded-[10px] border"
        />
        <div className="pt-[5px]">
          <div className="flex items-baseline justify-between">
            <h2 className="font-bold max-w-50 truncate overflow-hidden">
              {venue.name}
            </h2>
            {venue.rating === 0 ? (
              ''
            ) : (
              <p>
                <i className="fa-solid fa-star" suppressHydrationWarning></i>{' '}
                {venue.rating}
              </p>
            )}
          </div>
          <p className="grey line-clamp-2">{venue.description}</p>
          <p className="grey">Max guests: {venue.maxGuests}</p>

          <p className="font-bold flex justify-between">
            Total price: <span className="underline">{venue.price} NOK</span>
          </p>
        </div>
      </Link>
    </div>
  );
}
