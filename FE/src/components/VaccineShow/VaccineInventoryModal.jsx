import { Modal, Table, Button, Space, Form, Input, DatePicker, Popconfirm } from "antd";

import dayjs from "dayjs";
import { useState } from "react";
import PropTypes from "prop-types";
import { useInventory, useVaccineinvetoryById } from "../../hooks/useInventory";
import { toast } from "react-toastify";


const VaccineInventoryModal = ({ isOpen, handleClose, selectedVaccine }) => {
  const { data: vaccineInventory, isLoading } = useVaccineinvetoryById(selectedVaccine?.vaccineId);
  const { editInventory, removeInventory } = useInventory(); // Gọi API chỉnh sửa/xóa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingInventory, setEditingInventory] = useState(null);
  const [form] = Form.useForm();

  // Mở Modal chỉnh sửa
  const showEditModal = (record) => {
    setEditingInventory(record);
    form.setFieldsValue({
      ...record,
      manufacturingDate: dayjs(record.manufacturingDate),
      expiryDate: dayjs(record.expiryDate),
    });
    setIsEditModalOpen(true);
  };

  // Đóng Modal chỉnh sửa
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingInventory(null);
    form.resetFields();
  };

  // Gửi dữ liệu chỉnh sửa
  const handleEditOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
  
      const manufacturingDate = dayjs(values.manufacturingDate);
      const expiryDate = dayjs(values.expiryDate);
      const today = dayjs();
  
      // Kiểm tra ngày sản xuất không được trong quá khứ
      if (manufacturingDate.isBefore(today, "day")) {
        return toast.error("⚠️ Ngày sản xuất không thể trong quá khứ!");
      }
  
      // Kiểm tra ngày hết hạn không được nhỏ hơn ngày sản xuất
      if (expiryDate.isBefore(manufacturingDate, "day")) {
        return toast.error("⚠️ Ngày hết hạn phải sau ngày sản xuất!");
      }
  
      const updatedData = {
        ...values,
        manufacturingDate: manufacturingDate.toISOString(),
        expiryDate: expiryDate.toISOString(),
      };
  
      editInventory.mutate(
        { id: editingInventory.vaccineInventoryId, data: updatedData },
        {
          onSuccess: () => {
          
            setIsEditModalOpen(false);
            form.resetFields();
          
          },
        }
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật lô vaccine:", error);
      toast.error("⚠️ Không thể cập nhật. Vui lòng kiểm tra lại!");
    }
  };
  

  // Xử lý khi nhấn "Xóa"
  const handleDelete = (id) => {
    removeInventory.mutate(id);
  };

  // Cấu hình cột cho bảng tồn kho
  const inventoryColumns = [
    { title: "Vaccine Inventory ID", dataIndex: "vaccineInventoryId", key: "vaccineInventoryId" },
    { title: "Số Hiệu Lô", dataIndex: "batchNumber", key: "batchNumber" },
    {
      title: "Ngày Sản Xuất",
      dataIndex: "manufacturingDate",
      key: "manufacturingDate",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày Hết Hạn",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    { title: "Nhà Cung Cấp", dataIndex: "supplier", key: "supplier" },
    { title: "Số Lượng Ban Đầu", dataIndex: "initialQuantity", key: "initialQuantity" },
    { title: "Số Hàng Trong Kho", dataIndex: "quantityInStock", key: "quantityInStock" },
    {
      title: "Thao Tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => showEditModal(record)}>Chỉnh sửa</Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa lô vaccine này?"
            onConfirm={() => handleDelete(record.vaccineInventoryId)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="danger">Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Modal chi tiết Vaccine Inventory */}
      <Modal title={`Chi tiết Vaccine: ${selectedVaccine?.name}`} open={isOpen} onCancel={handleClose} footer={null} width={1000}>
        <Table columns={inventoryColumns} dataSource={vaccineInventory} loading={isLoading} rowKey="vaccineInventoryId" />
      </Modal>

      {/* Modal chỉnh sửa Vaccine Inventory */}
      <Modal title="Chỉnh sửa Lô Vaccine" open={isEditModalOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="batchNumber" label="Số Hiệu Lô" rules={[{ required: true, message: "Vui lòng nhập số hiệu lô!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="manufacturingDate" label="Ngày Sản Xuất" rules={[{ required: true, message: "Vui lòng chọn ngày sản xuất!" }]}>
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="expiryDate" label="Ngày Hết Hạn" rules={[{ required: true, message: "Vui lòng chọn ngày hết hạn!" }]}>
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
    </>
  );
};
VaccineInventoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedVaccine: PropTypes.object,
};


export default VaccineInventoryModal;
