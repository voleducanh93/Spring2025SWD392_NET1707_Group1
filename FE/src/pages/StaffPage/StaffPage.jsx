import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function StaffPage() {
  const [bookings, setBookings] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [savedDoctors, setSavedDoctors] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7134/api/Admin/getAllDoctors")
      .then((response) => {
        if (response.data.isSuccess) {
          setDoctors(
            response.data.result.map((doctor) => ({
              userId: doctor.id, // Lưu `userId`
              fullName: doctor.fullName, // Lưu tên bác sĩ
            }))
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);
  

  useEffect(() => {
    axios
      .get("https://localhost:7134/api/Booking/all-bookings")
      .then((response) => {
        if (response.data.isSuccess) {
          setBookings(response.data.result);
        }
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error);
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
  
  

 
  const handleSaveDoctor = (bookingId) => {
    const selectedDoctorData = selectedDoctor[bookingId];
  
    if (!selectedDoctorData) {
      toast.warn("Vui lòng chọn bác sĩ trước khi lưu!", { position: "top-right" });
      return;
    }
  
    const { userId, fullName } = selectedDoctorData;
  
    console.log(`🔍 Gán bác sĩ: ${fullName} (ID: ${userId}) cho lịch hẹn ID: ${bookingId}`);
  
    axios
      .post(`https://localhost:7134/api/Booking/assign-doctor?bookingId=${bookingId}&userId=${userId}`)
      .then((response) => {
        if (response.data.isSuccess) {
          setSavedDoctors((prevState) => ({
            ...prevState,
            [bookingId]: fullName,
          }));
  
          toast.success(`✅ Bác sĩ ${fullName} đã được gán thành công!`, { position: "top-right" });
        } else {
          toast.error(`❌ Lỗi khi gán bác sĩ: ${response.data.errorMessages?.join(", ") || "Không xác định"}`, {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        console.error("❌ Lỗi khi gọi API:", error);
        toast.error("❌ Lỗi khi gán bác sĩ! Vui lòng thử lại.", { position: "top-right" });
      });
  };
  
  

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500 text-white"; // Green for confirmed
      case "Pending":
        return "bg-yellow-500 text-white"; // Yellow for pending
      case "Cancelled":
        return "bg-red-500 text-white"; // Red for cancelled
      default:
        return "bg-gray-400 text-gray-800"; // Default gray color for other statuses
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return booking.status !== "Confirmed";
    if (activeTab === "paid") return booking.status === "Confirmed";
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
      <div className="flex justify-center !gap-6 !mb-8">
        <button
          className={`!px-8 !py-4 font-semibold rounded-lg text-lg ${
            activeTab === "all"
              ? "bg-teal-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-700"
          } hover:scale-105 transition-transform duration-300`}
          onClick={() => setActiveTab("all")}
        >
          Tất cả lịch hẹn
        </button>
        <button
          className={`!px-8 !py-4 font-semibold rounded-lg text-lg ${
            activeTab === "pending"
              ? "bg-teal-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-700"
          } hover:scale-105 transition-transform duration-300`}
          onClick={() => setActiveTab("pending")}
        >
          Lịch hẹn chưa thanh toán
        </button>
        <button
          className={`!px-8 !py-4 font-semibold rounded-lg text-lg ${
            activeTab === "paid"
              ? "bg-teal-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-700"
          } hover:scale-105 transition-transform duration-300`}
          onClick={() => setActiveTab("paid")}
        >
          Lịch hẹn đã thanh toán
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
                  {booking.status === "Confirmed" && "Đã Xác Nhận"}
                  {booking.status === "Pending" && "Đang Chờ"}
                  {booking.status === "Cancelled" && "Đã Hủy"}
                  {booking.status !== "Confirmed" &&
                    booking.status !== "Pending" &&
                    booking.status !== "Cancelled" &&
                    "Chưa Xác Nhận"}
                </td>
                <td className="!px-6 !py-4 text-center">
                  {booking.status !== "Confirmed" ? (
                    <span className="text-red-500">
                      Khách hàng chưa thanh toán
                    </span>
                  ) : (
                    <select
  className="border rounded-lg shadow-md p-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
  value={selectedDoctor[booking.bookingId]?.userId || ""}
  onChange={(e) => handleDoctorChange(booking.bookingId, e.target.value)}
>
  <option value="">Chọn Bác Sĩ</option>
  {doctors.map((doctor) => (
    <option key={doctor.userId} value={doctor.userId}>
      {doctor.fullName}
    </option>
  ))}
</select>

                  )}
                </td>
                <td className="!px-6 !py-4 text-center">
                  <button
                    onClick={() => handleSaveDoctor(booking.bookingId)}
                    className={`${
                      !selectedDoctor[booking.bookingId] ||
                      booking.status !== "Confirmed"
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700"
                    } text-white !py-3 !px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                    disabled={
                      !selectedDoctor[booking.bookingId] ||
                      booking.status !== "Confirmed"
                    }
                  >
                    Lưu
                  </button>
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
