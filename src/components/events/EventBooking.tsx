'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthStore from '@/store/authStore';
import { useVenueContext } from '@/context/context';
import { createBooking } from '@/api/bookings/createBooking';
import AuthModal from '../auth/AuthModal';

export default function EventBooking({ venueId }: { venueId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const token = AuthStore((store) => store.token);
  const venueManager = AuthStore((store) => store.user?.venueManager);
  const { formData } = useVenueContext();
  const router = useRouter();

  const handleBooking = async () => {
    if (!formData.selected?.from || !formData.selected?.to) {
      setErrorMessage('Please select your dates');
      return;
    }
    if (!formData.guests) {
      setErrorMessage('Please enter number of guests');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await createBooking({
        dateFrom: formData.selected.from.toISOString(),
        dateTo: formData.selected.to.toISOString(),
        guests: Number(formData.guests),
        venueId,
      });

      const query = new URLSearchParams({
        from: formData.selected.from.toLocaleDateString(),
        to: formData.selected.to.toLocaleDateString(),
        guests: formData.guests,
      }).toString();

      router.push(`/venue/${venueId}/success?${query}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to book venue',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {' '}
      {errorMessage && (
        <p role="alert" className="text-primary font-bold mb-[10px]">
          {errorMessage}
        </p>
      )}
      {token ? (
        <button
          onClick={handleBooking}
          disabled={isSubmitting}
          className="bg-primary w-[166px] h-[43px] font-bold rounded-[10px] text-white flex items-center justify-center gap-[8px] disabled:opacity-50"
        >
          {isSubmitting ? 'Booking...' : 'Book now'}
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary w-[166px] h-[43px] font-bold rounded-[10px] text-white flex items-center justify-center gap-[8px]"
        >
          Login
          <i
            className="fa-regular fa-circle-right text-xl"
            aria-hidden="true"
          ></i>
        </button>
      )}
      {venueManager && (
        <p className="text-center text-sm text-gray-500">
          Venue managers cannot book events.
        </p>
      )}
      {isOpen && <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
}
