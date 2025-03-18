import { Modal, Form, Input, Switch, Select, Button } from "antd";
import PropTypes from 'prop-types';
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
  {/* Tên Combo */}
  <Form.Item
    name="comboName"
    label="Tên Combo"
    rules={[{ required: true, message: "⚠️ Vui lòng nhập tên Combo!" }]}
  >
    <Input placeholder="Nhập tên combo vaccine..." maxLength={100} />
  </Form.Item>

  {/* Mô tả */}
  <Form.Item
    name="description"
    label="Mô tả"
    rules={[{ required: true, message: "⚠️ Vui lòng nhập mô tả!" }]}
  >
    <Input.TextArea placeholder="Nhập mô tả combo vaccine..." rows={3} maxLength={500} />
  </Form.Item>

  {/* Tổng giá - Không cho phép nhập số âm */}
  <Form.Item
    name="totalPrice"
    label="Tổng giá"
    rules={[
      { required: true, message: "⚠️ Vui lòng nhập tổng giá!" },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || parseInt(value) > 0) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("⚠️ Giá tiền phải lớn hơn 0!"));
        },
      }),
    ]}
  >
    <Input type="number" min="1" placeholder="Nhập tổng giá combo..." />
  </Form.Item>

  {/* Chọn nhiều vaccine */}
  <Form.Item
    name="vaccineIds"
    label="Chọn Vaccine"
    rules={[{ required: true, message: "⚠️ Vui lòng chọn ít nhất một vaccine!" }]}
  >
    <Select mode="multiple" placeholder="Chọn các vaccine cho combo" loading={isLoading} allowClear>
      {vaccines?.map((vaccine) => (
        <Option key={vaccine.vaccineId} value={vaccine.vaccineId}>
          {vaccine.name}
        </Option>
      ))}
    </Select>
  </Form.Item>

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
