import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ManagerVenuesState } from '../types';

const ManagerVenuesStore = create<ManagerVenuesState>()(
  persist(
    (set) => ({
      venues: null,
      venue: null,
      user: null,

      setVenues: (userName, venues) => set({ venues, user: userName }),
      setVenue: (userName, venue) => set({ venue, user: userName }),
    }),
    {
      name: 'managerVenues',
    },
  ),
);

export default ManagerVenuesStore;
