import http from "../utils/http";
const BASE_URL = "/Wallet/user";
const PROCESS_WALLET = '/payment/wallet/process';
const CREATE_DEPOSIT = 'wallet/deposit/create';
export const getWalletByUser = async (userId) => {
  const response = await http.get(`${BASE_URL}/${userId}`);
  return response.data.result;
};
export const proccessWallet = async (data) => {
    const response = await http.post(PROCESS_WALLET,data);
    return response.data.result;
  };

  export const depositMoney = async (amount) => {
    const response = await http.post(CREATE_DEPOSIT, { amount });
    return response.data.result; 
  };
  