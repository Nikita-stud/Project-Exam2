'use client';

import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { PopupProps } from '@/types';
import loginUser from '@/api/auth/loginUser';
import registerUser from '@/api/auth/registerUser';
import { loginFormSchema, type LoginData } from '@/schemas/loginFormSchema';
import {
  registerFormSchema,
  type RegisterData,
} from '@/schemas/registerFormSchema';

export default function AuthModal({ onClose }: PopupProps) {
  const [activePopup, setActivePopup] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
  });
  const registerForm = useForm<RegisterData>({
    resolver: zodResolver(registerFormSchema),
  });

  const onError = (formErrors: FieldErrors<LoginData | RegisterData>) => {
    const firstErrorField = Object.keys(formErrors)[0];
    if (firstErrorField) {
      const fieldElement = document.getElementsByName(firstErrorField)[0];
      if (fieldElement) {
        fieldElement.focus();
      }
    }
  };

  const onLoginSubmit = async (data: LoginData) => {
    try {
      await loginUser(data);
      onClose();
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const onRegisterSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data);
      switchPopup('login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const switchPopup = (popup: 'login' | 'register') => {
    loginForm.reset();
    registerForm.reset();
    setActivePopup(popup);
  };

  const handleClose = () => {
    loginForm.reset();
    registerForm.reset();
    onClose();
  };

  const isLogin = activePopup === 'login';
  const errors = (isLogin ? loginForm : registerForm).formState.errors;

  return createPortal(
    <div className="fixed inset-0 z-[1001] bg-black/60 " onClick={handleClose}>
      <section
        className="z-[1002] fixed bg-[#fff] shadow-page p-5 flex flex-col overflow-y-auto
          w-full top-[87px] left-0 h-[calc(100%-87px)] rounded-t-[10px]
          md:w-96 md:h-auto md:max-h-[90vh] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="flex cursor-pointer justify-end" onClick={handleClose}>
          <span className="hidden">Close</span>
          <i className="fa-solid fa-xmark text-[35px]!"></i>
        </p>
        <div className="flex flex-col items-center gap-4 mb-[20px]">
          <Image src="/auth-logo.png" alt="Logo" width={80} height={80} />
          <h2 className="font-bold">
            {activePopup === 'login' && 'Login'}
            {activePopup === 'register' && 'Register'}
          </h2>
        </div>

        <form
          onSubmit={
            isLogin
              ? loginForm.handleSubmit(onLoginSubmit, onError)
              : registerForm.handleSubmit(onRegisterSubmit, onError)
          }
          className="flex flex-col items-center"
        >
          {activePopup === 'register' && (
            <div className="relative flex flex-col gap-2 w-full max-w-125">
              <label htmlFor="name" className="font-semibold">
                Name{' '}
                <i className="fa-solid fa-asterisk text-[10px]! align-super"></i>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                {...registerForm.register('name')}
                className="h-[58px] w-full border rounded-[10px] pl-[20px] color-calm"
              />
              {registerForm.formState.errors.name && (
                <p
                  id="nameError"
                  role="alert"
                  className="text-primary absolute top-full end-0 text-sm mb-0"
                >
                  {registerForm.formState.errors.name.message}
                </p>
              )}
            </div>
          )}
          <div className="relative flex flex-col gap-2 mt-[5px] w-full max-w-125">
            <label htmlFor="email" className="font-semibold">
              Email address{' '}
              <i className="fa-solid fa-asterisk text-[10px]! align-super"></i>
            </label>
            <input
              id="email"
              type="email"
              placeholder="myemail@stud.noroff.no"
              {...(isLogin
                ? loginForm.register('email')
                : registerForm.register('email'))}
              className="h-[58px] w-full border rounded-[10px] pl-5 color-calm"
            />
            {errors.email && (
              <p
                id="emailError"
                role="alert"
                className="text-primary absolute top-full end-0 text-sm mb-0"
              >
                {errors.email.message}
              </p>
            )}
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
                {...(isLogin
                  ? loginForm.register('password')
                  : registerForm.register('password'))}
                className="h-14.5 w-full border rounded-[10px] pl-5 pr-12 color-calm"
              />
              {errors.password && (
                <p
                  id="passwordError"
                  role="alert"
                  className="text-primary absolute top-full end-0 text-sm mb-0"
                >
                  {errors.password.message}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
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
            className="continue-auth-cta mt-[30px] m-auto font-bold"
          >
            {activePopup === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="flex flex-col items-center mt-4 gap-2">
          <div className="flex items-center justify-center w-full gap-3">
            <hr className="w-[70px] border-calm" />
            <p>or</p>
            <hr className="w-[70px] border-calm" />
          </div>
          {activePopup === 'login' && (
            <button
              type="button"
              onClick={() => switchPopup('register')}
              className="color-secondary hover:opacity-80 hover:underline"
            >
              Create new account
            </button>
          )}
          {activePopup === 'register' && (
            <button
              type="button"
              onClick={() => switchPopup('login')}
              className="color-secondary hover:opacity-80 hover:underline"
            >
              Log in instead
            </button>
          )}
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
