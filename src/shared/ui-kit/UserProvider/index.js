import React, { useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
