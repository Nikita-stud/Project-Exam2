'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BackNav() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed w-full z-1002  bg-white shadow md:hidden">
      <button
        onClick={() => router.back()}
        aria-label="Go back"
        className="pl-[20px] py-[10px]"
      >
        <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
      </button>
    </div>
  );
}
