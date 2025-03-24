'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import useRefresh from '@/hooks/useRefresh';
import { PROTECTED_ROUTES, SERVICE, SERVICES, ServicesSelectorType } from '@/services';
import { GLOBAL_ERRORS } from '@/services/errors';
import { GlobalResponseDataType, LoginResponseDataType } from '@/types/responseTypes';
import { useAppContext } from './AppProvider';
import { useUserContext } from './UserProvider';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

type RequestPropsType = {
  service: ServicesSelectorType;
  payload?: unknown;
  newAccessToken?: string;
};

export const ApiConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  const { updateUser } = useUserContext();
  const { closeAuthModal } = useAppContext();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { refresh } = useRefresh();

  const handleAuthInitialization = async (data: LoginResponseDataType) => {
    setAccessToken(data.accessToken);
    updateUser(data.user);

    closeAuthModal();

    secureLocalStorage.setItem('rt', data.refreshToken);
  };

  useEffect(() => {
    const getNewToken = async () => {
      const refreshToken = secureLocalStorage.getItem('rt');

      if (refreshToken) {
        const newAccessToken = await refresh();

        if (newAccessToken) {
          setAccessToken(newAccessToken);
        }
      }
    };

    getNewToken();
  }, []);

  const request = async ({
    service,
    payload,
    newAccessToken,
  }: RequestPropsType): Promise<GlobalResponseDataType> => {
    const SELECTED_SERVICE = SERVICES[service];

    try {
      const token = newAccessToken || accessToken;
      const response = await fetch(`${BASE_URL}/${SELECTED_SERVICE.path}`, {
        method: SELECTED_SERVICE.method,
        headers: {
          'Content-Type': 'application/json',
          ...(PROTECTED_ROUTES.includes(service) ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
      });

      const data = await response.json();
      const statusCode = response.status;

      const errorMapping = Object.fromEntries(
        SELECTED_SERVICE.errors.map(({ code, message }: { code: number; message: string }) => [
          code,
          message,
        ])
      );

      if (!response.ok) {
        if (data.error === 'TOKEN_EXPIRED' && !newAccessToken) {
          const newAccessToken = await refresh();

          if (newAccessToken) {
            setAccessToken(newAccessToken);

            return request({ service, payload, newAccessToken });
          }
        }

        throw new Error(errorMapping[statusCode] || GLOBAL_ERRORS.UNEXPECTED_ERROR);
      }

      if (service === SERVICE.LOGIN_SERVICE || service === SERVICE.SIGN_UP_SERVICE) {
        if (data.data.accessToken && data.data.refreshToken) {
          await handleAuthInitialization(data.data);

          return { statusCode, success: data.success, data: null };
        }
        throw new Error('Unexpected error');
      }

      return { statusCode, success: data.success, data: data.data };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  return (
    <ApiConnectionContext.Provider value={{ request, accessToken }}>
      {children}
    </ApiConnectionContext.Provider>
  );
};

const ApiConnectionContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: ({ service, payload }: RequestPropsType) =>
    Promise.resolve({ success: false, data: null, statusCode: 500 }),
  accessToken: null as string | null,
});

export const useApiConnection = () => useContext(ApiConnectionContext);

export default ApiConnectionProvider;
