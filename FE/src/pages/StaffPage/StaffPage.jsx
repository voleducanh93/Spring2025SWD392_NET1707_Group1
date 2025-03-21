import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import {
  assignDoctorToBooking,
  getAllBookings,
  getAllDoctors,
} from "../../api/booking.api";
import { handleApiError } from "../../utils/utils";

export default function StaffPage() {
  const [bookings, setBookings] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [savedDoctors, setSavedDoctors] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getAllDoctors()
      .then((data) => {
        if (data.isSuccess) {
          setDoctors(
            data.result.map((doctor) => ({
              userId: doctor.id,
              fullName: doctor.fullName,
            }))
          );
        }
      })
      .catch((error) => {
        console.error("❌ Lỗi khi lấy danh sách bác sĩ:", error);
      });
  }, []);

  useEffect(() => {
    getAllBookings()
      .then((data) => {
        if (data.isSuccess) {
          setBookings(data.result);
        }
        console.log(bookings);
      })
      .catch((error) => {
        console.error("❌ Lỗi khi lấy danh sách đặt lịch:", error);
      });
  }, []);

  const handleDoctorChange = (bookingId, doctorId) => {
    const doctorData = doctors.find((doctor) => doctor.userId === doctorId);

    if (!doctorData) {
      console.error("❌ Không tìm thấy bác sĩ với ID:", doctorId);
      return;
    }

    setSelectedDoctor((prevState) => ({
      ...prevState,
      [bookingId]: {
        userId: doctorData.userId, // Lưu ID
        fullName: doctorData.fullName, // Lưu tên
      },
    }));
  };

  const handleSaveDoctor = async (bookingId) => {
    const selectedDoctorData = selectedDoctor[bookingId];

    if (!selectedDoctorData) {
      toast.warn("Vui lòng chọn bác sĩ trước khi lưu!", {
        position: "top-right",
      });
      return;
    }

    try {
      // Gán bác sĩ cho lịch hẹn
      const response = await assignDoctorToBooking(
        bookingId,
        selectedDoctorData.userId
      );

      if (response.isSuccess) {
        // Cập nhật trạng thái đặt lịch thành InProgress sau khi gán bác sĩ
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.bookingId === bookingId
              ? { ...booking, status: "InProgress" }
              : booking
          )
        );

        setSavedDoctors((prevState) => ({
          ...prevState,
          [bookingId]: selectedDoctorData.fullName,
        }));

        toast.success(
          `✅ Bác sĩ ${selectedDoctorData.fullName} đã được gán thành công!`,
          { position: "top-right" }
        );
      } else {
        toast.error(
          `❌ Lỗi khi gán bác sĩ: ${
            response.errorMessages?.join(", ") || "Không xác định"
          }`,
          {
            position: "top-right",
          }
        );
      }
    } catch (error) {
     
      handleApiError(error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500 text-white"; // Green for confirmed
      case "Pending":
        return "bg-yellow-500 text-white"; // Yellow for pending
      case "Cancelled":
        return "bg-red-500 text-white"; // Red for cancelled
      case "InProgress":
        return "bg-blue-500 text-white"; // Blue for in-progress
      case "Completed":
        return "bg-purple-500 text-white"; // Purple for completed
      case "RequestRefund":
        return "bg-orange-500 text-white"; // Orange for refund request
      default:
        return "bg-gray-400 text-gray-800"; // Default gray color for other statuses
    }
};


