import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

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

  const setAuthInfo = ({ accessToken, role,name }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('role',role);
    localStorage.setItem('name',name);

    setAuthState({
      accessToken,
      role,
      name,
    });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    setAuthState({});
  };
  const isAuthenticatedBackend = () =>{
    axios.get("http://localhost:8000/checkAuth")
    .then((verifiedUser)=>{
        setAuthInfo(verifiedUser)
        return true
    })
    .catch(()=>{
        return false
    })
  }
  const isAuthenticated = () => {
    if (!authState.accessToken ) {
      return false;
    }
    return (
     true
    );
  };

  const isAdminBackend = () =>{
    axios.get("http://localhost:8000/checkAdmin")
    .then((verifiedUser)=>{
        setAuthInfo(verifiedUser)
        return true
    })
    .catch(()=>{
        return false
    })
  }

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
        isAdmin,
        isAuthenticatedBackend,
        isAdminBackend
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };