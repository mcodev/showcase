'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type UserProviderProps = {
  children: React.ReactNode;
};

type DefaultContextDataType = {
  isLoggedIn: boolean;
  newNotifications: boolean;
  userDetails: any | null;
  isUserDataLoading: boolean;
};

const defaultContextData: DefaultContextDataType = {
  isLoggedIn: false,
  newNotifications: false,
  userDetails: null,
  isUserDataLoading: true,
};

const UserContextData = createContext(defaultContextData);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [newNotifications, setNewNotifications] = useState(false);

  useEffect(() => {
    setIsLoggedIn(true);
    setIsUserDataLoading(false);
    setUserDetails({});
    setNewNotifications(false);
  }, []);

  return (
    <UserContextData.Provider
      value={{
        isLoggedIn,
        newNotifications,
        userDetails,
        isUserDataLoading,
      }}
    >
      {children}
    </UserContextData.Provider>
  );
};

export const useUserContext = () => useContext(UserContextData);
