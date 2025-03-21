'use client';

import React, { createContext, useContext } from 'react';
import { PROTECTED_ROUTES, SERVICES, ServicesSelectorType } from '@/services';
import { GLOBAL_ERRORS } from '@/services/errors';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

type RequestPropsType = {
  service: ServicesSelectorType;
  payload: any;
};

export const ApiConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  const request = async ({
    service,
    payload,
  }: RequestPropsType): Promise<{ success: boolean; data: any; statusCode: number }> => {
    const SELECTED_SERVICE = SERVICES[service];

    try {
      const response = await fetch(`${BASE_URL}/${SELECTED_SERVICE.path}`, {
        method: SELECTED_SERVICE.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
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
        throw new Error(errorMapping[statusCode] || GLOBAL_ERRORS.UNEXPECTED_ERROR);
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
    <ApiConnectionContext.Provider value={{ request }}>{children}</ApiConnectionContext.Provider>
  );
};

const ApiConnectionContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: ({ service, payload }: RequestPropsType) =>
    Promise.resolve({ success: false, data: null, statusCode: 500 }),
});

export const useApiConnection = () => useContext(ApiConnectionContext);

export default ApiConnectionProvider;
