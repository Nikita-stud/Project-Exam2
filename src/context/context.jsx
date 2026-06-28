'use client';

import { useState, useContext, createContext } from 'react';

const VenueContext = createContext({
  formData: { destination: '', selected: undefined, guests: '' },
  setFormData: () => {},
});

export function VenueProvider({ children }) {
  const [formData, setFormData] = useState({
    destination: ' ',
    selected: undefined,
    guests: ' ',
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
