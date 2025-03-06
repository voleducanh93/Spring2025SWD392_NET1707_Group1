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
    // if (hasRun) return; 
    // setHasRun(true);

    if (depositAmount) {
      
      refreshWalletBalance();
    }

    toast.info("🔄 Trang sẽ tự động đóng sau 5 giây...", {
      autoClose: 5000, // Hiển thị toast trong 5 giây
      position: "top-right",
      pauseOnHover: false,
    });

    // ⏳ Tự động đóng trang sau 10 giây
    const timeout = setTimeout(() => {
      
        navigate(depositAmount ? "/" : "/wallet");
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex items-center justify-center">
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
