'use client';

import { useState } from 'react';
import type { Venue } from '../../types/index';
import Image from 'next/image';
import Link from 'next/link';
import VenueStore from '../../store/venueStore';
import AuthStore from '../../store/authStore';
import AuthModal from '../auth/AuthModal';

export default function VenueCard({ venue }: { venue: Venue }) {
  const isSaved = VenueStore((state) => state.isSaved(venue.id));
  const saveVenue = VenueStore((state) => state.saveVenue);
  const removeVenue = VenueStore((state) => state.removeVenue);
  const token = AuthStore((store) => store.token);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card rounded-[10px] overflow-hidden p-[5px]">
      <div className="relative">
        <Link href={`/venue/${venue.id}`}>
          <Image
            src={venue.media[0]?.url || '/no-photo.svg'}
            alt={venue.media[0]?.alt || venue.name}
            width={350}
            height={174}
            className="w-full h-[174px] object-cover rounded-[10px] border"
          />
          <div className="pt-[5px]">
            <div className="flex items-baseline justify-between">
              <h2 className="font-bold max-w-50 truncate overflow-hidden">
                {venue.name}
              </h2>
              {venue.rating === 0 ? (
                ''
              ) : (
                <p>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>{' '}
                  {venue.rating}
                </p>
              )}
            </div>
            <p className="grey line-clamp-2">{venue.description}</p>
            <p className="grey">Max guests: {venue.maxGuests}</p>

            <p className="font-bold flex justify-between">
              Price per night:{' '}
              <span className="underline">{venue.price} NOK</span>
            </p>
          </div>
        </Link>
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
      </div>
      {isOpen && <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </div>
  );
}
