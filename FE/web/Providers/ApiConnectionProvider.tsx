'use client';

import React, { createContext, useCallback, useContext } from 'react';
import secureLocalStorage from 'react-secure-storage';
import useRefresh from '@/hooks/useRefresh';
import { PROTECTED_ROUTES, SERVICE, SERVICES, ServicesSelectorType } from '@/services';
import { GLOBAL_ERRORS } from '@/services/errors';
import { GlobalResponseDataType, LoginResponseDataType } from '@/types/responseTypes';
import { useUserContext } from './UserProvider';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

type RequestPropsType = {
  service: ServicesSelectorType;
  payload?: unknown;
};

const ApiConnectionContext = createContext<{
  request: (props: RequestPropsType) => Promise<GlobalResponseDataType>;
}>({
  request: async () => ({ success: false, data: null, statusCode: 500 }),
});

export const ApiConnectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { updateAccessToken, updateUser, accessToken } = useUserContext();
  const { refresh } = useRefresh();

  const handleAuthInitialization = useCallback(
    async (data: LoginResponseDataType) => {
      updateAccessToken(data.accessToken);
      updateUser(data.user);
      secureLocalStorage.setItem('rt', data.refreshToken);
    },
    [updateAccessToken, updateUser]
  );

  const request = useCallback(
    async ({ service, payload }: RequestPropsType): Promise<GlobalResponseDataType> => {
      const { path, method, errors } = SERVICES[service];

      try {
        const response = await fetch(`${BASE_URL}/${path}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(PROTECTED_ROUTES.includes(service) && accessToken
              ? { Authorization: `Bearer ${accessToken}` }
              : {}),
          },
          body: JSON.stringify(payload),
          cache: 'no-cache',
          referrerPolicy: 'no-referrer',
        });

        const data = await response.json();
        const statusCode = response.status;

        if (!response.ok) {
          if (data?.error === 'TOKEN_EXPIRED' && statusCode === 402) {
            // TODO Handle token refresh logic here try 2 times before giving up
            // console.log('getting new access token');
            // await refresh({ updateAccessToken });
            // return request({ service, payload });
          }

          const errorMapping = Object.fromEntries(
            errors.map(({ code, message }) => [code, message])
          );

          throw new Error(errorMapping[statusCode] || GLOBAL_ERRORS.UNEXPECTED_ERROR);
        }

        if ([SERVICE.LOGIN_SERVICE, SERVICE.SIGN_UP_SERVICE].includes(service)) {
          if (data.data?.accessToken && data.data?.refreshToken) {
            await handleAuthInitialization(data.data);

            return { statusCode, success: data.success, data: null };
          }

          throw new Error('Unexpected authentication error');
        }

        return { statusCode, success: data.success, data: data.data };
      } catch (error) {
        let errorMessage = 'Unknown error occurred';

        if (error instanceof Error) {
          errorMessage = `Request error: ${error.message}`;
        } else if (typeof error === 'string') {
          errorMessage = `Request error: ${error}`;
        } else {
          console.error('Unexpected error type:', error);
        }

        throw new Error(errorMessage);
      }
    },
    [accessToken, handleAuthInitialization]
  );

  return (
    <ApiConnectionContext.Provider value={{ request }}>{children}</ApiConnectionContext.Provider>
  );
};

export const useApiConnection = () => useContext(ApiConnectionContext);

export default ApiConnectionProvider;
