'use client';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import focusFirstError from '@/components/auth/ErrorField';
import BackNav from '@/components/ui/BackNav';
import {
  createVenueFormSchema,
  type CreateVenueData,
} from '@/schemas/createVenueFormSchema';
import { createManagerVenue } from '@/api/venues/createManagerVenue';

export default function CreateVenuePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
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
  ]);

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

  const onSubmit = async (data: CreateVenueData) => {
    setIsSubmitting(true);
    data.media = data.media.filter((item) => item.url !== '');
    try {
      const newVenue = await createManagerVenue(data);
      if (newVenue) {
        setIsSaved(true);
        setTimeout(() => router.push('/venues'), 3000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BackNav />
      <h1 className="pl-[20px] pt-[20px] md:hidden">Create Venue</h1>
      <div className="p-[20px] md:p-0">
        <div className="relative h-[200px] md:h-[260px]">
          <Image
            src={'/no-photo.svg'}
            alt={'New venue image'}
            fill
            sizes="100vw"
            loading="eager"
            className="object-cover rounded-[10px] md:rounded-[0px]"
          />
        </div>

        <div className="mt-[30px] md:px-[50px] md:mt-[130px]">
          <form
            onSubmit={handleSubmit(onSubmit, focusFirstError)}
            className="flex flex-col gap-[20px] max-w-125 mx-auto"
          >
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative flex flex-col gap-2 w-full"
              >
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`image-${index}`}
                    className="font-semibold color-calm"
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
                      className="flex items-center gap-1 text-primary text-sm font-semibold"
                    >
                      <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                      Remove
                    </button>
                  )}
                </div>
                <input
                  id={`image-${index}`}
                  type="text"
                  placeholder="https://example.com/venue.jpg"
                  aria-invalid={errors.media?.[index]?.url ? 'true' : 'false'}
                  aria-describedby={`image-${index}-error`}
                  {...register(`media.${index}.url` as const)}
                  className="h-[58px] w-full bg-[#fff] border rounded-[10px] px-[20px] color-calm"
                />
                {errors.media?.[index]?.url && (
                  <p
                    id={`image-${index}-error`}
                    role="alert"
                    className="text-primary absolute top-full end-0 text-sm mb-0"
                  >
                    {errors.media[index]?.url?.message}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ url: '', alt: '' })}
              className="self-end px-[15px] py-[8px] border rounded-[10px] text-sm font-semibold bg-calm text-white"
            >
              + Add more images?
            </button>

            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="name" className="font-semibold color-calm">
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
                className="h-[58px] w-full bg-[#fff] border rounded-[10px] px-[20px] color-calm"
              />
              {errors.name && (
                <p
                  id="name-error"
                  role="alert"
                  className="text-primary absolute top-full end-0 text-sm mb-0"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex gap-[15px]">
              <div className="relative flex flex-col gap-2 flex-1">
                <label htmlFor="maxGuests" className="font-semibold color-calm">
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
                  placeholder="1"
                  aria-invalid={errors.maxGuests ? 'true' : 'false'}
                  aria-describedby="maxGuests-error"
                  {...register('maxGuests', { valueAsNumber: true })}
                  className="h-[58px] w-full bg-[#fff] border rounded-[10px] px-[20px] color-calm"
                />
                {errors.maxGuests && (
                  <p
                    id="maxGuests-error"
                    role="alert"
                    className="text-primary absolute top-full end-0 text-sm mb-0"
                  >
                    {errors.maxGuests.message}
                  </p>
                )}
              </div>
              <div className="relative flex flex-col gap-2 flex-1">
                <label htmlFor="price" className="font-semibold color-calm">
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
                  placeholder="100"
                  aria-invalid={errors.price ? 'true' : 'false'}
                  aria-describedby="price-error"
                  {...register('price', { valueAsNumber: true })}
                  className="h-[58px] w-full bg-[#fff] border rounded-[10px] px-[20px] color-calm"
                />
                {errors.price && (
                  <p
                    id="price-error"
                    role="alert"
                    className="text-primary absolute top-full end-0 text-sm mb-0"
                  >
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <p className="font-semibold color-calm">Included</p>
              <div className="grid grid-cols-2 gap-[10px]">
                <label className="flex items-center justify-center h-[58px] bg-[#fff] border rounded-[10px] cursor-pointer font-medium has-[:checked]:bg-text has-[:checked]:text-[#fff]!">
                  <input
                    type="checkbox"
                    className="sr-only"
                    {...register('meta.wifi')}
                  />
                  Wifi
                </label>
                <label className="flex items-center justify-center h-[58px] bg-[#fff] border rounded-[10px] cursor-pointer font-medium has-[:checked]:bg-text has-[:checked]:text-[#fff]!">
                  <input
                    type="checkbox"
                    className="sr-only"
                    {...register('meta.parking')}
                  />
                  Parking
                </label>
                <label className="flex items-center justify-center h-[58px] bg-[#fff] border rounded-[10px] cursor-pointer font-medium has-[:checked]:bg-text has-[:checked]:text-[#fff]!">
                  <input
                    type="checkbox"
                    className="sr-only"
                    {...register('meta.breakfast')}
                  />
                  Breakfast
                </label>
                <label className="flex items-center justify-center h-[58px] bg-[#fff] border rounded-[10px] cursor-pointer font-medium has-[:checked]:bg-text has-[:checked]:text-[#fff]!">
                  <input
                    type="checkbox"
                    className="sr-only"
                    {...register('meta.pets')}
                  />
                  Pets
                </label>
              </div>
            </div>

            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="description" className="font-semibold">
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
              {errors.description && (
                <p
                  id="description-error"
                  role="alert"
                  className="text-primary flex justify-end mt-[-8px] text-sm mb-[-20px]"
                >
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="address" className="font-semibold color-calm">
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
              {errors.location?.address && (
                <p
                  id="address-error"
                  role="alert"
                  className="text-primary absolute top-full end-0 text-sm mb-0"
                >
                  {errors.location.address.message}
                </p>
              )}
            </div>

            <div className="flex gap-[15px]">
              <div className="relative flex flex-col gap-2 flex-1">
                <label htmlFor="zip" className="font-semibold color-calm">
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
                {errors.location?.zip && (
                  <p
                    id="zip-error"
                    role="alert"
                    className="text-primary absolute top-full end-0 text-sm mb-0"
                  >
                    {errors.location.zip.message}
                  </p>
                )}
              </div>
              <div className="relative flex flex-col gap-2 flex-1">
                <label htmlFor="city" className="font-semibold color-calm">
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
                {errors.location?.city && (
                  <p
                    id="city-error"
                    role="alert"
                    className="text-primary absolute top-full end-0 text-sm mb-0"
                  >
                    {errors.location.city.message}
                  </p>
                )}
              </div>
            </div>

            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="country" className="font-semibold color-calm">
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
              {errors.location?.country && (
                <p
                  id="country-error"
                  role="alert"
                  className="text-primary absolute top-full end-0 text-sm mb-0"
                >
                  {errors.location.country.message}
                </p>
              )}
            </div>

            {isSaved ? (
              <div className="p-[20px] bg-icons  border rounded-[10px] flex flex-col gap-2 justify-center align-middle animate-pulse">
                <p
                  role="status"
                  className="text-black font-bold text-center text-xl"
                >
                  Venue Created Successfully!
                </p>
                <p className="m-auto  ">Redirecting to Venues Page...</p>
              </div>
            ) : (
              <div className="flex gap-[15px] mt-[15px] mb-[10px]">
                <button
                  type="button"
                  onClick={() => router.push('/profile')}
                  className="flex-1 h-[58px] border rounded-[10px] font-bold color-calm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || hasErrors || isEmpty}
                  className="continue-auth-cta flex-1 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
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
