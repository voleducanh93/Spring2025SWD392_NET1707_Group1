import AppContext from "antd/es/app/context";
import React, { useContext, useEffect, useState } from "react";
import { getWalletByUser } from "../../api/wallet.api";

export default function Wallet() {
  const [walletData, setWalletData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("all");
  const { getUser } = useContext(AppContext);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await getWalletByUser();
        setWalletData(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu ví:", error);
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
          Lỗi khi tải dữ liệu ví
        </div>
      </div>
    );
  }

  const filteredTransactions = walletData.recentTransactions.filter((transaction) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "deposit") return transaction.amount > 0;
    if (selectedTab === "payment") return transaction.amount < 0;
    return true;
  });

  return (
    <div className="!min-h-screen !bg-gradient-to-br !from-gray-50 !to-blue-50 !py-12 !px-4">
      <div className="!max-w-6xl !mx-auto">
        <h1 className="!text-4xl !font-bold !text-gray-800 !mb-8 !text-center">Ví của tôi</h1>

        {/* Số dư & Hoàn tiền */}
        <div className="!flex !justify-center !gap-6 !mb-8">
          <div className="!bg-blue-500 !text-white !rounded-2xl !shadow-xl !p-6 !w-1/2">
            <h2 className="!text-lg">Số dư hiện tại</h2>
            <p className="!text-2xl !font-bold">{walletData.balance.toLocaleString()} VND</p>
          </div>
          <div className="!bg-green-500 !text-white !rounded-2xl !shadow-xl !p-6 !w-1/2">
            <h2 className="!text-lg">Tổng tiền hoàn</h2>
            <p className="!text-2xl !font-bold">{walletData.totalRefunded.toLocaleString()} VND</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="!flex !justify-center !mb-6">
          {[
            { key: "all", label: "Tất cả" },
            { key: "deposit", label: "Nạp tiền" },
            { key: "payment", label: "Giao dịch" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`!px-6 !py-2 !rounded-full !text-lg !font-semibold !mx-2 ${
                selectedTab === tab.key ? "!bg-blue-500 !text-white" : "!bg-gray-200 !text-gray-700"
              }`}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Transactions */}
        <div className="!bg-white !rounded-2xl !shadow-xl !p-8">
          <h2 className="!text-2xl !font-bold !text-gray-800 !mb-6">Lịch sử giao dịch</h2>
          {filteredTransactions.length === 0 ? (
            <div className="!text-center !text-gray-500 !py-8">
              <p className="!text-lg">Không có giao dịch nào</p>
            </div>
          ) : (
            <div className="!space-y-4">
              {filteredTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="!flex !items-center !justify-between !p-6 !bg-gray-50 !rounded-xl hover:!bg-gray-100 !transition-colors !duration-300"
                >
                  <div>
                    <h3 className="!text-lg !font-medium !text-gray-900">
                      {transaction.description}
                    </h3>
                    <p className="!text-sm !text-gray-500">
                      {new Date(transaction.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                  <div
                    className={`!text-xl !font-semibold ${
                      transaction.amount > 0 ? "!text-green-600" : "!text-red-600"
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
