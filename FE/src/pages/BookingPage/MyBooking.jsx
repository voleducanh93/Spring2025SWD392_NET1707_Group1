import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../contexts/app.context";
import { Button, Modal, Input } from "antd";
import { useRequestRefund } from "../../hooks/useRefund";


export default function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const { getUser } = useContext(AppContext);
  const { mutate: requestRefund, isLoading } = useRequestRefund();
  const [modalVisible, setModalVisible] = useState(false);
  const [refundReason, setRefundReason] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    if (!getUser) return;

    const fetchBookings = async () => {
      try {
        const response = await fetch(`https://localhost:7134/api/Booking/user/${getUser}`);
        const data = await response.json();
        if (data.isSuccess) {
          setBookings(data.result);
        } else {
          console.error("Lỗi khi lấy dữ liệu lịch đặt");
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi:", error);
      }
    };

    fetchBookings();
  }, [getUser]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Xử lý mở Modal
  const openRefundModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setModalVisible(true);
  };

  // Xử lý yêu cầu hoàn tiền
  const handleRefundRequest = () => {
    if (!refundReason.trim()) {
      return alert("Vui lòng nhập lý do hoàn tiền!");
    }
    
    requestRefund(
      { bookingId: selectedBookingId, reason: refundReason },
      {
        onSuccess: () => {
          setModalVisible(false);
          setRefundReason("");
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-8 font-['Be_Vietnam_Pro']">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-10">
        Danh sách lịch đặt hẹn vắc-xin
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-lg text-gray-500 italic">
          Không có lịch đặt nào.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-2xl shadow-2xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <th className="py-5 px-6 text-left text-lg font-bold uppercase">Tên trẻ</th>
                <th className="py-5 px-6 text-left text-lg font-bold uppercase">Ngày đặt</th>
                <th className="py-5 px-6 text-left text-lg font-bold uppercase">Tổng giá (VND)</th>
                <th className="py-5 px-6 text-left text-lg font-bold uppercase">Trạng thái</th>
                <th className="py-5 px-6 text-left text-lg font-bold uppercase">Hoàn tiền</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.bookingId}
                  className="border-t border-gray-200 hover:bg-blue-50 transition duration-300 ease-in-out"
                >
                  <td className="py-4 px-6 text-gray-900 font-semibold">{booking.childName}</td>
                  <td className="py-4 px-6 text-gray-800">{formatDate(booking.bookingDate)}</td>
                  <td className="py-4 px-6 text-gray-900 font-bold">
                    {booking.totalPrice.toLocaleString()} VND
                  </td>
                  <td
                    className={`py-3 px-5 text-sm font-bold rounded-full text-center w-40 uppercase shadow-lg border-2 ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700 border-green-400"
                        : booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-400"
                        : "bg-red-100 text-red-700 border-red-400"
                    }`}
                  >
                    {booking.status === "Confirmed"
                      ? "Đã xác nhận"
                      : booking.status === "Pending"
                      ? "Chờ xác nhận"
                      : booking.status}
                  </td>
                  <td className="py-4 px-6">
                    {booking.status === "Completed" && (
                      <Button type="primary" danger onClick={() => openRefundModal(booking.bookingId)}>
                        Hoàn tiền
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal nhập lý do hoàn tiền */}
      <Modal
        title="Yêu cầu hoàn tiền"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" danger loading={isLoading} onClick={handleRefundRequest}>
            Gửi yêu cầu
          </Button>,
        ]}
      >
        <p>Vui lòng nhập lý do hoàn tiền:</p>
        <Input.TextArea
          rows={4}
          placeholder="Nhập lý do..."
          value={refundReason}
          onChange={(e) => setRefundReason(e.target.value)}
        />
      </Modal>
    </div>
  );
}
