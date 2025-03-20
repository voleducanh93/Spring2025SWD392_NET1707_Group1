import { Button, Result } from "antd";
import {  useNavigate } from "react-router-dom";



const ResultPayment = () => {

  const navigate = useNavigate();


  // ✅ Lấy thông tin từ URL
  const isSuccess = window.location.pathname.includes("payment-success");


 
 

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
      className="h-auto"
    />
  ) : (
    // ❌ Giao diện khi thanh toán thất bại
    <Result
      status="error"
      title="Thanh toán thất bại!"
      //subTitle={`Mã đơn hàng: ${orderId} | Mã lỗi: ${errorCode}`}
      extra={[
        <Button key="cancel" onClick={() => navigate("/booking")}>
          Quay về trang chủ
        </Button>,
      ]}
    />
  );
};

export default ResultPayment;
