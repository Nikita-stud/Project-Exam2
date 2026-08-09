import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from '../types';

const AuthStore = create<AuthState>()(
  //persist saves to localstorage the token and user Object that I created
  //email,password and if venue manager
  //to not save to local but rather memory, get rid of persist
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
