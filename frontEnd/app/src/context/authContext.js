import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {

  const accessToken = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');

  const [authState, setAuthState] = useState({
    accessToken,
    role
  });

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role',role);

    setAuthState({
      token,
      role,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthState({});
  };

  const isAuthenticated = () => {
    if (!authState.token ) {
      return false;
    }
    return (
     true
    );
  };

  const isAdmin = () => {
    return authState.role === 'admin';
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        isAdmin
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };