
import  { useState, useEffect, useContext} from 'react';
import { AppContext } from '../../contexts/app.context';

export default function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const  {getUser}  = useContext(AppContext);
  useEffect(() => {
    // Lấy dữ liệu từ API
    const fetchBookings = async () => {
      try {
        
        console.log(getUser);
         // Thay thế userId nếu cần
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
  }, []);

  // Hàm để định dạng lại ngày tháng (chỉ lấy ngày, tháng, năm)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="container mx-auto !p-4">
      <h1 className="text-3xl font-semibold text-center !mb-6">Danh sách lịch đặt hẹn vắc xin</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Không có lịch đặt nào.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="!py-3 !px-4 text-left text-sm font-medium text-gray-700">Tên trẻ</th>
              <th className="!py-3 !px-4 text-left text-sm font-medium text-gray-700">Ngày đặt</th>
              <th className="!py-3 !px-4 text-left text-sm font-medium text-gray-700">Tổng giá (VND)</th>
              <th className="!py-3 !px-4 text-left text-sm font-medium text-gray-700">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingId} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="!py-3 !px-4 text-sm text-gray-800">{booking.childName}</td>
                <td className="!py-3 !px-4 text-sm text-gray-800">{formatDate(booking.bookingDate)}</td>
                <td className="!py-3 !px-4 text-sm text-gray-800">{booking.totalPrice.toLocaleString()} VND</td>
                <td className="!py-3 !px-4 text-sm text-gray-800">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
