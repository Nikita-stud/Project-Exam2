export interface Metadata {
  title: string;
  description: string;
}

export interface VenuePageType {
  params: Promise<{ venuesId: string }>;
}
