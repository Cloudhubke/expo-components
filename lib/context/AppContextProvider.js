import React from 'react';
import AppContext from './AppContext';
import useAppStore from './useAppStore';

const AppContextProvider = ({ children }) => {
  const state = useAppStore((state) => state);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
