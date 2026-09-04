'use client';
import { useState } from 'react';
import AuthStore from '@/store/authStore';
import ManagerVenues from '@/components/profile/ManagerVenues';
import UserBookings from '@/components/profile/UserBookings';
import ProfileLinks from '@/components/profile/ProfileLinks';
import ProfileHeroImages from '@/components/profile/ProfileHeroImages';

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);

  const user = AuthStore((store) => store.user);

  if (!user) {
    return null;
  }

  return (
    <div className="p-[20px] md:p-0">
      <section>
        <ProfileHeroImages banner={user.banner} avatar={user.avatar} />
        <section className="relative mt-[20px] flex justify-between items-start md:px-[50px] md:mt-[0px]">
          <div className="min-w-0 wrap-break-word">
            <div className="md:ml-[215px]">
              <h1 className="">
                {user.name.length > 9
                  ? `${user.name.slice(0, 9)}...`
                  : user.name}
              </h1>
              <p className="text-[#455a61]">{user.email}</p>
            </div>
            <p className="mt-[20px] md:mt-[50px]">
              {user.bio !== null
                ? user.bio
                : '"Create your own bio in your edit profile page"'}
            </p>
          </div>
          <div className="mt-[8px] absolute right-[20px] md:right-[50px] flex items-center ">
            <h2 className="md:mr-[15px]">
              {user.venueManager ? 'MANAGER' : 'USER'}
            </h2>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="hidden md:inline-flex"
              aria-label="Open profile menu"
            >
              <i className="fa-solid fa-gear text-[25px]" id="gear"></i>
            </button>
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
