import React, { createContext, useState, useEffect } from "react";
import { loginUser, updateUser, getUserById } from "../API/usersApi";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("authUser");
      setIsLoggedIn(false);
    }
  }, [user]);

  const refreshUser = async () => {
    if (!user) return;
    const freshUser = await getUserById(user.id);
    setUser(freshUser);
    return freshUser;
  };

  const login = async (email, password) => {
    const foundUser = await loginUser(email, password);
    setUser(foundUser);
    setIsLoggedIn(true);
    localStorage.setItem("authUser", JSON.stringify(foundUser));
    return foundUser;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("authUser");
  };

  const updateProfile = async (updatedData) => {
    if (!user) throw new Error("No user logged in");
    const updated = await updateUser(user.id, updatedData);
    setUser(updated);
    return updated;
  };

  const changePassword = async (newPassword) => {
    if (!user) throw new Error("No user logged in");
    const updatedUser = { ...user, password: newPassword };
    const updated = await updateUser(user.id, updatedUser);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        login,
        logout,
        updateProfile,
        changePassword,
        refreshUser, // 🔑 expose this
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
