import { useEffect, type RefObject } from 'react';

export default function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean,
  setOpen: (open: boolean) => void,
) {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () =>
      document.removeEventListener('pointerdown', handleClickOutside);
  }, [isOpen, ref, setOpen]);
}
