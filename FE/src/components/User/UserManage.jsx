import { useState } from "react";
import { Button, Space, Form, Avatar, Popconfirm } from "antd";
import CustomTable from "../ui/tableCustom";
import CustomModal from "../ui/CustomModal";
import DetailModal from "../ui/DetailModal";
import dayjs from "dayjs";
import { useUsers } from "../../hooks/useUsser";

const UserManage = () => {
  const { users, isLoading, addUser, editUser, removeUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Lưu trữ user đang chỉnh sửa
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  // **Cấu hình bảng hiển thị**
  const columns = [
    {
      title: "Họ & Tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => text || "Chưa có tên",
    },
    {
      title: "Trạng Thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "✅ Hoạt động" : "⛔ Bị khóa"),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) =>
        imageUrl ? <Avatar src={imageUrl} /> : <Avatar>👤</Avatar>,
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showDetailModal(record)}>🔍 Chi tiết</Button>
          <Button onClick={() => showEditModal(record)}>📝 Chỉnh sửa</Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>🗑️ Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // **Cấu hình modal chi tiết**
  const userDetailFields = [
    { name: "fullName", label: "Họ & Tên" },
    {
      name: "isActive",
      label: "Trạng Thái",
      render: (isActive) => (isActive ? "✅ Hoạt động" : "⛔ Bị khóa"),
    },
    { name: "email", label: "Email" },
    {
      name: "imageUrl",
      label: "Ảnh",
      render: (url) => (url ? <Avatar src={url} size={64} /> : "Không có ảnh"),
    },
    { name: "address", label: "Địa Chỉ" },
    {
      name: "dateOfBirth",
      label: "Ngày Sinh",
      render: (date) =>
        date && date !== "0001-01-01T00:00:00"
          ? dayjs(date).format("DD/MM/YYYY")
          : "Chưa có ngày sinh",
    },
    { name: "phoneNumber", label: "Số điện thoại" },
    {
      name: "emailConfirmed",
      label: "Xác nhận Email",
      render: (emailConfirmed) =>
        emailConfirmed ? "✅ Đã xác nhận" : "❌ Chưa xác nhận",
    },
  ];

  // **Cấu hình fields cho modal Create & Update**
  const userFields = [
    {
      name: "fullName",
      label: "Họ & Tên",
      rules: [{ required: true, message: "Vui lòng nhập họ và tên!" }],
    },
    {
      name: "userName",
      label: "Tên Đăng Nhập",
      rules: [{ required: true, message: "Vui lòng nhập tên đăng nhập!" }],
    },
    {
      name: "email",
      label: "Email",
      rules: [{ required: true, message: "Vui lòng nhập email!" }],
    },
    {
      name: "phoneNumber",
      label: "Số điện thoại",
      rules: [{ required: true, message: "Vui lòng nhập số điện thoại!" }],
    },
    {
      name: "address",
      label: "Địa chỉ",
      rules: [{ required: true, message: "Vui lòng nhập địa chỉ!" }],
    },
    {
      name: "dateOfBirth",
      label: "Ngày sinh",
      type: "date",
      rules: [{ required: true, message: "Vui lòng chọn ngày sinh!" }],
    },
    {
      name: "password",
      label: "Mật khẩu",
      type: "password",
      rules: [{ required: !editingUser, message: "Vui lòng nhập mật khẩu!" }],
    },
    {
      name: "role",
      label: "Vai trò",
      type: "select",
      options: ["Admin", "Doctor", "Customer", "Staff"],
      rules: [{ required: true, message: "Vui lòng chọn vai trò!" }],
    },
    {
      name: "isActive",
      label: "Trạng thái",
      type: "select",
      options: [true, false], // ✅ Chỉ truyền giá trị true/false
      rules: [{ required: true, message: "Vui lòng chọn trạng thái!" }],
    },
  ];

  // **Hiển thị modal chi tiết**
  const showDetailModal = (record) => {
    setSelectedUser(record);
    setIsDetailModalOpen(true);
  };

  // **Mở modal Create**
  const showCreateModal = () => {
    form.resetFields();
    setEditingUser(null); // Không có user nào đang được chỉnh sửa
    setIsModalOpen(true);
  };

  // **Mở modal Update**
  // **Mở modal Update**
  const showEditModal = (record) => {
    setEditingUser(record);
    form.setFieldsValue({
      ...record,
      role: record.role || "User", // Mặc định nếu không có giá trị
      isActive: record.isActive !== undefined ? record.isActive : true, // Mặc định là true
      
      dateOfBirth: record.dateOfBirth ? dayjs(record.dateOfBirth) : null, // Chuyển đổi ngày về `dayjs`
    });
    setIsModalOpen(true);
  };

  // **Xử lý submit form Create & Update**
  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      id: editingUser ? editingUser.id : undefined, // Thêm id nếu đang chỉnh sửa
      dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : null, // Định dạng ngày sinh về ISO
    };
    console.log(formattedValues);
    

    if (editingUser) {
      editUser.mutate({ id: editingUser.id, data: formattedValues }); // Gọi API cập nhật
    } else {
      addUser.mutate(formattedValues); // Gọi API thêm mới
    }

    setIsModalOpen(false);
  };
  const handleDelete = (id) => {
    removeUser.mutate(id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
  <div className="flex flex-wrap items-center justify-between mb-6">
    <h1 className="text-2xl font-semibold">Quản Lý Người Dùng</h1>
    <Button 
      type="primary" 
      onClick={showCreateModal} 
      className="flex items-center px-4 py-2"
    >
      ➕ Thêm Người Dùng
    </Button>
  </div>




      <CustomTable
        columns={columns}
        dataSource={users}
        loading={isLoading}
        rowKey="id"
      />

      {/* Modal Create & Update */}
      <CustomModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formFields={userFields}
        form={form}
      />

      {/* Modal Chi tiết */}
      <DetailModal
        visible={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        data={selectedUser}
        fields={userDetailFields}
      />
    </div>
  );
};

export default UserManage;
