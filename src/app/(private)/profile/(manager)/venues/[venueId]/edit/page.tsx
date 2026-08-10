import React from 'react';

export default async function EditVenuePage({
  params,
}: {
  params: Promise<{ venuesId: string }>;
}) {
  const { venuesId } = await params;

  return (
    <div>
      <h1>Edit Venue: {venuesId}</h1>
    </div>
  );
}
