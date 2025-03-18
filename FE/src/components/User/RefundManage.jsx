import { useState } from "react";
import { Button, Space, Tag, Form } from "antd";
import dayjs from "dayjs";
import { useRefunds } from "../../hooks/useRefund";
import CustomTable from "../ui/tableCustom";
import DetailModal from "../ui/DetailModal";
import CustomModal from "../ui/CustomModal";

const RefundManage = () => {
  const { refunds, isLoading, approveMutation, rejectMutation } = useRefunds();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [form] = Form.useForm();

  // ✅ Mở modal nhập lý do từ chối
  const handleReject = (refundRequestId) => {
    setSelectedRefund(refundRequestId);
    setIsRejectModalOpen(true);
    form.resetFields(); // Reset form trước khi mở modal
  };

  // ❌ Gửi API từ chối hoàn tiền
  const handleRejectSubmit = (values) => {
    rejectMutation.mutate({ refundRequestId: selectedRefund, adminNote: values.adminNote });
    setIsRejectModalOpen(false); // Đóng modal sau khi gửi
  };

  // ✅ Xử lý phê duyệt hoàn tiền (không cần nhập lý do)
  const handleApprove = (refundRequestId) => {
    approveMutation.mutate({ refundRequestId });
  };

  // ✅ Cấu hình bảng
  const columns = [
    { title: "Mã Hoàn Tiền", dataIndex: "refundRequestId", key: "refundRequestId" },
    { title: "Tên Người Dùng", dataIndex: "userName", key: "userName" },
    { title: "Số Tiền", dataIndex: "amount", key: "amount", render: (amount) => `${amount.toLocaleString()} VND` },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Đang chờ xử lý" ? "orange" : status === "Đã xử lý" ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showDetailModal(record)}>🔍 Chi tiết</Button>
          {record.status === "Đang chờ xử lý" && (
            <>
              <Button danger onClick={() => handleReject(record.refundRequestId)}>❌ Từ Chối</Button>
              <Button type="primary" onClick={() => handleApprove(record.refundRequestId)}>✅ Đồng Ý</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  // **Hiển thị modal chi tiết**
  const showDetailModal = (record) => {
    setSelectedRefund(record);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Quản Lý Yêu Cầu Hoàn Tiền</h1>
      <CustomTable columns={columns} dataSource={refunds} loading={isLoading} rowKey="refundRequestId" />

      {/* ✅ Modal từ chối hoàn tiền */}
      <CustomModal
        visible={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onSubmit={handleRejectSubmit}
        formFields={[
          { name: "adminNote", label: "Lý Do Từ Chối", rules: [{ required: true, message: "Vui lòng nhập lý do!" }] },
        ]}
        form={form}
      />

      <DetailModal
        visible={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        data={selectedRefund}
        fields={refundDetailFields}
      />
    </div>
  );
};

// **Cấu hình fields cho modal chi tiết**
const refundDetailFields = [
  { name: "refundRequestId", label: "Mã Hoàn Tiền" },
  { name: "userName", label: "Tên Người Dùng" },
  { name: "amount", label: "Số Tiền", render: (value) => `${value.toLocaleString()} VND` },
  { name: "status", label: "Trạng Thái" },
  { name: "reason", label: "Lý Do" },
  { name: "adminNote", label: "Ghi Chú" },
  { name: "createdAt", label: "Ngày Tạo", render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm") },
];

export default RefundManage;
