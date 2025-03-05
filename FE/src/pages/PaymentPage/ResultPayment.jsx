import { Button, Result } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePayment } from "../../hooks/usePayment";


const ResultPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { fetchPaymentUrl } = usePayment(); // Hook gọi lại API thanh toán

  // ✅ Lấy thông tin từ URL
  const isSuccess = window.location.pathname.includes("payment-success");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount"); // Chỉ có nếu thanh toán thành công
  const errorCode = searchParams.get("errorCode"); // Chỉ có nếu thất bại
 
  // 🔄 Xử lý thanh toán lại
  const handleRetryPayment = () => {
    if (orderId) {
      fetchPaymentUrl(orderId);
      navigate("/");
    }
  };

  return isSuccess ? (
    // ✅ Giao diện khi thanh toán thành công
    <Result
      status="success"
      title="Thanh toán thành công!"
      //subTitle={`Mã đơn hàng: ${orderId} | Số tiền: ${amount} VND`}
      extra={[
        <Button type="primary" key="book-more" onClick={() => navigate("/booking")}>
          Đặt thêm lịch hẹn
        </Button>,
        <Button key="my-booking" onClick={() => navigate("/mybooking")}>
          Xem lịch hẹn của tôi
        </Button>,
      ]}
    />
  ) : (
    // ❌ Giao diện khi thanh toán thất bại
    <Result
      status="error"
      title="Thanh toán thất bại!"
      //subTitle={`Mã đơn hàng: ${orderId} | Mã lỗi: ${errorCode}`}
      extra={[
        <Button type="primary" key="retry" onClick={handleRetryPayment}>
          Thử thanh toán lại
        </Button>,
        <Button key="cancel" onClick={() => navigate("/")}>
          Quay về trang chủ
        </Button>,
      ]}
    />
  );
};

export default ResultPayment;
