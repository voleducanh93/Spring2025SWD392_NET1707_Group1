import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { toast } from "react-toastify";
import { Button, Result } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { AppContext } from "../../contexts/app.context";

const DepositSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setWalletBalance, walletBalance,getUser } = useContext(AppContext);
  const queryClient = useQueryClient();
  useEffect(() => {
    const depositAmount = Number(searchParams.get("amount"));
    if (depositAmount) {
      // Cập nhật số dư ví
      queryClient.invalidateQueries(["wallet", getUser]); 
      toast.success(`💰 Nạp thành công ${depositAmount.toLocaleString()} VND!`);
    }
  }, [searchParams, setWalletBalance, walletBalance]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Result
        status="success"
        title="🎉 Nạp tiền thành công!"
        subTitle="Mời bạn quay về trang chủ để tiếp tục mua hàng."
        extra={[
            <Button
            type="primary"
            key="home"
            onClick={() => {
              if (window.opener) {
                window.close(); // Nếu trang mở từ `window.open`, đóng nó
              } else {
                navigate("/"); // Nếu không, chuyển hướng về trang chủ
              }
            }}
          >
            Quay về trang chủ
          </Button>
          
        ]}
      />
    </div>
  );
};

export default DepositSuccess;
