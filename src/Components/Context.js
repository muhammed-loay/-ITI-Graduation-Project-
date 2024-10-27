import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const login = (email, password) => {
    if (
      registeredUser &&
      registeredUser.email === email &&
      registeredUser.password === password
    ) {
      setIsAuthenticated(true);
      return registeredUser.role;
    } else {
      return null;
    }
  };
  const logout = () => {
    setIsAuthenticated(false);
    setRegisteredUser(null);
  };

  const registerUser = (email, password, role) => {
    setRegisteredUser({ email, password, role });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        registeredUser,
        login,
        logout,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