const filteredBookings = bookings.filter((booking) => {
  if (activeTab === "all") return true;
  if (activeTab === "pending") return booking.status === "Pending";
  if (activeTab === "paid") return booking.status === "Confirmed";
  if (activeTab === "cancelled") return booking.status === "Cancelled";
  if (activeTab === "in-progress") return booking.status === "InProgress";
  if (activeTab === "completed") return booking.status === "Completed";
  if (activeTab === "request-refund") return booking.status === "RequestRefund";
  return true;
});


  return (
    <div className="container mx-auto p-10 font-sans">
      {/* Title section with better line spacing */}
      <h1 className="text-5xl font-bold text-center text-teal-600 !mb-8">
        <span className="bg-gradient-to-r from-teal-500 to-blue-600 text-transparent bg-clip-text">
          Danh sách Đặt Lịch Tiêm Vắc Xin
        </span>
      </h1>

      {/* Tab Navigation with better line-height and spacing */}
      <div className="flex justify-center !gap-6 !mb-8 flex-wrap">
  <button
    className={`!px-6 !py-3 font-semibold rounded-lg text-lg ${
      activeTab === "all"
        ? "bg-teal-500 text-white shadow-lg"
        : "bg-gray-200 text-gray-700"
    } hover:scale-105 transition-transform duration-300`}
    onClick={() => setActiveTab("all")}
  >
    Tất cả lịch hẹn
  </button>
  <button
    className={`!px-6 !py-3 font-semibold rounded-lg text-lg ${
      activeTab === "pending"
        ? "bg-yellow-500 text-white shadow-lg"
        : "bg-gray-200 text-gray-700"
    } hover:scale-105 transition-transform duration-300`}
    onClick={() => setActiveTab("pending")}
  >
    Chưa thanh toán
  </button>
  <button
    className={`!px-6 !py-3 font-semibold rounded-lg text-lg ${
      activeTab === "paid"
        ? "bg-green-500 text-white shadow-lg"
        : "bg-gray-200 text-gray-700"
    } hover:scale-105 transition-transform duration-300`}
    onClick={() => setActiveTab("paid")}
  >
    Đã thanh toán
  </button>
  <button
    className={`!px-6 !py-3 font-semibold rounded-lg text-lg ${
      activeTab === "in-progress"
        ? "bg-blue-500 text-white shadow-lg"
        : "bg-gray-200 text-gray-700"
    } hover:scale-105 transition-transform duration-300`}
    onClick={() => setActiveTab("in-progress")}
  >
    Đang thực hiện
  </button>
  <button
    className={`!px-6 !py-3 font-semibold rounded-lg text-lg ${
      activeTab === "completed"
        ? "bg-purple-500 text-white shadow-lg"
        : "bg-gray-200 text-gray-700"
    } hover:scale-105 transition-transform duration-300`}
    onClick={() => setActiveTab("completed")}
  >
    Hoàn thành
  </button>
  <button
    className={`!px-6 !py-3 font-semibold rounded-lg text-lg ${
      activeTab === "cancelled"
        ? "bg-red-500 text-white shadow-lg"
        : "bg-gray-200 text-gray-700"
    } hover:scale-105 transition-transform duration-300`}
    onClick={() => setActiveTab("cancelled")}
  >
    Đã hủy
  </button>
  <button
    className={`!px-6 !py-3 font-semibold rounded-lg text-lg ${
      activeTab === "request-refund"
        ? "bg-orange-500 text-white shadow-lg"
        : "bg-gray-200 text-gray-700"
    } hover:scale-105 transition-transform duration-300`}
    onClick={() => setActiveTab("request-refund")}
  >
    Yêu cầu hoàn tiền
  </button>
</div>


      {/* Table Section with better spacing between columns */}
      <div className="overflow-x-auto shadow-xl rounded-lg bg-white p-8">
        <table className="min-w-full table-auto text-sm text-gray-800">
          <thead className="text-xs text-white bg-gradient-to-r from-teal-500 to-blue-600">
            <tr>
              <th className="!px-6 !py-4 text-center">STT</th>
              <th className="!px-6 !py-4 text-center">Tên Bé</th>
              <th className="!px-6 !py-4 text-center">Ngày Đặt</th>
              <th className="!px-6 !py-4 text-center">Trạng Thái</th>
              <th className="!px-6 !py-4 text-center">Chọn Bác Sĩ</th>
              <th className="!px-6 !py-4 text-center">Lưu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBookings.map((booking, index) => (
              <tr
                key={booking.bookingId}
                className="hover:bg-teal-50 transition-all duration-300"
              >
                <td className="!px-6 !py-4 text-center">{index + 1}</td>
                <td className="!px-6 !py-4 text-center">{booking.childName}</td>
                <td className="!px-6 !py-4 text-center">
                  {new Date(booking.bookingDate).toLocaleDateString("vi-VN")}
                </td>
                <td
                  className={`!px-6 !py-4 text-center ${getStatusClass(
                    booking.status
                  )}`}
                >
                  {booking.status === "Pending" && "Đang Chờ"}
                  {booking.status === "Confirmed" && "Đã Xác Nhận"}
                  {booking.status === "InProgress" && "Đang Thực Hiện"}
                  {booking.status === "Cancelled" && "Đã Hủy"}
                  {booking.status === "Completed" && "Đã Hoàn Thành"}
                  {booking.status === "RequestRefund" && "Đã Hủy Yêu Cầu"}
                </td>
                <td className="!px-6 !py-4 text-center">
                  {booking.status === "Pending" ? (
                    <span className="text-red-500">
                      Khách hàng chưa thanh toán
                    </span>
                  ) : booking.status === "Confirmed" ? (
                    <select
                      className="border rounded-lg shadow-md p-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={selectedDoctor[booking.bookingId]?.userId || ""}
                      onChange={(e) =>
                        handleDoctorChange(booking.bookingId, e.target.value)
                      }
                    >
                      <option value="">Chọn Bác Sĩ</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.userId} value={doctor.userId}>
                          {doctor.fullName}
                        </option>
                      ))}
                    </select>
                  ) : booking.status === "InProgress" || booking.status === "Completed" ? (
                    <span className="text-blue-500">Đã chọn bác sĩ</span>
                  ): null}
                </td>

                <td className="!px-6 !py-4 text-center">
                  {booking.status === "Confirmed" ? (
                    <button
                      onClick={() => handleSaveDoctor(booking.bookingId)}
                      className={`${
                        savedDoctors[booking.bookingId]
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-teal-600 hover:bg-teal-700"
                      } text-white !py-3 !px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                      disabled={savedDoctors[booking.bookingId]} // Vô hiệu hóa khi đã lưu
                    >
                      Lưu
                    </button>
                  ) : (
                    <span className="text-gray-400"></span>
                  )}

                  {savedDoctors[booking.bookingId] && (
                    <span className="text-green-500 ml-2 font-semibold">
                      Đã Lưu
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
