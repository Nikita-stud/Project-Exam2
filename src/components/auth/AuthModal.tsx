'use client';

import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import type { PopupProps } from '@/types';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthModal({ onClose }: PopupProps) {
  const [activePopup, setActivePopup] = useState<'login' | 'register'>('login');

  return createPortal(
    <div className="fixed inset-0 z-[1001] bg-black/60" onClick={onClose}>
      <section
        className="z-[1002] fixed bg-[#fff] shadow-page p-5 flex flex-col overflow-y-auto
          w-full top-[87px] left-0 h-[calc(100%-87px)] rounded-t-[10px]
          md:w-96 md:h-auto md:max-h-[90vh] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="flex cursor-pointer justify-end" onClick={onClose}>
          <span className="hidden">Close</span>
          <i className="fa-solid fa-xmark text-[35px]!"></i>
        </p>
        <div className="flex flex-col items-center gap-4 mb-[20px]">
          <Image src="/auth-logo.png" alt="Logo" width={80} height={80} />
          <h2 className="font-bold">
            {activePopup === 'login' ? 'Login' : 'Register'}
          </h2>
        </div>

        {activePopup === 'login' ? (
          <LoginForm
            onClose={onClose}
            onSwitch={() => setActivePopup('register')}
          />
        ) : (
          <RegisterForm onSwitch={() => setActivePopup('login')} />
        )}

        <div className="flex-1 min-h-[50px]" />
        <div className="flex flex-col items-center gap-1 text-gray-500">
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
