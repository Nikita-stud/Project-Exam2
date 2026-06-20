import { loadLocalStorage } from '../auth/loadLocalStorage';

export default function allowedDataRequest(method: string, data: unknown) {
  return {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loadLocalStorage('token')}`,
      'X-Noroff-API-Key': `${process.env.NOROFF_API_KEY}`,
    },
    body: JSON.stringify(data),
  };
}
