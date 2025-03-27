'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CustomModal from '@/components/CustomModal/CustomModal';
import { useModulesContext } from '@/providers/ModulesProvider';
import CodeVerification from './components/CodeVerification';
import ForgotPassword from './components/ForgotPassword';
import PasswordChange from './components/PasswordChange';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthSelectionProvider } from './context/AuthSelectionProvider';
import { SelectedComponentType } from './types';

const components = {
  signUp: {
    titleKey: 'sign_up',
    component: <SignUp />,
  },
  signIn: {
    titleKey: 'sign_in',
    component: <SignIn />,
  },
  forgotPassword: {
    titleKey: 'forgot_password',
    component: <ForgotPassword />,
  },
  verifyResetCode: {
    titleKey: 'verify_reset_code',
    component: <CodeVerification />,
  },
  changePassword: {
    titleKey: 'change_password',
    component: <PasswordChange />,
  },
};

const AuthComponentsDisplay = () => {
  const { isAuthModalOpen, closeAuthModal } = useModulesContext();

  const searchParams = useSearchParams();
  const authModal = searchParams.get('authModal') as SelectedComponentType;

  const [selectedComponent, setSelectedComponent] = useState<SelectedComponentType>(
    authModal || 'signIn'
  );

  const changeSelectedComponent = (component: SelectedComponentType) => {
    setSelectedComponent(component);
  };

  const isModalVisible = isAuthModalOpen || Boolean(authModal);

  const removeAuthModalParam = () => {
    const url = new URL(window.location.href);

    url.searchParams.delete('authModal');

    window.history.replaceState({}, '', url.href);
  };

  const handleCloseModal = () => {
    closeAuthModal();

    if (authModal) {
      removeAuthModalParam();
    }

    setTimeout(() => {
      setSelectedComponent('signIn');
    }, 500);
  };

  return (
    <CustomModal
      isVisible={isModalVisible}
      onClose={handleCloseModal}
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
