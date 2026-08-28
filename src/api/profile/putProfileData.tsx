import { UPDATE_PROFILE_API_URL } from '@/constants/api';
import allowedDataRequest from '../helpers/allowedDataRequest';
import { Profile, ProfileUpdate } from '@/types';

export async function putProfileData(
  name: string,
  userData: ProfileUpdate,
): Promise<Profile> {
  const response = await fetch(
    UPDATE_PROFILE_API_URL(name),
    allowedDataRequest('PUT', userData),
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? `Failed to update profile`);
  }

  return json.data;
}
