'use client';

import React, { createContext, useContext, useState } from 'react';
import { UserDetailsType } from '@/types/responseTypes';
import { useAppContext } from './AppProvider';

type UserProviderProps = {
  children: React.ReactNode;
};

type DefaultContextDataType = {
  isLoggedIn: boolean;
  userDetails: any | null;
  updateUser: (user: any) => void;
  updateAccessToken: (token: string) => void;
};

const defaultContextData: DefaultContextDataType = {
  isLoggedIn: false,
  userDetails: null,
  updateUser: () => {},
  updateAccessToken: () => {},
};

const UserContextData = createContext(defaultContextData);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { closeAuthModal } = useAppContext();
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const updateUser = (user: any) => {
    setUserDetails(user);
  };

  const updateAccessToken = (token: string) => {
    setAccessToken(token);

    closeAuthModal();
  };

  return (
    <UserContextData.Provider
      value={{
        isLoggedIn: Boolean(accessToken),
        userDetails,
        updateUser,
        updateAccessToken,
      }}
    >
      {children}
    </UserContextData.Provider>
  );
};

export const useUserContext = () => useContext(UserContextData);
