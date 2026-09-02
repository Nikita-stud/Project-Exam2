'use client';

import { useState } from 'react';
import type { Venue } from '../../types/index';
import VenueStore from '../../store/venueStore';
import AuthStore from '../../store/authStore';
import AuthModal from '../auth/AuthModal';

export default function SaveVenueButton({ venue }: { venue: Venue }) {
  const isSaved = VenueStore((state) => state.isSaved(venue.id));
  const saveVenue = VenueStore((state) => state.saveVenue);
  const removeVenue = VenueStore((state) => state.removeVenue);
  const token = AuthStore((store) => store.token);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (!token) {
            setIsOpen(true);
            return;
          }
          if (isSaved) {
            removeVenue(venue.id);
          } else {
            saveVenue(venue);
          }
        }}
        className="absolute flex items-center  justify-center w-[50px] h-[50px] bg-calm  rounded-full top-[20px] right-[20px]"
      >
        <i
          className={`fa-heart
             ${isSaved ? 'fa-solid text-primary' : 'fa-regular text-white'}`}
          aria-hidden="true"
        ></i>
      </button>
      {isOpen && <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
}
