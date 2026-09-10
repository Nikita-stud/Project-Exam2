'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthStore from '@/store/authStore';
import SearchStore from '@/store/searchStore';
import { createBooking } from '@/api/bookings/createBooking';
import AuthModal from '../auth/AuthModal';
import Link from 'next/link';

export default function EventBooking({
  venueId,
  venueName,
  imageUrl,
}: {
  venueId: string;
  venueName: string;
  imageUrl: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState<boolean>(true);

  const token = AuthStore((store) => store.token);
  const venueManager = AuthStore((store) => store.user?.venueManager);
  const formData = SearchStore((store) => store.formData);
  const router = useRouter();

  useEffect(() => {
    setErrorMessage(null);
    setCanSubmit(true);
  }, [formData.selected, formData.guests]);

  const handleBooking = async () => {
    if (!formData.selected?.from || !formData.selected?.to) {
      setErrorMessage('Select minimum 2 dates');
      setCanSubmit(false);
      return;
    }
    if (!formData.guests) {
      setErrorMessage('Enter number of guests');
      setCanSubmit(false);
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

      const params = new URLSearchParams({
        from: formData.selected.from.toLocaleDateString(),
        to: formData.selected.to.toLocaleDateString(),
        guests: formData.guests,
        name: venueName,
        image: imageUrl,
      }).toString();

      router.push(`/venue/${venueId}/success?${params}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to book venue',
      );
      setCanSubmit(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {errorMessage && (
        <p
          role="alert"
          className="text-primary font-bold  my-[-10px] text-center lg:text-right"
        >
          {errorMessage}
        </p>
      )}
      <div className="flex justify-center lg:justify-end">
        {token && !venueManager ? (
          <button
            onClick={handleBooking}
            disabled={isSubmitting || !canSubmit}
            className="cta-primary"
          >
            {isSubmitting ? 'Booking...' : 'Book now'}
          </button>
        ) : !token ? (
          <button onClick={() => setIsOpen(true)} className="cta-primary-lg">
            Login
            <i
              className="fa-regular fa-circle-right text-xl"
              aria-hidden="true"
            ></i>
          </button>
        ) : null}
        {venueManager && (
          <Link href="/profile/venues" className="cta-primary-lg">
            Back to venues
            <i
              className="fa-regular fa-circle-right text-xl"
              aria-hidden="true"
            ></i>
          </Link>
        )}
      </div>
      {isOpen && <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
}
