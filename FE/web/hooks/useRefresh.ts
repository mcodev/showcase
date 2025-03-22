import secureLocalStorage from 'react-secure-storage';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const useRefresh = () => {
  const refresh = async ({
    updateAccessToken,
  }: {
    updateAccessToken: (token: string | null) => void;
  }): Promise<void> => {
    try {
      const refreshToken = secureLocalStorage.getItem('rt');

      if (!refreshToken) {
        return;
      }

      const response = await fetch(`${BASE_API_URL}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (data.success) {
        updateAccessToken(data.data.accessToken || null);

        if (data.data.refreshToken) {
          secureLocalStorage.setItem('rt', data.data.refreshToken);
        } else {
          secureLocalStorage.removeItem('rt');
        }
      } else {
        secureLocalStorage.removeItem('rt');
      }
    } catch (error) {
      secureLocalStorage.removeItem('rt');
      throw new Error('Failed to refresh token');
    }
  };

  return { refresh };
};

export default useRefresh;
