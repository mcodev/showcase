'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import axios, { AxiosInstance } from 'axios';
import secureLocalStorage from 'react-secure-storage';
import useRefresh from '@/hooks/useRefresh';
import { PROTECTED_ROUTES, SERVICE, SERVICES, ServicesSelectorType } from '@/services';
import { GLOBAL_ERRORS } from '@/services/errors';
import { GlobalResponseDataType } from '@/types/responseTypes';
import { useAppContext } from './AppProvider';
import { useUserContext } from './UserProvider';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

type RequestPropsType = {
  service: ServicesSelectorType;
  payload?: unknown;
};

const ApiConnectionContext = createContext<{
  request: (props: RequestPropsType) => Promise<GlobalResponseDataType>;
  accessToken: string | null;
}>({
  request: async () => ({ success: false, data: null, statusCode: 500 }),
  accessToken: null,
});

export const ApiConnectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const accessTokenRef = useRef<string | null>(null);

  const { closeAuthModal } = useAppContext();

  const { updateUser } = useUserContext();
  const { refresh } = useRefresh();

  useEffect(() => {
    const refreshCallback = async () => {
      const newAccessToken = await refresh();
      console.log('newAccessToken', newAccessToken?.slice(-5));

      if (newAccessToken) {
        accessTokenRef.current = newAccessToken;
        setAccessToken(newAccessToken); // ✅ Trigger re-render when token updates
      }
    };

    refreshCallback();
  }, []);

  const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  api.interceptors.request.use(
    (config) => {
      console.log('🔄 Sending request with token:', accessTokenRef.current?.slice(-5));

      const selected_service = Object.keys(SERVICES).find(
        (key) => SERVICES[key as ServicesSelectorType].path === config?.url
      ) as ServicesSelectorType;

      if (Boolean(accessTokenRef.current) && PROTECTED_ROUTES.includes(selected_service)) {
        config.headers.Authorization = `Bearer ${accessTokenRef.current}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 403 && !originalRequest._retry) {
        accessTokenRef.current = null;
        setAccessToken(null); // ✅ Clear token and trigger re-render
        delete api.defaults.headers.common.Authorization;

        originalRequest._retry = true;

        let attempts = 0;

        while (attempts < 2) {
          try {
            const newAccessToken = await refresh();
            if (!newAccessToken) {
              return Promise.reject(error);
            }

            accessTokenRef.current = newAccessToken;
            setAccessToken(newAccessToken); // ✅ Trigger re-render when token updates

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            console.log('🔄 Retrying with new token:', newAccessToken?.slice(-5));
            return api(originalRequest);
          } catch (refreshError) {
            attempts++;
          }
        }
        console.error('❌ Could not refresh access token after 2 attempts');
      }
      return Promise.reject(error);
    }
  );

  const request = async ({
    service,
    payload,
  }: RequestPropsType): Promise<GlobalResponseDataType> => {
    const { path, method, errors } = SERVICES[service];

    try {
      console.log('🚀 Making request with token:', accessTokenRef.current?.slice(-5));

      const response = await api({ url: path, method, data: payload });
      const statusCode = response.status;
      const data = response.data;

      if (!response.data.success) {
        const errorMapping = Object.fromEntries(errors.map(({ code, message }) => [code, message]));
        throw new Error(errorMapping[statusCode] || GLOBAL_ERRORS.UNEXPECTED_ERROR);
      }

      if ([SERVICE.LOGIN_SERVICE, SERVICE.SIGN_UP_SERVICE].includes(service)) {
        if (data.data?.accessToken && data.data?.refreshToken) {
          console.log('🔓 Successfully logged in');

          accessTokenRef.current = data.data.accessToken;
          setAccessToken(data.data.accessToken); // ✅ Trigger re-render when token updates

          updateUser(data.data.user);
          secureLocalStorage.setItem('rt', data.data.refreshToken);
          closeAuthModal();

          return { statusCode, success: data.success, data: null };
        }
        throw new Error('Unexpected authentication error');
      }

      return { statusCode, success: data.success, data: data.data };
    } catch (error) {
      console.error('API Request Failed:', error);
      throw new Error(GLOBAL_ERRORS.UNEXPECTED_ERROR);
    }
  };

  console.log('🔍 Current Access Token:', accessToken?.slice(-5));

  return (
    <ApiConnectionContext.Provider value={{ request, accessToken }}>
      {children}
    </ApiConnectionContext.Provider>
  );
};

export const useApiConnection = () => useContext(ApiConnectionContext);

export default ApiConnectionProvider;
