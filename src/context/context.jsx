'use client';

import { useState, useContext, createContext } from 'react';

const VenueContext = createContext(null);

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
  const context = useContext(VenueContext);
  if (!context) {
    return;
  }
  return context;
}
