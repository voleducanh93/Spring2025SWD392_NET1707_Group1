import { useState } from "react";
import { Button, Space, Form, Popconfirm, Descriptions, Modal } from "antd";
import CustomTable from "../ui/tableCustom";
import CustomModal from "../ui/CustomModal";
import dayjs from "dayjs";
import { useUsers } from "../../hooks/useUsser";

const UserManage = () => {
  const { users, isLoading, addUser, editUser, removeUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Lưu trữ user đang chỉnh sửa
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(users);
  
  
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

  
  
  const userDetailFields = [
    { name: "fullName", label: "Họ & Tên" },
    {
      name: "isActive",
      label: "Trạng Thái",
      render: (isActive) => (isActive ? "✅ Hoạt động" : "⛔ Bị khóa"),
    },
    { name: "email", label: "Email" },
  
    // ✅ Ảnh bác sĩ (chỉ hiện khi có role Doctor)
    {
      name: "certificateImageUrl",
      label: "Ảnh",
      render: (value, record) => {
        if (!record.roles?.includes("Doctor")) return null;
        return value ? (
          <img
            src={value}
            alt="Ảnh bác sĩ"
            style={{
              width: 64,
              height: 64,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
        ) : (
          "Không có ảnh"
        );
      },
    }
    ,
  
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
    {
      name: "roles",
      label: "Vai trò",
      render: (value) => {
        // ✅ Normalize về mảng an toàn
        const roles = Array.isArray(value)
          ? value
          : typeof value === "string"
          ? [value]
          : [];
    
        if (roles.length === 0) return "Không có vai trò";
    
        return roles.map((role) => {
          const color =
            role === "Admin"
              ? "red"
              : role === "Doctor"
              ? "blue"
              : role === "Staff"
              ? "orange"
              : "green";
    
          return (
            <span
              key={role}
              style={{
                backgroundColor: color,
                color: "white",
                padding: "2px 8px",
                borderRadius: "4px",
                marginRight: 4,
                fontSize: "12px",
                display: "inline-block",
              }}
            >
              {role}
            </span>
          );
        });
      },
    }
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
      rules: [
        {
          required: true,
          message: "Vui lòng chọn ngày sinh!",
        },
        () => ({
          validator(_, value) {
            if (!value) return Promise.resolve();
            if (dayjs(value).isAfter(dayjs())) {
              return Promise.reject(
                new Error("⚠️ Ngày sinh không được lớn hơn ngày hiện tại!")
              );
            }
            return Promise.resolve();
          },
        }),
      ],
      disabledDate: (current) => {
        return current && current > dayjs().endOf("day"); // ✅ chặn click ngày tương lai
      }
    }
    
    ,
    {
      name: "password",
      label: "Mật khẩu",
      type: "password",
      rules: editingUser
        ? [
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve(); // Không cần nhập
                if (value.length < 6) return Promise.reject("Mật khẩu tối thiểu 6 ký tự!");
                return Promise.resolve();
              },
            },
          ]
        : [
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
          ],
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
    {
      name: "imageUpload",
      label: "Ảnh bác sĩ",
      type: "file",
      rules: [
        {
          required: true,
          message: "Vui lòng tải ảnh lên!",
        },
      ],
    }
  ];

  // **Hiển thị modal chi tiết**
  const showDetailModal = (record) => {
    console.log("📌 Chi tiết user:", record); 
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
      id: editingUser ? editingUser.id : undefined,
      dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : null,
      certificateImageUrl: selectedFile,
    };
  
    try {
      if (editingUser) {
        await editUser.mutateAsync({ id: editingUser.id, data: formattedValues });
      } else {
        await addUser.mutateAsync(formattedValues);
      }
  
      return true; // ✅ Xử lý thành công → cho phép modal đóng
    } catch (error) {
      console.error("❌ Submit lỗi:", error);
      return false; // ❌ Không đóng modal
    }
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
      {isModalOpen && (
      <CustomModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formFields={userFields}
        form={form}
        setSelectedFile={setSelectedFile}
      />)}

      {/* Modal Chi tiết */}
      <Modal
  title="Chi Tiết"
  open={isDetailModalOpen}
  onCancel={() => setIsDetailModalOpen(false)}
  footer={null}
  width={700}
>
{console.log("🐞 selectedUser >>>", selectedUser)}

  {console.log(selectedUser)
  }
  {selectedUser ? (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="Họ & Tên">{selectedUser.fullName || "Không có dữ liệu"}</Descriptions.Item>
      <Descriptions.Item label="Trạng Thái">{selectedUser.isActive ? "✅ Hoạt động" : "⛔ Bị khóa"}</Descriptions.Item>
      <Descriptions.Item label="Email">{selectedUser.email || "Không có dữ liệu"}</Descriptions.Item>
    {console.log("🐞 selectedUser >>>", selectedUser)}

      {/* Ảnh chỉ hiện khi role là Doctor */}
      {Array.isArray(selectedUser.roles) && selectedUser.roles.includes("Doctor") && (
        <Descriptions.Item label="Ảnh">
          {selectedUser.certificateImageUrl ? (
            <img
              src={selectedUser.certificateImageUrl}
              alt="Ảnh bác sĩ"
              style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover" }}
            />
          ) : (
            "Không có ảnh"
          )}
        </Descriptions.Item>
      )}

      <Descriptions.Item label="Địa Chỉ">{selectedUser.address || "Không có dữ liệu"}</Descriptions.Item>
      <Descriptions.Item label="Ngày Sinh">
        {selectedUser.dateOfBirth && selectedUser.dateOfBirth !== "0001-01-01T00:00:00"
          ? dayjs(selectedUser.dateOfBirth).format("DD/MM/YYYY")
          : "Chưa có ngày sinh"}
      </Descriptions.Item>
      <Descriptions.Item label="Số điện thoại">{selectedUser.phoneNumber || "Không có dữ liệu"}</Descriptions.Item>
      <Descriptions.Item label="Xác nhận Email">
        {selectedUser.emailConfirmed ? "✅ Đã xác nhận" : "❌ Chưa xác nhận"}
      </Descriptions.Item>

      {/* Vai trò */}
      {console.log(selectedUser.roles)
      }
      <Descriptions.Item label="Vai trò">
  {(() => {
    const roles = Array.isArray(selectedUser.roles)
      ? selectedUser.roles
      : selectedUser.role
      ? [selectedUser.role]
      : [];

    if (!roles.length) return "Không có vai trò";
    console.log(roles);
    
    return roles.map((role) => {
      const color =
        role === "Admin" ? "red" :
        role === "Doctor" ? "blue" :
        role === "Staff" ? "orange" : "green";

      return (
        <span
          key={role}
          style={{
            backgroundColor: color,
            color: "white",
            padding: "2px 8px",
            borderRadius: "4px",
            marginRight: 4,
            fontSize: "12px",
            display: "inline-block",
          }}
        >
          {role}
        </span>
      );
    });
  })()}
</Descriptions.Item>


    </Descriptions>
  ) : (
    <p>Không có dữ liệu</p>
  )}
</Modal>


    </div>
  );
};

export default UserManage;
