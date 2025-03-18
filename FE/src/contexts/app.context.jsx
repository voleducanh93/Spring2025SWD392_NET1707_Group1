import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAccessTokenFromLS, getUserIdLS } from "../utils/auth";
import { useGetWallet } from "../hooks/useWallet";
import { useQueryClient } from "@tanstack/react-query";
import { getUserRoleFromToken } from "../utils/decode";

export const AppContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  getUser: "",
  setGetUser: () => {},
  walletBalance: 0,
  setWalletBalance: () => {},
  refreshWalletBalance: () => {},
  userRole: "",
  setUserRole: () => {},
});

export const AppProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAccessTokenFromLS()));
  const [getUser, setGetUser] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [userRole, setUserRole] = useState("");

 
  useEffect(() => {
    const storedUserId = getUserIdLS();
    if (storedUserId) {
      setGetUser(storedUserId);
    }
  }, [isAuthenticated]);

 
  useEffect(() => {
    if (isAuthenticated) {
      const token = getAccessTokenFromLS();
      if (token) {
        const role = getUserRoleFromToken(token)?.toLowerCase(); 
        console.log("AppContext - Vai trò lấy từ token:", role);
        if (role) setUserRole(role);
      }
    }
  }, [isAuthenticated]);

 
  const { data: walletData } = useGetWallet({
    enabled: isAuthenticated && (userRole === "customer" || userRole === "admin"),
  });

  useEffect(() => {
    if (walletData?.balance !== undefined) {
      setWalletBalance(walletData.balance);
    }
  }, [walletData]);

  
  const refreshWalletBalance = () => {
    if (isAuthenticated && (userRole === "customer" || userRole === "admin")) {
      queryClient.invalidateQueries("wallet");
    }
  };

 
  useEffect(() => {
    if (isAuthenticated && (userRole === "customer" || userRole === "admin")) {
      const handleFocus = () => {
        refreshWalletBalance();
      };
      window.addEventListener("focus", handleFocus);
      return () => window.removeEventListener("focus", handleFocus);
    }
  }, [isAuthenticated, userRole]);

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
        setUserRole,
        userRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Fix: Đưa `propTypes` ra ngoài cùng
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
