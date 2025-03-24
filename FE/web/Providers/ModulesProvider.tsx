'use client';

import React, { createContext, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';

type ModulesProviderProps = {
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

const ModulesContext = createContext(defaultContextData);

export const ModulesProvider = ({ children }: ModulesProviderProps) => {
  const [isAuthModalOpen, { open: openAuthModal, close: closeAuthModal }] = useDisclosure(false);

  return (
    <ModulesContext.Provider
      value={{
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </ModulesContext.Provider>
  );
};

export const useModulesContext = () => useContext(ModulesContext);
