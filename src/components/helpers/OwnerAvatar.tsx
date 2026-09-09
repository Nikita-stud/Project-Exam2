'use client';
import Image from 'next/image';
import { BLUR_DATA_URL } from './BlurDataUrl';

export default function OwnerAvatar({
  image,
  alt,
}: {
  image?: string;
  alt: string;
}) {
  return (
    <Image
      src={image || '/no-photo.svg'}
      alt={alt}
      width={40}
      height={40}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      className="w-[40px] h-[40px] rounded-full object-cover"
      onError={(e) => {
        e.currentTarget.srcset = '/no-photo.svg';
        e.currentTarget.src = '/no-photo.svg';
      }}
    />
  );
}
