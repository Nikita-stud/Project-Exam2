import { create } from 'zustand';
import type { SearchState, VenueFormData } from '../types';

const initialFormData = {
  destination: '',
  selected: undefined,
  guests: '',
};

const SearchStore = create<SearchState>()((set) => ({
  formData: initialFormData,

  setFormData: (info: Partial<VenueFormData>) =>
    set((data) => ({ formData: { ...data.formData, ...info } })),

  resetFormData: () => set({ formData: initialFormData }),
}));

export default SearchStore;
