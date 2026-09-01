'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import AuthStore from '@/store/authStore';
import focusFirstError from '@/components/auth/ErrorField';
import BackNav from '@/components/BackNav';
import {
  editProfileFormSchema,
  type EditProfileData,
} from '@/schemas/editProfileFormSchema';
import { putProfileData } from '@/api/profile/putProfileData';

export default function EditProfilePage() {
  const user = AuthStore((store) => store.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditProfileData>({
    resolver: zodResolver(editProfileFormSchema),
    mode: 'onBlur',
  });

  if (!user) {
    return null;
  }

  const [avatarUrl, bannerUrl, bio] = watch([
    'avatar.url',
    'banner.url',
    'bio',
  ]);

  const isEmpty = !avatarUrl && !bannerUrl && !bio;
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = async (data: EditProfileData) => {
    setIsSubmitting(true);
    if (data.avatar?.url === '') delete data.avatar;
    if (data.banner?.url === '') delete data.banner;
    if (!data.bio) delete data.bio;
    try {
      const newData = await putProfileData(user.name, data);
      if (newData) {
        setIsSaved(true);
        setTimeout(() => router.push('/profile'), 3000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BackNav />
      <h1 className="pl-[20px] pt-[20px] md:hidden">Edit Profile</h1>
      <div className="p-[20px] md:p-0">
        <section>
          <div className="relative h-[200px] md:h-[260px]">
            <Image
              src={user.banner.url || '/no-photo.svg'}
              alt={user.banner.alt || 'Profile banner'}
              fill
              sizes="100vw"
              loading="eager"
              className="object-cover rounded-[10px] md:rounded-[0px]"
            />
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[150px] h-[150px] md:left-[50px] md:translate-x-0 md:bottom-[-90px] md:w-[200px] md:h-[200px]">
              <Image
                src={user.avatar.url || '/no-photo.svg'}
                alt={user.avatar.alt || 'Avatar image'}
                fill
                sizes="200px"
                loading="eager"
                className="object-fill rounded-full ring-[5px] ring-white md:ring-[10px]"
              />
            </div>
          </div>
          <section className="relative mt-[20px] mr-[-15px] flex justify-between items-start md:px-[50px] md:mt-[0px] ">
            <div className="min-w-0 wrap-break-word">
              <div className="md:ml-[215px]">
                <h1 className="">
                  {user.name.length > 9
                    ? `${user.name.slice(0, 9)}...`
                    : user.name}
                </h1>{' '}
                <p className="text-[#455a61]">{user.email}</p>
              </div>
            </div>
            <div className="mt-[8px] absolute right-[20px] md:right-[50px] flex items-center gap-[10px]">
              <h2 className="md:mr-[15px]">
                {user.venueManager ? 'MANAGER' : 'USER'}
              </h2>{' '}
            </div>
          </section>
        </section>
        <div className="mt-[30px] md:px-[50px] md:mt-[130px]">
          <form
            onSubmit={handleSubmit(onSubmit, focusFirstError)}
            className="flex flex-col gap-[15px] max-w-125 mx-auto"
          >
            <div className="flex flex-col gap-2 w-full">
              <span className="font-semibold color-calm opacity-80">
                Username
              </span>
              <div
                aria-hidden="true"
                className="h-[58px] bg-input-disabled w-full border rounded-[10px] px-[20px] overflow-scroll flex items-center color-calm"
              >
                {user?.name}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <span className="font-semibold color-calm opacity-80">
                Email address
              </span>
              <div
                aria-hidden="true"
                className="h-[58px] bg-input-disabled w-full border rounded-[10px] px-[20px] overflow-scroll flex items-center color-calm"
              >
                {user?.email}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <span className="font-semibold color-calm opacity-80">
                Password
              </span>
              <div
                aria-hidden="true"
                className="h-[58px] bg-input-disabled w-full border rounded-[10px] px-[20px] overflow-scroll flex items-center color-calm"
              >
                ********
              </div>
            </div>

            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="avatarUrl" className="font-semibold color-calm">
                Avatar image
              </label>
              <input
                id="avatarUrl"
                type="text"
                placeholder="https://example.com/avatar.jpg"
                aria-invalid={errors.avatar?.url ? 'true' : 'false'}
                aria-describedby="avatarUrl-error"
                {...register('avatar.url')}
                className="h-[58px] w-full bg-[#fff] border rounded-[10px] px-[20px] color-calm"
              />
              {errors.avatar?.url && (
                <p
                  id="avatarUrl-error"
                  role="alert"
                  className="text-primary absolute top-full end-0 text-sm mb-0"
                >
                  {errors.avatar.url.message}
                </p>
              )}
            </div>

            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="bannerUrl" className="font-semibold">
                Banner image
              </label>
              <input
                id="bannerUrl"
                type="text"
                placeholder="https://example.com/banner.jpg"
                aria-invalid={errors.banner?.url ? 'true' : 'false'}
                aria-describedby="bannerUrl-error"
                {...register('banner.url')}
                className="h-[58px] bg-[#fff] w-full border rounded-[10px] px-[20px] color-calm"
              />
              {errors.banner?.url && (
                <p
                  id="bannerUrl-error"
                  role="alert"
                  className="text-primary absolute top-full end-0 text-sm mb-0"
                >
                  {errors.banner.url.message}
                </p>
              )}
            </div>

            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="bio" className="font-semibold">
                Bio
              </label>
              <textarea
                id="bio"
                placeholder="Tell us about yourself"
                rows={4}
                aria-invalid={errors.bio ? 'true' : 'false'}
                aria-describedby="bio-error"
                {...register('bio')}
                className="w-full border bg-[#fff] rounded-[10px] p-[20px] color-calm resize-none"
              />
              {errors.bio && (
                <p
                  id="bio-error"
                  role="alert"
                  className="text-primary flex justify-end mt-[-8px] text-sm mb-[-20px]"
                >
                  {errors.bio.message}
                </p>
              )}
            </div>

            {isSaved ? (
              <div className="p-[20px] bg-icons  border rounded-[10px] flex flex-col gap-2 justify-center align-middle animate-pulse">
                <p
                  role="status"
                  className="text-black font-bold text-center text-xl"
                >
                  Profile Updated Successfully!
                </p>
                <p className="m-auto  ">Redirecting to Profile Page...</p>
              </div>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || isEmpty || hasErrors}
                className="continue-auth-cta m-auto mt-[15px] mb-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
