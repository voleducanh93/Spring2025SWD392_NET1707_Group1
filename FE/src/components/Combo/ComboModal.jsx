import { Modal, Form, Input, Switch, Select, Button } from "antd";
import { useEffect } from "react";
import { useVaccine } from "../../hooks/useVaccine";


const { Option } = Select;

const ComboModal = ({ isOpen, handleClose, handleOk, form, editingCombo }) => {
  const { vaccines, isLoading } = useVaccine(); 

  useEffect(() => {
    if (!isOpen) {
      form.resetFields(); 
    }
  }, [isOpen, form]);

  return (
    <Modal
      title={editingCombo ? "Cập nhật Combo" : "Thêm Combo"}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleClose}
      width={600}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {editingCombo ? "Cập nhật" : "Thêm mới"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="comboName"
          label="Tên Combo"
          rules={[{ required: true, message: "Vui lòng nhập tên Combo!" }]}
        >
          <Input placeholder="Nhập tên combo vaccine..." />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input placeholder="Nhập mô tả combo vaccine..." />
        </Form.Item>

        <Form.Item
          name="totalPrice"
          label="Tổng giá"
          rules={[{ required: true, message: "Vui lòng nhập tổng giá!" }]}
        >
          <Input type="number" placeholder="Nhập tổng giá combo..." />
        </Form.Item>

        {/* Chọn nhiều vaccine */}
        <Form.Item
          name="vaccineIds"
          label="Chọn Vaccine"
          rules={[{ required: true, message: "Vui lòng chọn ít nhất một vaccine!" }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn các vaccine cho combo"
            loading={isLoading}
            allowClear
          >
            {vaccines?.map((vaccine) => (
              <Option key={vaccine.vaccineId} value={vaccine.vaccineId}>
                {vaccine.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="isActive" label="Trạng thái" valuePropName="checked">
          <Switch checkedChildren="Đang hoạt động" unCheckedChildren="Ngừng hoạt động" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ComboModal;
