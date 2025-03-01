import React, { useState, useEffect } from 'react';
import axios from 'axios';

const doctors = ['Dr. John Doe', 'Dr. Jane Smith', 'Dr. Alice Brown', 'Dr. Bob White'];

export default function StaffPage() {
  const [bookings, setBookings] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [savedDoctors, setSavedDoctors] = useState({});

  // Fetch booking data from the API
  useEffect(() => {
    axios.get('https://localhost:7134/api/Booking/all-bookings')
      .then(response => {
        if (response.data.isSuccess) {
          setBookings(response.data.result); // Set the fetched data into the state
        }
      })
      .catch(error => {
        console.error('Error fetching booking data:', error);
      });
  }, []);

  const handleDoctorChange = (bookingId, doctor) => {
    setSelectedDoctor((prevState) => ({
      ...prevState,
      [bookingId]: doctor,
    }));
  };

  const handleSaveDoctor = (bookingId) => {
    setSavedDoctors((prevState) => ({
      ...prevState,
      [bookingId]: selectedDoctor[bookingId],
    }));
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
        <span className="bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
          Danh sách Booking Tiêm Vắc Xin
        </span>
      </h1>

      <div className="overflow-x-auto shadow-2xl rounded-2xl bg-white">
        <table className="min-w-full table-auto text-sm text-gray-800">
          <thead className="text-xs text-white bg-gradient-to-r from-blue-500 to-teal-500">
            <tr>
              <th className="px-6 py-3 font-semibold text-center">STT</th>
              <th className="px-6 py-3 font-semibold text-center">Tên Bé</th>
              <th className="px-6 py-3 font-semibold text-center">Ngày Đặt</th>
              <th className="px-6 py-3 font-semibold text-center">Trạng Thái</th>
              <th className="px-6 py-3 font-semibold text-center">Chọn Bác Sĩ</th>
              <th className="px-6 py-3 font-semibold text-center">Lưu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking, index) => (
              <tr key={booking.bookingId} className="hover:bg-blue-50 transition-all duration-300">
                <td className="px-6 py-4 text-center">{index + 1}</td>
                <td className="px-6 py-4 text-center">{booking.childName}</td>
                <td className="px-6 py-4 text-center">
                  {/* Formatting the date to display only the date part (without time) */}
                  {new Date(booking.bookingDate).toLocaleDateString('vi-VN')}
                </td>
                <td className="px-6 py-4 text-center">{booking.status}</td>
                <td className="px-6 py-4 text-center">
                  <select
                    className="border rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={selectedDoctor[booking.bookingId] || ''}
                    onChange={(e) => handleDoctorChange(booking.bookingId, e.target.value)}
                  >
                    <option value="">Chọn Bác Sĩ</option>
                    {doctors.map((doctor, index) => (
                      <option key={index} value={doctor}>
                        {doctor}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleSaveDoctor(booking.bookingId)}
                    className={`${!selectedDoctor[booking.bookingId] ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    disabled={!selectedDoctor[booking.bookingId]} // Disable if no doctor selected
                  >
                    Lưu
                  </button>
                  {savedDoctors[booking.bookingId] && (
                    <span className="text-green-500 ml-2 font-semibold">Đã Lưu</span>
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
