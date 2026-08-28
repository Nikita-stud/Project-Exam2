'use client';
import { useState } from 'react';
import AuthStore from '@/store/authStore';
import ManagerVenues from '@/components/profile/ManagerVenues';
import UserBookings from '@/components/profile/UserBookings';
import ProfileLinks from '@/components/profile/ProfileLinks';
import Image from 'next/image';

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);

  const user = AuthStore((store) => store.user);

  if (!user) {
    return null;
  }

  return (
    <div className="p-[20px] md:p-0">
      <section>
        <div className="relative h-[200px] md:h-[260px]">
          <Image
            src={user.banner.url || '/no-photo.svg'}
            alt={user.banner.alt || 'Profile banner'}
            fill
            sizes="100vw"
            loading="eager"
            className="object-fill rounded-[10px] md:rounded-[0px]"
          />
          <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[150px] h-[150px] md:left-[50px] md:translate-x-0 md:bottom-[-90px] md:w-[200px] md:h-[200px]">
            <Image
              src={user.avatar.url || '/no-photo.svg'}
              alt={user.avatar.alt || 'Avatar image'}
              fill
              sizes="200px"
              loading="eager"
              className="object-fill rounded-full ring-[5px] ring-white md:ring-[10px]"
            />
          </div>
        </div>
        <section className="mt-[20px] flex justify-between items-start md:px-[50px] md:mt-[0px]">
          <div className="min-w-0 wrap-break-word">
            <div className="md:ml-[215px]">
              <h1>{user.name}</h1>
              <p className="text-[#455a61]">{user.email}</p>
            </div>
            <p className="mt-[20px] md:mt-[50px]">
              {user.bio !== null
                ? user.bio
                : '"Create your own bio in your edit profile page"'}
            </p>
          </div>
          <div className="mt-[8px] absolute right-[20px] md:right-[50px] flex items-center gap-[10px]">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="hidden md:inline-flex"
              aria-label="Open profile menu"
            >
              <i className="fa-solid fa-gear text-[20px]" id="gear"></i>
            </button>
            {user.venueManager ? <h2>MANAGER</h2> : <h2>USER</h2>}
          </div>
          {isOpen && (
            <ProfileLinks
              venueManager={user.venueManager}
              onClose={() => setIsOpen(false)}
            />
          )}
        </section>
      </section>

      <section className="mt-[30px] md:px-[50px]">
        {user.venueManager ? (
          <ManagerVenues name={user.name} />
        ) : (
          <UserBookings name={user.name} />
        )}
      </section>

      <div className="md:hidden">
        <ProfileLinks venueManager={user.venueManager} />
      </div>
    </div>
  );
}
