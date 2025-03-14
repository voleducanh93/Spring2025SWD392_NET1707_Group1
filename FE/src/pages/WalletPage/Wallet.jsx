import AppContext from "antd/es/app/context";
import React, { useContext, useEffect, useState } from "react";
import { getWalletByUser } from "../../api/wallet.api";

export default function Wallet() {
  const [walletData, setWalletData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getUser } = useContext(AppContext);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await getWalletByUser();

        //const data = await response.json();
        setWalletData(response);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, [getUser]);

  if (isLoading) {
    return (
      <div className="!flex !items-center !justify-center !min-h-screen">
        <div className="!animate-spin !rounded-full !h-12 !w-12 !border-t-2 !border-b-2 !border-blue-500"></div>
      </div>
    );
  }

  if (!walletData) {
    return (
      <div className="!flex !items-center !justify-center !min-h-screen">
        <div className="!text-red-500 !text-lg !font-semibold">
          Error loading wallet data
        </div>
      </div>
    );
  }

  return (
    <div className="!min-h-screen !bg-gradient-to-br !from-gray-50 !to-blue-50 !py-12 !px-4">
      <div className="!max-w-6xl !mx-auto">
        <h1 className="!text-4xl !font-bold !text-gray-800 !mb-8 !text-center">
          My Wallet
        </h1>

        {/* Wallet Summary Cards */}
        <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-8 !mb-12">
          {/* Balance Card */}
          <div className="!bg-gradient-to-r !from-blue-500 !to-blue-600 !rounded-2xl !shadow-2xl !p-8 !text-white !transform hover:!scale-105 !transition-transform !duration-300">
            <div className="!flex !items-center !justify-between">
              <div>
                <h2 className="!text-lg !font-medium">Current Balance</h2>
                <p className="!text-4xl !font-bold !mt-2">
                  {walletData.balance.toLocaleString()} VND
                </p>
              </div>
            </div>
          </div>

          {/* Total Refunded Card */}
          <div className="!bg-gradient-to-r !from-green-500 !to-green-600 !rounded-2xl !shadow-2xl !p-8 !text-white !transform hover:!scale-105 !transition-transform !duration-300">
            <div className="!flex !items-center !justify-between">
              <div>
                <h2 className="!text-lg !font-medium">Total Refunded</h2>
                <p className="!text-4xl !font-bold !mt-2">
                  {walletData.totalRefunded.toLocaleString()} VND
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="!bg-white !rounded-2xl !shadow-xl !p-8">
          <h2 className="!text-2xl !font-bold !text-gray-800 !mb-6">
            Recent Transactions
          </h2>
          {walletData.recentTransactions.length === 0 ? (
            <div className="!text-center !text-gray-500 !py-8">
              <p className="!text-lg">No recent transactions</p>
            </div>
          ) : (
            <div className="!space-y-4">
              {walletData.recentTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="!flex !items-center !justify-between !p-6 !bg-gray-50 !rounded-xl hover:!bg-gray-100 !transition-colors !duration-300"
                >
                  <div>
                    <h3 className="!text-lg !font-medium !text-gray-900">
                      {transaction.description}
                    </h3>
                    <p className="!text-sm !text-gray-500">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={`!text-xl !font-semibold 
                      ${
                        transaction.amount > 0
                          ? "!text-green-600"
                          : "!text-red-600"
                      }`}
                  >
                    {transaction.amount.toLocaleString()} VND
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
