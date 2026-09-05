'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthStore from '@/store/authStore';
import BackNav from '@/components/ui/BackNav';
import {
  editProfileFormSchema,
  type EditProfileData as EditProfileFormData,
} from '@/schemas/editProfileFormSchema';
import { putProfileData } from '@/api/profile/putProfileData';
import EditProfileData from '@/components/profile/EditProfileData';
import ProfileHeroImages from '@/components/profile/ProfileHeroImages';
import ErrorMessage from '@/components/helpers/ErrorMessage';
import FieldError from '@/components/helpers/FieldError';

export default function EditProfilePage() {
  const user = AuthStore((store) => store.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
    mode: 'onBlur',
  });

  const [avatarUrl, bannerUrl, bio] = watch([
    'avatar.url',
    'banner.url',
    'bio',
  ]);

  useEffect(() => {
    setErrorMessage(null);
    setCanSubmit(true);
  }, [avatarUrl, bannerUrl, bio]);

  if (!user) {
    return null;
  }

  const isEmpty = !avatarUrl && !bannerUrl && !bio;
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = async (data: EditProfileFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    if (data.avatar?.url === '') delete data.avatar;
    if (data.banner?.url === '') delete data.banner;
    if (!data.bio) delete data.bio;
    try {
      const newData = await putProfileData(user.name, data);
      if (newData) {
        setIsSaved(true);
        setTimeout(() => router.push('/profile'), 3000);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to update profile',
      );
      setCanSubmit(false);
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
          <ProfileHeroImages banner={user.banner} avatar={user.avatar} />
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
        <div className="mt-[30px] md:px-[50px] md:mt-[50px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[15px] max-w-125 mx-auto md:max-w-none md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-[15px] md:items-start md:w-full"
          >
            <EditProfileData name={user.name} email={user.email} />

            <div className="relative flex flex-col gap-2 w-full md:col-start-1 md:row-start-2">
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
              <FieldError
                id="avatarUrl-error"
                message={errors.avatar?.url?.message}
              />
            </div>

            <div className="relative flex flex-col gap-2 w-full md:col-start-2 md:row-start-2">
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
              <FieldError
                id="bannerUrl-error"
                message={errors.banner?.url?.message}
              />
            </div>

            <div className="relative flex flex-col gap-2 w-full md:col-start-3 md:row-start-2">
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
              <FieldError
                id="bio-error"
                message={errors.bio?.message}
                variant="textarea"
              />
            </div>

            <ErrorMessage message={errorMessage} className="md:col-start-3" />

            {isSaved ? (
              <div className="p-[20px] mb-[20px] mt-[10px] bg-icons  border rounded-[10px] flex flex-col gap-2 justify-center align-middle animate-pulse md:col-start-3 md:mb-[50px]">
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
                disabled={isSubmitting || isEmpty || hasErrors || !canSubmit}
                className="continue-auth-cta flex items-center justify-center gap-[10px] m-auto mt-[15px] mb-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed md:col-start-3 md:mx-0 md:justify-self-end md:mt-[10px] md:mb-[50px]"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
                <i
                  className="fa-regular fa-floppy-disk text-[20px]"
                  aria-hidden="true"
                ></i>
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
