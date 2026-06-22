import loadLocalStorage from './loadLocalStorage';

export default function allowedRequest(method: string) {
  return {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loadLocalStorage('token')}`,
      'X-Noroff-API-Key': `${process.env.NEXT_PUBLIC_NOROFF_API_KEY}`,
    },
  };
}
