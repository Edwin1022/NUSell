import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [forgotEmail, setForgotEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        user,
        setUser,
        forgotEmail,
        setForgotEmail,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
