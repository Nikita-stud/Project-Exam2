import { useEffect, useState } from 'react';
import { fetchManagerVenues } from '@/api/bookings/fetchManagerVenues';
import type { Venue } from '@/types';

export default function ManagerVenues({ name }: { name: string }) {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    let active = true;
    fetchManagerVenues(name).then((data) => {
      if (active) setVenues(data);
    });
    return () => {
      active = false;
    };
  }, [name]);

  return (
    <>
      <h3>My Venues</h3>
      {venues.length === 0 ? (
        <p>You have no venues yet.</p>
      ) : (
        venues.map((b) => <div key={b.id}>{b.name}</div>)
      )}
    </>
  );
}
