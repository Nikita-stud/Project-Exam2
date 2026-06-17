export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ButtonProps {
  text: string;
  baseStyles?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export interface VenuePageType {
  params: Promise<{ venueId: string }>;
}
