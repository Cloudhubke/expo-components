import React from 'react';
import AppContext from './AppContext';

const AppContextProvider = ({ children, value = {} }) => (
  <AppContext.Provider value={{ ...value }}>{children}</AppContext.Provider>
);

export default AppContextProvider;
