'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import type { PopupProps } from '@/types';

export default function RegisterModal({ isOpen, onClose }: PopupProps) {
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[1001] bg-black/60"
      onClick={onClose}
    >
      <section
        className="z-[1002] fixed bg-[#fff] shadow-page p-5 flex flex-col overflow-y-auto
          w-full top-[87px] left-0 h-[calc(100%-87px)] rounded-none
          md:w-96 md:h-auto md:max-h-[90vh] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <p onClick={onClose} className="flex cursor-pointer justify-end">
          <span className="hidden">Close</span>
          <i className="fa-solid fa-xmark text-3xl"></i>
        </p>
        <div className="flex flex-col items-center gap-4">
          <Image src="/auth-logo.png" alt="Logo" width={100} height={100} />
          <h2>Register</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col gap-2">
            <label htmlFor="reg-name" className="font-semibold">
              Name{' '}
              <i className="fa-solid fa-asterisk text-[10px]! align-super"></i>
            </label>
            <input
              id="reg-name"
              type="text"
              placeholder="Your name"
              required
              className="h-[58px] border rounded-[10px] pl-[20px] color-calm"
            />
          </div>
          <div className="flex flex-col gap-2 mt-[5px]">
            <label htmlFor="reg-email" className="font-semibold">
              Email address{' '}
              <i className="fa-solid fa-asterisk text-[10px]! align-super"></i>
            </label>
            <input
              id="reg-email"
              type="email"
              placeholder="myemail@stud.noroff.no"
              required
              className="h-[58px] border rounded-[10px] pl-[20px] color-calm"
            />
          </div>
          <div className="flex flex-col gap-2 mt-[5px]">
            <label htmlFor="reg-password" className="font-semibold">
              Password{' '}
              <i className="fa-solid fa-asterisk text-[10px]! align-super"></i>
            </label>
            <input
              id="reg-password"
              type="password"
              placeholder="Your password"
              required
              className="h-[58px] border rounded-[10px] pl-[20px] color-calm"
            />
          </div>
          <button type="submit" className="continue-auth-cta mt-5 m-auto">
            Register
          </button>
        </form>
        <div className="flex flex-col items-center mt-auto text-sm text-gray-500">
          <p>All rights reserved</p>
          <p>Copyright {new Date().getFullYear()} - Holidaze</p>
        </div>
      </section>
    </div>,
    document.body,
  );
}
