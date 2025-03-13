import { useQuery } from "@tanstack/react-query";
import { getChildrenById } from "../../api/children.api";
import { Spin, Alert, Button } from "antd";

const VaccinationRecord = ({ childId, booking, onBack }) => {
  const {
    data: child,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["child", childId],
    queryFn: () => getChildrenById(childId),
    enabled: !!childId,
  });

  if (isLoading) return <Spin tip="Đang tải thông tin trẻ..." />;
  if (isError)
    return <Alert message="Không thể tải thông tin trẻ" type="error" />;

  return (
    <div className="!flex !items-center !justify-center !min-h-screen !bg-gradient-to-r !from-blue-100 !to-indigo-200">
      <div className="!max-w-4xl !w-full !p-8 !bg-white !shadow-2xl !rounded-2xl !border !border-gray-200">
        <h2 className="!text-3xl !font-bold !mb-6 !text-center !text-gray-800 !uppercase !tracking-wide">
          Ghi nhận hồ sơ tiêm chủng
        </h2>

        {/* Thông tin cá nhân */}
        <div className="!mb-6 !bg-white !p-6 !rounded-lg !shadow-lg">
          <h3 className="!text-lg !font-semibold !mb-4 !text-gray-700">
            Thông tin cá nhân
          </h3>

          <div className="!grid !grid-cols-2 !gap-4">
            <div>
              <label className="!block !text-gray-600 !mb-1">Họ và tên</label>
              <input
                type="text"
                value={child.fullName}
                readOnly
                className="!w-full !p-3 !border !rounded-lg !shadow-sm !focus:ring-2 !focus:ring-blue-400 !transition bg-gray-100"
              />
            </div>

            <div>
              <label className="!block !text-gray-600 !mb-1">Ngày sinh</label>
              <input
                type="text"
                value={new Date(child.dateOfBirth).toLocaleDateString("vi-VN")}
                readOnly
                className="!w-full !p-3 !border !rounded-lg !shadow-sm !focus:ring-2 !focus:ring-blue-400 !transition bg-gray-100"
              />
            </div>

            <div>
              <label className="!block !text-gray-600 !mb-1">
                Chiều cao (cm)
              </label>
              <input
                type="text"
                value={child.height}
                readOnly
                className="!w-full !p-3 !border !rounded-lg !shadow-sm !focus:ring-2 !focus:ring-blue-400 !transition bg-gray-100"
              />
            </div>

            <div>
              <label className="!block !text-gray-600 !mb-1">
                Cân nặng (kg)
              </label>
              <input
                type="text"
                value={child.weight}
                readOnly
                className="!w-full !p-3 !border !rounded-lg !shadow-sm !focus:ring-2 !focus:ring-blue-400 !transition bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Thông tin lịch tiêm */}
        <div className="!bg-gray-50 !p-6 !rounded-lg !shadow-lg">
          <h3 className="!text-lg !font-semibold !mb-4 !text-gray-700">
            Thông tin vaccine
          </h3>

          <div className="!overflow-x-auto">
            <table className="!w-full !border !border-gray-300 !text-sm !shadow-md !rounded-lg">
              <thead>
                <tr className="!bg-blue-600 !text-white !uppercase !text-center">
                  <th className="!border !p-4">Tên Vaccine</th>
                  <th className="!border !p-4">Liều Lượng</th>
                  <th className="!border !p-4">Giá</th>
                  <th className="!border !p-4">Ngày Nhắc Lại</th>
                  <th className="!border !p-4">Số Lô</th>
                  <th className="!border !p-4">Trạng Thái</th>
                  <th className="!border !p-4">Ghi Chú</th>
                </tr>
              </thead>

              <tbody>
                <tr className="!bg-white hover:!bg-blue-100 !transition !duration-200 !text-center">
                  <td className="!border !p-4">{booking.bookingType}</td>
                  <td className="!border !p-4">0.05 ml</td>
                  <td className="!border !p-4 !text-green-600 !font-semibold">
                    {booking.totalPrice.toLocaleString()} VNĐ
                  </td>
                  <td className="!border !p-4">
                    <input
                      type="date"
                      className="!w-full !p-2 !border !rounded-lg !shadow-sm !focus:ring-2 !focus:ring-blue-400 !transition"
                    />
                  </td>
                  <td className="!border !p-4">BCG202401</td>
                  <td className="!border !p-4">
                    <select className="!w-full !p-2 !border !rounded-lg">
                      <option
                        value="Completed"
                        selected={booking.status === "Completed"}
                      >
                        Completed
                      </option>
                      <option
                        value="Pending"
                        selected={booking.status === "Pending"}
                      >
                        Pending
                      </option>
                    </select>
                  </td>
                  <td className="!border !p-4">
                    <textarea
                      placeholder="Nhập ghi chú..."
                      className="!w-full !p-2 !border !rounded-lg"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Nút quay lại */}
        <div className="mt-6 text-center">
          <Button type="default" onClick={onBack}>
            Quay lại
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VaccinationRecord;
