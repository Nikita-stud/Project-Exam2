import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import registerUser from '@/api/auth/registerUser';
import focusFirstError from './ErrorField';
import {
  registerFormSchema,
  type RegisterData,
} from '@/schemas/registerFormSchema';

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterData) => {
    setIsSubmitting(true);
    try {
      await registerUser(data);
      onSwitch(); // back to login on success
    } catch (error) {
      console.error('Registration failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, focusFirstError)}
        className="flex flex-col items-center"
      >
        <div className="relative flex flex-col gap-2 w-full max-w-125">
          <label htmlFor="name" className="font-semibold">
            Name{' '}
            <i
              className="fa-solid fa-asterisk text-[10px]! align-super"
              aria-hidden="true"
            ></i>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby="name-error"
            {...register('name')}
            className="h-[58px] w-full border rounded-[10px] pl-[20px] color-calm"
          />
          {errors.name && (
            <p
              id="name-error"
              role="alert"
              className="text-primary absolute top-full end-0 text-sm mb-0"
            >
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="relative flex flex-col gap-2 mt-[5px] w-full max-w-125">
          <label htmlFor="email" className="font-semibold">
            Email address{' '}
            <i
              className="fa-solid fa-asterisk text-[10px]! align-super"
              aria-hidden="true"
            ></i>
          </label>
          <input
            id="email"
            type="email"
            placeholder="myemail@stud.noroff.no"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby="email-error"
            {...register('email')}
            className="h-[58px] w-full border rounded-[10px] pl-5 color-calm"
          />
          {errors.email && (
            <p
              id="email-error"
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
            <i
              className="fa-solid fa-asterisk text-[10px]! ml-1 align-super"
              aria-hidden="true"
            ></i>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password"
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby="password-error"
              {...register('password')}
              className="h-14.5 w-full border rounded-[10px] pl-5 pr-12 color-calm"
            />
            {errors.password && (
              <p
                id="password-error"
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

        <div className="flex flex-col gap-2 w-full max-w-125 mt-[5px]">
          <p className="font-semibold">
            Role{' '}
            <i
              className="fa-solid fa-asterisk text-[10px]! align-super"
              aria-hidden="true"
            ></i>
          </p>
          <div className="flex gap-2">
            <label className="flex flex-1 h-[58px] items-center justify-center border rounded-[10px] cursor-pointer font-medium has-[:checked]:bg-text has-[:checked]:text-white!">
              <input
                type="radio"
                name="role"
                className="sr-only"
                defaultChecked
                onChange={() => setValue('venueManager', false)}
              />
              User
            </label>
            <label className="flex flex-1 h-[58px] items-center justify-center border rounded-[10px] cursor-pointer font-medium has-[:checked]:bg-text has-[:checked]:text-white!">
              <input
                type="radio"
                name="role"
                className="sr-only"
                onChange={() => setValue('venueManager', true)}
              />
              Venue Manager
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="continue-auth-cta mt-[30px] m-auto font-bold"
        >
          Register
        </button>
      </form>

      <div className="flex flex-col items-center mt-4 gap-2">
        <div className="flex items-center justify-center w-full gap-3">
          <hr className="w-[70px] border-calm" />
          <p>or</p>
          <hr className="w-[70px] border-calm" />
        </div>
        <button
          type="button"
          onClick={onSwitch}
          className="color-secondary hover:opacity-80 hover:underline"
        >
          Log in instead
        </button>
      </div>
    </>
  );
}
