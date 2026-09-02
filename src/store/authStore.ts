import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from '../types';
import VenueStore from './venueStore';

const AuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => {
        set({ token: null, user: null });
        VenueStore.getState().clearItems();
      },
    }),
    {
      name: 'auth',
    },
  ),
);

export default AuthStore;
