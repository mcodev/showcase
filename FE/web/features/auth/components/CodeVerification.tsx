import React from 'react';
import { useAuthContext } from '../context/AuthSelectionProvider';

const CodeVerification = () => {
  const { changeSelectedComponent } = useAuthContext();

  return <div>CodeVerification</div>;
};

export default CodeVerification;
