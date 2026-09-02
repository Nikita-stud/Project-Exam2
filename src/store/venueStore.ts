import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { VenueState } from '../types';

const VenueStore = create<VenueState>()(
  persist(
    (set, get) => ({
      items: [],

      saveVenue: (venue) =>
        set((state) => {
          if (state.items.some((v) => v.id === venue.id)) {
            return state;
          }
          return { items: [...state.items, venue] };
        }),

      removeVenue: (id) =>
        set((state) => ({
          items: state.items.filter((v) => v.id !== id),
        })),

      isSaved: (id) => get().items.some((v) => v.id === id),

      clearItems: () => set({ items: [] }),
    }),
    {
      name: 'venues',
    },
  ),
);

export default VenueStore;
