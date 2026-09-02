import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Page || Holidaze',
  description:
    'This page does not exist. Please check the URL or return to the home page.',
};

export default function NotFound() {
  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center px-6 text-center">
      <Image src="/text-logo.png" alt="Logo" width={160} height={100} />
      <h1 className="mt-[20px] font-semibold text-slate-900">
        404 Page not found
      </h1>
      <p className="mt-[20px] text-slate-600">
        Sorry, that page does not exist
      </p>
      <Link
        href="/"
        className="mt-[20px] flex items-center justify-center gap-2 bg-[var(--color-primary)] text-[var(--color-white)] rounded-[10px] w-[179px] h-[48px] text-sm font-medium md:text-xl"
      >
        Back to home
      </Link>
    </div>
  );
}
