import { create } from 'zustand';
import type { SearchState } from '../types';

const initialFormData = {
  destination: '',
  selected: undefined,
  guests: '',
};

const SearchStore = create<SearchState>()((set) => ({
  formData: {
    destination: '',
    selected: undefined,
    guests: '',
  },

  setFormData: (formData) => set({ formData }),

  resetFormData: () => set({ formData: initialFormData }),
}));

export default SearchStore;
