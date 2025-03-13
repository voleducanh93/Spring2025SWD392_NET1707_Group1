import { useState } from "react";

import { useComboVaccine } from "../../hooks/useCombo";
import ComboDetailModal from "../../components/Combo/ComboDetail";
import ComboModal from "../../components/Combo/ComboModal";
import { DeleteOutlined } from "@mui/icons-material";
import "./headColumn.css"

import { Button, Form, Popconfirm, Space, Table } from "antd";

const customHeaderStyle = {
  background: "#1D2D70",
  color: "white",
  textAlign: "center",
  fontWeight: "bold",
};

// Tạo custom header row
export const components = {
  header: {
    cell: (props) => (
      <th {...props} style={{ ...props.style, ...customHeaderStyle }} />
    ),
  },
};

const ComboManagement = () => {
  const { combos, isLoading, addCombo, editCombo, removeCombo } =
    useComboVaccine();
  console.log();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [editingCombo, setEditingCombo] = useState(null);
  const [form] = Form.useForm();

  // Mở modal chi tiết Combo
  const showDetailModal = (combo) => {
    setSelectedCombo(combo);
    setIsDetailModalOpen(true);
  };

  // Đóng modal chi tiết
  const handleDetailCancel = () => {
    setIsDetailModalOpen(false);
    setSelectedCombo(null);
  };

  // Mở modal Thêm/Sửa Combo
  const showModal = (combo = null) => {
    setEditingCombo(combo); // Lưu combo đang chỉnh sửa

    form.setFieldsValue(
      combo
        ? {
            comboName: combo.comboName,
            description: combo.description,
            totalPrice: combo.totalPrice,
            isActive: combo.isActive,
            vaccineIds: combo.vaccines
              ? combo.vaccines.map((vaccine) => vaccine.vaccineId)
              : [],
          }
        : {
            comboName: "",
            description: "",
            totalPrice: 0,
            isActive: true,
            vaccineIds: [],
          }
    );

    setIsModalOpen(true);
  };

  // Xử lý Thêm/Sửa Combo
  const handleOk = async () => {
    try {
      await form.validateFields();
      const comboData = form.getFieldsValue();

      if (editingCombo) {
        const existingVaccineIds = editingCombo.vaccines.map(
          (v) => v.vaccineId
        ); // Lấy danh sách vaccine cũ
        const newVaccineIds = comboData.vaccineIds || []; // Lấy danh sách vaccine mới

        // Kiểm tra xem có thay đổi vaccine không
        const isVaccineChanged =
          JSON.stringify(existingVaccineIds.sort()) !==
          JSON.stringify(newVaccineIds.sort());

        // Nếu không thay đổi vaccine, gửi danh sách cũ
        const updatedVaccineIds = isVaccineChanged
          ? newVaccineIds
          : existingVaccineIds;

        // Chuẩn bị dữ liệu cập nhật
        const updatedData = {
          comboName: comboData.comboName,
          description: comboData.description,
          totalPrice: comboData.totalPrice,
          isActive: comboData.isActive,
          vaccineIds: updatedVaccineIds, // Luôn có vaccineIds để tránh lỗi
        };

        // Gửi API cập nhật
        editCombo.mutate({
          id: editingCombo.comboId,
          data: updatedData,
        });
      } else {
        // Nếu là thêm mới, gửi tất cả thông tin
        addCombo.mutate(comboData);
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Lỗi khi xử lý Combo:", error);
    }
  };

  

  // Cấu hình cột cho bảng
  const columns = [
    { title: "Tên Combo", dataIndex: "comboName", key: "comboName", },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "Đang hoạt động" : "Ngừng hoạt động"),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => showDetailModal(record)}
            className="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition flex items-center gap-1"
          >
            🔍 Chi tiết
          </Button>

          <Button
            onClick={() => showModal(record)}
            className="border border-green-500 text-green-500 px-3 py-1 rounded hover:bg-green-500 hover:text-white transition flex items-center gap-1"
          >
            ✏️ Chỉnh sửa
          </Button>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa Combo này?"
            onConfirm={() => removeCombo.mutate(record.comboId)}
            okText="Có"
            cancelText="Không"
          >
            <Button className="border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition">
              🗑️ Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Quản Lý Combo Vaccine</h1>
        <Button
          type="primary"
          onClick={() => showModal()}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
        >
          ➕ Thêm Combo Vaccine
        </Button>
      </div>

      <Table
      components={components}
        columns={columns}
        pagination={{ pageSize: 8 }}
        dataSource={combos}
        loading={isLoading}
        rowKey="id"
      />

      {/* Modal Thêm/Sửa Combo */}
      <ComboModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleOk={handleOk}
        form={form}
        editingCombo={editingCombo}
      />

      {/* Modal Chi Tiết Combo */}
      <ComboDetailModal
        isOpen={isDetailModalOpen}
        handleClose={handleDetailCancel}
        selectedCombo={selectedCombo}
      />
    </div>
  );
};

export default ComboManagement;
