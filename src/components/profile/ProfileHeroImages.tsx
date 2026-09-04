import Image from 'next/image';

export default function ProfileHeroImages({
  banner,
  avatar,
}: {
  banner: { url: string; alt: string };
  avatar: { url: string; alt: string };
}) {
  return (
    <div className="relative h-[200px] md:h-[260px]">
      <Image
        src={banner.url || '/no-photo.svg'}
        alt={banner.alt || 'Profile banner'}
        fill
        sizes="100vw"
        loading="eager"
        className="object-cover rounded-[10px] md:rounded-[0px]"
      />
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[150px] h-[150px] md:left-[50px] md:translate-x-0 md:bottom-[-90px] md:w-[200px] md:h-[200px]">
        <Image
          src={avatar.url || '/no-photo.svg'}
          alt={avatar.alt || 'Avatar image'}
          fill
          sizes="200px"
          loading="eager"
          className="object-cover rounded-full ring-[5px] ring-white md:ring-[10px]"
        />
      </div>
    </div>
  );
}
