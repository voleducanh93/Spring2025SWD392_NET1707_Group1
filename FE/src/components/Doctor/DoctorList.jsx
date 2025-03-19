import { Table, Tag, Button, Space, Typography, Modal } from "antd";
import { useBooking } from "../../hooks/useBooking";
import { useCreateVaccineRecord } from "../../hooks/useVaccineRecord";
import { useState } from "react";
import { components } from "../../pages/ManagerPage/ComboManagement";

const statusColors = {
  InProgress: "blue",
  Completed: "green",
  Pending: "orange",
  Confirmed: "darkblue",
  Cancelled: "red",
  RequestRefund: "darkorange",
};

const DoctorList = () => {
  const { bookings, isLoading, isError } = useBooking();
  const createVaccineRecord = useCreateVaccineRecord();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const handleProceedVaccination = (bookingId) => {
    createVaccineRecord.mutate(bookingId);
  };


  const showModal = (record) => {
    setSelectedBooking(record);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  const columns = [
    { title: "Mã đơn", dataIndex: "bookingId", key: "bookingId", sorter: (a, b) => a.bookingId - b.bookingId },
    { title: "Tên Trẻ", dataIndex: "childName", key: "childName", render: (name) => name || "Không có dữ liệu", sorter: (a, b) => (a.childName || "").localeCompare(b.childName || "") },
    { title: "Ngày Đặt", dataIndex: "bookingDate", key: "bookingDate", render: (date) => new Date(date).toLocaleDateString("vi-VN"), sorter: (a, b) => new Date(a.bookingDate) - new Date(b.bookingDate) },
    { title: "Loại Tiêm", dataIndex: "bookingType", key: "bookingType" },
    { title: "Giá Tiền", dataIndex: "totalPrice", key: "totalPrice", render: (price) => `${price.toLocaleString()} VNĐ`, sorter: (a, b) => a.totalPrice - b.totalPrice },
    { title: "Trạng Thái", dataIndex: "status", key: "status", render: (status) => <Tag color={statusColors[status] || "default"}>{status}</Tag> },
    {
      title: "Chi Tiết",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => showModal(record)}>Chi tiết</Button>
          <Button type="primary" style={{ backgroundColor: "green", borderColor: "green" }} onClick={() => handleProceedVaccination(record.bookingId)}>
            Tiến hành tiêm
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) return <p>Đang tải danh sách...</p>;
  if (isError) return <p className="text-center">Danh sách đang rỗng</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3}>Lịch Tiêm Chủng</Typography.Title>
      <Table dataSource={bookings} components={components} columns={columns} rowKey="bookingId" pagination={{ pageSize: 5 }} />


      {/* Modal hiển thị chi tiết đặt lịch */}
      <Modal title="Chi Tiết Đặt Lịch" visible={isModalVisible} onCancel={handleCloseModal} footer={[
        <Button key="cancel" onClick={handleCloseModal}>Cancel</Button>,
        <Button key="ok" type="primary" onClick={handleCloseModal}>OK</Button>
      ]}>
        {selectedBooking && (
          <div>
            <p><strong>ID:</strong> {selectedBooking.bookingId}</p>
            <p><strong>Tên Trẻ:</strong> {selectedBooking.childName || "Không có dữ liệu"}</p>
            <p><strong>Ngày Đặt:</strong> {new Date(selectedBooking.bookingDate).toLocaleDateString("vi-VN")}</p>
            <p><strong>Loại Tiêm:</strong> {selectedBooking.bookingType}</p>
            <p><strong>Ghi Chú:</strong> {selectedBooking.note || "Không có ghi chú"}</p>
            <p><strong>Trạng Thái:</strong> <Tag color={statusColors[selectedBooking.status]}>{selectedBooking.status}</Tag></p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorList;
