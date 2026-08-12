'use client';
import AuthStore from '@/store/authStore';
import ManagerVenues from '@/components/profile/ManagerVenues';
import UserBookings from '@/components/profile/UserBookings';
import Image from 'next/image';

export default function ProfilePage() {
  const user = AuthStore((store) => store.user);

  if (!user) {
    return null;
  }

  return (
    <div className="p-[20px]">
      <section>
        <div className="relative">
          <Image
            src={user.avatar.url || '/no-photo.svg'}
            alt={user.avatar.alt || 'Profile banner'}
            width={220}
            height={200}
            loading="eager"
            className="w-full h-[200px] object-fill rounded-[10px]"
          />
          <Image
            src={user.avatar.url}
            alt={user.avatar.alt}
            width={150}
            height={150}
            loading="eager"
            className="w-[150px] h-[150px] absolute bottom-[-20px] left-1/2 -translate-x-1/2 object-fill rounded-full"
          />
        </div>
        <section className="mt-[20px] flex justify-between items-start">
          <div>
            <h1>{user.name}</h1>
            <p className="text-[#455a61]">{user.email}</p>
            <p className="mt-[20px]">
              {user.bio !== null
                ? '"Create your own bio in your edit profile page"'
                : user.bio}
            </p>
          </div>
          <div className="mt-[8px] absolute right-[20px]">
            {user.venueManager ? <h2>MANAGER</h2> : <h2>USER</h2>}
          </div>
        </section>
      </section>

      <section className="mt-[30px]">
        {user.venueManager ? (
          <ManagerVenues name={user.name} />
        ) : (
          <UserBookings name={user.name} />
        )}
      </section>
    </div>
  );
}
