import { useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Space, Select, Popconfirm } from "antd";
import { useInventory } from "../../hooks/useInventory";
import { useVaccine } from "../../hooks/useVaccine";
import dayjs from "dayjs"; // ✅ Sử dụng dayjs thay vì moment.js
import customParseFormat from "dayjs/plugin/customParseFormat";
import { toast } from "react-toastify";

dayjs.extend(customParseFormat);

const InventoryManagement = () => {
  const { inventory, isLoading, addInventory, editInventory, removeInventory } = useInventory();
  console.log(inventory);
  
  const { vaccines } = useVaccine(); // Lấy danh sách vaccine để chọn khi tạo mới
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInventory, setEditingInventory] = useState(null);
  const [form] = Form.useForm();

  // ✅ Mở modal thêm/sửa Vaccine Inventory
  const showModal = (record = null) => {
    setEditingInventory(record);
    form.setFieldsValue(
      record
        ? {
            ...record,
            manufacturingDate: dayjs(record.manufacturingDate),
            expiryDate: dayjs(record.expiryDate),
          }
        : {
            vaccineId: null,
            batchNumber: "",
            manufacturingDate: null,
            expiryDate: null,
            initialQuantity: 0,
            supplier: "",
          }
    );
    setIsModalOpen(true);
  };

  // ✅ Xóa vaccine inventory
  const handleDelete = (id) => {
   
        removeInventory.mutate(id);
      
  };

  // ✅ Xử lý khi nhấn OK trong modal
  const handleOk = async () => {
    try {
      await form.validateFields();
      const formData = {
        ...form.getFieldsValue(),
        manufacturingDate: dayjs(form.getFieldValue("manufacturingDate")).toISOString(),
        expiryDate: dayjs(form.getFieldValue("expiryDate")).toISOString(),
      };

      if (editingInventory) {
        editInventory.mutate(
          { id: editingInventory.vaccineInventoryId, data: formData }
        );
      } else {
        addInventory.mutate(formData);
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Lỗi khi tạo/cập nhật lô vaccine:", error);
      toast.error("⚠️ Đã xảy ra lỗi. Vui lòng kiểm tra lại!");
    }
  };

  // ✅ Cấu hình cột cho bảng
  const columns = [
    { title: "Tên Vaccine", dataIndex: "name", key: "name" },
    { title: "Lô Vaccine", dataIndex: "batchNumber", key: "batchNumber" },
    { title: "Nhà Sản Xuất", dataIndex: "manufacturer", key: "manufacturer" },
    {
      title: "Ngày Sản Xuất",
      dataIndex: "manufacturingDate",
      key: "manufacturingDate",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Hạn Sử Dụng",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    { title: "Nhà Cung Cấp", dataIndex: "supplier", key: "supplier" },
    { title: "Số Lượng Ban Đầu", dataIndex: "initialQuantity", key: "initialQuantity" },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>
            Sửa
          </Button>
          <Popconfirm
      title="Bạn có chắc chắn muốn xóa lô vaccine này?"
      onConfirm={() => handleDelete(record.vaccineInventoryId)} // Thay 1 bằng ID thực tế
      okText="Có"
      cancelText="Không"
    >
      <Button type="link" danger >
        Xóa 
      </Button>
    </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Quản lý tồn kho Vaccine</h2>
      <Button type="primary" onClick={() => showModal()} className="mb-3">
        Thêm Lô Vaccine
      </Button>
      <Table columns={columns} dataSource={inventory} loading={isLoading} rowKey="vaccineInventoryId" />

      {/* ✅ Modal thêm/sửa Vaccine Inventory */}
      <Modal title={editingInventory ? "Cập nhật lô vaccine" : "Thêm lô vaccine"} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="vaccineId" label="Chọn Vaccine" rules={[{ required: true, message: "Vui lòng chọn vaccine!" }]}>
            <Select placeholder="Chọn vaccine">
              {vaccines?.map((vaccine) => (
                <Select.Option key={vaccine.vaccineId} value={vaccine.vaccineId}>
                  {vaccine.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="batchNumber" label="Lô Vaccine" rules={[{ required: true, message: "Vui lòng nhập lô vaccine!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="manufacturingDate" label="Ngày Sản Xuất" rules={[{ required: true, message: "Vui lòng chọn ngày sản xuất!" }]}>
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="expiryDate" label="Hạn Sử Dụng" rules={[{ required: true, message: "Vui lòng chọn hạn sử dụng!" }]}>
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="initialQuantity" label="Số Lượng Ban Đầu" rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="supplier" label="Nhà Cung Cấp" rules={[{ required: true, message: "Vui lòng nhập nhà cung cấp!" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryManagement;
