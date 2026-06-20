import Link from 'next/link';
import Image from 'next/image';
import type { VenuePageType, VenueResponse } from '@/types';
import { VENUES_API_URL } from '../../../constants/api';

export default async function VenuePage({ params }: VenuePageType) {
  const { venueId } = await params;

  const response = await fetch(`${VENUES_API_URL}/${venueId}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return <p>Venue with ID &quot;{venueId}&quot; was not found.</p>;
    }
    console.error(`Failed to fetch game ${venueId}:`, response.statusText);
    return <p>Could not load the venue, please try again later</p>;
  }

  const result: VenueResponse = await response.json();
  const venue = result.data;

  if (!venue) {
    return <p>Venue data is not available.</p>;
  }

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
