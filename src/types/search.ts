export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

export interface VenueFormData {
  destination: string;
  selected: DateRange | undefined;
  guests: string;
}

export interface SearchState {
  formData: VenueFormData;
  setFormData: (info: Partial<VenueFormData>) => void;
  resetFormData: () => void;
}
