import { createContext, useEffect, useState } from "react";
import { getAccessTokenFromLS, getUserIdLS } from "../utils/auth";

export const AppContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAccessTokenFromLS()));
  const [getUser, setGetUser] = useState("");
  
  
  useEffect(() => {
    const storedUserId = getUserIdLS();
    if (storedUserId) {
      setGetUser(storedUserId);
    }
  }, [isAuthenticated]);
  
  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, getUser,setGetUser }}>
      {children}
    </AppContext.Provider>
  );
};
