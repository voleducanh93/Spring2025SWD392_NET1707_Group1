import { createContext, useState } from "react";
import { getAccessTokenFromLS, getUserIdLS } from "../utils/auth";

export const AppContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAccessTokenFromLS()));
  const [getUser] = useState(getUserIdLS());
  console.log(getUser);
  
  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, getUser }}>
      {children}
    </AppContext.Provider>
  );
};
