'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { REFRESH_TOKEN_KEY } from '@/common/consts';
import useRefresh from '@/hooks/useRefresh';
import { PROTECTED_ROUTES, SERVICE, SERVICES, ServicesSelectorType } from '@/services';
import { GLOBAL_ERRORS } from '@/services/errors';
import { AuthResponseDataType, GlobalResponseDataType } from '@/types/responseTypes';
import { useUserContext } from './UserProvider';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

type RequestPropsType = {
  service: ServicesSelectorType;
  payload?: unknown;
  newAccessToken?: string;
  retryCount?: number;
};

export const ApiConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  const { updateUser } = useUserContext();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { refresh } = useRefresh();

  const handleAuthInitialization = async (data: AuthResponseDataType) => {
    setAccessToken(data.accessToken);
    updateUser(data.user);

    secureLocalStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
  };

  useEffect(() => {
    const getNewToken = async () => {
      const refreshToken = secureLocalStorage.getItem(REFRESH_TOKEN_KEY);

      if (refreshToken) {
        const newAccessToken = await refresh();

        if (newAccessToken) {
          setAccessToken(newAccessToken);
        }
      }
    };

    getNewToken();
  }, []);

  const clearTokens = () => {
    setAccessToken(null);
    secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);
  };

  const request = async ({
    service,
    payload,
    newAccessToken,
    retryCount = 0,
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
      const statusCode = response.status as number;

      if (!response.ok) {
        if (data.error === 'TOKEN_EXPIRED' && retryCount < 2) {
          const newAccessToken = await refresh();

          if (newAccessToken) {
            setAccessToken(newAccessToken);

            const newPayload =
              service === SERVICE.LOGOUT_SERVICE
                ? {
                    refreshToken: secureLocalStorage.getItem(REFRESH_TOKEN_KEY),
                  }
                : payload;

            return request({
              service,
              payload: newPayload,
              newAccessToken,
              retryCount: retryCount + 1,
            });
          }
        }

        if (retryCount >= 2) {
          clearTokens();
          throw new Error(GLOBAL_ERRORS.UNAUTHORIZED_ACCESS);
        }

        throw new Error(
          // TODO fix this
          statusCode && SELECTED_SERVICE.errorCodes.includes(statusCode)
            ? data.error
            : GLOBAL_ERRORS.UNEXPECTED_ERROR
        );
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
    <ApiConnectionContext.Provider value={{ request, accessToken, clearTokens }}>
      {children}
    </ApiConnectionContext.Provider>
  );
};

const ApiConnectionContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: ({ service, payload }: RequestPropsType) =>
    Promise.resolve({ success: false, data: null, statusCode: 500 }),
  accessToken: null as string | null,
  clearTokens: () => {},
});

export const useApiConnection = () => useContext(ApiConnectionContext);

export default ApiConnectionProvider;
