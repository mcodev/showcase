'use client';

import React, { useEffect } from 'react';

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  useEffect(() => {
    console.log('TestProvider');
  }, []);

  return <div>{children}</div>;
};

export default UserProvider;
