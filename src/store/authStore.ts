import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from '../types';

const AuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth',
    },
  ),
);

export default AuthStore;
