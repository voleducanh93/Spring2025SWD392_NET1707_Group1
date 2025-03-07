import http from "../utils/http";
const BASE_URL = "/Wallet/user";
const PROCESS_WALLET = '/Wallet/payment/process';
const CREATE_DEPOSIT = 'wallet/deposit/create';
export const getWalletByUser = async () => {
  const response = await http.get(`${BASE_URL}`);
  return response.data.result;
};
export const proccessWallet = async (id) => {
    const response = await http.post(`${PROCESS_WALLET}/${id}`);
    return response.data.result;
  };

  export const depositMoney = async (amount) => {
    const response = await http.post(CREATE_DEPOSIT, { amount });
    return response.data.result; 
  };
