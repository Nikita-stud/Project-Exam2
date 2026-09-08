import { LOGIN_API_URL } from '../../constants/api';
import createPostRequest from '../helpers/createPostRequest';
import type { LoginUser, LoginResponse } from '../../types';
import AuthStore from '@/store/authStore';

export default async function loginUser(
  user: LoginUser,
): Promise<LoginResponse> {
  try {
    const postData = createPostRequest(user);
    const response = await fetch(LOGIN_API_URL, postData);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || 'Login failed');
    }

    const { accessToken, name, email, bio, venueManager, avatar, banner } =
      json.data;

    AuthStore.getState().setAuth(accessToken, {
      name,
      email,
      bio,
      venueManager,
      avatar,
      banner,
    });

    return json;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Login failed');
  }
}
