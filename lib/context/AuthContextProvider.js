import React from 'react';
import AuthContext from './AuthContext';

const AuthContextProvider = ({ children, value = {} }) => (
  <AuthContext.Provider value={{ ...value }}>{children}</AuthContext.Provider>
);

export default AuthContextProvider;
