import  { useEffect, useState } from "react";
import {
  LineChart,
  Line,

  Legend,
  ResponsiveContainer,
  BarChart,
  Bar  ,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import axios from "axios";
import config from "../../constants/config";

export default function Dashboard() {
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [topVaccines, setTopVaccines] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [revenueByDate, setRevenueByDate] = useState(0);

  useEffect(() => {
    // Doanh thu 10 ngày gần nhất
    axios
      .get(`${config.baseUrl}Dashboard/revenue/last-10-days`)
    
      .then((response) => {
        if (response.data.isSuccess) {
          setRevenueData(response.data.result);
          console.log(response.data.result);
          
        }
      })
      .catch((error) => console.error("Lỗi lấy dữ liệu doanh thu:", error));

    // Tổng doanh thu
    axios
      .get(`${config.baseUrl}Dashboard/total-revenue`)
      .then((response) => {
        if (response.data.isSuccess) {
          setTotalRevenue(response.data.result);
        }
      })
      .catch((error) => console.error("Lỗi lấy tổng doanh thu:", error));

    // Vaccine được sử dụng nhiều nhất
    axios
      .get(`${config.baseUrl}Dashboard/top-used-vaccines`)
      .then((response) => {
        if (response.data.isSuccess) {
          setTopVaccines(response.data.result);
        }
      })
      .catch((error) => console.error("Lỗi lấy dữ liệu vaccine:", error));

    // Doanh thu hôm nay
    const today = new Date().toISOString().split("T")[0];
    fetchRevenueByDate(today);
  }, []);

  // Hàm lấy doanh thu theo ngày
  const fetchRevenueByDate = (date) => {
    axios
      .get(`${config.baseUrl}Dashboard/revenue/${date}`)
      .then((response) => {
        if (response.data.isSuccess) {
          if (date === new Date().toISOString().split("T")[0]) {
            setDailyRevenue(response.data.result);
            setRevenueByDate(response.data.result);
          } else {
            setRevenueByDate(response.data.result);
          }
        }
      })
      .catch((error) =>
        console.error(`Lỗi lấy doanh thu ngày ${date}:`, error)
      );
  };

  // Xử lý khi chọn ngày
  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    fetchRevenueByDate(newDate);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN"); // Định dạng DD/MM/YYYY
  };

  // Hàm định dạng tiền VND
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div className=" min-h-screen">
      <h2 className="!text-2xl !font-bold !mb-4">Bảng Điều Khiển</h2>

      {/* Tổng Doanh Thu */}
      <div className="!mb-6 !p-4 !bg-indigo-500 !text-white !rounded-xl !shadow-lg !flex !items-center !justify-between">
        <h3 className="!text-lg !font-semibold">Tổng Doanh Thu</h3>
        <span className="!text-2xl !font-bold">
          {formatCurrency(totalRevenue)}
        </span>
      </div>

      {/* Doanh thu hôm nay */}
      <div className="!mb-6 !p-4 !bg-red-500 !text-white !rounded-xl !shadow-lg !text-center">
        <h3 className="!text-lg !font-semibold">Doanh Thu Hôm Nay</h3>
        <span className="!text-3xl !font-bold">
          {formatCurrency(dailyRevenue)}
        </span>
      </div>

      {/* Chọn ngày để xem doanh thu */}
      <div className="!mb-6 !p-4 !bg-white !rounded-xl !shadow-lg">
        <h3 className="!text-lg !font-semibold !mb-2">
          Chọn Ngày Xem Doanh Thu
        </h3>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="!p-2 !border !border-gray-300 !rounded-lg !w-full"
        />
      </div>

      {/* Doanh thu theo ngày đã chọn */}
      <div className="!mb-6 !p-4 !bg-green-500 !text-white !rounded-xl !shadow-lg !text-center">
        <h3 className="!text-lg !font-semibold">
          Doanh Thu Ngày {selectedDate}
        </h3>
        <span className="!text-3xl !font-bold">
          {formatCurrency(revenueByDate)}
        </span>
      </div>

      {/* Biểu đồ doanh thu 10 ngày gần nhất */}
      <div className="!bg-white !p-4 !rounded-xl !shadow-lg !mb-6">
        <h3 className="!text-xl !font-semibold !mb-3">
          Doanh Thu (10 Ngày Gần Nhất)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(date) => formatDate(date)} />
            <YAxis tickFormatter={(value) => formatCurrency(value)}  />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              labelFormatter={(label) => formatDate(label)}
            />

            <Legend />
            <Line
              type="monotone"
              dataKey="totalRevenue"
              stroke="#4F46E5"
              strokeWidth={2}
              name="Tổng doanh thu"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ vaccine được sử dụng nhiều nhất */}
      <div className="!bg-white !p-4 !rounded-xl !shadow-lg !mb-6">
        <h3 className="!text-xl !font-semibold !mb-3">
          Top Vaccine Được Sử Dụng
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topVaccines}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="vaccineName" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4F46E5" name="Số lần sử dụng" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
