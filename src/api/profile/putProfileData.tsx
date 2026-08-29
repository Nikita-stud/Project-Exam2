import { UPDATE_PROFILE_API_URL } from '@/constants/api';
import allowedDataRequest from '../helpers/allowedDataRequest';
import { Profile, ProfileUpdate } from '@/types';
import AuthStore from '@/store/authStore';

export async function putProfileData(
  name: string,
  userData: ProfileUpdate,
): Promise<Profile> {
  const token = AuthStore.getState().token;

  const response = await fetch(
    UPDATE_PROFILE_API_URL(name),
    allowedDataRequest('PUT', userData),
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? `Failed to update profile`);
  }

  if (token) {
    AuthStore.getState().setAuth(token, {
      name: json.data.name,
      email: json.data.email,
      bio: json.data.bio,
      venueManager: json.data.venueManager,
      avatar: json.data.avatar,
      banner: json.data.banner,
    });
  }

  return json.data;
}
