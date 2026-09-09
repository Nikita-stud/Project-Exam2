import type { VenueMeta } from '@/types/venues';

export function includedFilter(meta: VenueMeta) {
  return (
    Object.entries(meta)
      .filter(([, included]) => included)
      .map(([text]) => text.charAt(0).toUpperCase() + text.slice(1))
      .join(', ') || 'None'
  );
}
