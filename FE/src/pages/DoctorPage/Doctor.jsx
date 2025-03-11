import React from "react";

export default function Doctor() {
  return (
    <div className="!flex !items-center !justify-center !min-h-screen !bg-gradient-to-r !from-blue-100 !to-indigo-200">
      <div className="!max-w-4xl !w-full !p-8 !bg-white !shadow-2xl !rounded-2xl !border !border-gray-200">
        <h2 className="!text-3xl !font-bold !mb-6 !text-center !text-gray-800 !uppercase !tracking-wide">
          Ghi nhận hồ sơ tiêm chủng
        </h2>

        {/* Personal Information */}
        <div className="!mb-6 !bg-white !p-6 !rounded-lg !shadow-lg">
          <h3 className="!text-lg !font-semibold !mb-4 !text-gray-700">
            Thông tin cá nhân
          </h3>

          <div className="!grid !grid-cols-2 !gap-4">
            <div>
              <label className="!block !text-gray-600 !mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                className="!w-full !p-3 !border !rounded-lg !shadow-sm !focus:ring-2 !focus:ring-blue-400 !transition"
              />
            </div>

            <div>
              <label className="!block !text-gray-600 !mb-1">Ngày sinh</label>
              <input
                type="date"
                className="!w-full !p-3 !border !rounded-lg !shadow-sm !focus:ring-2 !focus:ring-blue-400 !transition"
              />
            </div>

            <div>
              <label className="!block !text-gray-600 !mb-1">Chiều cao (cm)</label>
              <input
                type="text"
                placeholder="Nhập chiều cao"
                className="!w-full !p-3 !border !rounded-lg !shadow-sm !focus:ring-2 !focus:ring-blue-400 !transition"
              />
            </div>

            <div>
              <label className="!block !text-gray-600 !mb-1">Cân nặng (kg)</label>
              <input
                type="text"
                placeholder="Nhập cân nặng"
                className="!w-full !p-3 !border !rounded-lg !shadow-sm !focus:ring-2 !focus:ring-blue-400 !transition"
              />
            </div>
          </div>
        </div>

        {/* Service Information Table */}
        <div className="!bg-gray-50 !p-6 !rounded-lg !shadow-lg">
          <h3 className="!text-lg !font-semibold !mb-4 !text-gray-700">
            Thông tin dịch vụ
          </h3>
          <div className="!overflow-x-auto">
            <table className="!w-full !border !border-gray-300 !text-sm !shadow-md !rounded-lg">
              <thead>
                <tr className="!bg-blue-600 !text-white !uppercase !text-center">
                  <th className="!border !p-4">Tên vaccine</th>
                  <th className="!border !p-4">Lô vaccine</th>
                  <th className="!border !p-4">Giá vaccine</th>
                  <th className="!border !p-4">Nơi tiêm</th>
                  <th className="!border !p-4">Ngày tiêm</th>
                  <th className="!border !p-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr className="!bg-white hover:!bg-blue-100 !transition !duration-200 !text-center">
                  <td className="!border !p-4">Covid Vaccine</td>
                  <td className="!border !p-4">12345</td>
                  <td className="!border !p-4 !text-green-600 !font-semibold">
                    700,000 VNĐ
                  </td>
                  <td className="!border !p-4">Chợ Rẫy</td>
                  <td className="!border !p-4">10/03/2025</td>
                  <td className="!border !p-4 !text-green-600 !font-bold">
                    Đã tiêm
                  </td>
                </tr>
                <tr className="!bg-white hover:!bg-blue-100 !transition !duration-200 !text-center">
                  <td className="!border !p-4">Flu Vaccine</td>
                  <td className="!border !p-4">67890</td>
                  <td className="!border !p-4 !text-red-600 !font-semibold">
                    150,000 VNĐ
                  </td>
                  <td className="!border !p-4">Pasteur</td>
                  <td className="!border !p-4">15/03/2025</td>
                  <td className="!border !p-4 !text-red-600 !font-bold">
                    Chưa tiêm
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
