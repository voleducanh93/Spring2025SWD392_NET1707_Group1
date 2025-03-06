import { createContext, useEffect, useState } from "react";
import { getAccessTokenFromLS, getUserIdLS } from "../utils/auth";
import { useGetWallet } from "../hooks/useWallet"; // ✅ Import useGetWallet

export const AppContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  getUser: "",
  setGetUser: () => {},
  walletBalance: 0, 
  setWalletBalance: () => {},
});

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAccessTokenFromLS()));
  const [getUser, setGetUser] = useState("");
  const [walletBalance, setWalletBalance] = useState(0); 

  useEffect(() => {
    const storedUserId = getUserIdLS();
    console.log(storedUserId);
    
    if (storedUserId) {
      setGetUser(storedUserId);
    }
  }, [isAuthenticated]);

  // ✅ Gọi API lấy số dư ví
  const { data: walletData } = useGetWallet(getUser);

  useEffect(() => {
    if (walletData?.balance !== undefined) {
      console.log(walletData?.balance);
      
      setWalletBalance(walletData.balance); 
    }
  }, [walletData]);

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, getUser, setGetUser, walletBalance, setWalletBalance }}>
      {children}
    </AppContext.Provider>
  );
};
