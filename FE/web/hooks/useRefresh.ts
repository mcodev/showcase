import { decryptFromLocalStorage } from '@/common/helpers';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const useRefresh = ({ updateAccessToken }: { updateAccessToken: (token: string) => void }) => {
  const refresh = async () => {
    const refreshToken = await decryptFromLocalStorage('rt');

    if (!refreshToken) {
      // TODO issue a new refresh Token
      return null;
    }

    const response = await fetch(`${BASE_API_URL}/refresh`, {
      method: 'POST',
    });
    const data = await response.json();

    if (response.ok) {
      updateAccessToken(data.accessToken);
    }
  };

  return { refresh };
};

export default useRefresh;
