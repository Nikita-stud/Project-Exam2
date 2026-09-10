'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { Venue } from '@/types';
import SaveVenueButton from './SaveVenueButton';
import { BLUR_DATA_URL } from '@/components/helpers/BlurDataUrl';

export default function VenueImages({
  venue,
  images,
}: {
  venue: Venue;
  images: Venue['media'];
}) {
  const [position, setPosition] = useState<number>(0);
  const activeImage = images[position];

  const goBack = () => {
    if (position === 0) {
      setPosition(images.length - 1);
    } else {
      setPosition(position - 1);
    }
  };

  const showNext = () => {
    if (position === images.length - 1) {
      setPosition(0);
    } else {
      setPosition(position + 1);
    }
  };

  return (
    <div className="relative w-full mb-[20px]">
      <Image
        src={activeImage?.url || '/no-photo.svg'}
        alt={activeImage?.alt || venue.name}
        width={350}
        height={260}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="w-full h-[260px] object-cover rounded-[10px] lg:h-[463px]"
        onError={(e) => {
          e.currentTarget.srcset = '/no-photo.svg';
          e.currentTarget.src = '/no-photo.svg';
        }}
      />
      <SaveVenueButton venue={venue} />
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goBack}
            className="cta-image-nav left-[20px]"
          >
            <span className="hidden">Previous image</span>
            <i
              className="fa-solid fa-chevron-left text-white"
              aria-hidden="true"
            ></i>
          </button>
          <button
            type="button"
            onClick={showNext}
            className="cta-image-nav right-[20px]"
          >
            <span className="hidden">Next image</span>
            <i
              className="fa-solid fa-chevron-right text-white"
              aria-hidden="true"
            ></i>
          </button>
        </>
      )}
    </div>
  );
}
