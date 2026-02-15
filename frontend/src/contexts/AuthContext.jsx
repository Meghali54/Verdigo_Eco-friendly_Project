/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on app start
    const storedUser = localStorage.getItem("verdigo_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple validation for demo
    if (email && password.length >= 6) {
      const newUser = {
        id: Date.now().toString(),
        email,
        name: email.split("@")[0],
      };
      setUser(newUser);
      localStorage.setItem("verdigo_user", JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const signup = async (name, email, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple validation for demo
    if (name && email && password.length >= 6) {
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
      };
      setUser(newUser);
      localStorage.setItem("verdigo_user", JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("verdigo_user");
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
