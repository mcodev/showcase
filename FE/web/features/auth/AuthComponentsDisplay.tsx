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
import { AUTH_COMPONENTS } from './consts';
import { AuthSelectionProvider } from './context/AuthSelectionProvider';
import { SelectedComponentType } from './types';

const components = {
  signUp: {
    titleTranslationKey: 'sign_up',
    component: <SignUp />,
  },
  signIn: {
    titleTranslationKey: 'sign_in',
    component: <SignIn />,
  },
  forgotPassword: {
    titleTranslationKey: 'forgot_password',
    component: <ForgotPassword />,
  },
  verifyResetCode: {
    titleTranslationKey: 'verify_reset_code',
    component: <CodeVerification />,
  },
  changePassword: {
    titleTranslationKey: 'change_password',
    component: <PasswordChange />,
  },
};

const handleAuthModalParam = ({
  type,
  param,
}: {
  type: 'set' | 'delete';
  param?: SelectedComponentType;
}) => {
  const url = new URL(window.location.href);

  if (type === 'set') {
    url.searchParams.set('authModal', param || AUTH_COMPONENTS.SIGN_IN);
  } else if (type === 'delete') {
    url.searchParams.delete('authModal');
  }

  window.history.replaceState({}, '', url.href);
};

const AuthComponentsDisplay = () => {
  const { isAuthModalOpen, closeAuthModal } = useModulesContext();

  const searchParams = useSearchParams();
  const authModal = searchParams.get('authModal') as SelectedComponentType;

  const [selectedComponent, setSelectedComponent] = useState<SelectedComponentType>(
    authModal || AUTH_COMPONENTS.SIGN_IN
  );

  const changeSelectedComponent = (component: SelectedComponentType) => {
    setSelectedComponent(component);
  };

  const isModalVisible = isAuthModalOpen || Boolean(authModal);

  const handleCloseModal = () => {
    closeAuthModal();

    if (authModal) {
      handleAuthModalParam({ type: 'delete' });
    }

    setTimeout(() => {
      setSelectedComponent(AUTH_COMPONENTS.SIGN_IN);
    }, 500);
  };

  return (
    <CustomModal
      isVisible={isModalVisible}
      onClose={handleCloseModal}
      title={components[selectedComponent].titleTranslationKey}
      size="md"
    >
      <AuthSelectionProvider
        selectedComponent={selectedComponent}
        changeSelectedComponent={changeSelectedComponent}
        handleAuthModalParam={handleAuthModalParam}
      >
        {components[selectedComponent].component}
      </AuthSelectionProvider>
    </CustomModal>
  );
};

export default AuthComponentsDisplay;
