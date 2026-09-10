'use client';

import Image from 'next/image';
import Link from 'next/link';
import BackNav from '@/components/ui/BackNav';
import ErrorMessage from '@/components/helpers/ErrorMessage';

export default function VenueIdError({ error }: { error: Error }) {
  return (
    <>
      <BackNav />
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-[20px] px-[20px] text-center">
        <Image
          src="/auth-logo.png"
          alt="Logo"
          loading="eager"
          width={120}
          height={130}
          className="w-[120px] h-[130px]"
        />
        <ErrorMessage message={error.message || 'Failed to fetch venue'} />
        <Link href="/" className="cta-primary-full">
          Back to venues page
          <i
            className="fa-regular fa-circle-right ml-[5px]"
            aria-hidden="true"
          ></i>
        </Link>
      </div>
    </>
  );
}
