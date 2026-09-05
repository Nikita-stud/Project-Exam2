import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import registerUser from '@/api/auth/registerUser';
import {
  registerFormSchema,
  type RegisterData,
} from '@/schemas/registerFormSchema';
import ErrorMessage from '@/components/helpers/ErrorMessage';
import FieldError from '@/components/helpers/FieldError';

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onBlur',
  });

  const [name, email, password] = watch(['name', 'email', 'password']);
  const isEmpty = !name || !email || !password;
  const hasErrors = Object.keys(errors).length > 0;

  useEffect(() => {
    setErrorMessage(null);
    setCanSubmit(true);
  }, [name, email, password]);

  const onSubmit = async (data: RegisterData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await registerUser(data);
      setIsSuccess(true);
      setTimeout(() => onSwitch(), 1500);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Registration failed',
      );
      setCanSubmit(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSuccess && (
        <div className="p-[20px] bg-icons border rounded-[10px] flex flex-col gap-2 justify-center align-middle animate-pulse w-full max-w-125 mx-auto">
          <p role="status" className="text-black font-bold text-center text-xl">
            Registration Successful!
          </p>
          <p className="m-auto">Redirecting to Login...</p>
        </div>
      )}
      <ErrorMessage
        message={errorMessage}
        className="w-full max-w-125 mx-auto mb-[10px]"
      />
      {!isSuccess && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-1.25 md:items-start md:w-full"
        >
          <div className="relative flex flex-col gap-2 w-full max-w-125 md:max-w-none md:col-start-1 md:row-start-1">
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
            <FieldError id="name-error" message={errors.name?.message} />
          </div>

          <div className="relative flex flex-col gap-2 mt-[5px] w-full max-w-125 md:mt-0 md:max-w-none md:col-start-2 md:row-start-1">
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
            <FieldError id="email-error" message={errors.email?.message} />
          </div>

          <div className="flex flex-col gap-2 mt-[5px] w-full max-w-125 md:mt-0 md:max-w-none md:col-start-2 md:row-start-2">
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
              <FieldError
                id="password-error"
                message={errors.password?.message}
              />
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

          <div className="flex flex-col gap-2 w-full max-w-125 mt-[5px] md:mt-0 md:max-w-none md:col-start-1 md:row-start-2 ">
            <p className="font-semibold text-calm md:text-base">
              Role{' '}
              <i
                className="fa-solid fa-asterisk text-[10px]! align-super"
                aria-hidden="true"
              ></i>
            </p>
            <div className="flex gap-2 mt-[-5px]">
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
            disabled={isSubmitting || isEmpty || hasErrors || !canSubmit}
            className="continue-auth-cta mt-[30px] m-auto font-bold md:col-span-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Register
          </button>
        </form>
      )}

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
