import { Spin, Alert, Button } from "antd";

import { useState } from "react";
import {
  useUpdateVaccineRecord,
  useVaccineRecord,
} from "../../hooks/useVaccineRecord";
import { useNavigate } from "react-router-dom";

const VaccinationRecord = () => {
  const { data: vaccineRecord, isLoading, isError } = useVaccineRecord();
  const updateRecord = useUpdateVaccineRecord();
  const [editedRecords, setEditedRecords] = useState({});
  const navigate = useNavigate();
  if (isLoading) return <Spin tip="Đang tải hồ sơ tiêm chủng..." />;
  if (isError)
    return <Alert message="Không thể tải hồ sơ tiêm chủng" type="error" />;

  const handleInputChange = (id, field, value) => {
    setEditedRecords((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // ✅ Gửi cập nhật API khi nhấn "Lưu"
  const handleSave = (record) => {
    const updatedData = {
      ...editedRecords[record.vaccinationRecordId],
      status: "Completed", 
    };
  
    updateRecord.mutate({
      vaccinationRecordId: record.vaccinationRecordId,
      updatedData,
    });
  };
  

  return (
    <div className="!flex !items-center !justify-center !min-h-screen !bg-gradient-to-r ">
      <div className="!max-w-7xl !w-full !p-8 !bg-white !shadow-2xl !rounded-2xl ">
        <h2 className="!text-3xl !font-bold !mb-6 !text-center !text-gray-800 !uppercase !tracking-wide">
          Ghi nhận hồ sơ tiêm chủng
        </h2>
        <div className="!mb-6 !flex !justify-end">
          <button
            onClick={() => navigate("/doctor")}
            className="!px-4 !py-2 !bg-gray-600 !text-white !font-semibold !rounded-lg !shadow-md hover:!bg-gray-700 transition duration-200"
          >
            ⬅️ Quay về trang Doctor
          </button>
        </div>
        <div className="!mb-6 !bg-white !p-6 !rounded-lg !shadow-lg">
          <h3 className="!text-lg !font-semibold !mb-4 !text-gray-700">
            Thông tin cá nhân
          </h3>
          <div className="!grid !grid-cols-2 !gap-4">
            {/* Họ và tên */}
            <div>
              <label className="!block !text-gray-600 !mb-1">Họ và tên</label>
              <input
                type="text"
                value={vaccineRecord.fullName}
                readOnly
                className="!w-full !p-3 !rounded-lg !shadow-sm border border-gray-200 outline-none"
              />
            </div>

            {/* Ngày sinh */}
            <div>
              <label className="!block !text-gray-600 !mb-1">Ngày sinh</label>
              <input
                type="text"
                value={new Date(vaccineRecord.dateOfBirth).toLocaleDateString(
                  "vi-VN"
                )}
                readOnly
                className="!w-full !p-3 !rounded-lg !shadow-sm border border-gray-200 outline-none"
              />
            </div>

            {/* Chiều cao */}
            <div>
              <label className="!block !text-gray-600 !mb-1">
                Chiều cao (m)
              </label>
              <input
                type="text"
                value={vaccineRecord.height}
                readOnly
                className="!w-full !p-3 !rounded-lg !shadow-sm border border-gray-200 outline-none"
              />
            </div>

            {/* Cân nặng */}
            <div>
              <label className="!block !text-gray-600 !mb-1">
                Cân nặng (kg)
              </label>
              <input
                type="text"
                value={vaccineRecord.weight}
                readOnly
                className="!w-full !p-3 !rounded-lg !shadow-sm border border-gray-200 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="!p-6 !rounded-lg !shadow-lg">
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
                  <th className="!border !p-4">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {vaccineRecord.vaccineRecords.map((record) => (
                  <tr
                    key={record.vaccinationRecordId}
                    className="!bg-white hover:!bg-blue-100 !transition !duration-200 !text-center"
                  >
                    <td className="!border !p-4">{record.vaccineName}</td>
                    <td className="!border !p-4">{record.doseAmount} ml</td>
                    <td className="!border !p-4 !text-green-600 !font-semibold">
                      {record.price.toLocaleString()} VNĐ
                    </td>
                    <td className="!border !p-4">
                      <input
                        type="date"
                        defaultValue={
                          record.nextDoseDate
                            ? new Date(record.nextDoseDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            record.vaccinationRecordId,
                            "nextDoseDate",
                            e.target.value
                          )
                        }
                        className="!w-full !p-2 !border !rounded-lg"
                      />
                    </td>
                    <td className="!border !p-4">{record.batchNumber}</td>
                    <td className="!border !p-4">
                      <div
                        className="!w-full !p-2 border border-green-400 !rounded-lg bg-green-300"
                        value="Completed"
                        disabled
                      >
                        <span value="Completed" className="text-green-500">Hoàn thành</span>
                      </div>
                    </td>

                    <td className="!border !p-4">
                      <textarea
                        defaultValue={record.notes}
                        onChange={(e) =>
                          handleInputChange(
                            record.vaccinationRecordId,
                            "notes",
                            e.target.value
                          )
                        }
                        className="!w-full !p-2 !border !rounded-lg"
                      ></textarea>
                    </td>
                    <td className="!border !p-4">
                      <Button type="primary" onClick={() => handleSave(record)}>
                        Lưu
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccinationRecord;
