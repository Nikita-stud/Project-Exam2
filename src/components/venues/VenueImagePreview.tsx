import Image from 'next/image';
import { BLUR_DATA_URL } from '@/components/helpers/BlurDataUrl';
import { isValidImageSrc } from '@/utils/isValidImageSrc';

export default function VenueImagePreview({
  src,
  alt,
}: {
  src?: string;
  alt: string;
}) {
  return (
    <div className="relative h-[200px] mb-[-5px] md:mb-0 md:h-full md:w-full md:col-start-1 md:col-span-3 md:row-start-1">
      <Image
        src={isValidImageSrc(src) ? src! : '/no-photo.svg'}
        alt={alt}
        fill
        sizes="(min-width: 744px) 50vw, 100vw"
        loading="eager"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        onError={(e) => {
          e.currentTarget.srcset = '/no-photo.svg';
          e.currentTarget.src = '/no-photo.svg';
        }}
        className="object-cover rounded-[10px]"
      />
    </div>
  );
}
