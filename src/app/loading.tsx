import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen animate-pulse">
      <Image
        src="/text-logo.png"
        alt="Logo"
        loading="eager"
        width={100}
        height={100}
        className="w-[220px] h-[130px]"
      />
      <p className="text-calm mt-[20px]">
        Please wait while we load the page...
      </p>
    </div>
  );
}
