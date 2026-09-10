import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import loginUser from '@/api/auth/loginUser';
import { loginFormSchema, type LoginData } from '@/schemas/loginFormSchema';
import { LoginFormProps } from '@/types';
import ErrorMessage from '@/components/helpers/ErrorMessage';
import FieldError from '@/components/helpers/FieldError';
import SuccessMessage from '@/components/helpers/SuccessMessage';

export default function LoginForm({ onClose, onSwitch }: LoginFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
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
      if (/^\/venue\/[^/]+$/.test(pathname)) {
        router.refresh();
      }
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
      {isSuccess && <SuccessMessage message="Login Successful!" />}
      <ErrorMessage
        message={errorMessage}
        className="w-full max-w-125 mx-auto"
      />
      {!isSuccess && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="relative flex flex-col gap-2 mt-[5px] w-full max-w-125">
            <label htmlFor="email" className="font-semibold">
              Email address
              <i
                className="fa-solid fa-asterisk text-[10px]! ml-[5px] align-super"
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

          <div className="flex flex-col gap-2 mt-[5px] w-full max-w-125">
            <label htmlFor="password" className="font-semibold">
              Password
              <i
                className="fa-solid fa-asterisk text-[10px]! ml-[5px] align-super"
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
                className="cta-password-toggle"
              >
                <span className="hidden">
                  {showPassword ? 'Hide password' : 'Show password'}
                </span>
                <i
                  className={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isEmpty || hasErrors || !canSubmit}
            className="cta-continue-auth mt-[30px] m-auto"
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
        <button type="button" onClick={onSwitch} className="cta-auth-switch">
          Create new account
        </button>
      </div>
    </>
  );
}
