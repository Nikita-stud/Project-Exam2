import { UPDATE_PROFILE_API_URL } from '@/constants/api';
import allowedDataRequest from '../helpers/allowedDataRequest';
import { Profile, ProfileUpdate } from '@/types';
import AuthStore from '@/store/authStore';

export async function putProfileData(
  name: string,
  userData: ProfileUpdate,
): Promise<Profile> {
  try {
    const token = AuthStore.getState().token;

    const response = await fetch(
      UPDATE_PROFILE_API_URL(name),
      allowedDataRequest('PUT', userData),
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(
        json.errors?.[0]?.message ?? `Failed to update profile`,
      );
    }

    if (token) {
      const { name, email, bio, venueManager, avatar, banner } = json.data;

      AuthStore.getState().setAuth(token, {
        name,
        email,
        bio,
        venueManager,
        avatar,
        banner,
      });
    }

    return json.data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Failed to update profile');
  }
}
