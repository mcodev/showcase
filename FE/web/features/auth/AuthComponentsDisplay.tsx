'use client';

import React, { useState } from 'react';
import CustomModal from '@/components/CustomModal/CustomModal';
import { useAppContext } from '@/providers/AppProvider';
import ForgotPassword from './components/ForgotPassword';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthSelectionProvider } from './context/AuthSelectionProvider';
import { SelectedComponentType } from './types';

const components = {
  signIn: {
    titleKey: 'sign_in',
    component: <SignIn />,
  },
  forgotPassword: {
    titleKey: 'forgot_password',
    component: <ForgotPassword />,
  },
  signUp: {
    titleKey: 'sign_up',
    component: <SignUp />,
  },
};

const AuthComponentsDisplay = () => {
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponentType>('signIn');

  const { isAuthModalOpen, closeAuthModal } = useAppContext();

  const changeSelectedComponent = (component: SelectedComponentType) => {
    setSelectedComponent(component);
  };

  return (
    <CustomModal
      isVisible={isAuthModalOpen}
      onClose={() => {
        closeAuthModal();

        setTimeout(() => {
          setSelectedComponent('signIn');
        }, 500);
      }}
      title={components[selectedComponent].titleKey}
      size="md"
    >
      <AuthSelectionProvider
        selectedComponent={selectedComponent}
        changeSelectedComponent={changeSelectedComponent}
      >
        {components[selectedComponent].component}
      </AuthSelectionProvider>
    </CustomModal>
  );
};

export default AuthComponentsDisplay;
