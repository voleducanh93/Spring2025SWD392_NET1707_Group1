import { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AppContext } from "../../contexts/app.context";
import { Modal } from "antd";
import dayjs from "dayjs";
import "./index.css";
import { useRequestRefund } from "../../hooks/useRefund";
import { toast } from "react-toastify";
import { useRequestFeedback } from "../../hooks/useFeedback";

export default function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { getUser } = useContext(AppContext);
  const [refundReason, setRefundReason] = useState("");
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!getUser) return;

    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `https://localhost:7134/api/Booking/user/${getUser}`
        );
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

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const filteredBookings = bookings.filter((b) =>
      dayjs(b.bookingDate).isSame(dayjs(date), "day")
    );
    setSelectedBookings(filteredBookings);
    setModalVisible(true);
  };
  const { mutate: requestRefund1 } = useRequestRefund();
  const { mutate:requestFeedback }= useRequestFeedback();
  const requestRefund = async (bookingId, reason) => {
    if (!reason.trim()) {
      alert("Vui lòng nhập lý do hoàn tiền.");
      return;
    }
    if (reason.length < 10) {
      toast.warning("⚠️ Lý do hoàn tiền phải có ít nhất 10 ký tự.");
      return;
    }

    if (reason.length > 500) {
      toast.warning("⚠️ Lý do hoàn tiền không được vượt quá 500 ký tự.");
      return;
    }

    try {
      await requestRefund1({
        bookingId,
        reason,
      });
      setShowReasonInput(false);
      setRefundReason("");
      setModalVisible(false);
    } catch (error) {
      console.error("Lỗi:", error);
      
    }
  };

  const getTileContent = ({ date }) => {
    const dateString = dayjs(date).format("YYYY-MM-DD");
    const dayBookings = bookings.filter((b) =>
      dayjs(b.bookingDate).isSame(dateString, "day")
    );

    if (dayBookings.length > 0) {
      return (
        <div className="!bg-blue-500 !text-white !text-xs !font-semibold !rounded-md !p-1 !text-center tile-container">
          {dayBookings.length} đơn
        </div>
      );
    }
    return null;
  };

  const submitFeedback = (bookingId, comment) => {
    if (!feedback.trim()) {
      alert("Vui lòng nhập feedback!");
      return;
    }

    if (!feedback.trim()) {
      toast.error("Vui lòng nhập feedback!");
      return;
    }
requestFeedback({ bookingId, comment });

  setModalVisible(false);
    // Reset trạng thái sau khi gửi
    setShowFeedbackInput(false);
    setFeedback("");
  };

  const statusMapping = {
    Pending: "Chờ xác nhận",
    Confirmed: "Đã xác nhận",
    InProgress: "Đang thực hiện",
    Completed: "Đã hoàn thành",
    Cancelled: "Đã hủy",
    RequestRefund: "Yêu cầu hoàn tiền",
  };

  const statusColors = {
    Pending: "bg-yellow-500", // Màu vàng
    Confirmed: "bg-blue-500", // Màu xanh dương
    InProgress: "bg-purple-500", // Màu tím
    Completed: "bg-green-500", // Màu xanh lá
    Cancelled: "bg-red-500", // Màu đỏ
    RequestRefund: "bg-orange-500", // Màu cam
  };

  return (
    <div className="!w-full !h-screen !flex !flex-col !items-center !bg-gray-100 !p-6">
      <h1 className="!text-3xl !font-bold !text-blue-700 !border-b-4 !border-blue-700 !pb-2 !mb-4 !uppercase">
        Đơn Tiêm Chủng Của Bạn
      </h1>
      <div className="!flex !gap-2 !mb-4">
        {Object.entries(statusMapping).map(([key, label]) => (
          <span
            key={key}
            className={`!px-3 !py-1 !rounded !text-white ${statusColors[key]}`}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="!bg-white !shadow-lg !rounded-lg !p-6 !w-full">
        <Calendar
          onClickDay={handleDateClick}
          tileContent={getTileContent}
          className="!w-full !border !rounded-md"
        />
      </div>

      {/* Modal hiển thị chi tiết */}
      <Modal
        title={
          selectedDate
            ? `Chi tiết đặt lịch ngày ${dayjs(selectedDate).format(
                "DD/MM/YYYY"
              )}`
            : ""
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedBookings.length > 0 ? (
          <div className="!space-y-4">
            {selectedBookings.map((b) => (
              <div
                key={b.bookingId}
                className="!p-4 !bg-gray-50 !rounded-md !shadow"
              >
                <p>
                  <strong>Mã đặt lịch:</strong> {b.bookingId}
                </p>
                <p>
                  <strong>Loại đặt lịch:</strong>{" "}
                  {b.bookingType === "singleVaccine"
                    ? "Đặt lẻ Vaccine"
                    : "Gói Vaccine"}
                </p>
                <p>
                  <strong>Chi tiết:</strong>{" "}
                  {b.bookingDetails
                    .map((d) => d.vaccineName || d.comboVaccineName)
                    .join(", ")}
                </p>
                <p>
                  <strong>Ghi chú:</strong> {b.notes || "Không có ghi chú"}
                </p>
                <p>
                  <strong>Tổng tiền:</strong>{" "}
                  <span className="!text-yellow-500">
                    {b.totalPrice.toLocaleString()} VND
                  </span>
                </p>
                <p>
                  <strong>Trạng thái: </strong>
                  <span
                    className={`!text-white !px-2 !py-1 !rounded ${
                      statusColors[b.status] || "bg-gray-500"
                    }`}
                  >
                    {statusMapping[b.status] || "Không xác định"}
                  </span>
                </p>
                {b.status === "Pending" && (
                  <div className="!mt-4 !flex !gap-4">
                    <button className="!bg-yellow-500 !text-white !px-4 !py-2 !rounded-md !shadow-md hover:!bg-yellow-600">
                      Thanh Toán
                    </button>
                    <button className="!bg-red-500 !text-white !px-4 !py-2 !rounded-md !shadow-md hover:!bg-red-600">
                      Hủy Lịch
                    </button>
                  </div>
                )}
                {b.status === "Confirmed" && (
                  <>
                    {/* Nút kích hoạt ô nhập lý do */}
                    {!showReasonInput ? (
                      <button
                        className="!bg-orange-500 !text-white !px-4 !py-2 !rounded !mt-3 hover:!bg-orange-600 transition"
                        onClick={() => setShowReasonInput(true)}
                      >
                        Hủy Đơn và Yêu Cầu Hoàn Tiền
                      </button>
                    ) : (
                      <div className="!mt-2">
                        <textarea
                          className="!w-full !border !rounded !p-2"
                          placeholder="Nhập lý do hoàn tiền..."
                          value={refundReason}
                          onChange={(e) => setRefundReason(e.target.value)}
                        ></textarea>

                        <button
                          className="!bg-red-500 !text-white !px-4 !py-2 !rounded !mt-2 hover:!bg-red-600 transition"
                          onClick={() =>
                            requestRefund(b.bookingId, refundReason)
                          }
                        >
                          Xác nhận hoàn tiền
                        </button>
                      </div>
                    )}
                  </>
                )}
                {b.status === "Completed" && (
                  <div className="flex flex-col gap-2 !mt-6">
                    {/* Nút nhập Feedback */}
                    {!showFeedbackInput ? (
                      <button
                        className="w-full bg-blue-700 !text-white !font-semibold !py-2 !px-4 !rounded-lg"
                        onClick={() => setShowFeedbackInput(true)}
                      >
                        Nhập Feedback
                      </button>
                    ) : (
                      <div className="!mt-2">
                        <textarea
                          className="!w-full !border !rounded !p-2"
                          placeholder="Nhập feedback của bạn..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>

                        <button
                          className="!bg-blue-600 !text-white !px-4 !py-2 !rounded !mt-2 hover:!bg-blue-700 transition"
                          onClick={() => submitFeedback(b.bookingId, feedback)}
                        >
                          Xác nhận Feedback
                        </button>
                      </div>
                    )}

                    {/* Nút xem Vaccine Record */}
                    <button className="w-full bg-green-500 !text-white !font-semibold !py-2 !px-4 !rounded-lg !border-2 !border-blue-300">
                      Xem Vaccine Record
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="!text-gray-500">
            Không có đơn đặt lịch nào vào ngày này.
          </p>
        )}
      </Modal>
    </div>
  );
}
