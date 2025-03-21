import secureLocalStorage from 'react-secure-storage';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const useRefresh = () => {
  const refresh = async ({
    updateAccessToken,
  }: {
    updateAccessToken: (token: string | null) => void;
  }) => {
    const refreshToken = await secureLocalStorage.getItem('rt');

    if (!refreshToken) {
      // TODO issue a new refresh Token
      return null;
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
      if (data.data.accessToken) {
        updateAccessToken(data.data.accessToken);
      } else {
        updateAccessToken(null);
      }

      if (data.data.refreshToken) {
        await secureLocalStorage.setItem('rt', data.data.refreshToken);
      } else {
        await secureLocalStorage.removeItem('rt');
      }
    } else {
      await secureLocalStorage.removeItem('rt');
    }
  };

  return { refresh };
};

export default useRefresh;
