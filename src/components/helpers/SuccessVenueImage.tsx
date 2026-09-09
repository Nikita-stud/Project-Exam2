'use client';
import Image from 'next/image';
import { BLUR_DATA_URL } from './blurDataUrl';

export default function SuccessVenueImage({ image }: { image?: string }) {
  return (
    <Image
      src={image || '/no-photo.svg'}
      alt="Venue image"
      fill
      sizes="(min-width: 744px) 50vw, 100vw"
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      className="object-cover rounded-[10px] border-[1px] border-black"
      onError={(e) => {
        e.currentTarget.srcset = '/no-photo.svg';
        e.currentTarget.src = '/no-photo.svg';
      }}
    />
  );
}
