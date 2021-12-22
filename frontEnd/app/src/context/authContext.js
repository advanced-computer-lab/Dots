import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {

  const accessToken = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');

  const [authState, setAuthState] = useState({
    accessToken,
    role,
    name
  });

  const setAuthInfo = ({ token, role,name }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role',role);
    localStorage.setItem('name',name);

    setAuthState({
      token,
      role,
      name,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
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