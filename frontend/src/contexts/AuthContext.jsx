/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
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
    const res = await fetch(`${BACKEND}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Invalid email or password");
    setUser(data.user);
    localStorage.setItem("verdigo_user", JSON.stringify(data.user));
    localStorage.setItem("verdigo_token", data.token);
    return true;
  };

  const signup = async (name, email, password) => {
    const res = await fetch(`${BACKEND}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create account");
    setUser(data.user);
    localStorage.setItem("verdigo_user", JSON.stringify(data.user));
    localStorage.setItem("verdigo_token", data.token);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("verdigo_user");
    localStorage.removeItem("verdigo_token");
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
