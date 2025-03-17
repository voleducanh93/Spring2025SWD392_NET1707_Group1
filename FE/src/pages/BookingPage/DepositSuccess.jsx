import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../contexts/app.context";
import { Result } from "antd";

const DepositResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshWalletBalance } = useContext(AppContext);


  const depositAmount = Number(searchParams.get("amount")); 

  useEffect(() => {

    if (depositAmount) {
      
      refreshWalletBalance();
    }

    toast.info("🔄 Trang sẽ tự động đóng sau 5 giây...", {
      autoClose: 5000, 
      position: "top-right",
      pauseOnHover: false,
    });
    const timeout = setTimeout(() => {
      
      navigate(depositAmount ? "/" : "/mybooking");
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
