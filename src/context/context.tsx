'use client';

import { useState, useContext, createContext, ReactNode } from 'react';
import type { VenueFormData, VenueContextType } from '@/types';

const VenueContext = createContext<VenueContextType>({
  formData: { destination: '', selected: undefined, guests: '' },
  setFormData: () => {},
});

export function VenueProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<VenueFormData>({
    destination: '',
    selected: undefined,
    guests: '',
  });

  return (
    <VenueContext.Provider value={{ formData, setFormData }}>
      {children}
    </VenueContext.Provider>
  );
}

export function useVenueContext() {
  return useContext(VenueContext);
}
