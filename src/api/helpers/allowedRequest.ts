import AuthStore from '@/store/authStore';

export default function allowedRequest(method: string) {
  const token = AuthStore.getState().token;

  return {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': `${process.env.NEXT_PUBLIC_NOROFF_API_KEY}`,
    },
  };
}
