'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export const ApiConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiConnection, setApiConnection] = useState<string>('');

  useEffect(() => {
    setApiConnection(window.location.origin);
  }, []);

  return (
    <ApiConnectionContext.Provider value={{ apiConnection }}>
      {children}
    </ApiConnectionContext.Provider>
  );
};

const ApiConnectionContext = createContext({
  apiConnection: '',
});

export const useApiConnection = () => useContext(ApiConnectionContext);

export default ApiConnectionProvider;
