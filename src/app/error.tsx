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
        width={100}
        height={100}
        className="w-[120px] h-[130px]"
      />
      <h1 className="text-dark mt-[20px]">Something went wrong!</h1>
      <button
        className="login-cta mt-[20px] flex h-[43px] w-[166px] items-center justify-center rounded-[10px] bg-primary font-semibold text-white transition-colors hover:opacity-90 md:h-[58px] md:w-[320px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
