import { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AppContext } from "../../contexts/app.context";
import { Modal } from "antd";
import dayjs from "dayjs";

export default function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { getUser } = useContext(AppContext);

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

  const getTileContent = ({ date }) => {
    const dateString = dayjs(date).format("YYYY-MM-DD");
    const dayBookings = bookings.filter((b) =>
      dayjs(b.bookingDate).isSame(dateString, "day")
    );

    if (dayBookings.length > 0) {
      return (
        <div className="!bg-blue-500 !text-white !text-xs !font-semibold !rounded-md !p-1 !mt-1 !text-center">
          {dayBookings.length} đơn
        </div>
      );
    }
    return null;
  };

  const statusMapping = {
    Pending: "Chờ xác nhận",
    Confirmed: "Đã xác nhận",
    InProgress: "Đang thực hiện",
    Completed: "Đã hoàn thành",
    Cancelled: "Đã hủy",
    RequestRefund: "Yêu cầu hoàn tiền",
  };

  return (
    <div className="!w-full !h-screen !flex !flex-col !items-center !bg-gray-100 !p-6">
      <h1 className="!text-2xl !font-bold !text-blue-700 !border-b-2 !border-blue-700 !pb-2 !mb-4">
        ĐƠN TIÊM CHỦNG CỦA BẠN
      </h1>
      <div className="!bg-white !shadow-md !rounded-lg !p-4 !w-full !max-w">
        <Calendar
          onClickDay={handleDateClick}
          tileContent={getTileContent}
          className="!w-full !h-full !text-lg !border !rounded-md"
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
                  <strong>Trạng thái:</strong>
                  <span className="!bg-blue-500 !text-white !px-2 !py-1 !rounded">
                    {statusMapping[b.status] || "Không xác định"}
                  </span>
                </p>
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
