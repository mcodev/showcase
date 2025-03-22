import secureLocalStorage from 'react-secure-storage';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
const REFRESH_TOKEN_KEY = 'rt';

const useRefresh = () => {
  const refresh = async ({
    updateAccessToken,
  }: {
    updateAccessToken: (token: string | null) => void;
  }): Promise<void> => {
    const refreshToken = secureLocalStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);
      return;
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

      updateAccessToken(data.accessToken);
      data.refreshToken
        ? secureLocalStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken)
        : secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Token refresh error:', error);
      secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  };

  return { refresh };
};

export default useRefresh;
