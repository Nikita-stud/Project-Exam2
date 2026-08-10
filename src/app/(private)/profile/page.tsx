'use client';
import AuthStore from '@/store/authStore';
import ManagerVenues from '@/components/profile/ManagerVenues';
import UserBookings from '@/components/profile/UserBookings';

export default function ProfilePage() {
  const user = AuthStore((store) => store.user);

  if (!user) {
    return null;
  }

  return (
    <div>
      <section>
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
        {user.venueManager ? <h2>MANAGER</h2> : <h2>USER</h2>}
      </section>

      <section>
        {user.venueManager ? (
          <ManagerVenues name={user.name} />
        ) : (
          <UserBookings name={user.name} />
        )}
      </section>
    </div>
  );
}
