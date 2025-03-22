'use client';

import React, { createContext, useContext } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { PROTECTED_ROUTES, SERVICE, SERVICES, ServicesSelectorType } from '@/services';
import { GLOBAL_ERRORS } from '@/services/errors';
import { GlobalResponseDataType, LoginResponseDataType } from '@/types/responseTypes';
import { useUserContext } from './UserProvider';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

type RequestPropsType = {
  service: ServicesSelectorType;
  payload?: unknown;
};

type ServiceType = {
  [key in keyof typeof SERVICES]: ServicesSelectorType;
};

export const ApiConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  const { updateAccessToken, updateUser, accessToken } = useUserContext();

  const handleAuthInitialization = async (data: LoginResponseDataType) => {
    updateAccessToken(data.accessToken);
    updateUser(data.user);

    secureLocalStorage.setItem('rt', data.refreshToken);
  };

  const request = async ({
    service,
    payload,
  }: RequestPropsType): Promise<GlobalResponseDataType> => {
    const SELECTED_SERVICE = SERVICES[service];

    try {
      const response = await fetch(`${BASE_URL}/${SELECTED_SERVICE.path}`, {
        method: SELECTED_SERVICE.method,
        headers: {
          'Content-Type': 'application/json',
          ...(PROTECTED_ROUTES.includes(service) ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(payload),
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
      });

      const data = await response.json();

      const statusCode = response.status;

      // Create an error mapping object
      const errorMapping = Object.fromEntries(
        SELECTED_SERVICE.errors.map(({ code, message }: { code: number; message: string }) => [
          code,
          message,
        ])
      );

      if (!response.ok) {
        const errorMessage = data?.error;

        if (errorMessage === 'TOKEN_EXPIRED' && statusCode === 402) {
          // get access token fro refresh an retry request
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
        throw new Error(`Fetch function error: ${error.message}`);
      } else {
        throw error;
      }
    }
  };

  return (
    <ApiConnectionContext.Provider value={{ request, SERVICE }}>
      {children}
    </ApiConnectionContext.Provider>
  );
};

const ApiConnectionContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: ({ service, payload }: RequestPropsType) =>
    Promise.resolve({ success: false, data: null, statusCode: 500 }),
  SERVICE: {} as ServiceType,
});

export const useApiConnection = () => useContext(ApiConnectionContext);

export default ApiConnectionProvider;
