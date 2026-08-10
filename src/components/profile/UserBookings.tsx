import { fetchUserBookings } from '@/api/bookings/fetchUserBookings';
import { Booking } from '@/types';
import { useEffect, useState } from 'react';

export default function UserBookings({ name }: { name: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    let active = true;
    fetchUserBookings(name).then((data) => {
      if (active) setBookings(data);
    });
    return () => {
      active = false;
    };
  }, [name]);

  return (
    <>
      <h3>My Bookings</h3>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        bookings.map((b) => <div key={b.id}>{b.venue.name}</div>)
      )}
    </>
  );
}
