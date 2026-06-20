'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import type { PopupProps } from '@/types';
import { useRouter } from 'next/navigation';

export default function AuthModal({ isOpen, onClose }: PopupProps) {
  if (!isOpen) return null;
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.replace('/');
  };

  return createPortal(
    <section className="z-1000 fixed w-96 h-96 bg-amber-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-[10px]">
      <p
        onClick={onClose}
        className="flex cursor-pointer justify-end text-[25px]"
      >
        <span className="hidden">Close</span>
        <i className="fa-solid fa-xmark"></i>
      </p>
      <div className="flex flex-col items-center gap-4">
        <Image src="/auth-logo.png" alt="Logo" width={100} height={100} />
        <h2>Log in or sign up</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">
            Email address: <i className="fa-solid fa-asterisk"></i>
          </label>
          <input id="email" type="email" required />
        </div>
        <button type="submit" className="continue-auth-cta mt-5 m-auto">
          Continue
        </button>
      </form>
    </section>,
    document.body,
  );
}
