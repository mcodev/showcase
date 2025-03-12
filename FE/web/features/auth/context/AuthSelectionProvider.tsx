import { createContext, useContext } from 'react';
import { SelectedComponentType } from '../types';

type DefaultContextDataType = {
  selectedComponent: SelectedComponentType;
  changeSelectedComponent: (component: SelectedComponentType) => void;
};
type AuthSelectionProviderProps = {
  children: React.ReactNode;
  selectedComponent: SelectedComponentType;
  changeSelectedComponent: (component: SelectedComponentType) => void;
};

const defaultContextData: DefaultContextDataType = {
  selectedComponent: 'signIn',
  changeSelectedComponent: () => {},
};

const AuthContextData = createContext(defaultContextData);

export const AuthSelectionProvider = ({
  children,
  selectedComponent,
  changeSelectedComponent,
}: AuthSelectionProviderProps) => (
  <AuthContextData.Provider value={{ selectedComponent, changeSelectedComponent }}>
    {children}
  </AuthContextData.Provider>
);

export const useAuthContext = () => useContext(AuthContextData);
