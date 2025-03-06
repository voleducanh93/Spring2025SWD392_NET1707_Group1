import { createContext, useEffect, useState } from "react";
import { getAccessTokenFromLS, getUserIdLS } from "../utils/auth";
import { useGetWallet } from "../hooks/useWallet"; // ✅ Import hook lấy số dư
import { useQueryClient } from "@tanstack/react-query"; // ✅ Import queryClient

export const AppContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  getUser: "",
  setGetUser: () => {},
  walletBalance: 0,
  setWalletBalance: () => {},
  refreshWalletBalance: () => {},
});

export const AppProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAccessTokenFromLS()));
  const [getUser, setGetUser] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);

  // ✅ Lấy userId từ localStorage khi đăng nhập
  useEffect(() => {
    const storedUserId = getUserIdLS();
    if (storedUserId) {
      setGetUser(storedUserId);
    }
  }, [isAuthenticated]);

  
  const refreshWalletBalance = () => {
    if (getUser) {
      queryClient.invalidateQueries(["wallet", getUser]); 
    }
  };

  
  const { data: walletData } = useGetWallet(getUser);

  useEffect(() => {
    if (walletData?.balance !== undefined) {
      setWalletBalance(walletData.balance);
    }
  }, [walletData]);

 
  useEffect(() => {
    const handleFocus = () => {
      refreshWalletBalance();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [getUser]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        getUser,
        setGetUser,
        walletBalance,
        setWalletBalance,
        refreshWalletBalance, 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
