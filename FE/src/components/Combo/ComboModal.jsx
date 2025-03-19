import { Modal, Form, Input, Switch, Select, Button, Table } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useVaccine } from "../../hooks/useVaccine";

const { Option } = Select;

const ComboModal = ({ isOpen, handleClose, handleOk, form, editingCombo }) => {
  const { vaccines, isLoading } = useVaccine();
  const [selectedVaccines, setSelectedVaccines] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
      setSelectedVaccines([]); // Reset danh sách vaccine khi đóng modal
    } else if (editingCombo) {
      setSelectedVaccines(editingCombo.vaccines.map((v, i) => ({
        vaccineId: v.vaccineId,
        order: i + 1,
        intervalDays: v.intervalDays || 0
      })));
    }
  }, [isOpen, editingCombo, form]);

  // Xử lý chọn vaccine
  const handleVaccineChange = (vaccineIds) => {
    const newVaccines = vaccineIds.map((id, index) => {
      const existing = selectedVaccines.find((v) => v.vaccineId === id);
      return existing || { vaccineId: id, order: index + 1, intervalDays: 0 };
    });
    setSelectedVaccines(newVaccines);
  };

  // Xử lý nhập khoảng cách (interval days)
  const handleIntervalChange = (index, value) => {
    const updatedVaccines = [...selectedVaccines];
    updatedVaccines[index].intervalDays = Math.max(0, Math.min(365, parseInt(value, 10) || 0));
    setSelectedVaccines(updatedVaccines);
  };

  // Xóa vaccine khỏi danh sách
  const handleRemoveVaccine = (vaccineId) => {
    const updatedVaccines = selectedVaccines.filter((v) => v.vaccineId !== vaccineId);
    setSelectedVaccines(updatedVaccines.map((v, i) => ({ ...v, order: i + 1 })));
  };

  // 🟢 **Tạo dữ liệu đúng format khi submit**
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();

      const comboData = {
        comboName: formData.comboName,
        description: formData.description,
        totalPrice: formData.totalPrice,
        isActive: formData.isActive,
        vaccines: selectedVaccines // ✅ Đảm bảo vaccine nằm trong object gửi lên API
      };
      console.log(comboData);
      

      handleOk(comboData); // Gửi dữ liệu về hàm xử lý
      handleClose();
    } catch (error) {
      console.error("Lỗi khi submit:", error);
    }
  };

  return (
    <Modal
      title={editingCombo ? "Cập nhật Combo" : "Thêm Combo"}
      open={isOpen}
      onOk={handleSubmit} // ✅ Gọi `handleSubmit` thay vì chỉ gửi danh sách vaccine
      onCancel={handleClose}
      width={700}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {editingCombo ? "Cập nhật" : "Thêm mới"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {/* Tên Combo */}
        <Form.Item name="comboName" label="Tên Combo" rules={[{ required: true, message: "⚠️ Vui lòng nhập tên Combo!" }]}>
          <Input placeholder="Nhập tên combo vaccine..." maxLength={100} />
        </Form.Item>

        {/* Mô tả */}
        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "⚠️ Vui lòng nhập mô tả!" }]}>
          <Input.TextArea placeholder="Nhập mô tả combo vaccine..." rows={3} maxLength={500} />
        </Form.Item>

        {/* Tổng giá */}
        <Form.Item name="totalPrice" label="Tổng giá" rules={[{ required: true, message: "⚠️ Vui lòng nhập tổng giá!" }]}>
          <Input type="number" min="1" placeholder="Nhập tổng giá combo..." />
        </Form.Item>

        {/* Chọn vaccine */}
        <Form.Item name="vaccineIds" label="Chọn Vaccine" rules={[{ required: true, message: "⚠️ Vui lòng chọn ít nhất một vaccine!" }]}>
          <Select
            mode="multiple"
            placeholder="Chọn các vaccine cho combo"
            loading={isLoading}
            allowClear
            onChange={handleVaccineChange}
            value={selectedVaccines.map((v) => v.vaccineId)}
          >
            {vaccines?.map((vaccine) => (
              <Option key={vaccine.vaccineId} value={vaccine.vaccineId}>
                {vaccine.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Danh sách vaccine đã chọn */}
        {selectedVaccines.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold">Danh sách vắc-xin đã chọn:</h4>
            <Table
              dataSource={selectedVaccines}
              pagination={false}
              rowKey="vaccineId"
              bordered
              columns={[
                { title: "Thứ tự", dataIndex: "order", key: "order", align: "center", width: 80 },
                { title: "Tên vắc-xin", dataIndex: "vaccineId", key: "vaccineId",
                  render: (vaccineId) => vaccines.find((v) => v.vaccineId === vaccineId)?.name || "Không xác định"
                },
                { title: "Khoảng cách (ngày)", dataIndex: "intervalDays", key: "intervalDays", align: "center", width: 150,
                  render: (text, record, index) => (
                    <Input
                      type="number"
                      min="0"
                      max="365"
                      value={text}
                      onChange={(e) => handleIntervalChange(index, e.target.value)}
                      className="w-full text-center"
                    />
                  ),
                },
                { title: "Xóa", key: "remove", align: "center", width: 80,
                  render: (_, record) => (
                    <Button danger onClick={() => handleRemoveVaccine(record.vaccineId)}>❌</Button>
                  ),
                },
              ]}
            />
          </div>
        )}

        {/* Trạng thái hoạt động */}
        <Form.Item name="isActive" label="Trạng thái" valuePropName="checked">
          <Switch checkedChildren="Đang hoạt động" unCheckedChildren="Ngừng hoạt động" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

ComboModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  editingCombo: PropTypes.object,
};

export default ComboModal;
