'use client';

import React, { createContext, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';

type AppProviderProps = {
  children: React.ReactNode;
};

type DefaultContextDataType = {
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

const defaultContextData: DefaultContextDataType = {
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
};

const AppContext = createContext(defaultContextData);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isAuthModalOpen, { open: openAuthModal, close: closeAuthModal }] = useDisclosure(false);

  return (
    <AppContext.Provider
      value={{
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
