import { useState, useEffect } from "react";
import { Table, Button, Modal, Space, notification } from "antd";
import { useVaccineSchedule } from "../../hooks/useVaccineSchedule";
import { useVaccine } from "../../hooks/useVaccine";
import VaccinationScheduleTable from "../../components/VaccineShow/VaccinationScheduleTable";
import VaccineScheduleForm from "../../components/VaccineShow/VaccineScheduleForm";


const VaccineByAge = () => {
  const {
    vaccines: scheduleVaccines,
    isLoading: isLoadingSchedules,
    addVaccine,
    editVaccine,
    removeVaccine,
  } = useVaccineSchedule();

  const { vaccines: availableVaccines, isLoading: isLoadingVaccines } = useVaccine();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    console.log("🛠️ Dữ liệu từ useVaccineSchedule:", scheduleVaccines);
  }, [scheduleVaccines]);

  const showModal = (record = null) => {
    setEditingVaccine(record);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (editingVaccine) {
      editVaccine.mutate({ id: editingVaccine.scheduleId, data }, {
        onSuccess: () => {
          notification.success({ message: "Cập nhật lịch tiêm thành công!" });
          setIsModalOpen(false);
        },
        onError: (error) => {
          notification.error({ message: `Lỗi: ${error.message}` });
        },
      });
    } else {
      addVaccine.mutate(data, {
        onSuccess: () => {
          notification.success({ message: "Thêm lịch tiêm thành công!" });
          setIsModalOpen(false);
        },
        onError: (error) => {
          notification.error({ message: `Lỗi: ${error.message}` });
        },
      });
    }
  };

  const handleDelete = (id) => {
    removeVaccine.mutate(id);
  };

  const showModalDetail = (record) => {
    setSelectedSchedule(record);
    setIsDetailModalOpen(true);
  };

  const columns = [
    { title: "Tuổi Bắt Đầu", dataIndex: "ageRangeStart", key: "ageRangeStart" },
    { title: "Tuổi Kết Thúc", dataIndex: "ageRangeEnd", key: "ageRangeEnd" },
    { title: "Ghi Chú", dataIndex: "notes", key: "notes" },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showModalDetail(record)} className="border border-blue-500 text-blue-500">
            🔍 Chi tiết
          </Button>
          <Button onClick={() => showModal(record)} className="border border-yellow-500 text-yellow-500">
            ✏️ Sửa
          </Button>
          <Button onClick={() => handleDelete(record.scheduleId)} className="border border-red-500 text-red-500">
            🗑️ Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Quản Lý Lịch Tiêm Vaccine</h1>
        <Button type="primary" onClick={() => showModal()} className="bg-blue-500 hover:bg-blue-600 text-white">
          ➕ Thêm lịch tiêm
        </Button>
      </div>

      {isLoadingSchedules ? (
        <p>Đang tải dữ liệu...</p>
      ) : scheduleVaccines.length > 0 ? (
        <Table columns={columns} dataSource={scheduleVaccines} rowKey="scheduleId" pagination={{ pageSize: 8 }} />
      ) : (
        <p>Không có lịch tiêm nào.</p>
      )}

      {/* Modal Chi Tiết */}
      <Modal title="Chi tiết Lịch Tiêm Chủng" open={isDetailModalOpen} onCancel={() => setIsDetailModalOpen(false)} footer={null}>
        {selectedSchedule ? (
          <VaccinationScheduleTable vaccinationSchedule={selectedSchedule} />
        ) : (
          <p>Không có dữ liệu.</p>
        )}
      </Modal>

      {/* Modal Thêm / Sửa Lịch Tiêm */}
      <Modal title={editingVaccine ? "Cập nhật vaccine" : "Thêm vaccine"} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <VaccineScheduleForm availableVaccines={availableVaccines} initialData={editingVaccine} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default VaccineByAge;
