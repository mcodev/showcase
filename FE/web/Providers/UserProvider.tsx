'use client';

import React, { createContext, useContext, useState } from 'react';
import { UserDetailsType } from '@/types/responseTypes';
import { useApiConnection } from './ApiConnectionProvider';

type UserProviderProps = {
  children: React.ReactNode;
};

type DefaultContextDataType = {
  isLoggedIn: boolean;
  userDetails: any | null;
  updateUser: (user: any) => void;
};

const defaultContextData: DefaultContextDataType = {
  isLoggedIn: false,
  userDetails: null,
  updateUser: () => {},
};

const UserContextData = createContext(defaultContextData);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { accessToken } = useApiConnection();

  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);

  const updateUser = (user: any) => {
    setUserDetails(user);
  };

  console.log('isLoggedIn', Boolean(accessToken));

  return (
    <UserContextData.Provider
      value={{
        isLoggedIn: Boolean(accessToken),
        userDetails,
        updateUser,
      }}
    >
      {children}
    </UserContextData.Provider>
  );
};

export const useUserContext = () => useContext(UserContextData);
