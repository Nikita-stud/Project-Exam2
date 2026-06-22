import Link from 'next/link';
import Image from 'next/image';
import fetchVenue from '@/api/venues/fetchVenue';

import type { VenuePageType } from '@/types';

export default async function VenuePage({ params }: VenuePageType) {
  const { venueId } = await params;
  const venue = await fetchVenue(venueId);

  return (
    <div>
      <Link href="/" style={{ display: 'block', marginBottom: '20px' }}>
        &larr; Back to all venues
      </Link>
      <h1>{venue.name}</h1>
      <Image
        src={venue.media[0]?.url || ''}
        alt={venue.media[0]?.alt || venue.name}
        width={400}
        height={300}
        style={{ maxWidth: '400px', height: 'auto', marginBottom: '20px' }}
      />
      <p>
        <strong>Whats up:</strong> {venue.description}
      </p>
    </div>
  );
}
