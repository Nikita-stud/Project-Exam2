import { REGISTER_API_URL } from '../../constants/api';
import createPostRequest from '../helpers/createPostRequest';
// import type { RegisterData } from '@/schemas/registerFormSchema';
import type { RegisterUser } from '@/types';

export default async function registerUser(user: RegisterUser) {
  const postData = createPostRequest(user);
  const response = await fetch(REGISTER_API_URL, postData);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Registration failed');
  }

  return json;
}
