import { LOGIN_API_URL } from '../../constants/api';
import createPostRequest from '../helpers/createPostRequest';
import saveLocalStorage from '../helpers/saveLocalStorage';
import type { LoginUser, LoginResponse } from '../../types';

export default async function loginUser(
  user: LoginUser,
): Promise<LoginResponse> {
  console.log('User login: ', user);

  const postData = createPostRequest(user);
  const response = await fetch(LOGIN_API_URL, postData);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Login failed');
  }

  const token = json.data.accessToken;
  if (token) {
    saveLocalStorage('token', token);
    saveLocalStorage('UserName', json.data.name);
  }

  return json as LoginResponse;
}
