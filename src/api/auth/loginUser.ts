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

    const token = json.data.accessToken;

    AuthStore.getState().setAuth(token, {
      name: json.data.name,
      email: json.data.email,
      bio: json.data.bio,
      venueManager: json.data.venueManager,
      avatar: json.data.avatar,
      banner: json.data.banner,
    });

    return json;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Login failed');
  }
}
