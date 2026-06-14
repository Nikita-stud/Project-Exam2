export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface VenuePageType {
  params: Promise<{ venueId: string }>;
}
