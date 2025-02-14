import { createContext, useState } from "react";
import { getAccessTokenFromLS } from "../utils/auth";

export const AppContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAccessTokenFromLS()));

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};
