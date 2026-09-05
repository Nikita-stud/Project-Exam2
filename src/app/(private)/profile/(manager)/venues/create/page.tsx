'use client';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';
import BackNav from '@/components/ui/BackNav';
import {
  createVenueFormSchema,
  type CreateVenueData,
} from '@/schemas/createVenueFormSchema';
import { createManagerVenue } from '@/api/venues/createManagerVenue';
import ErrorMessage from '@/components/helpers/ErrorMessage';
import FieldError from '@/components/helpers/FieldError';

export default function CreateVenuePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(true);
  const [brokenImageUrl, setBrokenImageUrl] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateVenueData>({
    resolver: zodResolver(createVenueFormSchema),
    mode: 'onBlur',
    defaultValues: {
      media: [{ url: '' }],
      meta: { wifi: false, parking: false, breakfast: false, pets: false },
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'media' });

  const [
    name,
    description,
    firstImageUrl,
    maxGuests,
    price,
    address,
    zip,
    city,
    country,
    media,
  ] = watch([
    'name',
    'description',
    'media.0.url',
    'maxGuests',
    'price',
    'location.address',
    'location.zip',
    'location.city',
    'location.country',
    'media',
  ]);

  const [debouncedImageUrl] = useDebounce(firstImageUrl, 500);

  const isEmpty =
    !name ||
    !description ||
    !firstImageUrl ||
    !maxGuests ||
    !price ||
    !address ||
    !zip ||
    !city ||
    !country;

  const hasErrors = Object.keys(errors).length > 0;
  const mediaKey = JSON.stringify(media);

  useEffect(() => {
    setErrorMessage(null);
    setCanSubmit(true);
  }, [
    name,
    description,
    mediaKey,
    maxGuests,
    price,
    address,
    zip,
    city,
    country,
  ]);

  const onSubmit = async (data: CreateVenueData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    data.media = data.media.filter((item) => item.url !== '');
    try {
      const newVenue = await createManagerVenue(data);
      if (newVenue) {
        setIsSaved(true);
        setTimeout(() => router.push('/profile/venues'), 3000);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to create venue',
      );
      setCanSubmit(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BackNav />
      <h1 className="pl-[20px] pt-[20px] md:hidden">Create Venue</h1>
      <div className="p-[20px] md:p-0">
        <div className="md:px-[50px] md:mt-[50px] md:grid md:grid-cols-6 md:gap-x-[30px] md:gap-y-[20px] md:items-stretch">
          <div className="relative h-[200px] mb-[-5px] md:mb-0 md:h-full md:w-full md:col-start-1 md:col-span-3 md:row-start-1">
            <Image
              src={
                /^https?:\/\/./.test(debouncedImageUrl ?? '') &&
                debouncedImageUrl !== brokenImageUrl
                  ? debouncedImageUrl
                  : '/no-photo.svg'
              }
              alt={'New venue image'}
              fill
              sizes="(min-width: 744px) 50vw, 100vw"
              loading="eager"
              onError={() => setBrokenImageUrl(debouncedImageUrl)}
              className="object-cover rounded-[10px]"
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[20px] max-w-125 mx-auto mt-[30px] md:contents"
          >
            <section className="bg-calm/20 flex flex-col gap-[20px] p-[20px] rounded-[10px] pb-[20px] md:col-start-5 md:col-span-2 md:row-start-2">
              <h3 className="font-semibold color-calm mb-[10px]">Images</h3>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative flex flex-col gap-2 w-full"
                >
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`image-${index}`}
                      className="font-semibold text-text"
                    >
                      Image {index + 1}{' '}
                      {index === 0 && (
                        <i
                          className="fa-solid fa-asterisk text-[10px]! align-super"
                          aria-hidden="true"
                        ></i>
                      )}
                    </label>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        aria-label={`Remove image ${index + 1}`}
                        className="flex items-center gap-[10px] text-primary text-sm font-semibold"
                      >
                        <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    id={`image-${index}`}
                    type="text"
                    placeholder="https://example.jpeg"
                    aria-invalid={errors.media?.[index]?.url ? 'true' : 'false'}
                    aria-describedby={`image-${index}-error`}
                    {...register(`media.${index}.url` as const)}
                    className="h-[58px] w-full bg-[#fff] border rounded-[10px] px-[20px] color-calm"
                  />
                  <FieldError
                    id={`image-${index}-error`}
                    message={errors.media?.[index]?.url?.message}
                  />
                </div>
              ))}
              {fields.length < 5 && (
                <button
                  type="button"
                  onClick={() => append({ url: '', alt: '' })}
                  className="self-end px-[15px] py-[8px] border rounded-[10px] text-sm font-semibold bg-calm text-white"
                >
                  + Add more images?
                </button>
              )}
            </section>

            <section className="bg-calm/20 flex flex-col gap-[20px] p-[20px] rounded-[10px] pb-[30px] md:col-start-4 md:col-span-3 md:row-start-1">
              <div className="relative flex flex-col gap-2 w-full">
                <h3 className="font-semibold color-calm mb-[10px]">
                  Venue Details
                </h3>
                <label htmlFor="name" className="font-semibold text-text">
                  Venue Name{' '}
                  <i
                    className="fa-solid fa-asterisk text-[10px]! align-super"
                    aria-hidden="true"
                  ></i>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Cozy Hotel"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby="name-error"
                  {...register('name')}
                  className="h-[58px] w-full bg-[#fff] border rounded-[10px] px-[20px] "
                />
                <FieldError id="name-error" message={errors.name?.message} />
              </div>

              <div className="flex gap-[15px]">
                <div className="relative flex flex-col gap-2 flex-1">
                  <label
                    htmlFor="maxGuests"
                    className="font-semibold text-text"
                  >
                    Max Guests{' '}
                    <i
                      className="fa-solid fa-asterisk text-[10px]! align-super"
                      aria-hidden="true"
                    ></i>
                  </label>
                  <input
                    id="maxGuests"
                    type="number"
                    min={1}
                    placeholder="Amount"
                    aria-invalid={errors.maxGuests ? 'true' : 'false'}
                    aria-describedby="maxGuests-error"
                    {...register('maxGuests', { valueAsNumber: true })}
                    className="h-[58px] w-full bg-[#fff] border rounded-[10px] px-[20px] color-calm"
                  />
                  <FieldError
                    id="maxGuests-error"
                    message={errors.maxGuests?.message}
                  />
                </div>
                <div className="relative flex flex-col gap-2 flex-1">
                  <label htmlFor="price" className="font-semibold text-text">
                    Price per night{' '}
                    <i
                      className="fa-solid fa-asterisk text-[10px]! align-super"
                      aria-hidden="true"
                    ></i>
                  </label>
                  <input
                    id="price"
                    type="number"
                    min={1}
                    placeholder="Amount"
                    aria-invalid={errors.price ? 'true' : 'false'}
                    aria-describedby="price-error"
                    {...register('price', { valueAsNumber: true })}
                    className="h-[58px] w-full bg-[#fff] border rounded-[10px] px-[20px] color-calm"
                  />
                  <FieldError
                    id="price-error"
                    message={errors.price?.message}
                  />
                </div>
              </div>

              <div className="relative flex flex-col gap-2 w-full">
                <label
                  htmlFor="description"
                  className="font-semibold text-text"
                >
                  Description{' '}
                  <i
                    className="fa-solid fa-asterisk text-[10px]! align-super"
                    aria-hidden="true"
                  ></i>
                </label>
                <textarea
                  id="description"
                  placeholder="Describe your venue"
                  rows={4}
                  aria-invalid={errors.description ? 'true' : 'false'}
                  aria-describedby="description-error"
                  {...register('description')}
                  className="w-full border bg-[#fff] rounded-[10px] p-[20px] color-calm resize-none"
                />
                <FieldError
                  id="description-error"
                  message={errors.description?.message}
                  variant="textarea"
                />
              </div>
            </section>

            <section className="bg-calm/20 p-[20px] rounded-[10px] md:col-start-3 md:col-span-2 md:row-start-2">
              <div className="flex flex-col gap-2 w-full">
                <h3 className="font-semibold color-calm mb-[10px]">Included</h3>
                <div className="grid grid-cols-2 gap-[10px]">
                  <label className="flex items-center justify-center h-[58px] bg-[#fff] border rounded-[10px] cursor-pointer font-medium text-text has-[:checked]:bg-text has-[:checked]:text-[#fff]!">
                    <input
                      type="checkbox"
                      className="sr-only"
                      {...register('meta.wifi')}
                    />
                    Wifi
                  </label>
                  <label className="flex items-center justify-center h-[58px] bg-[#fff] border rounded-[10px] cursor-pointer font-medium text-text has-[:checked]:bg-text has-[:checked]:text-[#fff]!">
                    <input
                      type="checkbox"
                      className="sr-only"
                      {...register('meta.parking')}
                    />
                    Parking
                  </label>
                  <label className="flex items-center justify-center h-[58px] bg-[#fff] border rounded-[10px] cursor-pointer font-medium text-text has-[:checked]:bg-text has-[:checked]:text-[#fff]!">
                    <input
                      type="checkbox"
                      className="sr-only"
                      {...register('meta.breakfast')}
                    />
                    Breakfast
                  </label>
                  <label className="flex items-center justify-center h-[58px] bg-[#fff] border rounded-[10px] cursor-pointer font-medium text-text has-[:checked]:bg-text has-[:checked]:text-[#fff]!">
                    <input
                      type="checkbox"
                      className="sr-only"
                      {...register('meta.pets')}
                    />
                    Pets
                  </label>
                </div>
              </div>
            </section>

            <section className="bg-calm/20 flex flex-col gap-[20px] p-[20px] rounded-[10px] pb-[30px] md:col-start-1 md:col-span-2 md:row-start-2">
              <div className="relative flex flex-col gap-2 w-full">
                <h3 className="font-semibold color-calm mb-[10px]">Location</h3>

                <label htmlFor="address" className="font-semibold text-text">
                  Address{' '}
                  <i
                    className="fa-solid fa-asterisk text-[10px]! align-super"
                    aria-hidden="true"
                  ></i>
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="58 Your address"
                  aria-invalid={errors.location?.address ? 'true' : 'false'}
                  aria-describedby="address-error"
                  {...register('location.address')}
                  className="h-[58px] w-full bg-[#fff] border rounded-[10px] px-[20px] color-calm"
                />
                <FieldError
                  id="address-error"
                  message={errors.location?.address?.message}
                />
              </div>

              <div className="flex gap-[15px]">
                <div className="relative flex flex-col gap-2 flex-1">
                  <label htmlFor="zip" className="font-semibold text-text">
                    Post code{' '}
                    <i
                      className="fa-solid fa-asterisk text-[10px]! align-super"
                      aria-hidden="true"
                    ></i>
                  </label>
                  <input
                    id="zip"
                    type="text"
                    inputMode="numeric"
                    placeholder="0170"
                    aria-invalid={errors.location?.zip ? 'true' : 'false'}
                    aria-describedby="zip-error"
                    {...register('location.zip')}
                    className="h-[58px] w-full bg-[#fff] border rounded-[10px] px-[20px] color-calm"
                  />
                  <FieldError
                    id="zip-error"
                    message={errors.location?.zip?.message}
                  />
                </div>
                <div className="relative flex flex-col gap-2 flex-1">
                  <label htmlFor="city" className="font-semibold text-text">
                    City{' '}
                    <i
                      className="fa-solid fa-asterisk text-[10px]! align-super"
                      aria-hidden="true"
                    ></i>
                  </label>
                  <input
                    id="city"
                    type="text"
                    maxLength={20}
                    placeholder="Oslo"
                    aria-invalid={errors.location?.city ? 'true' : 'false'}
                    aria-describedby="city-error"
                    {...register('location.city')}
                    className="h-[58px] w-full bg-[#fff] border rounded-[10px] px-[20px] color-calm"
                  />
                  <FieldError
                    id="city-error"
                    message={errors.location?.city?.message}
                  />
                </div>
              </div>

              <div className="relative flex flex-col gap-2 w-full">
                <label htmlFor="country" className="font-semibold text-text">
                  Country{' '}
                  <i
                    className="fa-solid fa-asterisk text-[10px]! align-super"
                    aria-hidden="true"
                  ></i>
                </label>
                <input
                  id="country"
                  type="text"
                  placeholder="Norway"
                  aria-invalid={errors.location?.country ? 'true' : 'false'}
                  aria-describedby="country-error"
                  {...register('location.country')}
                  className="h-[58px] w-full bg-[#fff] border rounded-[10px] px-[20px] color-calm"
                />
                <FieldError
                  id="country-error"
                  message={errors.location?.country?.message}
                />
              </div>
            </section>

            <ErrorMessage
              message={errorMessage}
              className="md:col-start-1 md:col-span-6 md:row-start-3"
            />

            {isSaved ? (
              <div className="p-[20px] bg-icons  border rounded-[10px] flex flex-col gap-2 justify-center align-middle animate-pulse md:col-start-1 md:col-span-6 md:row-start-4 md:mb-[50px]">
                <p
                  role="status"
                  className="text-black font-bold text-center text-xl"
                >
                  Venue Created Successfully!
                </p>
                <p className="m-auto  ">Redirecting to Venues Page...</p>
              </div>
            ) : (
              <div className="flex justify-end gap-[15px] mt-[15px] mb-[10px] md:col-start-1 md:col-span-6 md:row-start-4 md:mb-[50px]">
                <button
                  type="button"
                  onClick={() => router.push('/profile')}
                  className="flex-1 h-[58px] border rounded-[10px] font-bold color-calm md:flex-none md:h-[48px] md:w-[179px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || hasErrors || isEmpty || !canSubmit}
                  className="continue-auth-cta flex-1 font-bold disabled:opacity-50 md:flex-none md:h-[48px] md:w-[179px] disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating...' : 'Create'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
