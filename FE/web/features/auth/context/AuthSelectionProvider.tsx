import { createContext, useContext } from 'react';
import { AUTH_COMPONENTS } from '../consts';
import { SelectedComponentType } from '../types';

type DefaultContextDataType = {
  selectedComponent: SelectedComponentType;
  changeSelectedComponent: (component: SelectedComponentType) => void;
  handleAuthModalUrlParam: (params: {
    type: 'set' | 'delete';
    param?: SelectedComponentType;
  }) => void;
};
type AuthSelectionProviderProps = {
  children: React.ReactNode;
  selectedComponent: SelectedComponentType;
  changeSelectedComponent: (component: SelectedComponentType) => void;
  handleAuthModalUrlParam: (params: {
    type: 'set' | 'delete';
    param?: SelectedComponentType;
  }) => void;
};

const defaultContextData: DefaultContextDataType = {
  selectedComponent: AUTH_COMPONENTS.SIGN_IN,
  changeSelectedComponent: () => {},
  handleAuthModalUrlParam: () => {},
};

const AuthContextData = createContext(defaultContextData);

export const AuthSelectionProvider = ({
  children,
  selectedComponent,
  changeSelectedComponent,
  handleAuthModalUrlParam,
}: AuthSelectionProviderProps) => (
  <AuthContextData.Provider
    value={{ selectedComponent, changeSelectedComponent, handleAuthModalUrlParam }}
  >
    {children}
  </AuthContextData.Provider>
);

export const useAuthContext = () => useContext(AuthContextData);
