import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import AuthStore from '@/store/authStore';

export default function ProfileLinks({
  venueManager,
  onClose,
}: {
  venueManager: boolean;
  onClose?: () => void;
}) {
  const logout = AuthStore((store) => store.clearAuth);

  const middleLink = venueManager
    ? { href: 'profile/venues', label: 'My Venues', icon: '' }
    : {
        href: 'profile/bookings',
        label: 'My Bookings',
        icon: 'fa-regular fa-calendar',
      };

  const navLinks = [
    {
      href: 'profile/edit',
      label: 'Edit Profile',
      icon: 'fa-regular fa-pen-to-square',
    },
    middleLink,
    {
      href: '/',
      label: 'Logout',
      icon: 'fa-solid fa-arrow-right-from-bracket',
    },
  ];

  const links = (
    <div className="flex flex-col justify-between gap-[30px] mt-[30px] mb-[10px]">
      {navLinks.map((link) =>
        link.label !== 'Logout' ? (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center"
          >
            <span className="flex justify-between w-full items-center">
              <span className="flex w-5 justify-center shrink-0">
                {link.label === 'My Venues' ? (
                  <Image src="/auth-logo.png" alt="" width={20} height={20} />
                ) : (
                  <i className={`${link.icon} text-[20px]`}></i>
                )}
              </span>
              <span className="profile-links">{link.label}</span>
              <i
                className="fa-regular fa-circle-right text-2xl"
                aria-hidden="true"
              ></i>
            </span>
          </Link>
        ) : (
          <button
            key={link.href}
            onClick={logout}
            className="flex flex-col items-center"
          >
            <span className="flex justify-between w-full items-center">
              <i className={`${link.icon} text-[20px] text-[#e03a2f]`}></i>
              <span className="profile-links ml-[-60px] text-[#e03a2f]">
                {link.label}
              </span>
              <i className="opacity-0"></i>
            </span>
          </button>
        ),
      )}
    </div>
  );

  if (!onClose) {
    return links;
  }

  const gear = document.getElementById('gear');

  if (!gear) {
    return null;
  }

  return (
    <>
      {createPortal(
        <div className="fixed inset-0 z-[100]" onClick={onClose} />,
        document.body,
      )}
      {createPortal(
        <div className="absolute top-[-250px] right-[-195px] z-[101]">
          <div className="absolute bg-white shadow-page rounded-[10px] p-[20px] top-[278px] mr-[128px] right-[50px] w-[220px]">
            <div className="absolute -top-[8px] right-[20px] w-[20px] h-[-90px] border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
            {links}
          </div>
        </div>,
        gear,
      )}
    </>
  );
}
