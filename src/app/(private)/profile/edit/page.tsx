'use client';
import AuthStore from '@/store/authStore';
import Image from 'next/image';

export default function EditProfilePage() {
  const user = AuthStore((store) => store.user);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="p-[20px]">
        <h1>Edit Profile</h1>
        <div className="relative mt-[20px]">
          <Image
            src={user.avatar.url || '/no-photo.svg'}
            alt={user.avatar.alt || 'Profile banner'}
            width={220}
            height={200}
            loading="eager"
            className="w-full h-[200px] object-fill rounded-[10px]"
          />
          <Image
            src={user.avatar.url}
            alt={user.avatar.alt}
            width={150}
            height={150}
            loading="eager"
            className="w-[150px] h-[150px] absolute bottom-[-20px] left-1/2 -translate-x-1/2 object-fill rounded-full"
          />
        </div>
      </div>
    </>
  );
}
