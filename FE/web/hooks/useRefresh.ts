import secureLocalStorage from 'react-secure-storage';
import { REFRESH_TOKEN_KEY } from '@/common/consts';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const useRefresh = () => {
  const refresh = async (): Promise<string | null> => {
    const refreshToken = secureLocalStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);

      return null;
    }

    try {
      const response = await fetch(`${BASE_API_URL}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const { success, data } = await response.json();

      if (!success || !data?.accessToken) {
        throw new Error('Invalid refresh token response');
      }

      // Remove the old refresh token if it's not in the response
      if (!data.refreshToken) {
        secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);
      } else {
        await secureLocalStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      }

      return data.accessToken;
    } catch (error) {
      console.error('Token refresh error:', error);

      secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);

      return null;
    }
  };

  return { refresh };
};

export default useRefresh;
