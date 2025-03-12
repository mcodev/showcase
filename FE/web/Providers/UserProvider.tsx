'use client';

import React from 'react';

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  return <div>{children}</div>;
};

export default UserProvider;
