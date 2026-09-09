'use client';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Error || Holidaze',
  description: 'Something went wrong. Please try again later.',
};

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="/auth-logo.png"
        alt="Logo"
        loading="eager"
        width={120}
        height={130}
        className="w-[120px] h-[130px]"
      />
      <h1 className="text-dark mt-[20px]">Something went wrong!</h1>
      <button
        className="cta-primary mt-[20px] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
