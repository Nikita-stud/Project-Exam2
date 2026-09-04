import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import loginUser from '@/api/auth/loginUser';
import { loginFormSchema, type LoginData } from '@/schemas/loginFormSchema';
import { LoginFormProps } from '@/types';

export default function LoginForm({ onClose, onSwitch }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onBlur',
  });

  const [email, password] = watch(['email', 'password']);
  const isEmpty = !email || !password;
  const hasErrors = Object.keys(errors).length > 0;

  useEffect(() => {
    setErrorMessage(null);
    setCanSubmit(true);
  }, [email, password]);

  const onSubmit = async (data: LoginData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await loginUser(data);
      setIsSuccess(true);
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
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
            Login Successful!
          </p>
        </div>
      )}
      {errorMessage && (
        <div className="p-[20px] bg-primary/10 border border-primary rounded-[10px] flex flex-col gap-2 justify-center align-middle w-full max-w-125 mx-auto">
          <p
            role="alert"
            className="text-primary font-bold text-center text-xl"
          >
            {errorMessage}
          </p>
        </div>
      )}
      {!isSuccess && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
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

          <button
            type="submit"
            disabled={isSubmitting || isEmpty || hasErrors || !canSubmit}
            className="continue-auth-cta mt-[30px] m-auto font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
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
          Create new account
        </button>
      </div>
    </>
  );
}
