import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../contexts/app.context";
import { Result } from "antd";

const DepositResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshWalletBalance } = useContext(AppContext);
  const [hasRun, setHasRun] = useState(false); 

  const depositAmount = Number(searchParams.get("amount")); 
  const errorCode = searchParams.get("errorCode");

  useEffect(() => {
    if (hasRun) return; 
    setHasRun(true);

    if (depositAmount) {
      
      refreshWalletBalance();
    }

    toast.info("🔄 Trang sẽ tự động đóng sau 10 giây...");

    // ⏳ Tự động đóng trang sau 10 giây
    const timeout = setTimeout(() => {
      if (window.opener) {
        window.close();
      } else {
        navigate(depositAmount ? "/" : "/wallet");
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [searchParams, depositAmount, errorCode, navigate, hasRun]);

  return (
    <div className="flex items-center justify-center h-screen">
      {depositAmount ? (
        <Result
          status="success"
          title="🎉 Nạp tiền thành công!"
          subTitle="Mời bạn quay về trang chủ để tiếp tục mua hàng."
        />
      ) : (
        <Result
          status="error"
          title="❌ Nạp tiền thất bại!"
          subTitle="Vui lòng thử lại hoặc kiểm tra tài khoản."
        />
      )}
    </div>
  );
};

export default DepositResult;
