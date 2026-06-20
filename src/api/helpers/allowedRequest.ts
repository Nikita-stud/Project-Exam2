import { loadLocalStorage } from '../auth/loadLocalStorage.mjs';

export default function allowedRequest(method, data) {
  return {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loadLocalStorage('token')}`,
      'X-Noroff-API-Key': `${process.env.NOROFF_API_KEY}`,
    },
  };
}
