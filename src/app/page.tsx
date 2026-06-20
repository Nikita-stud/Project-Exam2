import Image from 'next/image';
import Link from 'next/link';
import fetchVenues from '@/api/venues/fetchVenues';

export default async function Home() {
  const venues = await fetchVenues();

  return (
    <div>
      <h1>Venues</h1>
      <p>Best venues</p>

      {venues && venues.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {venues.map((venue) => (
            <li
              key={venue.id}
              style={{
                marginBottom: '20px',
                border: '1px solid #ccc',
                padding: '10px',
              }}
            >
              <h2>{venue.name}</h2>
              {venue.media[0]?.url && (
                <Image
                  src={venue.media[0].url}
                  alt={venue.media[0].alt || venue.name}
                  width={200}
                  height={150}
                  style={{ objectFit: 'cover' }}
                />
              )}
              <p>Price: {venue.price} NOK / night</p>
              <p>Max guests: {venue.maxGuests}</p>
              <p>Rating: {venue.rating}</p>
              <Link href={`/venue/${venue.id}`}>View venue</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Venues found</p>
      )}
    </div>
  );
}
