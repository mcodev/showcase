import secureLocalStorage from 'react-secure-storage';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const useRefresh = () => {
  const refresh = async ({ updateAccessToken }: { updateAccessToken: (token: string) => void }) => {
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
      updateAccessToken(data.data.accessToken);
    }
  };

  return { refresh };
};

export default useRefresh;
