import React, { useState } from 'react';

const doctors = ['Dr. John Doe', 'Dr. Jane Smith', 'Dr. Alice Brown', 'Dr. Bob White'];

const bookings = [
  { id: 1, name: 'John Doe', vaccine: 'COVID-19', time: '2025-03-01 10:00' },
  { id: 2, name: 'Jane Doe', vaccine: 'Flu', time: '2025-03-01 11:00' },
  { id: 3, name: 'Alice Lee', vaccine: 'Hepatitis B', time: '2025-03-02 09:00' },
  { id: 4, name: 'Bob Green', vaccine: 'COVID-19', time: '2025-03-02 15:00' },
];

export default function StaffPage() {
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [savedDoctors, setSavedDoctors] = useState({});

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
              <th className="px-6 py-3 font-semibold text-center">ID</th>
              <th className="px-6 py-3 font-semibold text-center">Tên</th>
              <th className="px-6 py-3 font-semibold text-center">Vắc Xin</th>
              <th className="px-6 py-3 font-semibold text-center">Thời Gian</th>
              <th className="px-6 py-3 font-semibold text-center">Chọn Bác Sĩ</th>
              <th className="px-6 py-3 font-semibold text-center">Lưu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-blue-50 transition-all duration-300">
                <td className="px-6 py-4 text-center">{booking.id}</td>
                <td className="px-6 py-4 text-center">{booking.name}</td>
                <td className="px-6 py-4 text-center">{booking.vaccine}</td>
                <td className="px-6 py-4 text-center">{booking.time}</td>
                <td className="px-6 py-4 text-center">
                  <select
                    className="border rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={selectedDoctor[booking.id] || ''}
                    onChange={(e) => handleDoctorChange(booking.id, e.target.value)}
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
                    onClick={() => handleSaveDoctor(booking.id)}
                    className={`${
                      !selectedDoctor[booking.id] ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    disabled={!selectedDoctor[booking.id]} // Disable if no doctor selected
                  >
                    Lưu
                  </button>
                  {savedDoctors[booking.id] && (
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
