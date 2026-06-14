'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PopupProps } from '@/types';

export default function AuthModal({ isOpen, onClose }: PopupProps) {
  if (!isOpen) return null;

  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // In a real application, you would submit the form data to an API here

    // After successful submission, navigate to the thank you page
    router.push('/');
  };

  return (
    <section className="w-96 h-96 bg-amber-400 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p onClick={onClose}>
        <span className="hidden">Close</span>
        <i className="fa-solid fa-xmark w-[25px] h-[25px]"></i>
      </p>

      <img src="/auth-logo.png" alt="Logo" />

      <h2>Log in or sign up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email address: <i class="fa-solid fa-asterisk"></i>
          </label>
          <input
            id="email"
            type="email"
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Continue</button>
      </form>
    </section>
  );
}
