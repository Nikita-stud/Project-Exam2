'use client';

import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import type { LoginModalProps } from '@/types';
import { useRouter } from 'next/navigation';

export default function LoginModal({
  isOpen,
  onClose,
  onOpenRegister,
}: LoginModalProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.replace('/');
  };

  const handleOpenRegister = () => {
    onClose();
    onOpenRegister();
  };

  return createPortal(
    <div className="fixed inset-0 z-[1001] bg-text/60 " onClick={onClose}>
      <section
        className="z-[1002] fixed bg-[#fff] shadow-page p-5 flex flex-col overflow-y-auto
          w-full top-[87px] left-0 h-[calc(100%-87px)] rounded-t-[10px]
          md:w-96 md:h-auto md:max-h-[90vh] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <p onClick={onClose} className="flex cursor-pointer justify-end">
          <span className="hidden">Close</span>
          <i className="fa-solid fa-xmark text-[35px]!"></i>
        </p>
        <div className="flex flex-col items-center gap-4 mb-[20px]">
          <Image src="/auth-logo.png" alt="Logo" width={80} height={80} />
          <h2 className="font-bold">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex flex-col gap-2 w-full max-w-125">
            <label htmlFor="email" className="font-semibold">
              Email address{' '}
              <i className="fa-solid fa-asterisk text-[10px]! align-super"></i>
            </label>
            <input
              id="email"
              type="email"
              placeholder="myemail@stud.noroff.no"
              required
              className="h-[58px] w-full border rounded-[10px] pl-5 color-calm"
            />
          </div>
          <div className="flex flex-col gap-2 mt-[5px] w-full max-w-125">
            <label htmlFor="password" className="font-semibold">
              Password
              <i className="fa-solid fa-asterisk text-[10px]! ml-1 align-super"></i>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Your password"
                required
                className="h-14.5 w-full border rounded-[10px] pl-5 pr-12 color-calm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((toggle) => !toggle)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-calm"
              >
                <i
                  className={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                ></i>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="continue-auth-cta mt-5 m-auto font-bold"
          >
            Login
          </button>
        </form>
        <div className="flex flex-col items-center mt-4 gap-2">
          <div className="flex items-center justify-center w-full gap-3">
            <hr className="w-[70px] border-calm" />
            <p>or</p>
            <hr className="w-[70px] border-calm" />
          </div>
          <button
            onClick={handleOpenRegister}
            className="color-secondary hover:opacity-80 hover:underline"
          >
            Create new account
          </button>
        </div>
        <div className="flex flex-col items-center mt-auto gap-1 text-gray-500">
          <p>All rights reserved</p>
          <p>
            Copyright {new Date().getFullYear()}
            <i className="fa-solid fa-minus text-[10px]! align-[20%]"></i>{' '}
            Holidaze
          </p>
        </div>
      </section>
    </div>,
    document.body,
  );
}
