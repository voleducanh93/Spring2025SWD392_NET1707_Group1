import { Table, Tag, Button, Space, Typography } from "antd";
import { useBooking } from "../../hooks/useBooking";

const statusColors = {
  InProgress: "blue",
  Completed: "green",
  Pending: "orange",
  Confirmed: "darkblue",
  Cancelled: "red",
  RequestRefund: "darkorange",
};

const columns = (onProceedVaccination) => [
  { title: "Mã đơn", dataIndex: "bookingId", key: "bookingId", sorter: (a, b) => a.bookingId - b.bookingId },
  { 
    title: "Tên Trẻ", 
    dataIndex: "childName", 
    key: "childName",
    render: (name) => name || "Không có dữ liệu", 
    sorter: (a, b) => (a.childName || "").localeCompare(b.childName || ""), 
  },
  { 
    title: "Ngày Đặt",
    dataIndex: "bookingDate",
    key: "bookingDate",
    render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    sorter: (a, b) => new Date(a.bookingDate) - new Date(b.bookingDate),
  },
  { title: "Loại Tiêm", dataIndex: "bookingType", key: "bookingType" },
  { 
    title: "Giá Tiền",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (price) => `${price.toLocaleString()} VNĐ`,
    sorter: (a, b) => a.totalPrice - b.totalPrice,
  },
  {
    title: "Trạng Thái",
    dataIndex: "status",
    key: "status",
    render: (status) => <Tag color={statusColors[status] || "default"}>{status}</Tag>,
  },
  {
    title: "Chi Tiết",
    key: "actions",
    render: (_, record) => (
      <Space>
        <Button type="primary">Chi tiết</Button>
        <Button 
          type="primary" 
          style={{ backgroundColor: "green", borderColor: "green" }} 
          onClick={() => onProceedVaccination(record.childId, record)}
        >
          Tiến hành tiêm
        </Button>
      </Space>
    ),
  },
];

const DoctorList = ({ onProceedVaccination }) => {
  const { bookings, isLoading, isError, error } = useBooking();

  if (isLoading) return <p>Đang tải danh sách...</p>;
  if (isError) return <p>Lỗi: {error?.message || "Không thể tải danh sách đặt lịch."}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3}>Lịch Tiêm Chủng</Typography.Title>
      <Table 
        dataSource={bookings} 
        columns={columns(onProceedVaccination)} 
        rowKey="bookingId" 
        pagination={{ pageSize: 5 }} 
      />
    </div>
  );
};

export default DoctorList;
